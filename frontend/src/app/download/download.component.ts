import { Component, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(private _fileSaverService: FileSaverService) { }

  ngOnInit() {
    
  }


  download()
  {
    const fileName ='save.docx' ;
    const fileType = this._fileSaverService.genType(fileName); 
  
   
    const txtBlob = new Blob([document.getElementById('got').innerHTML], { type: fileType });
    console.log(txtBlob);
    this._fileSaverService.save(txtBlob, fileName);
  }
}
