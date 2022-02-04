import { Injectable } from '@nestjs/common';
import { BookModel } from '../models/books.model';
import { AuthorModel } from '../models/author.model';
import { Types } from 'mongoose';

const responseObj = { code: null, object: null };
@Injectable()
export class BookService {
  async createBook(
    title: string,
    author_id: Types.ObjectId,
  ): Promise<responseObj> {
    try {
      const newBook = new BookModel({
        book_title: title,
        lnk_author_id: author_id,
      });

      const bookcheck = await BookModel.findOne({ book_title: title });
      const authorCheck = await AuthorModel.findById(author_id);

      if (bookcheck) {
        responseObj.code = 401;
        responseObj.object = { error: 'Book already registered.' };
        return responseObj;
      } else if (!authorCheck) {
        responseObj.code = 404;
        responseObj.object = { error: 'Author not found.' };
        return responseObj;
      }

      responseObj.code = 201;
      responseObj.object = await newBook.save();
    } catch (error) {
      responseObj.code = 500;
      responseObj.object = error;
    }
    return responseObj;
  }

  async getBooks(): Promise<responseObj> {
    try {
      const collection: { title: string; author: { name: string } }[] = [];
      const authors: { author_id: string; name: string }[] = [];

      const books = await BookModel.find();
      for (const book of books) {
        const bookObj: { title: string; author: { name: string } } = {
          title: book.book_title,
          author: { name: null },
        };

        const check = authors.filter((a) => {
          return a.author_id === book.lnk_author_id.toString();
        })[0];

        if (check) {
          bookObj.author = { name: check.name };
        } else {
          const author = await AuthorModel.findById(book.lnk_author_id);
          bookObj.author.name = author.author_name;
          authors.push({
            author_id: author._id.toString(),
            name: author.author_name,
          });
        }
        collection.push(bookObj);
      }
      responseObj.code = 200;
      responseObj.object = collection;
    } catch (error) {
      responseObj.code = 500;
      responseObj.object = error;
    }
    return responseObj;
  }

  async updateBook(
    book_title: string,
    book_id: Types.ObjectId,
  ): Promise<responseObj> {
    try {
      if (!Types.ObjectId.isValid(book_id)) {
        responseObj.code = 404;
        responseObj.object = { error: 'Book not found.' };
        return responseObj;
      }
      const bookCheck = await BookModel.findById(book_id);
      if (bookCheck) {
        //possible extra check to see if the name is the same
        responseObj.code = 200;
        responseObj.object = await BookModel.findByIdAndUpdate(
          book_id,
          {
            book_title: book_title,
          },
          { new: true },
        );
      } else {
        responseObj.code = 404;
        responseObj.object = { error: 'Book not found.' };
      }
    } catch (error) {
      responseObj.code = 500;
      responseObj.object = error;
    }
    return responseObj;
  }

  async deleteBook(book_id: Types.ObjectId): Promise<responseObj> {
    try {
      await BookModel.findByIdAndDelete(book_id);
      responseObj.code = 200;
      responseObj.object = { message: 'Succesful delete.' };
    } catch (error) {
      responseObj.code = 500;
      responseObj.object = error;
    }
    return responseObj;
  }
}
