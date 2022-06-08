import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { BookService } from 'src/app/services/book-services';
import { UsersService } from 'src/app/services/users-services';

@Component({
  selector: 'app-storefront-display',
  templateUrl: './storefront-display.component.html',
  styleUrls: ['./storefront-display.component.scss']
})
export class StorefrontDisplayComponent implements OnInit {

  books: Book[] = [];
  currentUser: User|null = null;
  constructor(private bookService: BookService, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.booksData.subscribe((books)=>{
      this.books = books;
    })
    this.books = this.bookService.books;

    this.userService.currentUserData.subscribe((user)=>{
      this.currentUser = user;
    })
    this.currentUser = this.userService.currentUser;
  }

  addToCartOnClick(book: Book) {
    if(this.currentUser === null){
      this.router.navigate(['login/']);
      return;
    }
    this.userService.addToCart(book, 1, this.currentUser);
  }
}
