import express from 'express';
import PriceController from '../../controllers/PriceController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
import verifyAdmin from '../../middleware/verifyAdmin.js';


const router = express.Router()

router.post('/all', [verifyJWT], (req, res) => PriceController.getAll(req, res));
router.post('/get', (req, res) => PriceController.get(req, res));
router.post('/new', [verifyJWT, verifyAdmin], (req, res) => PriceController.new(req, res));
router.delete('/delete', [verifyJWT, verifyAdmin], (req, res) => PriceController.delete(req, res));


export default router;