import { Component, OnInit } from '@angular/core';
import { AlertServicesService } from '../../alert/alert-services.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GenericServicesService } from '../../services/generic-services.service';

declare var $;

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {

  data: any;
  subTotal = (0.0).toFixed(2);
  isv = (0.0).toFixed(2);
  envio = (0.0).toFixed(2);
  total = (0.0).toFixed(2);
  date;
  dateScreen;
  firstname;
  lastname;
  name;
  order;
  loading = false;
  notification;
  flag = 0;
  payment;
  dataUser: any = [];
  userTelephone;
  methodPay: any = [];
  orderDesToEmail;
  amountPayCash = 0;
  address = [];
  addresSelect;
  addresSelectName;
  deliveryMode: any = [];
  modeDev;


  constructor(
    private alertService: AlertServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: GenericServicesService
  ) {
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');

    if (this.firstname == null || this.firstname == '' || this.firstname == undefined) {
      this.router.navigate(['login']);
    }

    this.name = this.firstname + ' ' + this.lastname
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state;
        this.calculations(this.data);
      } else {
        this.data = JSON.parse(localStorage.getItem('carShop'));
        this.calculations(this.data);
      }
    });
    this.getUserInfo();
    this.getAllMethodPay();
    this.getDeliveryModes();
  }

  ngOnInit() {

    this.date = new Date();
    this.transfomList(this.date);

    $(() => {
      $("#testid").keypress(function (evt) {
        evt.preventDefault();
      });

      $("#testid").keydown(function (e) {
        var elid = $(document.activeElement).hasClass('textInput');
        console.log(e.keyCode + ' && ' + elid);
        //prevent both backspace and delete keys
        if ((e.keyCode === 8 || e.keyCode === 46) && !elid) {
          return false;
        };
      });
    });
  }

  calculations(array) {

    for (let i = 0; i < array.length; i++) {
      this.subTotal = ((Number(array[i].quantity) * Number(array[i].prize)) + Number(this.subTotal)).toFixed(2);
    }
    this.isv = (Number(this.subTotal) * 0.15).toFixed(2);
    if (array.length > 0) {
      if (this.modeDev == 2) {
        this.envio = (80).toFixed(2);
      } else {
        this.envio = (0.0).toFixed(2);
      }
    }
    this.total = (Number(this.subTotal) + Number(this.isv) + Number(this.envio)).toFixed(2);
  }

  transfomList(date) {

    let day;
    if (date.getMonth() == 0) {
      day = 'Ene';
    } else
      if (date.getMonth() == 1) {
        day = 'Feb';
      } else
        if (date.getMonth() == 2) {
          day = 'Mar';
        } else
          if (date.getMonth() == 3) {
            day = 'Abr';
          } else
            if (date.getMonth() == 4) {
              day = 'May';
            } else
              if (date.getMonth() == 5) {
                day = 'Jun';
              } else
                if (date.getMonth() == 6) {
                  day = 'Jul';
                } else
                  if (date.getMonth() == 7) {
                    day = 'Ago';
                  } else
                    if (date.getMonth() == 8) {
                      day = 'Sep';
                    } else
                      if (date.getMonth() == 9) {
                        day = 'Oct';
                      } else
                        if (date.getMonth() == 10) {
                          day = 'Nov';
                        } else
                          if (date.getMonth() == 11) {
                            day = 'Dic';
                          }


    this.dateScreen = date.getDate() + ' ' + day + ', ' + date.getFullYear();
  }

  pedidos() {
    let navigationExtras: NavigationExtras = {
      state: this.data
    };
    this.router.navigate(['pedidos'], navigationExtras);
  }

  pagar() {

    if (this.data != null) {
      if (this.data.length > 0) {
        /*for (let i = 0; i < this.data.length; i++) {
          if (this.order == undefined || this.order == null) {
            if (this.data[i].quantity == null || this.data[i].quantity == 0) {
              this.flag = 1
            }
            this.order = this.data[i].combo + '; ' + this.data[i].name + '; cantidad: ' + this.data[i].quantity + ' <<< '
          } else {
            this.order += this.data[i].combo + '; ' + this.data[i].name + '; cantidad: ' + this.data[i].quantity + ' <<< '
            if (this.data[i].quantity == null || this.data[i].quantity == 0) {
              this.flag = 1
            }
          }
        }*/
        // if (this.flag == 0) {
        this.loading = true;
        let sumQuant = 0
        for (let b = 0; b < this.data.length; b++) {
          sumQuant = this.data[b].quantity + sumQuant
        }
        if (this.orderDesToEmail == null || this.orderDesToEmail == undefined) {
          this.alertService.dangerToast('Agregue una descripcion de orden para su correo');
          this.loading = false;
        } else if (this.modeDev == null || this.modeDev == undefined) {
          this.alertService.dangerToast('Seleccione una modalidad de envio');
          this.loading = false;
        } else if (this.modeDev == 2 && this.addresSelect == undefined) {
          if (this.address.length == 0) {
            this.alertService.info('Ve a tu perfil y agrega una direccion valida', 'Atención ' + localStorage.getItem('username'));
          } else {
            this.alertService.dangerToast('Seleccione la direccion de envio');
          } this.loading = false;
        } else if (this.payment == null || this.payment == undefined) {
          this.alertService.dangerToast('Seleccione un metodo de pago');
          this.loading = false;
        } else {

          if (this.amountPayCash == null || this.amountPayCash == undefined)
            this.amountPayCash = 0;
          if (this.addresSelect == null || this.addresSelect == undefined) {
            for (let c = 0; c < this.address.length; c++)
              this.addresSelect = this.address[c].id;
          }

          let pedido = {
            reference: "{% hash 'sha1', 'hex', '' %}",
            emailsNotifcations: localStorage.getItem('email'),
            customerTelphone: this.userTelephone,
            orderDescriptionToEmail: this.orderDesToEmail,
            quantityItems: sumQuant,
            amountSubtotal: this.subTotal,
            amountDiscount: 0,
            amountTax: this.isv,
            amountTotal: this.total,
            amountPayCash: this.amountPayCash,
            paymentStatus: false,
            shopId: 1,
            orderPaymentMethodId: Number(this.payment),
            userAddressId: this.addresSelect,
            orderStatusId: 1,
            deliveryModeId: Number(this.modeDev),
            userId: Number(localStorage.getItem('id'))

          }

          this.authService.createOrders(pedido).subscribe(
            dataDetail => {
              let test = JSON.stringify(dataDetail)
              let test2 = JSON.parse(test)

              for (let d = 0; d < this.data.length; d++) {
                let orderDetail = {
                  itemRefCode: this.data[d].id,
                  itemName: this.data[d].combo,
                  itemObservation: this.data[d].name,
                  price: Number(this.data[d].prize),
                  quantity: Number(this.data[d].quantity),
                  amountSubtotal: Number(this.data[d].prize) * Number(this.data[d].quantity),
                  amountDiscount: 0,
                  amountTax: ((Number(this.data[d].prize) * Number(this.data[d].quantity)) * 0.12).toFixed(2),
                  orderId: test2.id
                }

                this.authService.createOrdersDetails(orderDetail).subscribe(
                  dataDetail => {
                  },
                  error => {
                    console.log(error)
                  }
                );
              }
              console.log(pedido)
              console.log(this.data)
              setTimeout(() => this.alertExist(pedido, this.data, test2.id), 2000);
            },
            error => {
              this.loading = false;
              this.alertService.errorRegPedido();
              console.log(error)
            }
          );
        }
        /*  } else {
            this.flag = 0;
            this.alertService.dangerToast('Cantidad de pedido Vacio !!!');
          }*/
      } else {
        this.alertService.dangerToast('Pedido Vacio !!!');
        this.loading = false;
      }
    } else {
      this.alertService.dangerToast('Pedido Vacio !!!');
      this.loading = false;
    }
  }

  deleteOrder(orden) {

    for (let x = 0; x < this.data.length; x++)
      if (this.data[x].id == orden.id) {
        this.data.splice(x, 1);
        localStorage.setItem('carShop', JSON.stringify(this.data));
        if (JSON.parse(localStorage.getItem('carShop')).length == 0) {
          localStorage.removeItem('carShop');
          this.notification = null;
        } else {
          this.notification = JSON.parse(localStorage.getItem('carShop')).length;
        }
      }

    this.subTotal = (0.0).toFixed(2);
    this.isv = (0.0).toFixed(2);
    this.envio = (0.0).toFixed(2);
    this.total = (0.0).toFixed(2);
    this.calculations(this.data);
  }

  registry(orden) {
    for (let x = 0; x < this.data.length; x++)
      if (this.data[x].id == orden.id) {
        this.data.splice(x, 1, orden);
        localStorage.setItem('carShop', JSON.stringify(this.data));
        console.log(this.data)
        this.subTotal = (0.0).toFixed(2);
        this.isv = (0.0).toFixed(2);
        this.envio = (0.0).toFixed(2);
        this.total = (0.0).toFixed(2);
        this.calculations(this.data);
      }
  }

  updateEnvio() {

    for (let x = 0; x < this.data.length; x++) {
      localStorage.setItem('carShop', JSON.stringify(this.data));
      this.subTotal = (0.0).toFixed(2);
      this.isv = (0.0).toFixed(2);
      this.envio = (0.0).toFixed(2);
      this.total = (0.0).toFixed(2);
      this.calculations(this.data);
    }
  }

  sumQuantity(orden) {
    orden.quantity = Number(orden.quantity) + 1;
    this.registry(orden);
  }

  subtractQuantity(orden) {

    if (orden.quantity < 2) {
      this.alertService.dangerToast('Cantidad NO puede ser 0 ');
    } else {
      orden.quantity = orden.quantity - 1;
      this.registry(orden);
    }
  }

  getUserInfo() {
    this.authService.findByIdUSer(localStorage.getItem('id'))
      .then(data => {
        this.dataUser = data;
        this.userTelephone = this.dataUser.telephone
        this.address = this.dataUser.user_addresses;
      });
  }

  getAllMethodPay() {
    this.authService.getAllMethodPay()
      .then(data => {
        this.methodPay = data;

      });
  }
  getAllMethodPayName(data, id) {
    for(let i=0; i<data.length; i++){
      if(data[i].id == id){
         return data[i].method;
      }
    }
   }

  getDeliveryModes() {
    this.authService.getDeliveryModes()
      .then(data => {
        this.deliveryMode = data;

      });
  }

  getDeliveryModesName(data, id) {
   for(let i=0; i<data.length; i++){
     if(data[i].id == id){
        return data[i].mode;
     }
   }
  }

  payChange() {
    if (this.payment == 2) {
      this.amountPayCash = null;
    } else {
      this.amountPayCash = 0;
    }
  }

  verifyAddress() {
    if (this.address.length == 0) {
      this.alertService.info('Ve a tu perfil y agrega una direccion valida', 'Atención ' + localStorage.getItem('username'));
    }
  }

  alertExist(pedido, data, orderId) {

    let date = new Date();
    let month = (+((date.getMonth() < 10 ? '0' : '') + date.getMonth()) + 1)
    let delivery_cost ="0"
    if(pedido.deliveryModeId == 2){
       delivery_cost = "80"
    }

    let orderMaster={

      delivery_cost: delivery_cost,
      delivery_method: this.getDeliveryModesName( this.deliveryMode.data, pedido.deliveryModeId),
      order_date: (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + month + "/" + date.getFullYear(),
      order_number: orderId,
      payment_method: this.getAllMethodPayName( this.methodPay.data, pedido.orderPaymentMethodId),
      subtotal: pedido.amountSubtotal,
      total: pedido.amountTotal
    }
    let orderDetails = []

    for (let d = 0; d < data.length; d++) {
      orderDetails.push({

        itemName: data[d].combo,
        itemObservation: data[d].name,
        price: data[d].prize,
        quantity: Number(data[d].quantity)
      });
    }

    if (this.addresSelect == null || this.addresSelect == undefined){
    this.authService.sendOrderConfirmationRequest(orderMaster, orderDetails, this.address[0].address, this.name ).subscribe();
   } else {

    for(let a=0; a<this.address.length; a++){
      if(this.addresSelect == this.address[a].id){
        this.authService.sendOrderConfirmationRequest(orderMaster, orderDetails, this.address[a].address, this.name ).subscribe();
      }
    }
   }

    this.loading = false;
    this.alertService.Succes('Su pedido ya fue solicitado');
    this.clear();
  }

  clear() {
    this.data = null;
    this.subTotal = (0.0).toFixed(2);
    this.isv = (0.0).toFixed(2);
    this.envio = (0.0).toFixed(2);
    this.total = (0.0).toFixed(2);
    localStorage.removeItem('carShop');
    this.notification = null;
    this.amountPayCash = null;
    this.orderDesToEmail = null;
    this.modeDev = null;
    this.payment = null;
  }
}
