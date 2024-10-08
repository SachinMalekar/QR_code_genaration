import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QR_code_genaration';

  employeeDeatils = {
    FirstName : 'sample',
    LastName : 'example',
    MobNo : 9876543210
  }
  qrData = JSON.stringify(this.employeeDeatils);

}
