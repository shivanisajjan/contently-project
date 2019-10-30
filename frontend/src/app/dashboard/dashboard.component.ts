import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

import * as CanvasJS from '../../assets/js/canvasjs.min.js';

export interface PeriodicElement {
  Title: string;
  position: number;
  Views: number;
  Rating: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, Title: 'Book 1', Views: 10079, Rating: '1/4'},
  {position: 2, Title: 'Book 2', Views: 4026, Rating: '2/4'},
  {position: 3, Title: 'Book 3', Views: 6941, Rating: '3/4'},
  {position: 4, Title: 'Book 4', Views: 90122, Rating: '4/4'},
  {position: 5, Title: 'Book 5', Views: 10811, Rating: '4/4'},
  {position: 6, Title: 'Book 6', Views: 120107, Rating: '3/4'},
  {position: 7, Title: 'Book 7', Views: 140067, Rating: '2/4'},
  {position: 8, Title: 'Book 8', Views: 159994, Rating: '1/4'},
  {position: 9, Title: 'Book 9', Views: 189984, Rating: '2/4'},
  {position: 10, Title: 'Book 10', Views: 201797, Rating: '3/4'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  ngOnInit() {
    this.getContent();



  // this.loadScript("../../assets/js/jquery-3.3.1.min.js");
  // this.loadScript("../../assets/js/jquery-migrate-3.0.1.min.js");
  // this.loadScript("../../assets/js/jquery-ui.js");
  // this.loadScript("../../assets/js/popper.min.js");
  // this.loadScript("../../assets/js/bootstrap.min.js");
  // this.loadScript("../../assets/js/owl.carousel.min.js");
  // this.loadScript("../../assets/js/jquery.stellar.min.js");
  // this.loadScript("../../assets/js/jquery.countdown.min.js");
  // this.loadScript("../../assets/js/bootstrap-datepicker.min.js");
  // this.loadScript("../../assets/js/jquery.easing.1.3.js");
  // this.loadScript("../../assets/js/aos.js");
  // this.loadScript("../../assets/js/jquery.fancybox.min.js");
  // this.loadScript("../../assets/js/jquery.sticky.js");
  // this.loadScript("../../assets/js/main.js");





		let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Basic Column Chart in Angular"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 71, label: "Apple" },
				{ y: 55, label: "Mango" },
				{ y: 50, label: "Orange" },
				{ y: 65, label: "Banana" },
				{ y: 95, label: "Pineapple" },
				{ y: 68, label: "Pears" },
				{ y: 28, label: "Grapes" },
				{ y: 34, label: "Lychee" },
				{ y: 14, label: "Jackfruit" }
			]
		}]
	});
    
  

	chart.render();
    }

    public loadScript(url: string) {
      const body = <HTMLDivElement> document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = url;
      script.async = false;
      script.defer = true;
      body.appendChild(script);
    }
  


  // displayedColumns: string[] = ['position', 'Title', 'Views', 'Rating'];
  // dataSource = ELEMENT_DATA;
  // constructor() { }

  // ngOnInit() {
  // }

  getContent(){

  }

}
