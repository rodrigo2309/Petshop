import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { NgClass, NgIf } from '@angular/common';
import { LoadingComponent } from '../../../components/shared/loading/loading.component';
import { MaskDirective } from '../../../directives/mask.directive';
import { CustomValidator } from '../../../validators/custom.validator';
import { Security } from '../../../utils/security.util';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MaskDirective,
    RouterModule,
    ReactiveFormsModule,
    NgClass,
    LoadingComponent,
    NgIf,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf(),
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
    const token = Security.getToken();
    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe(
        (data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
        (err) => {
          localStorage.clear();
          this.busy = false;
        }
      );
    }
  }

  submit() {
    this.busy = true;

    this.service.authenticate(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.setUser(data.customer, data.token);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }

  setUser(user, token) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }
}
