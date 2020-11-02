import express from 'express';
import LikeController from '../../controllers/LikeController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
// import verifyAdmin from '../../middleware/verifyAdmin.js';


const router = express.Router()

// router.post('/all', [verifyJWT], (req, res) => RoleController.getAll(req, res));
router.post('/get', [verifyJWT], (req, res) => LikeController.get(req, res));
router.post('/get-total', (req, res) => LikeController.getCount(req, res));
router.post('/new', [verifyJWT], (req, res) => LikeController.new(req, res));
router.delete('/delete', [verifyJWT], (req, res) => LikeController.delete(req, res));


export default router;