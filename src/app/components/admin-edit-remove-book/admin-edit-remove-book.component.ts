import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { BookService } from 'src/app/services/book-services';
import { UsersService } from 'src/app/services/users-services';

@Component({
  selector: 'app-admin-edit-remove-book',
  templateUrl: './admin-edit-remove-book.component.html',
  styleUrls: ['./admin-edit-remove-book.component.scss']
})
export class AdminEditRemoveBookComponent implements OnInit {

  books : Book[] = [];
  filteredResults : Book[] = [];
  users : User[] = [];
  bookId : string|null = null;
  bookName: string|null = null;
  displayModal: boolean = false;

  constructor(private bookService: BookService,private usersService: UsersService, private router:Router) { }

  ngOnInit(): void {
    this.bookService.booksData.subscribe((books)=>{
      this.books = books;
    })
    this.books = this.bookService.books;

    this.usersService.userData.subscribe((users)=>{
      this.users = users;
    })
    this.users = this.usersService.users;
  }

  updateBookName(bookName: string){
    if(bookName === ""){
      this.bookName = null;
      return;
    }
    this.bookName = bookName;
  }

  updateBookId(bookId: string){
    if(bookId === ""){
      this.bookId = null;
      return;
    }
    this.bookId = bookId;
  }

  filterBookResults(){
    let inserted: boolean = false;
    this.filteredResults = [];

    for(let book of this.books){
      inserted = false;
      if(this.bookId !== null && String(book.bookId).includes(this.bookId)){
        this.filteredResults.push(book);
        inserted = true;
      }

      if(!inserted && this.bookName !== null && book.bookName.includes(this.bookName)){
        this.filteredResults.push(book);
      }
    }
  }

  onYesClick() {

  }

  onNoClick(){

  }
}
