import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router} from '@angular/router';
import { GenericServicesService } from './shared/services/generic-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FoodWebApp';

  constructor(
    private bnIdle: BnNgIdleService,
    private router: Router,
    private authService: GenericServicesService
  ) { }

  ngOnInit(): void {

    this.bnIdle.startWatching(600).subscribe((res) => {
      if (res) {
        this.authService.logout();
        this.router.navigate(['login']);
      }
    })
  }
}
