import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GenericServicesService } from '../../services/generic-services.service';
import { AlertServicesService } from '../../alert/alert-services.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import validator from 'validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public loading = false;

  username;
  firstname;
  lastname;
  name;
  id;
  email;

  address = []
  addressRec = []

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: GenericServicesService,
    private alertService: AlertServicesService

  ) { }

  @ViewChild('form', { static: false }) form: NgForm;

  validations_form: FormGroup;

  ngOnInit(): void {

    this.id = localStorage.getItem('id');
    this.getDataUser();
    this.validateFieldsForm();
  }

  userUpdate() {
    let flagBlank = 0;
    let flagCorrect = 0;
    let flagPut = 0;
    this.loading = true;
    this.authService.findByIdUSer(this.id)
      .then(data => {
        this.dataUser = data;
        this.addressRec = this.dataUser.user_addresses;

        if (this.address.length > this.addressRec.length) {
          for (let i = 0; i < this.addressRec.length; i++) {
            if (this.address[i].description == '' || this.address[i].address == '') {
              flagBlank++;
            } else {
              if (this.address[i].id == this.addressRec[i].id) {
                this.authService.putAddress(this.address[i]).subscribe();
              }
            }
          }
          for (let x = this.addressRec.length; x < this.address.length; x++) {
            if (this.address[x].description == '' || this.address[x].address == '') {
              flagBlank++;
            } else {
              this.authService.createAddress(this.address[x]).subscribe();
              flagCorrect++;
            }
          }
        } else if (this.address.length == this.addressRec.length) {
          for (let i = 0; i < this.addressRec.length; i++) {
            if (this.address[i].description == '' || this.address[i].address == '') {
              flagBlank++;
            } else {
              if (this.address[i].id == this.addressRec[i].id) {
                this.authService.putAddress(this.address[i]).subscribe();
                flagPut++;
              }
            }
          }
        }
        this.loading = false;
        if (flagBlank > 0)
          this.alertService.dangerToast('Campos de dirección no deben ir vacios');

        if (flagPut > 0)
          this.alertService.presentToast('Se actualizo correctamente');


        if (flagCorrect > 0){
          this.alertService.presentToast('Se agrego correctamente');
          //this.getDataUser()
         // this.getDataUser()
        }
      });
      setTimeout(() => this.getDataUser(), 2000);
  }

  dataUser: any = [];

  getDataUser() {
    this.loading = true;
    this.authService.findByIdUSer(this.id)
      .then(data => {
        this.dataUser = data;

        this.username = this.dataUser.username;
        this.email = this.dataUser.email;
        this.firstname = this.dataUser.firstname;
        this.lastname = this.dataUser.lastname;
        this.name = this.firstname + ' ' + this.lastname;
       // this.address = this.dataUser.user_addresses;

        for(let a = 0; a < this.dataUser.user_addresses.length; a++){
          this.address[a] = this.dataUser.user_addresses[a]
        }
        for (let i = 0; i < this.address.length; i++) {
          this.address[i].iD = i + 1;
        }
        this.loading = false;
      });
  }

  addAddress() {
    this.address.push({
      iD: this.address.length + 1,
      id: -this.address.length-1,
      description: '',
      address: ''
    });
  }

  deleteOrder(item) {
    if (item.iD == 1) {
      this.alertService.errorToast('No puede eliminar dirección principal, solo puede editarla')
    } else {
      for (let x = 0; x < this.address.length; x++) {

        if (this.address[x].id == item.id) {
          this.authService.deleteAddress(this.address[x].id)
          this.address.splice(x, 1);
          this.alertService.presentToast('Se elimino correctamente');
        }
      }
      for (let a = 1; a < this.address.length; a++) {
        this.address[a].iD = a + 1;
      }
    }
  }

  validateFieldsForm() {
    this.validations_form = this.formBuilder.group({
      'username': [null, [Validators.required]],
      'email': [null, [Validators.required]],
      'firstname': [null, [Validators.required]],
      'lastname': [null, [Validators.required]]
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
    }
  };

  formValidator(): boolean {

    if (this.validations_form.value.username == null || this.validations_form.value.username == '') {
      this.validations_form.value.username = '';
    } if (this.validations_form.value.email == null || this.validations_form.value.email == '') {
      this.validations_form.value.email = '';
    } if (this.validations_form.value.firstname == null || this.validations_form.value.firstname == '') {
      this.validations_form.value.firstname = '';
    } if (this.validations_form.value.lastname == null || this.validations_form.value.lastname == '') {
      this.validations_form.value.lastname = '';
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

    if (this.registerFormValidator.username.empty == ' ' || this.registerFormValidator.email.empty == ' ' ||
      this.registerFormValidator.firstname.empty == ' ' || this.registerFormValidator.lastname.empty == ' ') {
      return false;
    } else return true;
  }

}
