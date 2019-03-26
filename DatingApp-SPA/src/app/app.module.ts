import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from "./app.component";
import { NavComponent } from "./Nav/Nav.component";
import { AuthService } from "./_services/auth.service";
import { HomeComponent } from "./Home/Home.component";
import { RegisterComponent } from "./Register/Register.component";
import { AlertifyService } from "./_services/alertify.service";
import { ErrorInterceptorProvider } from "./_services/error.interceptor";
import { MemberListComponent } from "./Member/Member-list/Member-list.component";
import { ListsComponent } from "./Lists/Lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { AppRoutingModule } from "./routes";
import { AuthGuard } from "./_guards/auth.guard";
import { UserService } from "./_services/User.service";
import { MemberCardComponent } from "./Member/member-card/member-card.component";
import { MemberDetailComponent } from './Member/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolves/member.detail.resolver';
import { MemberListResolver } from './_resolves/member.list.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './Member/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolves/member.edit.resolver';
import { PreventUnsavedChanged } from './_guards/prevent-unsaved-changed.guard';

export function TokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    JwtModule.forRoot({
       config:{
          tokenGetter:TokenGetter,
          whitelistedDomains:['localhost:5000'],
          blacklistedRoutes:['localhost:5000/api/auth']

       }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanged,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
