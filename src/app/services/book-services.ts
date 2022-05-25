import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "../models/book.model";

@Injectable()
export class BookService {
  private _books: Book[] = [
    {
      bookId : 1,
      bookName: 'book1',
      bookPictureLink: 'book1PicLink'
    },

    {
      bookId : 2,
      bookName: 'book2',
      bookPictureLink: 'book2PicLink'
    },

    {
      bookId : 3,
      bookName: 'book3',
      bookPictureLink: 'book3PicLink'
    },

    {
      bookId : 4,
      bookName: 'book4',
      bookPictureLink: 'book4PicLink'
    },
  ]

  private _bookSubject = new Subject<Book[]> ();
  booksData = this._bookSubject.asObservable();

  get books() {
    return{...this._books};
  }
}
