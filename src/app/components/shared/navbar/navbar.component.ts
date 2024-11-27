import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { Security } from '../../../utils/security.util';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  public user: User;

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = Security.getUser();
  }

  logout() {
    Security.clear();
    this.router.navigate(['/login']);
  }
}
