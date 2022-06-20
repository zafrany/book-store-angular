import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book-services';

@Component({
  selector: 'app-admin-add-book',
  templateUrl: './admin-add-book.component.html',
  styleUrls: ['./admin-add-book.component.scss']
})
export class AdminAddBookComponent implements OnInit {

  books : Book[] = [];
  addBookForm!: FormGroup;
  operationSuccess : boolean = false;

  constructor(private fb: FormBuilder, private bookService: BookService, private router:Router) { }

  ngOnInit(): void {
    this.bookService.booksData.subscribe((books)=>{
      this.books = books;
    })
    this.books = this.bookService.books;

    this.addBookForm = this.fb.group({
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
      if(book.bookId === newBookId){
        return {'idNotUnique' : true};
      }
    }
    return null;
  }

  idNotUniqueMessage() {
    if(this.addBookForm.errors?.['idNotUnique'])
      return "new Id already exists for a diffent product."
    return null;
  }

  onSubmitAddBookForm(){
    this.operationSuccess = false;
    let newBook: Book = {
      bookId: parseInt(this.addBookForm.get('bookId')!.value),
      bookName: this.addBookForm.get('bookName')!.value,
      bookPictureLink: this.addBookForm.get('bookPicLink')!.value,
    }
    this.operationSuccess = true;
    this.bookService.addBook(newBook);
  }

  removeSuccessMessage() {
    this.operationSuccess = false;
  }

  dashboardNavigate() {
    this.router.navigate(['admin/managment']);
  }
}
