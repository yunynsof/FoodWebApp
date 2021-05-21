import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GenericServicesService } from '../../services/generic-services.service';
import { AlertServicesService } from '../../alert/alert-services.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import validator from 'validator';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  public loading = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: GenericServicesService,
    private alertService: AlertServicesService
  ) { }

  @ViewChild('form', { static: false }) form: NgForm;

  validations_form: FormGroup;

  ngOnInit() {
    this.validateFieldsForm();
  }

  recover(form) {
    if (this.formValidator()) {
      this.loading = true;
      this.authService.sendRessetPasswordAcount(form.value.email).subscribe(
        data => {
          this.loading = false;
          this.alertService.Success('Enviado correctamente', 'verifica tu correo')
        },
        error => {
          console.log(error);
          this.loading = false;
          this.alertService.errorRecoveryPwd();
        },
        () => {

          setTimeout(() => {
            this.router.navigate(['login'])
          }, 3000);

        }
      );
  /*     this.authService.recoverPass(form.value).subscribe(
        data => {
          this.loading = false;
          this.alertService.presentToast('Enviado correctamente; verifica tu correo')
        },
        error => {
          console.log(error);
          this.loading = false;
          this.alertService.errorRecoveryPwd();
        },
        () => {

          setTimeout(() => {
            this.router.navigate(['login'])
          }, 3000);

        }
      ); */
    }
  }

  login() {
    this.router.navigate(['login'])
  }

  registry() {
    this.router.navigate(['register'])
  }


  validateFieldsForm() {
    this.validations_form = this.formBuilder.group({
      'email': [null, [Validators.required]]
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Ingrese Correo' }
    ]
  }


  recoverFormValidator = {
    email: {
      empty: '',
    }
  };

  formValidator(): boolean {

    if (this.validations_form.value.email == null || this.validations_form.value.email == '') {
      this.validations_form.value.email = '';
    }

    if (validator.isEmpty(this.validations_form.value.email)) {
      this.recoverFormValidator.email.empty = ' ';
    } else {
      this.recoverFormValidator.email.empty = '';
    }

    if (this.recoverFormValidator.email.empty == ' ') {
      return false;
    } else return true;
  }

}
