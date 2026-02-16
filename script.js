// Retrieve stored data or initialize empty array
let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

// Save data to localStorage
function saveToStorage() {
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

// FORM HANDLING
let form = document.getElementById("customerForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let hours = document.getElementById("hours").value;
    let service = document.getElementById("service").value;
    let errorMsg = document.getElementById("errorMsg");

    if (name === "" || hours <= 0) {
      errorMsg.textContent = "Please enter valid details.";
      return;
    }

    let costPerHour = service === "PlayStation" ? 100 : 50;
    let totalCost = hours * costPerHour;

    let newSession = {
      name,
      hours,
      service,
      totalCost
    };

    sessions.push(newSession);
    saveToStorage();

    form.reset();
    errorMsg.textContent = "Session saved successfully!";
  });
}

// DISPLAY SESSIONS
let sessionList = document.getElementById("sessionList");

if (sessionList) {
  sessions.forEach(session => {
    let li = document.createElement("li");
    li.textContent =
      `${session.name} - ${session.service} - ${session.hours} hrs - Ksh ${session.totalCost}`;
    sessionList.appendChild(li);
  });
}

// DASHBOARD TOTAL
let totalCustomers = document.getElementById("totalCustomers");

if (totalCustomers) {
  totalCustomers.textContent = sessions.length;
}
