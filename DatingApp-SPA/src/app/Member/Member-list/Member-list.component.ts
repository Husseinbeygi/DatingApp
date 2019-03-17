import { Component, OnInit } from "@angular/core";
import { User } from "../../_model/User";
import { UserService } from "../../_services/User.service";
import { AlertifyService } from "../../_services/alertify.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-Member-list",
  templateUrl: "./Member-list.component.html",
  styleUrls: ["./Member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(
    private userservice: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  LoadUsers() {
    this.userservice.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
