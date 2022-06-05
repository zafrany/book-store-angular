import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-display-card',
  templateUrl: './book-display-card.component.html',
  styleUrls: ['./book-display-card.component.scss']
})
export class BookDisplayCardComponent implements OnInit {
  @Input() book!: Book;
  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }

  onBookImgClick(bookId: number, bookName: string){
    this.router.navigate(['products/'], { queryParams: { BookId: bookId, BookName: bookName }});
  }
}
