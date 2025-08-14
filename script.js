document.addEventListener("DOMContentLoaded", function () {
    const monthSelect = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const yearList = document.getElementById("yearList");
    const resultsContainer = document.getElementById("results");

    const monthMap = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    };

    // Populate month dropdown
    Object.keys(monthMap).forEach(month => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Populate year suggestions
    const uniqueYears = [...new Set(events.map(e => e.year))].sort((a, b) => a - b);
    uniqueYears.forEach(y => {
        const option = document.createElement("option");
        option.value = y;
        yearList.appendChild(option);
    });

    // Search function
    document.getElementById("searchBtn").addEventListener("click", function () {
        const selectedMonthName = monthSelect.value;
        const selectedMonthNum = monthMap[selectedMonthName];
        const selectedYear = parseInt(yearInput.value);

        resultsContainer.innerHTML = "";

        if (!selectedMonthNum || isNaN(selectedYear)) {
            resultsContainer.innerHTML = "<p>Please select a month and enter a valid year</p>";
            return;
        }

        const results = events.filter(e =>
            parseInt(e.month) === selectedMonthNum &&
            parseInt(e.year) === selectedYear
        );

        if (results.length > 0) {
            results.forEach((event, index) => {
                const item = document.createElement("div");
                item.classList.add("event-item");
                item.innerHTML = `<strong>${index + 1}. ${event.day ? event.day + " " : ""}${selectedMonthName} ${event.year}</strong>: ${event.description}`;
                resultsContainer.appendChild(item);
            });
        } else {
            resultsContainer.innerHTML = "<p>No results found</p>";
        }
    });

    // Discover random event
    document.getElementById("discoverBtn").addEventListener("click", function () {
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        const monthName = Object.keys(monthMap).find(key => monthMap[key] === randomEvent.month);
        resultsContainer.innerHTML = `<strong>${randomEvent.day} ${monthName} ${randomEvent.year}</strong>: ${randomEvent.description}`;
    });

    // Quiz feature
    document.getElementById("quizBtn").addEventListener("click", function () {
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        const userAnswer = prompt(`In which year did this happen?\n"${randomEvent.description}"`);
        if (parseInt(userAnswer) === randomEvent.year) {
            alert("✅ Correct!");
        } else {
            alert(`❌ Wrong! It happened in ${randomEvent.year}`);
        }
    });
});
