import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Helper } from "src/app/shared/services/helper";

@Component({
  selector: "app-connexion",
  templateUrl: "./connexion.component.html",
  styleUrls: ["./connexion.component.scss"],
})
export class ConnexionComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  constructor(
    public authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    public helper: Helper
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  connexion() {
    this.loading = true;
    this.authService.connexion(this.form.value).subscribe(
      () => {
        this.loading = false;
      },
      (error) => {
        if (error.status === 401) {
          this.helper
            .getTranslation("donneesDeConnexionInvalides")
            .subscribe((word) => {
              this.helper.alertDanger(word);
              this.loading = false;
            });
        }
      }
    );
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
