const jwt = require('jsonwebtoken');

module.exports = {
    create: function(data){
        return new Promise((resolve, reject) => jwt.sign(data, 'secret', { expiresIn: '1d' }, (err, token) => {
            if(err) { reject(err); return;}
            resolve(token);
        }));
    },
    verify: function(token){
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'secret', (err, data) => {
                if(err) { reject(err); return;}
                resolve(data);
            })
        })
    } 
};