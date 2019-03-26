import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { MemberEditComponent } from "../Member/member-edit/member-edit.component";

@Injectable()
export class PreventUnsavedChanged implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
      return confirm("You Have Unsaved Changes.Are You Sure?");
    }
    return true;
  }
}
