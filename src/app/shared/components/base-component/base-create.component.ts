import { TranslateService } from "@ngx-translate/core";
import { BaseComponent } from "./base.component";

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from "@angular/forms";
import { BaseService } from "../../services/base.service";
import { AppInjector } from "../../services/app-injector.service";

@Component({
  selector: "",
  template: "",
  styles: [],
})
export class BaseCreateComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  /* PROPRIÉTÉS */
  public isFormOk = false; // permet de savoir si le formulaire est pret à etre rendu dans la vues
  public form: FormGroup; // Formulaire d'ajout
  public formData: FormData = new FormData();
  public schema: any; // Architechture de la table (depuis la base de données)
  public Editor = ClassicEditor; // Editor variable
  public enableRetrieveSchema: boolean = true;
  @Output() created = new EventEmitter();
  @Output() edited = new EventEmitter();

  public configCalendrier = {
    // Configuration de ng2DatePicker
    day: {
      format: "YYYY-MM-DD",
      theme: "material",
    },
    year: {
      format: "YYYY",
      theme: "material",
      mode: "month",
    },
    hour: {
      format: "HH:MM",
      showTwentyFourHours: true,
      timeSeparator: ":",
    },
  };

  public fb: FormBuilder;
  public translate: TranslateService;

  /* CONSTRUCTOR */
  constructor(public service?: BaseService) {
    super(service);
    this.fb = AppInjector.injector.get(FormBuilder);
    this.translate = AppInjector.injector.get(TranslateService);
  }

  /* ONINIT */
  ngOnInit() {
    // Verifie si l'architechture de la table n'a pas préalablement etait recuperer
    if (this.service.schema) {
      this.enableRetrieveSchema = false;
    }

    if (this.enableRetrieveSchema) {
      // Get l'architecture de la table depuis la base de données
      this.service.describe().subscribe();
    }

    this._subscription["_schema"] = this.service.schema$.subscribe(
      (schema) => (this.schema = schema)
    );
  }

  /* METHODS */

  // Permet d'initialiser le formulaire à partir de l'architechture depuis la base de données
  // Le parametre data recoit le schema(architechture) de la table
  // Le parametre ignoredField recoit les champs à ignorer lors de l'initatialisation du formulaire
  // Le parametre requiredFiel recoit les champs qui sont required
  // Le paramete callback permet de renseigner des actions à faire aprés l'initalisation du formulaire
  initForm(
    requiredField: string[] = [],
    ignoreField: string[] = [],
    callback?: Function
  ) {
    // initialisation du formulaire
    if (this.schema) {
      this.form = this.fb.group({});
      this.schema.forEach((field: string) => {
        if (!ignoreField.includes(field)) {
          if (requiredField.includes(field)) {
            this.form.addControl(
              field,
              new FormControl(null, Validators.required)
            );
          } else {
            this.form.addControl(field, new FormControl(null));
          }
        }
      });

      if (callback) {
        callback();
      }

      this.isFormOk = true;
    }
  }

  addBlurField(name: string, required?: boolean) {
    this.form.addControl(
      name,
      new FormControl(
        "",
        required
          ? {
              validators: [Validators.required],
              updateOn: "blur",
            }
          : {
              updateOn: "blur",
            }
      )
    );
  }

  addBlurFields(fields: { name: string; required?: boolean }[]) {
    fields.forEach((field) => {
      this.addBlurField(field.name, field.required);
    });
  }

  formValue(field: string) {
    return this.form.get(field)?.value;
  }

  formControl(field: string) {
    return this.form.get(field);
  }

  selectFormHandler(target: string, data: any) {
    this.form.get(target).patchValue(data);
  }

  formValueComparer(
    minField: string,
    maxField: string,
    alertMessage: string,
    isDate: boolean = false
  ) {
    this.form.controls[minField].valueChanges.subscribe((value) => {
      if (isDate) {
        if (this.form.controls[maxField].value) {
          if (
            new Date(this.form.controls[minField].value) >
            new Date(this.form.controls[maxField].value)
          ) {
            this.helper.alertDanger(alertMessage);
            this.form.controls[maxField].setValue(null, {
              emitEvent: false,
            });
          }
        }
      } else {
        if (this.form.controls[maxField].value) {
          if (
            this.form.controls[minField].value >
            this.form.controls[maxField].value
          ) {
            this.helper.alertDanger(alertMessage);
            this.form.controls[maxField].setValue(null, {
              emitEvent: false,
            });
          }
        }
      }
    });
    this.form.controls[maxField].valueChanges.subscribe((value) => {
      if (isDate) {
        if (
          new Date(this.form.controls[minField].value) >
          new Date(this.form.controls[maxField].value)
        ) {
          this.helper.alertDanger(alertMessage);
          this.form.controls[maxField].setValue(null, {
            emitEvent: false,
          });
        }
      } else {
        if (
          this.form.controls[minField].value >
          this.form.controls[maxField].value
        ) {
          this.helper.alertDanger(alertMessage);
          this.form.controls[maxField].setValue(null, {
            emitEvent: false,
          });
        }
      }
    });
  }

  addControls(names: string[], values: any[] = [], isRequired: boolean[] = []) {
    if (isRequired[0] && values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, values[counter], isRequired[counter]);
        counter++;
      });
    } else if (isRequired[0] && !values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, null, isRequired[counter]);
        counter++;
      });
    } else if (!isRequired[0] && values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, values[0]);
        counter++;
      });
    } else {
      names.forEach((name) => this.addControl(name));
    }
  }

  addControl(name: string, value: any = null, isRequired: boolean = false) {
    if (isRequired) {
      this.form.addControl(name, new FormControl(value, Validators.required));
    } else {
      this.form.addControl(name, new FormControl(value));
    }
  }

  addValidators(name: string, validators: ValidatorFn[]): void {
    if (Object.keys(this.form.controls).includes(name)) {
      this.form.controls[name].setValidators(validators);
      this.form.controls[name].updateValueAndValidity();
    }
  }

  removeValidators(name: string): void {
    this.addValidators(name, []);
  }

  formValuePatcher(field: string, value: any) {
    // if (this.schema.hasOwnProperty(field)) {
    this.form.controls[field].patchValue(value);
    // } else {
    //   this.helper.toastDanger(`le champs ${field} n'existe pas dans la table`);
    // }
  }

  valuesPatcher(fields: string[], values: any[]) {
    let counter = 0;
    fields.forEach((field) => {
      this.formValuePatcher(field, values[counter]);
      counter++;
    });
  }

  shouldShowRequiredError(field: string) {
    const control = this.form.get(field);
    if (control.touched) {
      return control.errors?.required;
    }
  }

  isValid(field: string) {
    const control = this.form.get(field);
    if (control.touched) {
      return control.valid;
    }
  }

  fillFormData(object: object) {
    Object.keys(object).forEach((key) => {
      this.formData.append(key, object[key]);
    });
  }

  onFileChanged(event: any) {
    let fichier: File = event.target.files[0];
    if (fichier.type !== "application/pdf") {
      return this.helper.alertDanger("Format Invalide");
    }

    this.formData.append("fichier_joint", fichier);
  }

  formInvalidError() {
    this.translate.get("formulaireNonValide").subscribe((translatedWord) => {
      this.helper.toastDanger(translatedWord);
    });
  }
}
