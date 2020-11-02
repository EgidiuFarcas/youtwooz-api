import express from 'express';
import CategoryController from '../../controllers/CategoryController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
import verifyAdmin from '../../middleware/verifyAdmin.js';


const router = express.Router()

router.post('/all', [verifyJWT], (req, res) => CategoryController.getAll(req, res));
router.post('/get', (req, res) => CategoryController.get(req, res));
router.post('/new', [verifyJWT, verifyAdmin], (req, res) => CategoryController.new(req, res));
router.delete('/delete', [verifyJWT, verifyAdmin], (req, res) => CategoryController.delete(req, res));


export default router;