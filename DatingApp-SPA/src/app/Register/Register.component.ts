import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
@Output() cancelregister = new EventEmitter();
  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authservice.register(this.model).subscribe(x => {
      console.log('register successful');
    }, error => {
      console.log(error);
    });
  }

  cancle() {
    this.cancelregister.emit(false);
  }
}
