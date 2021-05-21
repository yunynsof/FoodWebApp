import { Component, OnInit, Input } from '@angular/core';
import { GenericServicesService } from '../../services/generic-services.service';
import { AlertServicesService } from '../../alert/alert-services.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() notification;
  username;
  typeScreen = true;

  constructor(
    private authService: GenericServicesService,
    private alertService: AlertServicesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    $(() => {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('movil')
        this.typeScreen = false;
    }
    });
    this.username = localStorage.getItem('username');
    this.username = this.username.substr(0,10);
    this.validatioNotification();
  }

  home() {
    this.router.navigate(['pedidos'])
  }

  pagar() {
    let date = new Date();
    let hour = date.getHours();

    if (hour >= 10 && hour < 22) {
      let navigationExtras: NavigationExtras = {
        state: JSON.parse(localStorage.getItem('carShop'))
      };
      this.router.navigate(['pagar'], navigationExtras);
    } else {
      this.alertService.warning('Gracias por preferirnos, por los momentos estamos fuera de servicio, pronto te estaremos atendiendo.', ' Atención');
    }
  }

  userProfile() {
    this.router.navigate(['user-profile'])
  }

  record() {
    this.router.navigate(['record'])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  validatioNotification() {

    if (JSON.parse(localStorage.getItem('carShop')) != null) {
      this.notification = JSON.parse(localStorage.getItem('carShop')).length;
    } else this.notification = null;
  }
}
