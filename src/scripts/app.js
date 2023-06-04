import * as plansMod from "./plans.js"
import * as addOnsMod from "./addOns.js"

const nextBtn = document.getElementById("nextBtn")
const steps = [...document.querySelectorAll(".step")]
const titleDiv = document.getElementById("titleDiv")
const contentDiv = document.getElementById("mainDiv")
let monthlyPayment = true
let stepNumber = 0
const stepContent = new Map()

stepContent.set("0", [
  `
  <h1>Personal info</h1>
  <p>Please provide your name, email, address and phone number</p>
  `,
  `
  <div class="infoDivs">
    <label for="name">Name</label>
    <input type="text" id="name" placeholder="e.g. Stephen King">
  </div>
  <div class="infoDivs">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="e.g. stephenking@lorem.com">
  </div>
  <div class="infoDivs">
    <label for="phoneNumber">Phone Number</label>
    <input type="number" id="phoneNumber" placeholder="e.g. +1 234 567 890">
  </div>
  `,
])

stepContent.set("1", [
  `
  <h1>Select your plan</h1>
  <p>You have the option of monthly or yearly billing</p>
  `,
  `
  <div class="plan active-plan">
    <div id="arcade">
      <img src="./assets/images/icon-arcade.svg" alt="" srcset="">
      <p class="plan-name">Arcade</p>
      <p class="plan-price">$9/Monthly</p>
    </div>
  </div>
  <div class="plan">
    <div id="advanced">
      <img src="./assets/images/icon-advanced.svg" alt="" srcset="">
      <p class="plan-name">Advanced</p>
      <p class="plan-price">$12/Monthly</p>
    </div>
  </div>
  <div class="plan">
    <div id="pro">
      <img src="./assets/images/icon-pro.svg" alt="" srcset="">
      <p class="plan-name">Pro</p>
      <p class="plan-price">$15/Monthly</p>
    </div>
  </div>
  <div class="month-year-div">
    <p id="monthly" class="active-paying-time">Monthly</p>
    <div id="mnth-year-togg" class="toggler-mnth"></div>
    <p id="yearly">Yearly</p>
  </div>
  `,
])

stepContent.set("2", [
  `
  <h1>Pick add-ons</h1>
  <p>Add-ons help enhance your gaming experience.</p>
  `,
  `
  <div class="addOn">
    <div class="square"></div>
    <div class="addOn__info">
      <p class="addOn__info__title">Online service</p>
      <p class="addOn__info__details">Access to multiplayer games</p>
    </div>
    <p class="addOn__price">+1$/mo</p>
  </div>
  <div class="addOn">
    <div class="square"></div>
    <div class="addOn__info">
      <p class="addOn__info__title">Larger storage</p>
      <p class="addOn__info__details">Extra 1TB of cloud save</p>
    </div>
    <p class="addOn__price">+2$/mo</p>
  </div>
  <div class="addOn">
    <div class="square"></div>
    <div class="addOn__info">
      <p class="addOn__info__title">Customizable profile</p>
      <p class="addOn__info__details">Custom theme on your profile</p>
    </div>
    <p class="addOn__price">+2$/mo</p>
  </div>
  `,
])

stepContent.set("3", [
  `
  <h1>Finishing up</h1>
  <p>Double-check everything looks OK before confirming.</p>
  `,
  `
  <div>
    <label for="name">Name</label>
    <input type="text" id="name">
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email">
  </div>
  <div>
    <label for="phoneNumber">Phone Number</label>
    <input type="number" id="phoneNumber">
  </div>
  `,
])

function changeContent() {
  if (stepNumber == 0) {
    titleDiv.innerHTML = stepContent.get("0")[0]
    contentDiv.innerHTML = stepContent.get("0")[1]
  } else if (stepNumber == 1) {
    titleDiv.innerHTML = stepContent.get(`1`)[0]
    contentDiv.innerHTML = stepContent.get(`1`)[1]
    const plans = new plansMod.plans(
      document.getElementById("mnth-year-togg"),
      document.getElementById("monthly"),
      document.getElementById("yearly"),
      document.getElementById("arcade"),
      document.getElementById("pro"),
      document.getElementById("advanced"),
      monthlyPayment,
      document.querySelectorAll(".plan-price")
    )
    plans.arcade.addEventListener("click", plans.setActive.bind(plans))
    plans.pro.addEventListener("click", plans.setActive.bind(plans))
    plans.advanced.addEventListener("click", plans.setActive.bind(plans))
    plans.toggler.addEventListener("click", plans.pricingTimeHandler.bind(plans))
  } else if (stepNumber == 2) {
    const addOns = new addOnsMod.addOns(monthlyPayment)
    titleDiv.innerHTML = stepContent.get(`2`)[0]
    contentDiv.innerHTML = stepContent.get(`2`)[1]
  } else if (stepNumber == 3) {
    titleDiv.innerHTML = stepContent.get(`3`)[0]
    contentDiv.innerHTML = stepContent.get(`3`)[1]
  }
}

function stepsHandler() {
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].classList.contains("active")) {
      if (steps[i + 1]) {
        steps[i].classList.toggle("active")
        steps[i + 1].classList.toggle("active")
        stepNumber = i + 1
        changeContent()
        break
      } else {
        steps[i].classList.toggle("active")
        steps[0].classList.toggle("active")
        stepNumber = 0
        changeContent()
        break
      }
    } else {
      continue
    }
  }
}

changeContent()
nextBtn.addEventListener("click", stepsHandler)