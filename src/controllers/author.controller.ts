import { Body, Controller, Delete, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import { AuthorService } from '../services/author.service';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorservice: AuthorService) {}

  @Post()
  async createAuthor(
    @Body() body: { author_name: string },
    @Res() response: Response,
  ): Promise<any> {
    const { author_name } = body;
    const { code, object } = await this.authorservice.createAuthor(author_name);
    return response.status(code).send(object);
  }

  @Put()
  async updateAuthor(
    @Body() body: { author_name: string; author_id: Types.ObjectId },
    @Res() response: Response,
  ): Promise<any> {
    const { author_name, author_id } = body;
    const { code, object } = await this.authorservice.updateAuthor(
      author_name,
      author_id,
    );
    return response.status(code).send(object);
  }
  @Delete()
  async deleteAuthor(
    @Body() body: { author_id: Types.ObjectId },
    @Res() response: Response,
  ): Promise<any> {
    const { author_id } = body;
    const { code, object } = await this.authorservice.deleteAuthor(author_id);
    return response.status(code).send(object);
  }
}
