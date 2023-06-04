export class plans {
  toggler
  monthly
  yearly
  arcade
  pro
  advanced
  monthlyPay
  planPrices

  constructor(
    toggler,
    monthly,
    yearly,
    arcade,
    pro,
    advanced,
    monthlyPay,
    planPrices
  ) {
    this.toggler = toggler
    this.monthly = monthly
    this.yearly = yearly
    this.arcade = arcade
    this.pro = pro
    this.advanced = advanced
    this.monthlyPay = monthlyPay
    this.planPrices = planPrices
  }

  setActive(e) {
    let plansArr = [arcade, pro, advanced]
    plansArr.forEach((plan) => {
      if (plan == e.target.closest(".plan").querySelector("div")) {
        plan.closest(".plan").classList.add("active-plan")
      } else {
        plan.closest(".plan").classList.remove("active-plan")
      }
    })
  }

  pricingTimeHandler() {
    if (this.monthlyPay) {
      // CHange to yearly
      this.monthlyPay = false
      let prices = [90, 120, 150]
      this.planPrices.forEach((element, indx) => {
        element.textContent = `$${prices[indx]}/Year`
      })
    } else {
      // CHange to monthly
      this.monthlyPay = true
      let prices = [9, 12, 15]
      this.planPrices.forEach((element, indx) => {
        element.textContent = `$${prices[indx]}/Monthly`
      })
    }
    this.toggler.classList.toggle("toggler-mnth")
    this.monthly.classList.toggle("active-paying-time")
    this.toggler.classList.toggle("toggler-year")
    this.yearly.classList.toggle("active-paying-time")
  }
}
