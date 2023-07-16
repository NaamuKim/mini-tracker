const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// AWS S3 객체를 생성합니다.
const s3 = new AWS.S3({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

// 업로드할 디렉토리 경로입니다.
const directoryPath = path.join(__dirname, "dist");

// 디렉토리의 모든 파일을 읽습니다.
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    throw new Error(`Could not list the files: ${err}`);
  }

  // 각 파일을 S3 버킷에 업로드합니다.
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // 파일 스트림을 생성합니다.
    const fileStream = fs.createReadStream(filePath);

    // S3 업로드 파라미터를 설정합니다.
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: fileStream,
      Key: file,
    };

    // 파일을 S3에 업로드합니다.
    s3.upload(uploadParams, (err) => {
      if (err) {
        console.log(`Upload error: ${err}`);
      }
    });
  });
});
