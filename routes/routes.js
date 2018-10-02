var express = require('express');
var table = require('../mongo_db/connector');
router = express.Router();

var jwt = require('jsonwebtoken'); 


router.post('/login', (req, res) => {
    res.send(`Server Running Successfully. You send: ${req.body}`);
});

router.post('/signup', (req, res) => {
    if(req.body && req.body.email && req.body.password){
        new table({
            '_id': req.body.email,
            'password': req.body.password,
        }).save((db_err, db_res) => {
            if (db_err) { 
                res.status(500).json(db_err);
            } else {
                res.status(201).json(`Sign Up Successfull For Email: ${db_res['_id']}`);
            }
        })
    } else {
        res.status(400).send(`Bad Request: ${req}`);
    }
});

router.post('/signin', (req, res) => { 
    if (req.body && req.body.email && req.body.password) {
        table.find({'_id': req.body.email},(db_err,db_res) =>{
            if (db_err) res.status(500).send(db_err);
            else if (!db_err && db_res.length <= 0) res.status(404).send(`Email ${req.body.email} Not Found`)
            else if (!db_err && db_res.length > 0 && db_res[0].password === req.body.password) { 
                jwt.sign({ 'email': req.email, 'password': req.password }, 'secretKey', (error, token) => {
                    if(error) res.status(500).send('Token Generation Failed');
                    else res.status(200).json({ token });
                });
            }
            else res.status(401).send(`Password does not Match`);
        })
    } else {
        res.status(400).send(`Bad Request: ${req}`);
    }
})

module.exports = router;
