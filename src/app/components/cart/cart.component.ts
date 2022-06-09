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

    for(let i = 0; i <= this.maxQuantity; i++){
      this.quantityArray.push(i);
    }
  }
  onQuantityChange(cartItem: CartItem, selectionEvent: Event){
    const quantity = selectionEvent.target as HTMLInputElement;
    this.currentItem = cartItem;

    if(parseInt(quantity.value) !== 0)
      this.userService.changeItemQuantity(cartItem, parseInt(quantity.value));
    else
      this.displayModal = true;
  }

  onYesClick(){
    this.displayModal = false;
    this.userService.changeItemQuantity(this.currentItem, 0);
    if(this.currentLoggedUser?.cart.items.length === 0)
        this.emptyCart = true;

  }

  onNoClick(){
    this.displayModal = false;
    this.reloadComponent();
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}

