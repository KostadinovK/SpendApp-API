const jwt = require('./jwt');
const db = require('../models/index');

//Middleware for authorization
module.exports = function(){
    return function(req, res, next){
        const token = req.cookies['auth_cookie'];
        jwt.verify(token)
            .then(({ id }) => db.User.findByPk(id))
            .then(user => {
                if(!user){
                    return Promise.reject();
                }
                req.user = user;
                next();
            })
            .catch(() => {
                res.status(401).send("Unauthorized!");
            });
    }
}