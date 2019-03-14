import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  canActivate(): boolean {
    if (this.auth.LogedIn()) {
      return true;
    }

    this.alertify.error("Please Login or Register!!!!");
    this.router.navigate(["/home"]);
    return false;
  }
}
