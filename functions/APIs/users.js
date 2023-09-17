const { admin, db } = require('../utils/admin');
const config = require('../utils/config');

const firebase = require('firebase');
require('firebase/storage');
const { IncomingForm } = require('formidable-serverless');
const fs = require('fs');
const path = require('path');

firebase.initializeApp(config);

const storage = firebase.storage();

const { validateLoginData, validateSignUpData, validateResetPasswordData } = require('../utils/validators');
const { editInvoice } = require('./invoices');

// Login
exports.loginUser = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const { valid, errors } = validateLoginData(user);
    if (!valid) return response.status(400).json(errors);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token });
        })
        .catch((error) => {
            console.error(error);
            return response.status(403).json({ general: 'wrong credentials, please try again' });
        })
};

exports.signUpUser = (request, response) => {
    const newUser = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        country: request.body.country,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword
    };

    const { valid, errors } = validateSignUpData(newUser);

    if (!valid) return response.status(400).json(errors);

    let token, userId;
    firebase
        .auth()
        .createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        )
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idtoken) => {
            token = idtoken;
            const userCredentials = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                country: newUser.country,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                loyaltyPoints: 0
            };
            return db
                .doc(`/users/${userId}`)
                .set(userCredentials);
        })
        .then(() => {
            return response.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return response.status(400).json({ email: 'Email already in use' });
            } else {
                return response.status(500).json({ general: 'Something went wrong, please try again' });
            }
        });
};

exports.getUserDetail = (request, response) => {
    let userData = {};
    db
        .doc(`/users/${request.uid}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.userCredentials = doc.data();
                return response.json(userData);
            }
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error.code });
        });
};

exports.updateUserDetails = (request, response) => {
    if (request.body.createdAt || request.body.email) {
        response.status(403).json({ message: 'Not allowed to edit' });
    }

    let document = db.collection('users').doc(`${request.uid}`);
    document.update(request.body)
        .then(() => {
            response.json({ message: 'Updated successfully' });
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({
                message: "Cannot Update the value"
            });
        });
};

exports.logoutUser = (request, response) => {
    firebase.auth().signOut()
        .then((data) => {
            return response.json({ message: 'Logout successfully' })
        })
        .catch((err) => {
            console.error(error);
            return response.status(500).json({
                message: "Something went wrong!"
            });
        });
};

exports.resetPassword = (request, response) => {
    const user = { email: request.body.email };

    const { valid, errors } = validateResetPasswordData(user);
    if (!valid) return response.status(400).json(errors);

    const actionCodeSettings = {
        url: "https://crazychimp.org/login"
    };

    firebase.auth().sendPasswordResetEmail(user.email, actionCodeSettings)
        .then(() => {
            return response.json({ message: 'Email sent!' });
        })
        .catch((error) => {
            console.error(error);
            return response.status(403).json({ general: 'Something went wrong' });
        })
};

exports.updateInvoiceWithReview = (req, res) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error parsing form data:', err);
          return res.status(500).json({ error: 'Failed to parse form data' });
        }
    
        const file = files.image;
        // const jsonData = JSON.parse(fields.jsonData);
    
        if (!file) {
          return res.status(400).json({ error: 'No image file provided' });
        }
        
        const originalFilename = file.name;
        const fileExt = path.extname(originalFilename);

        const fileName = `Reviews/${req.query.invoiceId}.${fileExt}`; // Replace with the desired filename or generate a unique filename

        const bucket = admin.storage().bucket();
        const fileUpload = bucket.file(fileName);
    
        const writeStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.type
          }
        });
    
        writeStream.on('error', (err) => {
          console.error('Error uploading image:', err);
          return res.status(500).json({ error: 'Failed to upload image' });
        });
    
        writeStream.on('finish', () => {
          fileUpload.getSignedUrl({ action: 'read', expires: '03-01-2500' }, (err, url) => {
            if (err) {
              console.error('Error retrieving signed URL:', err);
              return res.status(500).json({ error: 'Failed to retrieve signed URL' });
            }
    
            // Save the image URL and JSON data to the Firebase Realtime Database
            const imageUrl = url;
            console.log("IMAGE URL", imageUrl);
            console.log("JSON Data", req.query);
            const jsonData = JSON.parse(req.query.jsonData); // Assuming jsonData is a field in the request body containing the JSON object
            const dataToStore = { imageUrl, ...jsonData };

            let document = db.collection("invoices").doc(`${req.query.invoiceId}`);

            document.update(dataToStore)
                .then(() => {
                    res.json({ message: 'Updated successfully' });
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({
                        error: err.code
                    });
                });
          });
        });
    
        const readStream = fs.createReadStream(file.path);
        readStream.pipe(writeStream);
    });
};
  