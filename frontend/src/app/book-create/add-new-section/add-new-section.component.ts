import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-section',
  templateUrl: './add-new-section.component.html',
  styleUrls: ['./add-new-section.component.css']
})
export class AddNewSectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addComponent(sectionName: String) {
    console.log('New Section Name: ', sectionName);

  }
}
