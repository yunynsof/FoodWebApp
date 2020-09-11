import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GenericServicesService } from '../../services/generic-services.service';
import { AlertServicesService } from '../../alert/alert-services.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import validator from 'validator';

const USER = 'user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
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

  login(form) {
    if (this.formValidator()) {
      this.loading = true;

      this.authService.login(form.value).subscribe(
        data => {

          this.loading = false;
        },
        error => {
          this.loading = false;

          this.alertService.errorLogin(error);
        },
        () => {
          this.router.navigate(['pedidos'])
        }
      );
    }
  }

  obtainPassword() {
    this.router.navigate(['recover-password'])
  }

  registry() {
    this.router.navigate(['register'])
  }


  validateFieldsForm() {
    this.validations_form = this.formBuilder.group({
      'username': [null, [Validators.required]],
      'password': [null, [Validators.required]]
    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Ingrese Correo' }
    ],
    'password': [
      { type: 'required', message: 'Ingrese Contraseña' }
    ]
  }


  loginFormValidator = {
    username: {
      empty: '',
    },
    password: {
      empty: '',
    }
  };

  formValidator(): boolean {

    if (this.validations_form.value.username == null || this.validations_form.value.username == '') {
      this.validations_form.value.username = '';
    } if (this.validations_form.value.password == null || this.validations_form.value.password == '') {
      this.validations_form.value.password = '';
    }

    if (validator.isEmpty(this.validations_form.value.username)) {
      this.loginFormValidator.username.empty = ' ';
    } else {
      this.loginFormValidator.username.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.password)) {
      this.loginFormValidator.password.empty = ' ';
    } else {
      this.loginFormValidator.password.empty = '';
    }

    if (this.loginFormValidator.username.empty == ' ' || this.loginFormValidator.password.empty == ' ') {
      return false;
    } else return true;
  }
}
