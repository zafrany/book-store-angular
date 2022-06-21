import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { BookService } from 'src/app/services/book-services';
import { UsersService } from 'src/app/services/users-services';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  book: Book|null = null;
  bookId!: string|null;
  currentUser: User|null = null;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.bookId =  params.get('bookId');
    })

    this.book = this.bookService.getBookById(parseInt(this.bookId!));

    this.route.queryParams.subscribe(params=>{
      if(this.book?.bookName !== params['BookName'])
        this.router.navigate(['page-not-found/']);
    })

    this.userService.currentUserData.subscribe((user)=>{
      this.currentUser = user;
    })
    this.currentUser = this.userService.currentUser;
  }
}
