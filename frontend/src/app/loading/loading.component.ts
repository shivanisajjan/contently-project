import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(() => {
        this.router.navigate(['/book-details']);
  }, 2000);
  }

}
