import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  stripe = Stripe("pk_test_LGRJm9pWXid1VFOZqsnGbbXR00Q19iR6vv");
  constructor() {}
}
