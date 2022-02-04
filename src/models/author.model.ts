import { Schema, model } from 'mongoose';
interface Author {
  author_name: string;
}
const AuthorSchema = new Schema<Author>({
  author_name: { type: String, required: true },
});
export const AuthorModel = model('Author', AuthorSchema, 'Authors');
