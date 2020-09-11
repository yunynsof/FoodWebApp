import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericServicesService } from '../../services/generic-services.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

declare var $;

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  loading = false;
  username;
  firstname;
  lastname;
  name;
  id;
  email;
  orders: any = [];
  dataTable: any = [];
  dataUser: any = [];
  dataShop: any = [];
  chema: any = [];

  constructor(
    public formBuilder: FormBuilder,
    private authService: GenericServicesService
  ) { }

  @ViewChild('form', { static: false }) form: NgForm;

  validations_form: FormGroup;
  ngOnInit(): void {

    this.id = localStorage.getItem('id');
    this.getDataUser();
    this.getOrders();


  }

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
      });
  }

  getOrders() {
    this.authService.findByFiltersOrders(this.id)
      .then(data => {
        this.orders = data;
        let a = 1;
        for (let i = 0; i < this.orders.data.length; i++) {
          this.authService.getShop(this.orders.data[i].shopId)
            .then(data => {
              this.dataShop = data;
              this.dataTable.push({
                id: this.orders.data[i].id,
                shop: this.dataShop.name,
                order: this.getOrderDetails(this.orders.data[i].order_details),
                amountTotal: 'L.' + this.orders.data[i].amountTotal,
                delivery_mode: this.orders.data[i].delivery_mode.mode,
                order_payment_method: this.orders.data[i].order_payment_method.method,
                createdAt: this.getDateFormat(this.orders.data[i].createdAt)
              });
            });
          a++;
          if (a == this.orders.data.length) {
            this.test()
          }
        }
      });
  }

  test() {

    this.chema = this.dataTable
    setTimeout(() => this.loading = false, 5000);
    $(() => {
      setTimeout(function () {
        $(function () {
          $(document).ready(function () {
            $('#example').DataTable(
              {
                "language": {
                  "lengthMenu": "Mostrar <select class=\"select2-icons form-control\"> " +
                    '<option value="5">5</option>' +
                    '<option value="10">10</option>' +
                    '<option value="20">20</option>' +
                    '<option value="30">30</option>' +
                    '<option value="40">40</option>' +
                    '<option value="-1">All</option>' +
                    '</select> registros por página',
                  "zeroRecords": "",
                  "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                  "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
                  "infoFiltered": "(Filtrado de _MAX_  registros totales)",
                  "emptyTable": "",
                  "search": "Buscar:",
                  "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Atras"
                  },
                }, pageLength: 5
              }
            );
          });
        });
      }, 5000);
    });
  }

  getDateFormat(data) {
    if (data != null) {
      let date = new Date(Date.parse(data));
      let month = (+((date.getMonth() < 10 ? '0' : '') + date.getMonth()) + 1)
      return (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + month + "/" + date.getFullYear()
        + " " + (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '')
        + date.getMinutes() + ":" + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    } else return "";
  }

  getOrderDetails(data) {
    let cadena = '';
    for (let i = 0; i < data.length; i++) {
      if (cadena == '') {
        cadena = data[i].itemName + ': ' + data[i].itemObservation
      } else {
        cadena += '; << ' + data[i].itemName + ': ' + data[i].itemObservation
      }
    }
    return cadena;
  }

}
