import { Router } from "express";
import { getAllUsers, userActionById } from '../controller/user.controller.js'
import { uploadSingleFile, handleProfileImgUpload } from "../middleware/upload.middleware.js";

const router = Router();

router.get('/', getAllUsers)



router.get('/:id', userActionById);
router.put('/:id', userActionById);
router.delete('/:id', userActionById);


router.post('/upload/:id',
    uploadSingleFile,
    handleProfileImgUpload,
    (req, res, next) => {
        req.method = 'PUT'
        userActionById(req, res, next);
    }

);

export default router