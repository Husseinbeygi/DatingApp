import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component ({
  // tslint:disable-next-line:component-selector
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {
  Model: any = {};

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

login() {
this.authservice.login(this.Model).subscribe(x => {
  console.log('Logged in Successfully');
}, error => {
  console.log('Failed to login');
});
}

LogedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}


logout() {
  localStorage.removeItem('token');
  console.log('logged out!');
}
}
