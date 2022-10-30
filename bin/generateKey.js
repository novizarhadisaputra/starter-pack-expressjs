const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const pathENV = path.join(__dirname, '../.env');

fs.readFile(pathENV, 'utf8', (err, data) => {
    const key = crypto.randomBytes(64).toString('hex');
    if (err) {
        console.error(err);
        return;
    }
    let text = data.toString();
    let variables = [];
    if (text) {
        variables = text.split('\n');
    }
    let newText = variables.length > 0 ? '' : `JWT_SECRET=${key}`;
    variables.forEach(variable => {
        let row = variable;
        if (variable.includes('JWT_SECRET')) {
            let columns = variable.split('=');
            row = `${columns[0]}=${key}`;
        }
        newText = `${newText}${row}${'\n'}`;
    });

    fs.writeFile(pathENV, newText, err => {
        if (err) {
            console.error(err);
        }
        console.log('Generate Key Success');
    });
});
