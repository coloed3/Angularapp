import { AfterViewInit, Input, ViewChild, Component } from "@angular/core";
import { PaymentService } from "../payment.service";

@Component({
  selector: "app-payment-request",
  templateUrl: "./payment-request.component.html",
  styleUrls: ["./payment-request.component.scss"]
})
export class PaymentRequestComponent implements AfterViewInit {
  @Input() amount: number;
  @Input() label: string;

  elements: any;
  paymentRequest: any;
  prButton: any;

  @ViewChild("payElement") payElement;

  constructor(private pmt: PaymentService) {}
  ngAfterViewInit(): void {
    this.paymentRequest = this.pmt.stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        amount: this.amount,
        label: this.label
      }
    });

    //  initalize elements
    this.elements = this.pmt.stripe.elements();

    // 3. register listener
    this.paymentRequest.on("source", async event => {
      console.log(event);

      setTimeout(() => {
        event.complete("success");
      }, 1000);
    });

    // create payment request button
    this.prButton = this.elements.create("paymentRequestButton", {
      paymentRequest: this.paymentRequest,
      style: {
        paymentRequestButton: {
          type: "buy",
          theme: "dark"
        }
      }
    });
    this.mountButton();
  }

  async mountButton() {
    const result = await this.paymentRequest.canMakePayment();
    if (result) {
      this.prButton.amount(this.payElement.nativeElement);
    } else {
      console.error("Your browser is old.");
    }
  }
}
