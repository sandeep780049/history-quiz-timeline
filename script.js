document.addEventListener("DOMContentLoaded", function () {
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");
    const resultsContainer = document.getElementById("results");

    // Month mapping
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

    // Populate year dropdown (adjust range as needed)
    for (let y = 1000; y <= 2025; y++) {
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    // Fetch events and set up search
    fetch("data/events.json")
        .then(response => response.json())
        .then(events => {
            document.getElementById("searchBtn").addEventListener("click", function () {
                const selectedMonthName = monthSelect.value;
                const selectedMonthNum = monthMap[selectedMonthName];
                const selectedYear = parseInt(yearSelect.value);

                const results = events.filter(e =>
                    e.month === selectedMonthNum && e.year === selectedYear
                );

                resultsContainer.innerHTML = "";

                if (results.length > 0) {
                    results.forEach((event, index) => {
                        const item = document.createElement("div");
                        item.classList.add("event-item");
                        item.innerHTML = `<strong>${index + 1}. ${event.day ? event.day + " " : ""}${selectedMonthName} ${event.year}</strong>: ${event.description}`;
                        resultsContainer.appendChild(item);
                    });
                } else {
                    resultsContainer.innerHTML = "<p>No result found</p>";
                }
            });
        })
        .catch(error => {
            console.error("Error loading events.json:", error);
        });
});
