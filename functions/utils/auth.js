const { admin, db } = require('./admin');

module.exports = (request, response, next) => {
	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
		idToken = request.headers.authorization.split('Bearer ')[1];
	} else {
		console.error('No token found');
		return response.status(403).json({ error: 'Unauthorized' });
	}
    let uid;
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
            uid = decodedToken.uid;
			return db.doc(`/users/${decodedToken.uid}`).get();
		})
		.then((doc) => {
			if(doc.exists) {
                request.uid = uid;
                return next();
            }
            else {
                console.error('User does not exist', err);
			    return response.status(404).json(err);
            }
		})
		.catch((err) => {
			console.error('Error while verifying token', err);
			return response.status(403).json(err);
		});
};