import axios from 'axios';

const uploadImage = async (image) => {
    try {
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "mern_product"); 

        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data; 
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error; 
    }
};

export default uploadImage;
