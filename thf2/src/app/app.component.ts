import { Component, OnInit } from '@angular/core';
import { PoMenuItem, PoI18nService } from '@po-ui/ng-components';
import { ParameterCenterService } from './shared/services/parameter-center.service';
import { TotvsResponse } from 'dts-backoffice-util';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    menus: Array<PoMenuItem>;

    constructor(
        private router: Router,
        private parameterCenterService: ParameterCenterService,
        poI18nService: PoI18nService
    ) {
        poI18nService.setLanguage(
            localStorage.getItem('user.language') || navigator.language
        );
    }

    ngOnInit() {
        this.setUpComponents();
    }

    setUpComponents() {
        this.parameterCenterService.getMenu().subscribe((response: TotvsResponse<PoMenuItem>) => {
            this.menus = response.items;
            if (this.menus && this.menus[0]) {
                this.router.navigate([this.menus[0].link]);

            }
        });
    }
}
