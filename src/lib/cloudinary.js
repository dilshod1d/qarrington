import cloudinary from "cloudinary";
import DatauriParser from 'datauri/parser';
import path from 'path';


cloudinary.v2.config({
    cloud_name: process.env.CLD_NAME,
    api_key: process.env.CLD_API_KEY,
    api_secret: process.env.CLD_API_SECRET
})

const createImage = async (img) => {
    try {
        const parser = new DatauriParser();
        const base64Image = parser.format(path.extname(img.originalname).toString(), img.buffer);
        const uploadedImageResponse = await cloudinary.uploader.upload(base64Image.content, 'quarrington', { resource_type: 'image' });
        return uploadedImageResponse;
    }
    catch (err) {
        return err
    }
};

const createFile = async (file) => {
    try {
        const parser = new DatauriParser();
        const base64Image = parser.format(path.extname(file.originalname).toString(), file.buffer);
        const uploadedImageResponse = await cloudinary.uploader.upload(base64Image.content, 'quarrington', { resource_type: 'image' });
        return uploadedImageResponse;
    }
    catch (err) {
        return err
    }
};
export default cloudinary
export { createImage }