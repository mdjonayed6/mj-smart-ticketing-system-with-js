let coachClass = "Economy";
const allBtn = document.getElementsByClassName("seat-btn");
for (const btn of allBtn) {
  btn.addEventListener("click", function (event) {
    const seatId = event.currentTarget.querySelector("span").innerText;
    const result = getTargetedValue("seat-price");

    const selectedContainer = document.getElementById(
      "selected-ticket-details"
    );
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "font-semibold",
      "text-center",
      "justify-between"
    );
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");

    p1.innerText = seatId;
    p2.innerText = coachClass;
    p3.innerText = result;

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    selectedContainer.appendChild(div);
    updateTotalTicketPrice(result);
    updatedSeatCount();
  });
}

//updated total price
function updateTotalTicketPrice(value) {
  const ticketPrice = getTargetedValue("total-price");
  const sum = ticketPrice + parseInt(value);
  document.getElementById("total-price").innerText = sum;
}

// updated seat 
function updatedSeatCount (value){
  const seatCount = getTargetedValue("selected-seat");
  const update = seatCount + 1;
  document.getElementById("selected-seat").innerText = update;
}


function getTargetedValue(id) {
  const target = document.getElementById(id).innerText;
  const convertTargetedValue = parseInt(target);
  return convertTargetedValue;
}
