import express from 'express';
import multer from 'multer';
import AuthController from '../../controllers/AuthController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
import verifyAdmin from '../../middleware/verifyAdmin.js';

const upload = multer({
    dest: './public/uploads/pfp'
})

const router = express.Router()

router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/login', (req, res) => AuthController.login(req, res));
router.post('/token', (req, res) => AuthController.regenToken(req, res));
router.post('/verify', (req, res) => AuthController.verifyAccount(req, res));
router.post('/password-reset/request', (req, res) => AuthController.resetPasswordRequest(req, res));
router.post('/password-reset', (req, res) => AuthController.resetPassword(req, res));

router.post('/info', verifyJWT, (req, res) => AuthController.getUserInfo(req, res));
router.post('/user', (req, res) => AuthController.getUser(req, res));
router.post('/pfp', [verifyJWT, upload.single("file")], (req, res) => AuthController.uploadProfilePicture(req, res));
router.delete('/logout', verifyJWT, (req, res) => AuthController.logout(req, res));

router.post('/check', verifyJWT, (req, res) => {
    res.send('OK');
});

router.post('/check-admin', [verifyJWT, verifyAdmin], (req, res) => {
    res.send('OK');
});

export default router;