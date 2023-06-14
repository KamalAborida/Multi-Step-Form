export class Steps {
  stepContent

  constructor() {
    this.stepContent = new Map()

    this.stepContent.set("0", [
      `
      <h1>Personal info</h1>
      <p>Please provide your name, email, address and phone number</p>
      `,
      `
      <div class="infoDivs">
        <p class="error error-name">Wrong name format</p>
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="e.g. Stephen">
      </div>
      <div class="infoDivs">
        <p class="error error-mail">Incorrect email</p>
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="e.g. stephenking@lorem.com">
      </div>
      <div class="infoDivs">
        <p class="error error-number">Wrong number format</p>
        <label for="phoneNumber">Phone Number</label>
        <input type="number" id="phoneNumber" placeholder="e.g. +1 234 567 890">
      </div>
      `,
    ])
    
    this.stepContent.set("1", [
      `
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing</p>
      `,
      `
      <div class="plans-div">
        <div class="plan active-plan">
          <div id="arcade" planPrice="9">
            <img src="./assets/images/icon-arcade.svg" alt="" srcset="">
            <p class="plan-name">Arcade</p>
            <p class="plan-price">$<span>9</span>/<span class="paymentTime">Monthly</span></p>
          </div>
        </div>
        <div class="plan">
          <div id="advanced" planPrice="9">
            <img src="./assets/images/icon-advanced.svg" alt="" srcset="">
            <p class="plan-name">Advanced</p>
            <p class="plan-price">$<span>12</span>/<span class="paymentTime">Monthly</span></p>
          </div>
        </div>
        <div class="plan">
          <div id="pro" planPrice="15">
            <img src="./assets/images/icon-pro.svg" alt="" srcset="">
            <p class="plan-name">Pro</p>
            <p class="plan-price">$<span>15</span>/<span class="paymentTime">Monthly</span></p>
          </div>
        </div>
      </div>
      <div class="month-year-div">
        <p id="monthly" class="active-paying-time">Monthly</p>
        <div id="mnth-year-togg" class="toggler-mnth"></div>
        <p id="yearly">Yearly</p>
      </div>
      `,
    ])
    
    this.stepContent.set("2", [
      `
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>
      `,
      `
      <div class="addOn" localStorageItem="Online service" localStorageItemPrice="1">
        <div class="square"></div>
        <div class="addOn__info">
          <p class="addOn__info__title">Online service</p>
          <p class="addOn__info__details">Access to multiplayer games</p>
        </div>
        <p class="addOn__price">+<span>1</span>$/<span class="paymentTime">Monthly</span></p>
      </div>
      <div class="addOn" localStorageItem="Larger storage" localStorageItemPrice="2">
        <div class="square"></div>
        <div class="addOn__info">
          <p class="addOn__info__title">Larger storage</p>
          <p class="addOn__info__details">Extra 1TB of cloud save</p>
        </div>
        <p class="addOn__price">+<span>1</span>$/<span class="paymentTime">Monthly</span></p>
      </div>
      <div class="addOn" localStorageItem="Customizable profile" localStorageItemPrice="1">
        <div class="square"></div>
        <div class="addOn__info">
          <p class="addOn__info__title">Customizable profile</p>
          <p class="addOn__info__details">Custom theme on your profile</p>
        </div>
        <p class="addOn__price">+<span>2</span>$/<span class="paymentTime">Monthly</span></p>
      </div>
      `,
    ])
    
    this.stepContent.set("3", [
      `
      <h1>Finishing up</h1>
      <p>Double-check everything looks OK before confirming.</p>
      `,
      `
      <div class="recipt">
        <div class="recipt__plan">
          <p class="recipt__plan__currentPlan">arcade (<span class="paymentTime">Monthly</span>)</p>
          <a class="recipt__label link" id="change">change</a>
          <p class="recipt__plan__price">$9/<span class="paymentTime">Monthly</span></p>
        </div>
        <hr>
        <div class="recipt__addOns-div">
          <div class="recipt__addOns">
            <p class="recipt__label">Online service</p>
            <p class="recipt__addOns__price">$1/<span class="paymentTime">Monthly</span></p>
          </div>
          <div class="recipt__addOns">
            <p class="recipt__label">Large storage</p>
            <p class="recipt__addOns__price">$2/<span class="paymentTime">Monthly</span></p>
          </div>
        </div>
      </div>
      <div class="recipt__total">
        <p class="recipt__label">Total (<span class="paymentTime">Monthly</span>)</p>
        <p class="recipt__total__price">$12/<span class="paymentTime">Monthly</span></p>
      </div>
      `,
    ])
    
    this.stepContent.set("4", [
      `
      <div class="thank-img">
        <img src="./assets/images/icon-thank-you.svg">
      </div>
      <h1 class="thank-title">Thank you</h1>
      `,
      `
      <div class="thank-content">
        Thank you! Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free to email us
        at support@loremgaming.com.
      </div>
      `,
    ])
  }
}
