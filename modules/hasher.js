
let crypto = require('crypto');

function hasher() {
    
    this.generateSalt = () => {
        return crypto.randomBytes(16).toString('hex');
    }
    
    this.hash = (salt, str) => {
        return crypto.pbkdf2Sync(str, salt,
            1000, 64, 'sha512').toString('hex'); 
    }
    
    this.hashPwd = (str) => {
        let salt = this.generateSalt();
        let hash = this.hash(salt, str);
        return {salt: salt, hash: hash};
    }

    this.genResetkey = () => {
        let size = 30;
        //var regex = ".*[/\\x5c].*";
        return crypto
            .randomBytes(size)
            .toString('base64')
            .slice(0, size)
            .replace(/\//ig, '_');
            
    }


}

module.exports = new hasher();