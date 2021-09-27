import { Injectable } from "@nestjs/common";
import * as Minio from "minio";
import { HandleError } from "src/common/error.response";
import { storageConfig } from "src/config/base.config";
import * as fs from "fs";

@Injectable()
export class PublicFileService {
  private bucket: string;
  private minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: storageConfig.endPoint,
      useSSL: true,
      accessKey: storageConfig.accessKey,
      secretKey: storageConfig.secretKey,
    });
    this.bucket = storageConfig.bucket;
    this.minioClient.makeBucket(this.bucket, "ap-southeast-1", (err: any) => {
      if (err) {
        console.log("Storage Error Code:", err.code);
      }
      return;
    });
  }

  async uploadFromLocal(filepath: string, fileName: string) {
    const file = fs.readFileSync(filepath);
    try {
      await this.minioClient.putObject(this.bucket, fileName, file);
      return {
        name: fileName,
        src: `https://${storageConfig.endPoint}/${storageConfig.bucket}/${fileName}`,
      };
    } catch (error) {
      return HandleError(error);
    }
  }

  async upload(file) {
    const filename = file.originalname.toString();
    try {
      await this.minioClient.putObject(this.bucket, filename, file.buffer);
      return {
        name: filename,
        src: `https://${storageConfig.endPoint}/${storageConfig.bucket}/${filename}`,
      };
    } catch (error) {
      return HandleError(error);
    }
  }
}
