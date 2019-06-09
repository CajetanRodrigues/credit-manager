import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  earlier = [1,2,3,4,5]
  recent = [1,2,3,4,5]
  arrNumber:number[]=[];
  private users : any[];
  constructor(private snackBar: MatSnackBar, private usersService : UsersService, private router : Router) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      usersArray => { 
        this.users = usersArray;
        console.log(this.users);
      }
    );
   
  }

  deleteEarlierNotification(i : number){
    this.earlier.splice(i,1);
    this.openSnackBar("Successfully deleted !","Close");
  }
  deleteRecentNotification(i : number){
    this.recent.splice(i,1);
    this.openSnackBar("Successfully deleted !","Close");
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  navigate(id : number){
    console.log(id);
    this.router.navigate(["user-detail/"+id])
  }
}
