import express from 'express';
import multer from 'multer';
import SubmissionController from '../../controllers/SubmissionController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
// import verifyAdmin from '../../middleware/verifyAdmin.js';


const router = express.Router();
const upload = multer({
    dest: './public/uploads/submissions'
});

router.post('/new/one', [verifyJWT], (req, res) => SubmissionController.stepOne(req, res));
router.post('/new/two', [verifyJWT], (req, res) => SubmissionController.stepTwo(req, res));
router.post('/new/three', [verifyJWT], (req, res) => SubmissionController.stepThree(req, res));
router.post('/new/image', [verifyJWT, upload.single("file")], (req, res) => SubmissionController.setImage(req, res));
router.post('/status', [verifyJWT], (req, res) => SubmissionController.setStatus(req, res));
router.post('/get/mine', [verifyJWT], (req, res) => SubmissionController.getMine(req, res));
router.post('/get/published', (req, res) => SubmissionController.getPublished(req, res));
router.post('/get/pending', (req, res) => SubmissionController.getPending(req, res));
router.post('/get/search', (req, res) => SubmissionController.getSearched(req, res));
router.post('/info', (req, res) => SubmissionController.getInfo(req, res));
router.post('/delete', [verifyJWT], (req, res) => SubmissionController.delete(req, res));
router.post('/query', [verifyJWT], (req, res) => SubmissionController.query(req, res));

export default router;