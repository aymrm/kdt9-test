const express = require('express');
const controller = require('../controller/Cuser');
const router = express.Router();

router.get('/', controller.index);
//GET localhost:8000/user/signup
router.get('/signup', controller.signup);
//POST localhost:8000/user/signup
router.post('/signup', controller.post_signup);

router.get('/signin', controller.signin);
router.post('/signin', controller.post_signin);

router.post('/profile', controller.post_profile);
router.patch('/profile/edit', controller.edit_profile);
router.delete('/profile/delete', controller.delete_profile);

module.exports = router;
exports.post_profile = (req, res) => {
    User.post_profile(req.body, (result) => {
        if (result.length > 0) {
            res.render('profile', { data: result[0] });
        }
    });
};

exports.edit_profile = (req, res) => {
    User.edit_profile(req.body, () => {
        res.send({ result: true });
    });
};

exports.delete_profile = (req, res) => {
    User.delete_profile(req.body.id, () => {
        res.send({ result: true });
    });
};