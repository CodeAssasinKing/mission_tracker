document.addEventListener("DOMContentLoaded", function () {
    const missionsContainer = document.getElementById("missions");
    const loadingIndicator = document.getElementById("loading");

    const loadMissions = (endpoint) => {
        loadingIndicator.style.display = 'block';
        missionsContainer.innerHTML = "";  // Clear existing missions

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                loadingIndicator.style.display = 'none';

                data.forEach((mission) => {
                    const missionElement = document.createElement("div");
                    missionElement.className = "mission";

                    const missionName = document.createElement("h2");
                    missionName.innerText = `Mission: ${mission.name}`;

                    const launchDate = document.createElement("p");
                    launchDate.innerText = `Launch Date: ${new Date(mission.date_utc).toLocaleDateString()}`;

                    const rocketName = document.createElement("p");
                    rocketName.innerText = `Rocket: ${mission.rocket}`;

                    const missionImage = document.createElement("img");
                    missionImage.src = mission.links.patch.small || 'default_image.jpg';  // Placeholder if no image

                    missionElement.appendChild(missionName);
                    missionElement.appendChild(launchDate);
                    missionElement.appendChild(rocketName);
                    missionElement.appendChild(missionImage);

                    // Add mission details (optional)
                    if (mission.details) {
                        const missionDetails = document.createElement("p");
                        missionDetails.innerText = `Details: ${mission.details}`;
                        missionElement.appendChild(missionDetails);
                    }

                    // Add link to live stream (if available)
                    if (mission.links.webcast) {
                        const webcastLink = document.createElement("a");
                        webcastLink.href = mission.links.webcast;
                        webcastLink.innerText = "Watch Live";
                        webcastLink.target = "_blank";
                        webcastLink.classList.add('webcast-link');
                        missionElement.appendChild(webcastLink);
                    }

                    missionsContainer.appendChild(missionElement);
                });
            })
            .catch((error) => {
                missionsContainer.innerHTML = `<h2>Error loading missions: ${error.message}</h2>`;
            });
    };

    // Load upcoming missions on page load
    loadMissions("https://api.spacexdata.com/v4/launches/upcoming");

    // Event listeners for buttons
    document.getElementById("upcomingBtn").addEventListener("click", () => {
        loadMissions("https://api.spacexdata.com/v4/launches/upcoming");
    });

    document.getElementById("pastBtn").addEventListener("click", () => {
        loadMissions("https://api.spacexdata.com/v4/launches/past");
    });
});
