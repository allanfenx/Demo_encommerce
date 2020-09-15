const fs = require('fs-js');
const { resolve } = require('path');

module.exports = (value) => {

    fs.unlink(resolve(__dirname, "..", "public", "upload", `${value}`), (err) => {
        if (err) return false;

    });
}