import * as stepsMod from "./steps.js"

localStorage.clear()

const nextBtn = document.getElementById("nextBtn")
const steps = [...document.querySelectorAll(".step")]
const titleDiv = document.getElementById("titleDiv")
const contentDiv = document.getElementById("mainDiv")
let totalPrice = 0
const pricesPlan = [[9, 90], [12, 120], [15, 150]]
const pricesAddOns = [[1, 10], [1, 10], [2, 20]]
const stepContentObj = new stepsMod.Steps()

function getNextStep() {
  if (steps[2].classList.contains("active")) {
    nextBtn.textContent = "Confirm"
  }
  else {
    nextBtn.textContent = "Next Step"
  }

  if (steps[3].classList.contains("active")) {
    changeContent(4)
    nextBtn.remove()
    return
  }

  for (let i = 0; i <= steps.length; i++) {
    if (steps[i].classList.contains("active")) {
      if (!errorHandling(i)) {
        i--
        break
      }
      gatherData(i)
      changeStepCircle(i)
      changeContent(i + 1)
      activateCta(i + 1)
      break
    } else {
      continue
    }
  }
}

function errorHandling(activeIndx) {
  if (activeIndx == 0) {
    let name = document.getElementById("name").value.trim()
    let mail = document.getElementById("email").value.trim()
    let phone = document.getElementById("phoneNumber").value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const phoneRegex = /^\d+$/;
    console.log(name, mail, phone);

    if(nameRegex.test(name)) {
      document.querySelector(".error-name").classList.remove("error-active")
      if(emailRegex.test(mail)) {
        document.querySelector(".error-mail").classList.remove("error-active")
        if(phoneRegex.test(phone)) {
          document.querySelector(".error-number").classList.remove("error-active")
        }
        else {
          document.querySelector(".error-number").classList.add("error-active")
          return false
        }
      }
      else {
        document.querySelector(".error-mail").classList.add("error-active")
        return false
      }
    }
    else {
      document.querySelector(".error-name").classList.add("error-active")
      return false
    }
  }

  return true
}

function activateCta(activeIndx) {
  if (activeIndx == 0) {
    return
  } else if (activeIndx == 1) {
    document
      .querySelector("#mnth-year-togg")
      .addEventListener("click", changePaymentState)
    document.querySelectorAll(".plan").forEach((plan) => {
      plan.addEventListener("click", changeActivePlan)
    })
    return
  } else if (activeIndx == 2) {
    document.querySelectorAll(".addOn").forEach((addOn) => {
      addOn.addEventListener("click", activateAddOn)
    })
    if (localStorage.getItem("paymentTime") == "yearly") {
      let time = document.querySelectorAll(".paymentTime")
      time.forEach((element, indx) => {
        element.textContent = "Yearly"
        element.closest(".addOn").attributes.localStorageItemPrice.value = `${pricesAddOns[indx][1]}`
        element.closest(".addOn").querySelector(".addOn__price").querySelector("span").textContent = `${pricesAddOns[indx][1]}`
      })
    }
    else {
      return
    }
    return
  } else if (activeIndx == 3) {
    showRecipt()
    if (localStorage.getItem("paymentTime") == "yearly") {
      let time = document.querySelectorAll(".paymentTime")
      time.forEach((element) => {
        element.textContent = "Yearly"
      })
    }
    else {
      return
    }
    document.getElementById("change").addEventListener("click", resetPlan)
    return
  }
}

function resetPlan() {
  totalPrice = 0
  nextBtn.textContent = "Next Step"
  steps.forEach((step, indx) => {
    step.classList.remove("active")
    if(indx == 1) {
      step.classList.add("active")
    }
  })
  changeContent(1)
  activateCta(1)
}


function gatherData(activeIndx) {
  if (activeIndx == 0) {
    return
  } else if (activeIndx == 1) {
    let price = document
      .querySelector(".active-plan")
      .querySelector(".plan-price")
      .textContent.split("")
      .filter((item) => {
        const regex = /^[0-9]$/
        return regex.test(item)
      })
      .join("")
    totalPrice += parseInt(price)
    localStorage.setItem("active-plan", [
      document.querySelector(".active-plan").querySelector("div").id,
      price,
    ])
    if (
      document.querySelector("#mnth-year-togg").classList[0] == "toggler-mnth"
    ) {
      localStorage.setItem("paymentTime", "monthly")
    } else {
      localStorage.setItem("paymentTime", "yearly")
    }
    return
  } else if (activeIndx == 2) {
    document.querySelectorAll(".active-addOn").forEach((addOn, indx) => {
      localStorage.setItem(
        `addOn${indx}`,
        addOn.attributes.getNamedItem("localstorageitem").value
      )
      localStorage.setItem(
        `addOnPrice${indx}`,
        addOn.attributes.getNamedItem("localstorageitemPrice").value
      )
      // console.log(addOn.attributes.getNamedItem("localstorageitemPrice").value);
      totalPrice += parseInt(
        addOn.attributes.getNamedItem("localstorageitemPrice").value
      )
    })
    return
  } else if (activeIndx == 3) {
    return
  }
}

function showRecipt() {
  document.querySelector(".recipt__plan__currentPlan").textContent = `${
    makeRecipt()[1]
  } (${makeRecipt()[2]})`
  if (makeRecipt()[2] == "monthly") {
    document.querySelector(".recipt__plan__price").textContent = `$${
      makeRecipt()[0]
    }/mo`
  } else {
    document.querySelector(".recipt__plan__price").textContent = `$${
      makeRecipt()[0]
    }/year`
  }
  document.querySelector(".recipt__addOns-div").innerHTML = ``
  let addOn = document.createElement("div")
  addOn.classList.add("recipt__addOns")
  for (let i = 0; i < 3; i++) {
    if (localStorage.getItem(`addOn${i}`)) {
      let clonedAddOn = addOn.cloneNode(true)
      clonedAddOn.innerHTML = `
      <p class="recipt__label">${localStorage.getItem(`addOn${i}`)}</p>
      <p class="recipt__addOns__price">$${localStorage.getItem(
        `addOnPrice${i}`
      )}/<span class="paymentTime">Monthly</span></p>
      `
      document.querySelector(".recipt__addOns-div").append(clonedAddOn)
    }
  }
  document.querySelector(
    ".recipt__total__price"
  ).textContent = `$${totalPrice}/${
    localStorage.getItem("paymentTime") == "monthly" ? "mo" : "year"
  }`
}

function makeRecipt() {
  let price = localStorage
    .getItem("active-plan")
    .split("")
    .filter((item) => {
      const regex = /^[0-9]$/
      return regex.test(item)
    })
    .join("")
  let plan = localStorage
    .getItem("active-plan")
    .split("")
    .filter((item) => {
      const regex = /^[a-z]$/
      return regex.test(item)
    })
    .join("")
  let paymentTime = localStorage.getItem("paymentTime")
  return [price, plan, paymentTime]
}

function changeStepCircle(circleIndx) {
  steps[circleIndx + 1].classList.add("active")
  steps[circleIndx].classList.remove("active")
}

function changeContent(indxOfContent) {
  titleDiv.innerHTML = stepContentObj.stepContent.get(`${indxOfContent}`)[0]
  contentDiv.innerHTML = stepContentObj.stepContent.get(`${indxOfContent}`)[1]
}

function changePaymentState(e) {
  e.target.classList.toggle("toggler-mnth")
  e.target.classList.toggle("toggler-year")
  let time = document.querySelectorAll(".paymentTime")
  time.forEach((element, indx) => {
    if (e.target.classList.contains("toggler-mnth")) {
      element.textContent = "Monthly"
      document.getElementById("monthly").classList.add("active-paying-time")
      document.getElementById("yearly").classList.remove("active-paying-time")
      element.closest(".plan").querySelector("div").attributes.planPrice.value = `${pricesPlan[indx][0]}`
      element.closest(".plan").querySelector(".plan-price").querySelector("span").textContent = `${pricesPlan[indx][0]}`
    } else {
      element.textContent = "Yearly"
      document.getElementById("monthly").classList.remove("active-paying-time")
      document.getElementById("yearly").classList.add("active-paying-time")
      element.closest(".plan").querySelector("div").attributes.planPrice.value = `${pricesPlan[indx][1]}`
      element.closest(".plan").querySelector(".plan-price").querySelector("span").textContent = `${pricesPlan[indx][1]}`
    }
  })
}

function changeActivePlan(e) {
  document.querySelectorAll(".plan").forEach((plan) => {
    if (plan.classList.contains("active-plan")) {
      plan.classList.remove("active-plan")
    }
  })
  e.target.closest(".plan").classList.add("active-plan")
}

function activateAddOn(e) {
  e.target.closest(".addOn").classList.toggle("active-addOn")
  e.target
    .closest(".addOn")
    .querySelector(".square")
    .classList.toggle("active-square")
}

changeContent(0)
nextBtn.addEventListener("click", getNextStep)
