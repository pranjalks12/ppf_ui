import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Persistent Provisioning Framework';
  opened = false;


  onClick() {
    this.opened = !this.opened;
  }
}
