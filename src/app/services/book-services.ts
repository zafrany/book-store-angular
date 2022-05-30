import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "../models/book.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _books: Book[] = [
    {
      bookId : 1,
      bookName: 'book1',
      bookPictureLink: '../assets/images/book-covers/SH_Vol_1.png',
    },

    {
      bookId : 2,
      bookName: 'book2',
      bookPictureLink: '../assets/images/book-covers/SH_Vol_2.png',
    },

    {
      bookId : 3,
      bookName: 'book3',
      bookPictureLink: '../assets/images/book-covers/SH_Vol_3.png',
    },

    {
      bookId : 4,
      bookName: 'book4',
      bookPictureLink: '../assets/images/book-covers/SH_Vol_4.png',
    },
  ]

  private _bookSubject = new Subject<Book[]> ();
  booksData = this._bookSubject.asObservable();

  get books() {
    return [...this._books];
  }
}
