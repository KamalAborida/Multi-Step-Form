export class addOns {
  monthlyPay

  constructor(monthlyPay) {
    this.monthlyPay = monthlyPay
    this.pricingTimeHandler()
  }

  setActive(e) {

  }

  pricingTimeHandler() {
    console.log("Work", this.monthlyPay);
    if (this.monthlyPay) {
      // CHange to yearly
      this.monthlyPay = false
      let prices = [10, 20, 20]
      console.log(document.querySelectorAll(".addOn__price"));
      document.querySelectorAll(".addOn__price").forEach((element, indx) => {
        element.textContent = `+${prices[indx]}$/year`
      })
    } else {
      // CHange to monthly
      this.monthlyPay = true
      let prices = [1, 2, 2]
      document.querySelectorAll(".addOn__price").forEach((element, indx) => {
        element.textContent = `+${prices[indx]}$/mo`
      })
    }
  }
}
