import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

private id;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        setTimeout(() => {
        this.router.navigate(['/book-details', this.id]);
  }, 2000);
  }

}
