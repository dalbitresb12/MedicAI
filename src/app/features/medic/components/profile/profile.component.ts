import { Component, OnInit } from '@angular/core';
import { DialogService} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {Toast} from 'primeng/toast';
import {Card} from 'primeng/card';
import {Avatar} from 'primeng/avatar';
import {Divider} from 'primeng/divider';
import {ButtonDirective} from 'primeng/button';
import {User} from '../../../auth/models/user.model';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DialogService, MessageService],
  imports: [

    Card,
    Avatar,
    NgClass,
    Divider,
    ButtonDirective,
    // ... otros imports necesarios
  ],
  standalone: true
})
export class ProfileComponent implements OnInit {
  currentUser!: User | null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
}
