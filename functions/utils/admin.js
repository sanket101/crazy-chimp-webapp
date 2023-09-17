const admin = require('firebase-admin');
const firebaseConfig = require('../utils/crazy-chimp.json');

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    storageBucket: "gs://crazy-chimp-48212.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db };