import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { User } from "src/app/_model/User";
import { ActivatedRoute } from "@angular/router";
import { AlertifyService } from "src/app/_services/alertify.service";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/_services/User.service";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild("editForm") editForm: NgForm;
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userservcies: UserService,
    private Authservices: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(x => {
      this.user = x["user"];
    });
  }

  UpdateUser() {
    this.userservcies
      .UpdateUser(this.Authservices.decodedToken.nameid, this.user)
      .subscribe(
        x => {
          this.alertify.success("Profile Updated Successfully");
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
