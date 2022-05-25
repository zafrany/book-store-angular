import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book-services';

@Component({
  selector: 'app-book-display-card',
  templateUrl: './book-display-card.component.html',
  styleUrls: ['./book-display-card.component.scss']
})
export class BookDisplayCardComponent implements OnInit {

  books!: Book[];
  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.books = this.bookService.books;
  }

}
