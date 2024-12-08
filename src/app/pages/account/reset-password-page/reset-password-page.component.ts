import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { CustomValidator } from '../../../validators/custom.validator';
import { NgClass, NgIf } from '@angular/common';
import { LoadingComponent } from '../../../components/shared/loading/loading.component';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [LoadingComponent, NgClass, RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './reset-password-page.component.html',
})
export class ResetPasswordPageComponent {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      document: [
        '',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf(),
        ]),
      ],
    });
  }

  ngOnInit() {}

  submit() {
    this.busy = true;
    this.service.resetPassword(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Senha Restaurada');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }
}
