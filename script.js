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

    // Populate months
    Object.keys(monthMap).forEach(month => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Populate years
    for (let y = 1000; y <= 2025; y++) {
        const option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    // Load events
    fetch("data/events.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(events => {
            console.log("Loaded events:", events.length);

            document.getElementById("searchBtn").addEventListener("click", function () {
                const selectedMonthName = monthSelect.value;
                const selectedMonthNum = monthMap[selectedMonthName];
                const selectedYear = parseInt(yearSelect.value);

                console.log("Searching for:", selectedMonthName, selectedMonthNum, selectedYear);

                const results = events.filter(e =>
                    parseInt(e.month) === selectedMonthNum &&
                    parseInt(e.year) === selectedYear
                );

                console.log("Found results:", results);

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
