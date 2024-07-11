import multer from "multer";

const storage= multer.diskStorage({
    destination: (req, file, callback)=>{
        const pathDocument="./imagenes";
        callback(null,pathDocument)
 }
 ,
 filename:(req,file,callback)=>{
 const ext=file.originalname.split(".").pop();
 const filename=`img-${Date.now()}.${ext}`
 callback(null, filename)
 },
})

export const upload=multer ({storage});