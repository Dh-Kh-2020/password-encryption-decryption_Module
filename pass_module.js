const crypto = require("crypto");
const passwordValidator = require('password-validator');

const algorithm = "aes-256-cbc"; 
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);
const valid_schema = new passwordValidator();

var encryptedData;
var decryptedData;

function encryption(password){
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    encryptedData = cipher.update(password, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}

function decryption(){
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

function validation(){
    valid_schema.is().min(5);
    valid_schema.is().max(10);
    valid_schema.has().not().spaces();
    valid_schema.is().not().oneOf(['Passw0rd', 'Password123']);

    return valid_schema.validate(decryptedData);
}

exports.encryption = encryption;
exports.decryption = decryption;
exports.validation = validation;