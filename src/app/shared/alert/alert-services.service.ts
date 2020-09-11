import { Injectable } from '@angular/core';
import { mobiscroll, MbscFormOptions } from '@mobiscroll/angular-lite';
import swal from 'sweetalert';

mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light'
}

@Injectable({
  providedIn: 'root'
})
export class AlertServicesService {

  formSettings: MbscFormOptions = {
    theme: 'ios',
    themeVariant: 'light'
  };
  constructor() { }

  errorLogin(error) {

    if (error.status == 404) {

      swal("Error de autenticación", "Usuario no registrado", "error");

    } else if (error.status == 0) {

      swal("Error de conexión a internet", "Intente nuevamente", "warning");

    } else if (error.status == 401) {

      swal("Error de autenticación", "Usuario no valido", "error");

    } else if (error.status == 400) {

      swal("Error de autenticación", "Contraseña no valida", "error");
    } else {
      // mobiscroll.alert({
      //   title: 'No se proceso peticion',
      //   message: 'Intente nuevamente',
      // });
      swal("No se proceso peticion", "Intente nuevamente", "warning");
    }
  }

  errorRecoveryPwd() {
    swal("Correo no valido", "Coloque el correo con el que se registró", "error");
  }

  errorRegister(error) {

    if (error.status == 404) {

      swal("Error de autenticación", "Usuario no registrado", "error");

    } else if (error.status == 0) {
      swal("Error de conexión a internet", "Intente nuevamente", "warning");

    } else if (error.status == 401) {
      swal("Error de autenticación", "Usuario no valido", "error");

    } else if (error.status == 400) {
      swal("Ya esta registrado este correo'", "Intente nuevamente con correo distinto", "error");

    } else {
      swal("No se proceso peticion", "Intente nuevamente", "warning");

    }
  }

  errorRegPedido() {
    swal("No se proceso peticion", "Intente nuevamente", "warning");
  }
  /*
    isLoading = false;
    async present() {

      this.isLoading = true;
      return await this.loadingController.create({
        spinner: "crescent",
        message: 'Por favor espere...',
        translucent: true,
        mode: 'ios',
        cssClass: 'custom-class custom-loading'

      }).then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss();
          }
        });
      });
    }

    async dismiss() {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }*/

  presentToast(message) {
    mobiscroll.toast({
      message: message,
      display: 'bottom',
      color: 'success'
    });
  }

  showInfoSnackbar(message) {
    mobiscroll.toast({
      message: message,
      display: 'bottom',
      color: 'info'
    });
  }

  Succes(message) {
    swal("Pedido Exitoso", message, "success");
  }

  Success(message, title) {
    swal(title, message, "success");
  }

  info(message, title) {
    swal(title, message, "info");
  }

  errorToast(message) {
    swal('No se proceso peticion', message, "warning");
  }

  dangerToast(message) {
    mobiscroll.toast({
      message: message,
      display: 'bottom',
      color: 'danger'
    });
  }

  recoverSucces() {
    swal('Correo no valido', 'Use un correo registrado', "error");
  }

}
