import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
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
  emptyCart: boolean = true;
  maxQuantity: number = 10;
  quantityArray : number[]= [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe((user)=>{
      this.currentLoggedUser = user;
    })

    this.currentLoggedUser = this.userService.currentUser;

    if (this.currentLoggedUser !== null){
      if(this.currentLoggedUser.cart.items.length !== 0)
        this.emptyCart = false;
    }

    for(let i = 0; i <= this.maxQuantity; i++){
      this.quantityArray.push(i);
    }
  }
  onQuantityChange(cartItem: CartItem, quantitiy: number){
    console.log("quantitiy selected = " + quantitiy);
  }
}

