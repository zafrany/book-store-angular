import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users-services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit
{
  currentLoggedUser: User|null = null;
  books: Book[] = [];
  emptyCart: boolean = true;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe((user)=>{
      this.currentLoggedUser = user;
    })

    this.currentLoggedUser = this.userService.currentUser;

    if (this.currentLoggedUser !== null){
      for(let cartItem of this.currentLoggedUser?.cart.items!){
        this.books?.push(cartItem.item);
      }
      console.log("length of arr =" + this.books.length);
      if(this.books.length !== 0)
        this.emptyCart = false;
    }
  }
}
