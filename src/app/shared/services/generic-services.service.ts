import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { AlertServicesService } from '../alert/alert-services.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const TOKEN_KEY = 'ACCESS_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class GenericServicesService {

  URL_SERVER: string = 'https://apimarket.hmd.consulting';
  authSubject = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertServicesService
  ) { }

  login(user: User): Observable<AuthResponse> {

    let login = {
      strategy: 'local',
      email: user.username,
      password: user.password
    };

    return this.httpClient.post(`${this.URL_SERVER}/authentication`, login).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          //localStorage.setItem('a_t', res.accessToken);
          localStorage.setItem('id', res.user.id.toString());
          localStorage.setItem('username', res.user.username);
          localStorage.setItem('firstname', res.user.firstname);
          localStorage.setItem('lastname', res.user.lastname);
          localStorage.setItem('email', res.user.email);
          this.authSubject.next(true);
        }
      })

    );
  }

  setRegistry(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });
    let dataUser= {
      username: data.username,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      telephone: data.telephone,
      password: data.password
    }
    return this.httpClient.post(`${this.URL_SERVER}/usersccc`, JSON.stringify(dataUser), { headers });
  }

  recoverPass(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });

    let recover = {
      action: 'sendResetPwd',
      value: { email: data.email }
    };

    return this.httpClient.post(`${this.URL_SERVER}/authManagement`, recover, { headers });
  }

  findByIdUSer(id) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/users/${id}`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  findByFiltersOrders(id) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/orders/?userId=${id}&$limit=50`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createOrders(data) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });

    return this.httpClient.post(`${this.URL_SERVER}/orders`, JSON.stringify(data), { headers });
  }

  createOrdersDetails(data) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });

    return this.httpClient.post(`${this.URL_SERVER}/order-details`, JSON.stringify(data), { headers });
  }

  getAllMethodPay() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/order-payment-method`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getDeliveryModes() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/delivery-modes`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  createAddress(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });

    let address = {
      description: data.description,
      address: data.address,
      status: false,
      userId: localStorage.getItem('id')
    };

    return this.httpClient.post(`${this.URL_SERVER}/user-addresses`, address, { headers });
  }

  putAddress(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });

    let address = {
      description: data.description,
      address: data.address,
      status: false,
      userId: localStorage.getItem('id')
    };

    return this.httpClient.put(`${this.URL_SERVER}/user-addresses/${data.id}`, address, { headers });
  }

  deleteAddress(id) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });
    return new Promise(resolve => {
      this.httpClient.delete(`${this.URL_SERVER}/user-addresses/${id}`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getShop(id) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': '6236796552'
    });
    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}/shops/${id}`, { headers }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  sendWelcome(email) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin' + ':' + 'Pa$$w0rd'),
      'Content-Type': 'application/json'
    });

    let info = {

      email: {
        ccs: [],
        from: "webappfoodhmd@gmail.com",
        password: "@Marco17",
        subject: "Bienvenido a HMD Food Web",
        template: "Test",
        to: email
      },
      welcomeApplication: {
        bussines: {
          bussines_name: "string",
          url_bussines_image: "string",
          url_web_page_bussines: "string",
          url_whatsapp_bussines: "string"
        },
        socialNetwork: {
          url_facebook: "string",
          url_image_facebook: "string",
          url_image_instagram: "string",
          url_instagram: "string"
        },
        title: "Bienvenido a HMD food Web",
        url_profile: "string"
      }

    };
    console.log(JSON.stringify(info))
    return this.httpClient.post(`http://45.79.32.149:8080/email/v1/sendWelcome`, info, { headers });

  }

  sendOrderConfirmationRequest(order, orderDetails, addresName, name) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin' + ':' + 'Pa$$w0rd'),
      'Content-Type': 'application/json'
    });

    let info = {

      email: {
        ccs: [],
        from: "webappfoodhmd@gmail.com",
        password: "@Marco17",
        subject: "Confimación de pedido HMD Food Web",
        template: "Test",
        to: localStorage.getItem('email')
      },
      orderConfirmation: {
        bussines: {
          bussines_name: "string",
          url_bussines_image: "string",
          url_web_page_bussines: "string",
          url_whatsapp_bussines: "string"
        }, client: {
          client_address: addresName,
          client_name: name
        },
        order: order,
        orderDetails: orderDetails,
        shopping_cart_48_primary: "string",
        socialNetwork: {
          url_facebook: "string",
          url_image_facebook: "string",
          url_image_instagram: "string",
          url_instagram: "string"
        },
        title: "Confirmación de orden"
      }

    };
    console.log(JSON.stringify(info))
    return this.httpClient.post(`http://45.79.32.149:8080/email/v1/sendOrderConfirmationRequest`, info, { headers });

  }

  sendRessetPasswordAcount(email) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin' + ':' + 'Pa$$w0rd'),
      'Content-Type': 'application/json'
    });

    let info = {

      email: {
        ccs: [],
        from: "webappfoodhmd@gmail.com",
        password: "@Marco17",
        subject: "Recuperación de contraseña",
        template: "Test",
        to: email
      },
      ressetPassworAccount: {
        bussines: {
          bussines_name: "string",
          url_bussines_image: "string",
          url_web_page_bussines: "string",
          url_whatsapp_bussines: "string"
        },
        socialNetwork: {
          url_facebook: "string",
          url_image_facebook: "string",
          url_image_instagram: "string",
          url_instagram: "string"
        },
        title: "Restablecer contraseña",
        url_profile: "string",
        url_password_resset: "string",
        user: email,
        vpn_key_48_primary: "string"
      }

    };
    //console.log(JSON.stringify(info))
    return this.httpClient.post(`http://45.79.32.149:8080/email/v1/sendRessetPasswordAcount`, info, { headers });

  }

  async logout() {
    localStorage.clear();
    this.authSubject.next(false);
  }

}
