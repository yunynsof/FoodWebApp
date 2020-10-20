import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GenericServicesService } from '../../services/generic-services.service';
import { AlertServicesService } from '../../alert/alert-services.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import validator from 'validator';
declare var $;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loading = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: GenericServicesService,
    private alertService: AlertServicesService
  ) { }

  @ViewChild('form', { static: false }) form: NgForm;

  validations_form: FormGroup;

  ngOnInit(): void {

    $(() => {

      $('#telephone').on('keypress', function (event) {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });

    });
    this.validateFieldsForm();
  }

  register(form) {
    if(form.value.password == form.value.confirmPassword){

   if (this.formValidator()) {
        this.loading = true;
        this.authService.setRegistry(form.value).subscribe(
          data => {
            this.loading = false;
            this.authService.sendWelcome(form.value.email).subscribe();
            this.alertService.Success('Te has registrado exitosamente', 'Verifique su correo')
          },
          error => {
            this.loading = false;
            this.alertService.errorRegister(error);
          },
          () => {
            setTimeout(() => {
              this.router.navigate(['login'])
            }, 3000);
          }
        );
      }
    }else {
      this.alertService.error('Las contraseñas no son iguales', 'Verifique su contraseña');
    }
  }


  login(){

    this.router.navigate(['login'])
  }


  validateFieldsForm() {
    let tigoRegex: RegExp = /^[\s\S]{8,8}$/
    this.validations_form = this.formBuilder.group({
      'username': [null, [Validators.required]],
      'email': [null, [Validators.required]],
      'firstname': [null, [Validators.required]],
      'lastname': [null, [Validators.required]],
      'telephone': [null, [Validators.pattern(tigoRegex), Validators.required]],
      'password': [null, [Validators.required]],
      'confirmPassword': [null, [Validators.required]]
    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Ingrese nombre de usuario' }
    ],
    'email': [
      { type: 'required', message: 'Ingrese Correo' }
    ],
    'firstname': [
      { type: 'required', message: 'Ingrese primer nombre' }
    ],
    'lastname': [
      { type: 'required', message: 'Ingrese primer apellido' }
    ],
    'telephone': [
      { type: 'pattern', message: 'Debe tener 8 dígitos' },
      { type: 'required', message: 'Ingrese telefono' }
    ],
    'password': [
      { type: 'required', message: 'Ingrese Contraseña' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirme Contraseña' }
    ]
  }


  registerFormValidator = {
    username: {
      empty: '',
    },
    email: {
      empty: '',
    },
    firstname: {
      empty: '',
    },
    lastname: {
      empty: '',
    },
    telephone: {
      empty: '',
    },
    password: {
      empty: '',
    },
    confirmPassword: {
      empty: '',
    }
  };

  formValidator(): boolean {

    if (this.validations_form.value.username == null || this.validations_form.value.username == '') {
      this.validations_form.value.username = '';
    }if (this.validations_form.value.email == null || this.validations_form.value.email == '') {
      this.validations_form.value.email = '';
    }if (this.validations_form.value.firstname == null || this.validations_form.value.firstname == '') {
      this.validations_form.value.firstname = '';
    } if (this.validations_form.value.lastname == null || this.validations_form.value.lastname == '') {
      this.validations_form.value.lastname = '';
    }if (this.validations_form.value.telephone == null || this.validations_form.value.telephone == '') {
      this.validations_form.value.telephone = '';
    }if (this.validations_form.value.password == null || this.validations_form.value.password == '') {
      this.validations_form.value.password = '';
    }if (this.validations_form.value.confirmPassword == null || this.validations_form.value.confirmPassword == '') {
      this.validations_form.value.confirmPassword = '';
    }

    if (validator.isEmpty(this.validations_form.value.username)) {
      this.registerFormValidator.username.empty = ' ';
    } else {
      this.registerFormValidator.username.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.email)) {
      this.registerFormValidator.email.empty = ' ';
    } else {
      this.registerFormValidator.email.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.firstname)) {
      this.registerFormValidator.firstname.empty = ' ';
    } else {
      this.registerFormValidator.firstname.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.lastname)) {
      this.registerFormValidator.lastname.empty = ' ';
    } else {
      this.registerFormValidator.lastname.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.telephone)) {
      this.registerFormValidator.telephone.empty = ' ';
    } else {
      this.registerFormValidator.telephone.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.password)) {
      this.registerFormValidator.password.empty = ' ';
    } else {
      this.registerFormValidator.password.empty = '';
    }

    if (validator.isEmpty(this.validations_form.value.confirmPassword)) {
      this.registerFormValidator.confirmPassword.empty = ' ';
    } else {
      this.registerFormValidator.confirmPassword.empty = '';
    }

    if (this.registerFormValidator.username.empty == ' ' || this.registerFormValidator.email.empty == ' ' ||
    this.registerFormValidator.firstname.empty == ' ' || this.registerFormValidator.lastname.empty == ' ' ||
    this.registerFormValidator.telephone.empty == ' ' || this.registerFormValidator.password.empty == ' ' ||
    this.registerFormValidator.confirmPassword.empty == ' ') {
      return false;
    } else return true;
  }
}
