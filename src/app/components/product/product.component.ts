import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book-services';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  books!: Book[];
  book: Book|null = null;
  bookId!: string|null;
  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

    this.bookService.booksData.subscribe((books)=>{
      this.books = books;
    })
    this.books = this.bookService.books;

    this.route.paramMap.subscribe(params=>{
      this.bookId =  params.get('bookId');
    })

    this.route.queryParams.subscribe(params=>{
      for(let book of this.books){
        if(book.bookId === parseInt(<string>this.bookId) && book.bookName === params['BookName'])
          this.book = book;
      }
      if (this.book === null)
        this.router.navigate(['page-not-found/']);
    })
  }
}
