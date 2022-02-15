var readline = require('readline');
var Writable = require('stream').Writable;
const pass_module = require('./pass_module');

var mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
        if (!this.muted)
        process.stdout.write(chunk, encoding);
        callback();
    }
});

mutableStdout.muted = false;

var rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
});

rl.question('Password: ', function(password) {
    const encryption = pass_module.encryption(password);
    const decryption = pass_module.decryption();
    const validation = pass_module.validation();

    console.log('\nEncripted Password: ', encryption);
    console.log('\nYour Password: ', decryption);
    console.log('\nPassword is valid ? : ', validation);
    rl.close();
});

mutableStdout.muted = true;