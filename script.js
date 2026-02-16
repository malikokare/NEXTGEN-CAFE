// ============================
// Global: Retrieve stored sessions
// ============================
let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

// ============================
// Save sessions to localStorage
// ============================
function saveToStorage() {
  localStorage.setItem("sessions", JSON.stringify(sessions));
}

// ============================
// FORM HANDLING: add.html
// ============================
let form = document.getElementById("customerForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let hours = parseFloat(document.getElementById("hours").value);
    let service = document.getElementById("service").value;
    let errorMsg = document.getElementById("errorMsg");

    // Input validation
    if (name === "" || isNaN(hours) || hours <= 0) {
      errorMsg.textContent = "Please enter valid details.";
      return;
    }

    // Calculate cost per service
    let costPerHour = service === "PlayStation" ? 100 : 50;
    let totalCost = hours * costPerHour;

    // Create session object
    let newSession = {
      name,
      hours,
      service,
      totalCost
    };

    // Save session
    sessions.push(newSession);
    saveToStorage();

    // Reset form & feedback
    form.reset();
    errorMsg.textContent = "Session saved successfully!";
  });
}

// ============================
// DISPLAY SESSIONS: sessions.html
// ============================
let sessionList = document.getElementById("sessionList");

if (sessionList) {
  sessionList.innerHTML = ""; // Clear existing list

  sessions.forEach((session, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <h3>${session.name}</h3>
      <p>Service: <strong>${session.service}</strong></p>
      <p>Hours Played: <strong>${session.hours}</strong></p>
      <p>Total Cost: <strong>Ksh ${session.totalCost}</strong></p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    sessionList.appendChild(li);
  });

  // ============================
  // DELETE SESSION BUTTON
  // ============================
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      let idx = parseInt(this.getAttribute("data-index"));
      sessions.splice(idx, 1);
      saveToStorage();
      location.reload(); // refresh the page to update list
    });
  });
}

// ============================
// DASHBOARD TOTAL: index.html
// ============================
let totalCustomers = document.getElementById("totalCustomers");

if (totalCustomers) {
  totalCustomers.textContent = sessions.length;

  // Optional: total earnings
  let totalEarnings = sessions.reduce((acc, s) => acc + s.totalCost, 0);
  let earningsDisplay = document.createElement("p");
  earningsDisplay.textContent = `Total Earnings: Ksh ${totalEarnings}`;
  totalCustomers.parentNode.appendChild(earningsDisplay);
}
