import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
// var htmlDocx = require('pt-html-docx-js');
import {BookFetchService} from '../bookFetch.service';


import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {

  public toPrint: string;
  constructor(
    private bookFetch: BookFetchService,
    private router: Router) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/home']).then();
    }
  }

  ngOnInit() {
  }

  public downloadPDF() {
    const doc = new jsPDF();




    doc.fromHTML(document.getElementById('content').innerHTML, 15, 15, {

    });

    doc.save('test.pdf');
  }

  downloadDocx() {
  const doc = new Document();

  doc.addSection({
      properties: {},
      children: [
          new Paragraph({
              children: [
                  new TextRun('Hello World'),
                  new TextRun({
                      text: 'Foo Bar',
                      bold: true,
                  }),
                  new TextRun({
                      text: 'sample',
                      bold: true,
                  }).tab(),
              ],
          }),
      ],
  });
  Packer.toBlob(doc).then(blob => {
    // saveAs(blob, "pb.docx");


  });

  // var converted = htmlDocx.asBlob(this.toPrint, {orientation: 'landscape', margins: {top: 720}});
// saveAs(converted, 'test.docx');






  console.log('Document created successfully');
    }

    preview(sectionName: string) {
      this.bookFetch.getGit(JSON.parse(localStorage.getItem('book')).id, sectionName)
        .subscribe(
          data => {
            console.log(data.content);
            this.toPrint = atob(data.content);
            console.log(this.toPrint);
            document.getElementById('content').innerHTML = this.toPrint;
          });
    }



}
