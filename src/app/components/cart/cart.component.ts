import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  displayModal: boolean = false;
  currentItem!: CartItem;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe((user)=>{
      this.currentLoggedUser = user;
    })

    this.currentLoggedUser = this.userService.currentUser;

    if (this.currentLoggedUser !== null){
      if(this.currentLoggedUser.cart.items.length !== 0)
        this.emptyCart = false;
    }

    for(let i = 1; i <= this.maxQuantity; i++){
      this.quantityArray.push(i);
    }
  }
  onQuantityChange(cartItem: CartItem, selectionEvent: Event){
    const quantity = selectionEvent.target as HTMLInputElement;
    this.userService.changeItemQuantity(cartItem, parseInt(quantity.value));
  }

  onRemoveClick(cartItem: CartItem){
    this.displayModal = true;
    this.currentItem = cartItem;
  }

  onYesClick(){
    this.displayModal = false;
    this.userService.changeItemQuantity(this.currentItem, 0);
    if(this.currentLoggedUser?.cart.items.length === 0)
        this.emptyCart = true;

  }

  onNoClick(){
    this.displayModal = false;
  }
}

