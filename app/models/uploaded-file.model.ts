import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UploadedFile extends Document {
  data: string;
}

const UploadedFileSchema: Schema = new Schema({
  data: { type: String, required: true },
});

const FileUploaded: Model<UploadedFile> =
  mongoose.models.Product ||
  mongoose.model<UploadedFile>('files', UploadedFileSchema);

export default FileUploaded;
