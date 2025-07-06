import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RolService} from '../../../../core/services/rol.service';
import {AuthService} from '../../../../features/auth/services/auth.service';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import {User} from '../../../../features/auth/models/user.model';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [
    Card,
    PrimeTemplate
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit  {

  router = inject(Router);
  roleService= inject(RolService);
  authService= inject(AuthService);

  currentUser: User | null | undefined;
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadMenuItems();
  }

  private loadMenuItems(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const allItems = this.roleService.getMenuItems(currentUser.role);

    this.menuItems = allItems
      .filter((item, index) => index !== 0 && item.label !== 'Salir')
      .map(item => ({
        ...item,
        command: item.routerLink ? () => this.router.navigate([item.routerLink]) : undefined
      }));
  }

  navigateTo(routerLink: string | undefined): void {
    if (routerLink) {
      this.router.navigate([routerLink]);
    }
  }

  getRandomCount(): number {
    return Math.floor(Math.random() * 100000);
  }






}
