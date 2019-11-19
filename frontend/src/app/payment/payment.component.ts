import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public boook;
  handler: any;
  private id;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }


  private invalidfeedback: string;

  chargeCreditCard(num, exp, cvv) {
    this.router.navigateByUrl(`/loading`);
    const arr = exp.split('/', 2);
    ( window as any).Stripe.card.createToken({
      number: num,
      exp_month: arr[0],
      exp_year: arr[1],
      cvc: cvv
    }, (status: number, response: any) => {
      if (status === 200) {
        const token = response.id;
        console.log(token);
        this.invalidfeedback = '';
        // this.router.navigate(['/loading']).then();



        this.chargeCard(token);
      } else {
        console.log(response.error.message);
        this.invalidfeedback = response.error.message;

      }
    });
  }


  chargeCard(token: string) {
    const header = {
      // tslint:disable-next-line: object-literal-key-quotes
      'token': token,
      // tslint:disable-next-line: object-literal-key-quotes
      'amount': '20000'

    };
    const httpOptions = {
      headers: header
    };
    // tslint:disable-next-line: object-literal-shorthand
    const headers = new Headers({token: token, amount: '100'});
    this.http.post('http://13.126.150.171:8080/purchasing-service/api/v1/payment', {}, httpOptions)
      .subscribe(resp => {

        console.log('RESP = ', resp);

      });
  }




  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.loadStripe();

  }


  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = ( window as any).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token(token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            console.log('Payment Success!!');
          }
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
