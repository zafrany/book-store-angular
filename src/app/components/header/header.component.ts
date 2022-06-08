import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users-services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLogged: boolean = false;
  userName: string = "";
  currentUser: User| null = null;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe((currentUser)=>{
      this.currentUser = currentUser;
      if(this.currentUser !== null){
        this.userLogged = true;
      }
    })
    this.currentUser = this.userService.currentUser;
  }

  onLogout(){
    this.userLogged = false;
    this.userService.logoutUser();
  }
}
