const upload = require('./upload-middleware');
const applyMiddleware = require('./applyMiddleware');

module.exports = {
    uploadMiddleware: upload,
    applyMiddleware,
}