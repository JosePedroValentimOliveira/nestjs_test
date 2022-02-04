import { Injectable } from '@nestjs/common';
import { AuthorModel } from '../models/author.model';

import { Types } from 'mongoose';
const responseObj = { code: null, object: null };
@Injectable()
export class AuthorService {
  async createAuthor(author_name: string): Promise<responseObj> {
    try {
      const authorCheck = await AuthorModel.findOne({
        author_name: author_name,
      });
      if (authorCheck) {
        responseObj.code = 401;
        responseObj.object = { error: 'Author already exists' };
      } else {
        const newAuthor = new AuthorModel({
          author_name: author_name,
        });
        responseObj.code = 201;
        responseObj.object = await newAuthor.save();
      }
    } catch (error) {
      responseObj.code = 500;
      responseObj.object = error;
    }

    return responseObj;
  }

  async updateAuthor(
    author_name: string,
    author_id: Types.ObjectId,
  ): Promise<responseObj> {
    try {
      const nameCheck = await AuthorModel.findOne({ author_name: author_name });
      if (!Types.ObjectId.isValid(author_id)) {
        responseObj.code = 404;
        responseObj.object = { error: 'Author not found.' };
      } else if (nameCheck) {
        responseObj.code = 401;
        responseObj.object = { error: 'Author already exists' };
      } else {
        const authorCheck = await AuthorModel.findById(author_id);
        if (authorCheck) {
          //possible extra check to see if the name is the same
          responseObj.code = 200;
          responseObj.object = await AuthorModel.findByIdAndUpdate(
            author_id,
            {
              author_name: author_name,
            },
            { new: true },
          );
        } else {
          responseObj.code = 404;
          responseObj.object = { error: 'Author not found.' };
        }
      }
    } catch (error) {
      responseObj.code = 500;
      responseObj.object = error;
    }

    return responseObj;
  }

  async deleteAuthor(author_id: Types.ObjectId): Promise<responseObj> {
    try {
      await AuthorModel.findByIdAndDelete(author_id);
      responseObj.code = 200;
      responseObj.object = { message: 'Succesful delete.' };
    } catch (error) {
      responseObj.code = 500;
      responseObj.object = error;
    }
    return responseObj;
  }
}
