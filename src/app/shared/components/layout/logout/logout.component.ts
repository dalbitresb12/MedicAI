import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../features/auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logout();
  }

  private logout(): void {

    this.authService.logout();
    this.router.navigate(['/login']);

    // Redirigir al login después de un breve delay para que el usuario vea el mensaje
    /*setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);*/
  }



}
