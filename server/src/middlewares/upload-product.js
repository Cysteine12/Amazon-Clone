const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId
})

const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'amazon-clone-s3',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, 'products/' + Date.now().toString() + file.originalname)
      }
    }),
    limits: { fileSize: 1024 * 1024 * 3 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
          cb(null, true)
      } else {
          cb(null, false)
      }
  }
  })

  module.exports = upload