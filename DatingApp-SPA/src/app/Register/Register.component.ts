import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
@Output() cancelregister = new EventEmitter();
  constructor(private authservice: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authservice.register(this.model).subscribe(x => {
      this.alertify.success('register successful');
    }, error => {
      this.alertify.error(error);
    });
  }

  cancle() {
    this.cancelregister.emit(false);
  }
}
