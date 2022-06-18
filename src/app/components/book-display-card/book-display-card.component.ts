import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-display-card',
  template: `<div class="storefront-container">
    <div class="card">
      <img src={{book.bookPictureLink}} class="picture-flex-container" (click)="onBookImgClick(book.bookId, book.bookName)">
      <div>{{book.bookName}}</div>
      <div>Product ID: {{book.bookId}}</div>
      <ng-content></ng-content>
    </div>
  </div>`,

  styleUrls: ['./book-display-card.component.scss']
})
export class BookDisplayCardComponent implements OnInit {
  @Input() book!: Book;
  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }

  onBookImgClick(bookId: number, bookName: string){
    if(this.router.url.includes('admin'))
      return;
    this.router.navigate(['products/', this.book.bookId], { queryParams: {BookName: bookName }});
  }
}
