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

let eventsData = [];
fetch("data/events.json")
    .then(res => res.json())
    .then(data => eventsData = data);

document.getElementById("showEvents").addEventListener("click", () => {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const filteredEvents = eventsData.filter(e => e.month === month && e.year === year);

    const timelineDiv = document.getElementById("timeline");
    timelineDiv.innerHTML = "";

    if (filteredEvents.length === 0) {
        timelineDiv.innerHTML = "<p>No events found for this date.</p>";
        return;
    }

    filteredEvents.forEach(e => {
        const card = document.createElement("div");
        card.classList.add("timeline-card");
        card.innerHTML = `
            <h3>${e.day ? e.day + " " : ""}${months[e.month-1]} ${e.year}</h3>
            <p>${e.description}</p>
        `;
        timelineDiv.appendChild(card);
    });
});

document.getElementById("startQuiz").addEventListener("click", () => {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const filteredEvents = eventsData.filter(e => e.month === month && e.year === year);

    if (filteredEvents.length < 1) {
        document.getElementById("quizContainer").innerHTML = "<p>No quiz available for this date.</p>";
        return;
    }

    let quizHTML = "";
    filteredEvents.forEach((event, i) => {
        let options = [event.year];
        while (options.length < 4) {
            let randomYear = 1900 + Math.floor(Math.random() * 126);
            if (!options.includes(randomYear)) options.push(randomYear);
        }
        options = options.sort(() => Math.random() - 0.5);

        quizHTML += `<div class="quiz-question">Q${i+1}: In which year did this happen?<br>"${event.description}"</div>`;
        options.forEach(opt => {
            quizHTML += `<button class="quiz-option" data-answer="${event.year}">${opt}</button>`;
        });
    });

    document.getElementById("quizContainer").innerHTML = quizHTML;

    document.querySelectorAll(".quiz-option").forEach(btn => {
        btn.addEventListener("click", () => {
            if (parseInt(btn.textContent) === parseInt(btn.dataset.answer)) {
                btn.style.background = "green";
            } else {
                btn.style.background = "red";
            }
        });
    });
});
