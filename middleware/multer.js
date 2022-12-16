const { Router } = require("express")
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage(
    {
        destination:function(req, file, cb){
            const _dir = path.join(__dirname, "../public/uploads")
            cb(null, _dir)
        },
        filename:function(req, file, cb){
            const fileName = file.originalname.toLowerCase()
            cb(null, fileName)
        }
    }

)

const upload = multer({storage})

module.exports = upload