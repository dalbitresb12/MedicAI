import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { RolService } from '../../core/services/rol.service';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import {OverlayBadge} from 'primeng/overlaybadge';
import {Card} from 'primeng/card';
import {User} from '../auth/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterOutlet,
    ButtonModule,
    SidebarModule,
    TieredMenuModule,
    BadgeModule,
    TooltipModule,
    RippleModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems: MenuItem[] = [];
  profileMenuItems: MenuItem[] = [];
  sidebarCollapsed = false;
  currentUser: User | null | undefined;
  hoveredItem: string | null = null;

  constructor(
    public roleService: RolService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadMenuItems();
    this.setupProfileMenu();
  }

  private loadMenuItems(): void {
    if (!this.currentUser) return;

    this.menuItems = this.roleService.getMenuItems(this.currentUser.role).map(item => {
      // Ítems sin routerLink (como separadores) se devuelven sin cambios
      if (!item.routerLink) return item;

      return {
        ...item,
        command: () => this.router.navigate([item.routerLink])
      };
    });
  }

  private setupProfileMenu(): void {
    this.profileMenuItems = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

}
