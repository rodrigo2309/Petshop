import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../services/data.service';
import { CustomValidator } from '../../../validators/custom.validator';
import { LoadingComponent } from '../../../components/shared/loading/loading.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [LoadingComponent, NgClass, ReactiveFormsModule, NgIf],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.required,
        ]),
      ],
      document: [{ value: '', disabled: true }],
      email: [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(120),
          Validators.required,
          CustomValidator.EmailValidator,
        ]),
      ],
    });
  }

  ngOnInit() {
    this.busy = true;
    this.service.getProfile().subscribe(
      (data: any) => {
        this.busy = false;
        this.form.controls['name'].setValue(data.name);
        this.form.controls['document'].setValue(data.document);
        this.form.controls['email'].setValue(data.email);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }

  submit() {
    this.busy = true;
    this.service.updateProfile(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Atualização Completa!');
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }
}
