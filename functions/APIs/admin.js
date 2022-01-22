
exports.checkIfAdmin = (request, response) => {
    return response.json({ message: 'Admin authenticated successfully!'})
};