import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseCreateComponent } from 'src/app/shared/components/base-component/base-create.component';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  form: FormGroup
  loading: boolean = false;
  constructor(public authService: AuthService, public router: Router, public fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  connexion() {
    this.loading = true;
    this.authService.connexion(this.form.value).subscribe(() => {
      this.loading = false;
      this.router.navigate(['school', 'explore']);
    })
  }


  shouldShowRequiredError(field: string) {
    const control = this.form.controls[field];
    if (control.touched) {
      return control.invalid;
    }
  }

  isValid(field: string) {
    const control = this.form.controls[field];
    if (control.touched) {
      return control.valid;
    }
  }

}