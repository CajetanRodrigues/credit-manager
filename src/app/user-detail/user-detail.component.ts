import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from '../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  idFrom : any;
  idTo : any;
  amount : any;
   private user : User;
   private users : User[];
   id : any;
  constructor(private usersService : UsersService,
    private route: ActivatedRoute,
    private router : Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
     this.id = +this.route.snapshot.paramMap.get('id');
  this.usersService.getUser(this.id).subscribe(
    (userObj : User) => {
      this.user =userObj;
    }
  );
  this.usersService.getUsers().subscribe(
    (usersArray : User[]) => { 
      this.users = usersArray.filter(item => item.id!=this.id);
    }
  );
  }
  navigate(){
    this.usersService.transferAmount(this.user.id,this.idTo,this.amount).subscribe((result : any) => {
      this.openSnackBar(result,"Close")
    })
    this.router.navigateByUrl('', {skipLocationChange: true}).then(()=>
  this.router.navigate(["user-detail/"+this.id])); 
    this.reset();
     
  }
  navigateHome(){
this.router.navigate([""]);
  }
  reset(){
    this.amount = "";
    this.idTo = "";
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
