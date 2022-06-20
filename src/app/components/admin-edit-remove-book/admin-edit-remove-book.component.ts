import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  displayEditBookModal: boolean = false;
  currentItem: Book|null = null;
  editDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService,private usersService: UsersService, private router:Router) { }

  ngOnInit(): void {
    this.bookService.booksData.subscribe((books)=>{
      this.books = books;
    })
    this.books = this.bookService.books;

    this.usersService.userData.subscribe((users)=>{
      this.users = users;
    })
    this.users = this.usersService.users;

    this.editDetailsForm = this.fb.group({
      bookId: ['', [Validators.required]],
      bookName: ['', [Validators.required]],
      bookPicLink: ['', [Validators.required]],
    },
    {
      validators: [this.idIsUniqueVlidator.bind(this)]
    }
    );
  }

  idIsUniqueVlidator(control: AbstractControl) : ValidationErrors|null{
    const newBookId: number = parseInt(control.get('bookId')?.value);
    for(let book of this.books){
      if(this.currentItem !== book && book.bookId === newBookId){
        return {'idNotUnique' : true};
      }
    }
    return null;
  }

  idNotUniqueMessage() {
    if(this.editDetailsForm.errors?.['idNotUnique'])
      return "new Id already exists for a diffent product."
    return null;
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

  onRemoveClick(book: Book) {
    this.currentItem = book;
    this.displayModal = true;
  }

  onYesClick() {
    this.displayModal = false;
    this.bookService.removeBook(this.currentItem!);
    for(let user of this.users){
      for(let item of user.cart.items)
      {
        if(item.item.bookId === this.currentItem!.bookId)
        this.usersService.changeItemQuantity(item, 0);
      }
    }
  }

  onNoClick(){
    this.displayModal = false;
  }

  onUpdateBookClick(book: Book){
    this.currentItem = book;
    this.displayEditBookModal = true;
    this.editDetailsForm.controls['bookId'].setValue(this.currentItem.bookId);
    this.editDetailsForm.controls['bookName'].setValue(this.currentItem.bookName);
    this.editDetailsForm.controls['bookPicLink'].setValue(this.currentItem.bookPictureLink);
  }

  onSubmitEditForm(){
    this.currentItem!.bookId = parseInt(this.editDetailsForm.get('bookId')!.value);
    this.currentItem!.bookName = this.editDetailsForm.get('bookName')!.value;
    this.currentItem!.bookPictureLink = this.editDetailsForm.get('bookPicLink')!.value;
    this.displayEditBookModal = false;
  }

  cancelUpdate(){
    this.displayEditBookModal = false;
  }

  dashboardNavigate() {
    this.router.navigate(['admin/managment']);
  }
}
