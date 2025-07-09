import {Component, OnInit} from '@angular/core';
import {User} from '../../../auth/models/user.model';
import {UserService} from '../../../../core/services/user.service';
import {Card} from 'primeng/card';
import {Avatar} from 'primeng/avatar';
import {NgClass} from '@angular/common';
import {Divider} from 'primeng/divider';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-profile',
  imports: [
    Card,
    Avatar,
    NgClass,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentUser!: User | null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
}
