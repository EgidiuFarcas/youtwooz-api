import express from 'express';
import RoleController from '../../controllers/RoleController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
import verifyAdmin from '../../middleware/verifyAdmin.js';


const router = express.Router()

router.post('/all', [verifyJWT], (req, res) => RoleController.getAll(req, res));
router.post('/get', (req, res) => RoleController.get(req, res));
router.post('/new', [verifyJWT, verifyAdmin], (req, res) => RoleController.new(req, res));
router.delete('/delete', [verifyJWT, verifyAdmin], (req, res) => RoleController.delete(req, res));


export default router;