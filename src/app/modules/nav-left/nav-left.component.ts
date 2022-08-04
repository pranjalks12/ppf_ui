import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'nav-left',
    templateUrl: './nav-left.component.html',
    styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent {
    public navData!: INavData[];

    constructor(private httpClient: HttpClient, private router: Router) {
        httpClient.get('assets/data.json').subscribe(result => {
            this.navData = result as INavData[];
        }, error => console.error(error));
    }
    name = 'navigation';

    navClick(path: string) {
        this.router.navigateByUrl(path);
    }
}

interface INavData {
    item: string;
    path: string;
    icon: string;
}
