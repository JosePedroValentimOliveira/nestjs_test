import { Schema, model, Types } from 'mongoose';
interface Book {
  book_title: string;
  lnk_author_id: Types.ObjectId;
}
const BookSchema = new Schema<Book>({
  book_title: { type: String, required: true },
  lnk_author_id: { type: Types.ObjectId, required: true },
});
export const BookModel = model('Book', BookSchema, 'Books');
