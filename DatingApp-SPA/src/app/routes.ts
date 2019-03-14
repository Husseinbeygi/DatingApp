import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./Home/Home.component";
import { MemberListComponent } from "./Member-list/Member-list.component";
import { ListsComponent } from "./Lists/Lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },

  {
    
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent },
      { path: "list", component: ListsComponent },
      { path: "messages", component: MessagesComponent }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
