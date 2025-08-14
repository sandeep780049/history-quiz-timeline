// Populate dropdowns
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

months.forEach((m, i) => {
    const opt = document.createElement("option");
    opt.value = i + 1;
    opt.textContent = m;
    monthSelect.appendChild(opt);
});

for (let y = 1900; y <= 2025; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
}

// Load events
let eventsData = [];
fetch("data/events.json")
    .then(res => res.json())
    .then(data => eventsData = data);

document.getElementById("showEvents").addEventListener("click", () => {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);

    const filteredEvents = eventsData.filter(e => e.month === month && e.year === year);
    const list = document.getElementById("eventList");
    list.innerHTML = "";

    if (filteredEvents.length === 0) {
        list.innerHTML = "<li>No events found for this date.</li>";
        return;
    }

    filteredEvents.forEach((e, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${index + 1}. ${e.day ? e.day + " " : ""}${months[e.month-1]} ${e.year}:</strong> ${e.description}`;
        list.appendChild(li);
    });
});

// Quiz
document.getElementById("startQuiz").addEventListener("click", () => {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const filteredEvents = eventsData.filter(e => e.month === month && e.year === year);

    if (filteredEvents.length < 1) {
        document.getElementById("quizContainer").innerHTML = "<p>No quiz available for this date.</p>";
        return;
    }

    const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
    const question = `In which year did this happen: "${randomEvent.description}"?`;

    let options = [randomEvent.year];
    while (options.length < 4) {
        let randomYear = 1900 + Math.floor(Math.random() * 126);
        if (!options.includes(randomYear)) options.push(randomYear);
    }
    options = options.sort(() => Math.random() - 0.5);

    let quizHTML = `<p>${question}</p>`;
    options.forEach(opt => {
        quizHTML += `<button class="quizOption">${opt}</button>`;
    });

    document.getElementById("quizContainer").innerHTML = quizHTML;

    document.querySelectorAll(".quizOption").forEach(btn => {
        btn.addEventListener("click", () => {
            if (parseInt(btn.textContent) === randomEvent.year) {
                alert("Correct!");
            } else {
                alert("Wrong! Correct answer: " + randomEvent.year);
            }
        });
    });
});

