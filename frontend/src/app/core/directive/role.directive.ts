import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {UserRole} from '../../features/auth/models/user.model';
import {RoleService} from '../services/rol.service';


@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {
  private hasView = false;

  @Input() set appRole(roles: UserRole[]) {
    const hasRole = this.roleService.hasAnyRole(roles);

    if (hasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private roleService: RoleService
  ) {}
}
