import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  RegisterMode = false;
  values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  registertogle() {
    this.RegisterMode = true;
  }
  cancelregister(registermode: boolean) {
this.RegisterMode = registermode;
  }
}
