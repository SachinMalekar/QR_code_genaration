import { Component } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QR_code_genaration';
  sampleData = '';
  qrCodeDownloadlink: SafeValue = '';
  employeeDeatils = {
    FirstName : 'sample',
    LastName : 'example',
    MobNo : 9876543210
  }
  qrData = JSON.stringify(this.employeeDeatils);

  onChange(url:SafeValue){
    this.qrCodeDownloadlink = url;
  }
}
