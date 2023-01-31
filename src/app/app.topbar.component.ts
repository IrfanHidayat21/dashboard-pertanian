import {Component, OnDestroy} from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { BreadcrumbService } from './app.breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from './demo/service/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnDestroy{

    subscription: Subscription;

    items: MenuItem[];
    admin: any;
    constructor(private authService: AuthService, public breadcrumbService: BreadcrumbService, public app: AppMainComponent) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });


    }

    ngOnInit() {
        this.admin  = localStorage.getItem('admin');
        this.admin = JSON.parse(this.admin);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    logout() {
        setTimeout(() => {  
          this.authService.logout();
        }, 1000);
    
      }
    


}
