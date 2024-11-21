import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonModule, NgClass } from '@angular/common';
import { LoadingComponent } from '../../../components/shared/loading/loading.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NgClass,
    LoadingComponent,
    CommonModule,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = true;

  constructor(private service: DataService, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.required,
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('petshop.token');
    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe({
        next: (data: any) => {
          localStorage.setItem('petshop.token', data.token);
          this.busy = false;
        },
        error: (err: any) => {
          localStorage.clear();
          this.busy = false;
        },
        complete: () => {},
      });
    }
  }

  submit() {
    this.service.authenticate(this.form.value).subscribe(
      (data: any) => {
        localStorage.setItem('petshop.token', data.token);
        this.busy = false;
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }
}
