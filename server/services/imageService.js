import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = ({ buffer }) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "collection-showcase" },
            (error, result) => {
                if (error) return reject(error);
                resolve({ Location: result.secure_url, publicId: result.public_id });
            }
        );
        stream.end(buffer);
    });
};

export const deleteImage = async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
};