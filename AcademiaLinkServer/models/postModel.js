import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String, // URL of the image
    required: false,
  },
  pdf: {
    type: String, // URL of the PDF
    required: false,
  },
}, { timestamps: true });

export const Post = model('Post', postSchema);
