import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-display-card',
  templateUrl: './book-display-card.component.html',
  styleUrls: ['./book-display-card.component.scss']
})
export class BookDisplayCardComponent implements OnInit {

  books!: Book;
  constructor() {
  }

  ngOnInit(): void {
  }

}
