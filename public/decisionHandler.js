let cyclingInterval; // Store the interval for cycling suggestions
let floatingTimeouts = []; // Store timeouts for floating elements

askBtn.addEventListener("click", async () => {
  const userPrompt = userInput.value.trim();
  if (!userPrompt) return;
  
  progressBar.style.width = "0%";
  progressContainer.style.display = "block";

  // Stop any ongoing cycling interval before starting a new one
  clearInterval(cyclingInterval);
  cyclingInterval = null;

  let progress = 0;
  const progressInterval = setInterval(() => {
    if (progress < 90) {
      progress += 10;
      progressBar.style.width = `${progress}%`;
    }
  }, 200);

  try {
    const suggestions = await getSuggestions(userPrompt);

    progressBar.style.width = "100%";
    clearInterval(progressInterval);
    setTimeout(() => {
      progressContainer.style.display = "none";
    }, 500);

    displayTagCloud(suggestions);
    startCyclingSuggestions(suggestions);

    document.getElementById("stopBtn").style.display = "block";

    const staticLabel = document.querySelector(".static-label");
    if (staticLabel) {
      staticLabel.style.display = "inline"; // Make it visible
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    clearInterval(progressInterval);
    progressBar.style.width = "100%";
    progressBar.style.backgroundColor = "red";
    setTimeout(() => {
      progressContainer.style.display = "none";
    }, 2000);
  }
});

document.getElementById("stopBtn").addEventListener("click", () => {
  clearInterval(cyclingInterval); // Stop cycling suggestions
  cyclingInterval = null;

  const userPrompt = userInput.value.trim();
  if (!userPrompt) return;

  if (userPrompt === "Rickroll" || userPrompt === "Never gonna give you up" || userPrompt ===  "What should I input in this box?") {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your desired URL
    window.open(url, "_blank"); // Opens in a new tab
  }

  floatingTimeouts.forEach((timeout) => clearTimeout(timeout));
  floatingTimeouts = [];


  // Trigger firework animation
  triggerFireworkAnimation();

  document.getElementById("stopBtn").style.display = "none";

});



// Start cycling through suggestions
function startCyclingSuggestions(suggestions) {
  if (!suggestions.length) {
    document.getElementById("chosenOption").textContent = "No suggestions available.";
    return;
  }

  // Stop any existing cycling interval
  clearInterval(cyclingInterval);

  let currentIndex = 0;

  // Ensure only the choice text cycles
  const dynamicElement = document.createElement("span");
  dynamicElement.id = "dynamicChoice";
  dynamicElement.textContent = suggestions[currentIndex];

  // Add the static label if it doesn't exist
  const chosenOptionElement = document.getElementById("chosenOption");
  // chosenOptionElement.innerHTML = "<span class='static-label'>Suggestion:</span> "; // Reset with static label
  chosenOptionElement.appendChild(dynamicElement); // Add the dynamic part

  cyclingInterval = setInterval(() => {
    const chosen = suggestions[currentIndex];
    //document.getElementById("chosenOption").textContent = `Suggestion: ${chosen}`;
    dynamicElement.textContent = chosen;
    createFloatingOption(chosen);
    currentIndex = (currentIndex + 1) % suggestions.length;
  }, 80); // Change every 80
}

function getRandomColor(isInContainer) {
  const colors = ["	#ffffff", " #bfbfbf", " #7f7f7f", " #404040", " #000000"];
  const colorIndex = Math.floor(Math.random() * colors.length);
  if (isInContainer && colorIndex > 0 && Math.random > 0.05) {
    colorIndex = colorIndex - 1;
  }
  return colors[colorIndex];
  // return "080808"
}

function createFloatingOption(text) {
  const floatingOption = document.createElement("span");
  floatingOption.textContent = text;
  floatingOption.className = "floating-option";

  // Get the container's dimensions
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();


  let x, y, isInContainer;

  x = Math.random() * window.innerWidth;
  y = Math.random() * window.innerHeight;

  isInContainer = x > containerRect.left && x < containerRect.right && y > containerRect.top && y < containerRect.bottom;

  floatingOption.style.color = getRandomColor(isInContainer);
  floatingOption.style.left = `${x}px`;
  floatingOption.style.top = `${y}px`;

  document.body.appendChild(floatingOption);

  // Remove after 1-2 seconds
  const timeout = setTimeout(() => {
    floatingOption.remove();
  }, Math.random() * 1000 + 1000); // Random duration between 1-2 seconds

  floatingTimeouts.push(timeout); // Track this timeout
}



function displayTagCloud(wordsArray) {
  // Clear old cloud
  const cloudContainer = document.getElementById("cloud-container");
  cloudContainer.innerHTML = "";

  if (!wordsArray.length) {
    wordsArray = placeholderWords; // Use placeholder words if no suggestions
  }

  TagCloud("#cloud-container", wordsArray, {
    radius: 300,
    maxSpeed: "fast",
    initSpeed: "normal",
    direction: 360,
    keep: true,
    reverseDirection: true,
  });
}


function triggerFireworkAnimation() {
  const chosenOptionElement = document.getElementById("chosenOption");
  const optionRect = chosenOptionElement.getBoundingClientRect();

  // Create a firework container
  const fireworkContainer = document.createElement("div");
  fireworkContainer.className = "firework-container";

  // Position it centered around the suggestion
  fireworkContainer.style.left = `${optionRect.left + optionRect.width / 2}px`;
  fireworkContainer.style.top = `${optionRect.top + optionRect.height / 2}px`;

  // Append to body
  document.body.appendChild(fireworkContainer);

  // Generate particles in a circle
  const totalParticles = 20; // Adjust for more or fewer particles
  for (let i = 0; i < totalParticles; i++) {
    const angle = (i / totalParticles) * 2 * Math.PI; // Evenly distributed angles
    const particle = document.createElement("div");
    particle.className = "firework-particle";

    // Set custom properties for animation
    particle.style.setProperty("--angle", `${angle}rad`);
    particle.style.setProperty("--distance", "100px"); // Adjust the radius of the circle
    fireworkContainer.appendChild(particle);
  }

  // Remove firework container after animation
  setTimeout(() => {
    fireworkContainer.remove();
  }, 2000); // Match animation duration
}