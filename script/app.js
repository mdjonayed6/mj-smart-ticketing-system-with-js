let coachClass = "Economy";
let prevSeatIds = [];
const allBtn = document.querySelectorAll(".seat-btn");
for (const btn of allBtn) {
  btn.addEventListener("click", seatSelection);
}

function seatSelection(event) {
  event.target.style.backgroundColor = "#1dd100";
  let seatId = event.currentTarget.innerText;
  let seatPrice = getTargetedValue("seat-price");

  if (prevSeatIds.includes(seatId)) {
    const selectedContainer = document.getElementById(
      "selected-ticket-details"
    );

    let idx = prevSeatIds.indexOf(seatId);
    selectedContainer.children[idx].remove();
    updateTotalTicketPrice(seatPrice, "sub");
    updatedSeatCount("sub");
    updatedLeftSeatCount("add");
    event.target.style.backgroundColor = "#f2f2f2";
    prevSeatIds.splice(idx, 1);
  } else {
    prevSeatIds.push(seatId);
    AddToTicketDetailContainer(seatId, seatPrice);
    updateTotalTicketPrice(seatPrice, "add");
    updatedSeatCount("add");
    updatedLeftSeatCount("sub");
  }

  updatedGrandTotalTicketPrice();
}

function AddToTicketDetailContainer(seatId, seatPrice) {
  const selectedContainer = document.getElementById("selected-ticket-details");
  const div = document.createElement("div");
  div.classList.add("flex", "font-semibold", "text-center", "justify-between");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");

  p1.innerText = seatId;
  p2.innerText = coachClass;
  p3.innerText = seatPrice;

  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);

  selectedContainer.appendChild(div);
}

// updated grand total amount
function updatedGrandTotalTicketPrice(status) {
  const totalCost = getTargetedValue("total-price"); //grand total calculation here
  if (status == undefined) {
    //coupon code apply start here
    document.getElementById("grand-total").innerText = totalCost;
  } else {
    const couponCode = document.getElementById("coupon-code").value;
    if (couponCode == "NEW15") {
      const discountAmount = totalCost * 0.15; //15% discount
      document.getElementById("grand-total").innerText =
        totalCost - discountAmount;
    } else if (couponCode == "Couple20") {
      const discountAmount = totalCost * 0.2; //20% discount
      document.getElementById("grand-total").innerText =
        totalCost - discountAmount;
    } else {
      alert("Please Enter Valid Coupon Code"); // coupon code apply ends here
    }
  }
}

//updated total price
function updateTotalTicketPrice(value, status) {
  const totalPrice = getTargetedValue("total-price");
  const updatedTotalPrice =
    status == "add"
      ? totalPrice + parseInt(value)
      : totalPrice - parseInt(value);
  document.getElementById("total-price").innerText = updatedTotalPrice;
}

// updated seat
function updatedSeatCount(status) {
  const seatCount = getTargetedValue("selected-seat");
  const update = status == "add" ? seatCount + 1 : seatCount - 1;
  document.getElementById("selected-seat").innerText = update;
}

// Left seat updated
function updatedLeftSeatCount(status) {
  const leftSeatCount = getTargetedValue("seat-left");
  const updateLeftSeat =
    status == "sub" ? leftSeatCount - 1 : leftSeatCount + 1;
  document.getElementById("seat-left").innerText = updateLeftSeat;
}

function getTargetedValue(id) {
  const target = document.getElementById(id).innerText;
  const convertTargetedValue = parseInt(target);
  return convertTargetedValue;
}
