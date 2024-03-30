import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { Product } from '../model/productModel.js';

const storage = multer.diskStorage({
    destination: async function (req, images, cb) {
        const productID = req.params.pid;
        const productName = req.body.name;
        // When update, if there is a change in the product's name, rename the product's upload folder's name either
        console.log(images)
        if(productID){
            const product = await Product.findById(productID);
            if(!product) {
                return cb({ message: 'Product is not found'});
            }
            if(req.body.name !== product.name){
                const oldUploadPath = path.join('./public/uploads/' + product.name);
                const newUploadPath = path.join('./public/uploads/' + productName);
                if (fs.existsSync(oldUploadPath)) {
                    fs.renameSync(oldUploadPath, newUploadPath)
                };
            }
        }

        // Create a new product's images directory if it doesn't already exist
        const uploadPath = path.join('./public/uploads/' + productName);
        if (!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath);
        }
        
        // Find all the images thats not included in the form-data and delete them
        req.body.images = req.body.images || [];

        const existingImages = fs.readdirSync(uploadPath);
        const imagesToDelete = existingImages.filter((image) => 
            !req.body.images.includes(image)
        );
        imagesToDelete.forEach((image) => {
            const imagePath = path.join(uploadPath, image);
            fs.unlinkSync(imagePath);
            // console.log(`Deleted: ${image}`);
        });
        cb(null, './public/uploads/' + req.body.name);
    },
    filename: function (req, images, cb) {
        const filename = images.originalname;
        req.body.images.push(filename); 
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });
export default upload;
