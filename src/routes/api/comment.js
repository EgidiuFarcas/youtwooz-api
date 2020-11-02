import express from 'express';
import CommentController from '../../controllers/CommentController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
// import verifyAdmin from '../../middleware/verifyAdmin.js';


const router = express.Router()

// router.post('/all', [verifyJWT], (req, res) => RoleController.getAll(req, res));
router.post('/get', [verifyJWT], (req, res) => CommentController.get(req, res));
router.post('/get-total', (req, res) => CommentController.getCount(req, res));
router.post('/get-all', (req, res) => CommentController.getAllForItem(req, res));
router.post('/new', [verifyJWT], (req, res) => CommentController.new(req, res));
router.delete('/delete', [verifyJWT], (req, res) => CommentController.delete(req, res));


export default router;