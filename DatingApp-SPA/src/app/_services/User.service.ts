import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../_model/User";


@Injectable({
  providedIn: "root"
})
export class UserService {
  baseurl = environment.apiurl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + "users");
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseurl + "users/" + id);
  }
}
