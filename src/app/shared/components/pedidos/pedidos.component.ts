import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertServicesService } from '../../alert/alert-services.service';
declare var $;

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  combo;
  id;
  prize;
  arrayCombos: any = [];
  notification;
  test;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertServicesService
  ) {
    this.id = localStorage.getItem('id');
    this.test = localStorage.getItem('carShop');
    if (this.test != null) {
      this.arrayCombos = JSON.parse(this.test);
    }

    if (this.id == null || this.id == '' || this.id == undefined) {
      this.router.navigate(['login']);
    }
    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
        this.arrayCombos = this.router.getCurrentNavigation().extras.state;

      }
    });
  }

  ngOnInit(): void {
    this.validatioNotification();
    $(() => {
      $("#testid").keypress(function (evt) {
        evt.preventDefault();
      });

      $("#testid").keydown(function (e) {
        var elid = $(document.activeElement).hasClass('textInput');

        //prevent both backspace and delete keys
        if ((e.keyCode === 8 || e.keyCode === 46) && !elid) {
          return false;
        };
      });
    });
  }

  combos = [
    {
      id: 1,
      img: "assets/app-assets/images/carousel/combo1.jpg",
      combo: "COMBO #1",
      name: "UNA AREPA DE SU ELECCIÓN + JUGO",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "150.00",
      quantity: ""
    },
    {
      id: 2,
      img: "assets/app-assets/images/carousel/combo2.jpg",
      combo: "COMBO #2",
      name: "DESGUSTACIÓN + 2 BEBIDAS + 1 POSTRE",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "289.00",
      quantity: ""
    },
    {
      id: 3,
      img: "assets/app-assets/images/carousel/combo3.jpg",
      combo: "COMBO #3",
      name: "3 TEQUEÑOS + 1 JUGO + 1 AREPA",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "199.00",
      quantity: ""
    },
    {
      id: 4,
      img: "assets/app-assets/images/carousel/combo4.jpg",
      combo: "COMBO #4",
      name: "2 EMPANADAS + 1 JUGO",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "125.00",
      quantity: ""
    },
    {
      id: 5,
      img: "assets/app-assets/images/carousel/combo5.jpg",
      combo: "COMBO #5",
      name: "1 ENTRADA + 2 AREPAS + 1 JUGO",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "349.00",
      quantity: ""
    },
    {
      id: 6,
      img: "assets/app-assets/images/carousel/combo5.jpg",
      combo: "COMBO #6",
      name: "1 ENTRADA + 2 AREPAS + 1 JUGO",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "349.00",
      quantity: ""
    },
    {
      id: 7,
      img: "assets/app-assets/images/carousel/combo5.jpg",
      combo: "COMBO #7",
      name: "1 ENTRADA + 2 AREPAS + 1 JUGO",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "349.00",
      quantity: ""
    },
    {
      id: 8,
      img: "assets/app-assets/images/carousel/combo5.jpg",
      combo: "COMBO #8",
      name: "1 ENTRADA + 2 AREPAS + 1 JUGO",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "349.00",
      quantity: ""
    },
    {
      id: 9,
      img: "assets/app-assets/images/carousel/combo5.jpg",
      combo: "COMBO #9",
      name: "1 ENTRADA + 2 AREPAS + 1 JUGO",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "349.00",
      quantity: ""
    },
    {
      id: 10,
      img: "assets/app-assets/images/carousel/combo5.jpg",
      combo: "COMBO #10",
      name: "1 ENTRADA + 2 AREPAS + 1 JUGO",
      description: "Nuestras deliciosas arepas de pollo, res, cochinita con sus complementos frescos y un jugo natural nativo de venezuela, pruebalo.",
      prize: "349.00",
      quantity: ""
    }
  ]



  addCombo(combos) {
    if (combos.quantity != "") {

      if (this.arrayCombos == null || this.arrayCombos == '') {
        this.arrayCombos.push({
          combo: combos.combo,
          description: combos.description,
          id: combos.id,
          img: combos.img,
          name: combos.name,
          prize: combos.prize,
          quantity: combos.quantity
        });
        localStorage.setItem('carShop', JSON.stringify(this.arrayCombos));
        this.notification = JSON.parse(localStorage.getItem('carShop')).length;
      } else {

        let indice;
        for (let i = 0; i < this.arrayCombos.length; i++) {
          if (this.arrayCombos[i].id == combos.id) {
            indice = i;
            break;
          } else indice = -1
        }

        if (indice != -1) {
          this.arrayCombos[indice].quantity = Number(this.arrayCombos[indice].quantity) + Number(combos.quantity);
        } else {
          this.arrayCombos.push({
            combo: combos.combo,
            description: combos.description,
            id: combos.id,
            img: combos.img,
            name: combos.name,
            prize: combos.prize,
            quantity: combos.quantity
          });
          localStorage.setItem('carShop', JSON.stringify(this.arrayCombos));
          this.notification = JSON.parse(localStorage.getItem('carShop')).length;
        }
      }
      this.alertService.presentToast('Un producto ha sido agregado a su orden');
    } else {

      this.alertService.errorToast('Seleccione una cantidad');
    }
    combos.quantity = "";
  }

  home() {
    this.router.navigate(['pedidos']);
  }

  pagar() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (hour >= 10 && hour < 22) {
      let navigationExtras: NavigationExtras = {
        state: this.arrayCombos
      };
      this.router.navigate(['pagar'], navigationExtras);
    } else {
      this.alertService.warning('Gracias por preferirnos, por los momentos estamos fuera de servicio, pronto te estaremos atendiendo.', ' Atención');
    }
  }

  sumQuantity(orden) {

    orden.quantity = Number(orden.quantity) + 1;
  }

  subtractQuantity(orden) {

    if (orden.quantity < 1) {
      this.alertService.dangerToast('Cantidad NO puede ser menor de 0 ');
    } else {
      orden.quantity = orden.quantity - 1;
    }
  }

  validatioNotification() {

    if (JSON.parse(localStorage.getItem('carShop')) != null) {
      this.notification = JSON.parse(localStorage.getItem('carShop')).length;
    } else this.notification = null;
  }


}
