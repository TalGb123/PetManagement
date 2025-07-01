import multer from "multer";
import path from 'path';
import fs from 'fs';

import { createLogger } from "../utils/logger.js";

const logger = createLogger('upload middleware');

// //לטפל בהעלאה של הקובץ בשמירה שלו ויצירת קישור לקובץ 

// לייצר תיקיית uploads
const uploadsDir = 'uploads/';

if(!fs.existsSync(uploadsDir))
{
    fs.mkdirSync(uploadsDir,{recursive:true});
    logger.info(`Uploads directory created at ${uploadsDir}`);
}


//לקבוע איפה יישמרו 
const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,uploadsDir),
    filename: (req,file,cb) => {
        const uniqueFileName = Date.now() + path.extname(file.originalname)
        cb(null,uniqueFileName);
    }
})



// פונקציית סינון קבצים - רק תמונות
const filterFiles = (req,file,cb) =>{
    file.mimetype.startsWith('image/')
    ? cb(null,true) 
    : cb(new Error ('Only image allowed'),false)

}

// ליצור אובייקט של העלאה 

const upload = multer({
    storage,
    fileFilter: filterFiles,
    limits:{fileSize : 10 * 1024 * 1024}
})
//ייצוא פונקציית העלאת התמונה 

export const uploadSingleFile = upload.single('profileImage')


// עיבוד והכנת הנתונים כולל תשובה אם ישנה שגיאה 
export const handleProfileImgUpload  = (req,res,next) => {
    logger.info('handleProfileImgUpload middleware is processing the uploaded file');
    if(!req.file)
        return res.status(400).json({
            message: 'No file uploaded or file is not an image',
            error:'Image required'
        })
    
    logger.info(`File uploaded successfully: ${req.file.filename}`);
    const filePath = path.join(uploadsDir, req.file.filename);
    logger.info(`File path set to: ${filePath}`);
    req.body.profileImage = filePath;
    logger.info('Profile image path added to request body');
    next();
};

