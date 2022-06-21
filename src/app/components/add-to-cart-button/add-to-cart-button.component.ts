import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users-services';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss']
})
export class AddToCartButtonComponent implements OnInit {
  @Input() book!: Book;
  currentUser: User|null = null;
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
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
    this.userService.addToCart(book, 1);
  }

}
