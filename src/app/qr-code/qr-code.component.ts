import { Component, ElementRef, ViewChild } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import { File } from './file';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})

export class QrCodeComponent {
  @ViewChild('qrCode', { static: false }) qrCodeElement!: ElementRef<HTMLCanvasElement>;

  title = 'QR_code_genaration';
  sampleData = '';
  selected = false;
  employeeDeatils = {
    FirstName : 'sample',
    LastName : 'example',
    MobNo : 9876543210
  }
  qrData = JSON.stringify(this.employeeDeatils);
  files : File[] =[
    { name: 'file1.txt', image: this.qrData, selected: false },
    { name: 'file2.txt', image: this.qrData, selected: false },
    { name: 'file3.jpg', image: this.qrData, selected: false },
  ];
  qrCodeDownloadlink: SafeValue = '';
  
  onChange(url:SafeValue){
    this.qrCodeDownloadlink = url;
    this.selected = true;
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

  async downloadSelected(){
    const zip = new JSZip();
    const selectedFiles = this.files.filter(file => file.selected);
    const zipFolder  = zip.folder('files');

    // Fetch each selected file and add it to the zip
    if(zipFolder){
      for (const file of selectedFiles) {
        const response = await fetch(file.image);
        const blob = await response.blob();
        zipFolder.file(file.name, blob);
      }
    }
    

    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, 'selected_files.zip');
    });
  }
}
