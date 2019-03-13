import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component ({
  // tslint:disable-next-line:component-selector
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {
  Model: any = {};

  constructor(public authservice: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

login() {
this.authservice.login(this.Model).subscribe(x => {
  this.alertify.success('Logged in Successfully');
}, error => {
  this.alertify.error('Failed to login');
});
}

LogedIn() {
return this.authservice.LogedIn();
}


logout() {
  localStorage.removeItem('token');
  this.alertify.message('logged out!');
}
}
