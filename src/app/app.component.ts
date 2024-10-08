import { Component, ElementRef, ViewChild } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('qrCode', { static: false }) qrCodeElement!: ElementRef<HTMLCanvasElement>;

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

  downloadPdf(){
    const pdf = new jsPDF();
    pdf.text('here is your qr code',10,10);
    const imgData = this.getQrCodeImage();
    imgData && pdf.addImage(imgData,'PNG',10,20,180,180);
    pdf.save('qrcode.pdf');
  }
  getQrCodeImage() {
    const canvas = this.qrCodeElement.nativeElement.querySelector('canvas');
    return canvas ? canvas.toDataURL('image/png') : '';
  }
}
