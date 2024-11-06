import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import * as mysql from 'mysql2'


@Injectable()
export class BooksService {
  
  books: Book[] = [
    {
      id: 1,
      title: 'Winnie the Pooh',
      author: 'A.A. Milne',
      isbn: '0142404675',
      publishYear: 2001,
      reserved: true,
    },
    {
      id: 2,
      title: 'Winnie the Pooh 2 - More Pooh',
      author: 'A.A. Milne',
      isbn: '1142404675',
      publishYear: 2005,
      reserved: false,
    },
    {
      id: 4,
      title: 'Test Book',
      author: 'A.A. Milne',
      isbn: '9788175257665',
      publishYear: 1980,
      reserved: false,
    },
  ];
  nextId = 5;
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
  });
  create(createBookDto: CreateBookDto) {
    const newBook = {
      ...createBookDto,
      id: this.nextId,
      reserved: false,
    };
    this.books.push(newBook);
    this.nextId++;
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find(book => book.id == id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const index = this.books.findIndex(book => book.id == id);
    if (index == -1) return undefined;

    const newBook = {
      ...this.books[index],
      ...updateBookDto,
    }

    this.books[index] = newBook;

    return newBook;
  }

  remove(id: number) {
    const index = this.books.findIndex(book => book.id == id);
    if (index == -1) {
      return false;
    }

    this.books.splice(index, 1);
    return true;
  }
}
