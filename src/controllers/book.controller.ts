import { Body, Controller, Delete, Get, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { BookService } from '../services/book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookservice: BookService) {}

  @Post()
  async createBook(
    @Body() body: { book_title: string; author_id: Types.ObjectId },
    @Res() response: Response,
  ): Promise<any> {
    const { book_title, author_id } = body;
    const { code, object } = await this.bookservice.createBook(
      book_title,
      author_id,
    );
    return response.status(code).send(object);
  }

  @Get()
  async getBooks(@Res() response: Response): Promise<any> {
    const { code, object } = await this.bookservice.getBooks();
    return response.status(code).send(object);
  }
  @Put()
  async updateBook(
    @Body() body: { book_title: string; book_id: Types.ObjectId },
    @Res() response: Response,
  ): Promise<any> {
    const { book_title, book_id } = body;
    const { code, object } = await this.bookservice.updateBook(
      book_title,
      book_id,
    );
    return response.status(code).send(object);
  }

  @Delete()
  async deleteBook(
    @Body() body: { book_id: Types.ObjectId },
    @Res() response: Response,
  ): Promise<any> {
    const { book_id } = body;
    const { code, object } = await this.bookservice.deleteBook(book_id);
    return response.status(code).send(object);
  }
}
