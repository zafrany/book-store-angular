import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book-services';

@Component({
  selector: 'app-storefront-display',
  templateUrl: './storefront-display.component.html',
  styleUrls: ['./storefront-display.component.scss']
})
export class StorefrontDisplayComponent implements OnInit {

  books: Book[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.booksData.subscribe((books)=>{
      this.books = books;
    })
    this.books = this.bookService.books;
  }

}
