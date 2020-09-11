import { Component, OnInit, Input } from '@angular/core';
import { GenericServicesService } from '../../services/generic-services.service';
import { AlertServicesService } from '../../alert/alert-services.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() notification;
  username;

  constructor(
    private authService: GenericServicesService,
    private alertService: AlertServicesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.validatioNotification();
  }

  home() {
    this.router.navigate(['pedidos'])
  }

  pagar() {
    let navigationExtras: NavigationExtras = {
      state: JSON.parse(localStorage.getItem('carShop'))
    };
    this.router.navigate(['pagar'], navigationExtras);
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
