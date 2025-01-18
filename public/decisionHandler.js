let cyclingInterval; // Store the interval for cycling suggestions
let floatingTimeouts = []; // Store timeouts for floating elements

askBtn.addEventListener("click", async () => {
  const userPrompt = userInput.value.trim();
  if (!userPrompt) return;

  progressBar.style.width = "0%";
  progressContainer.style.display = "block";

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

  floatingTimeouts.forEach((timeout) => clearTimeout(timeout));
  floatingTimeouts = [];

  document.getElementById("stopBtn").style.display = "none";
});



// Start cycling through suggestions
function startCyclingSuggestions(suggestions) {
  if (!suggestions.length) {
    document.getElementById("chosenOption").textContent = "No suggestions available.";
    return;
  }

  let currentIndex = 0;
  cyclingInterval = setInterval(() => {
    const chosen = suggestions[currentIndex];
    document.getElementById("chosenOption").textContent = `Suggestion: ${chosen}`;
    createFloatingOption(chosen); 
    currentIndex = (currentIndex + 1) % suggestions.length;
  }, 200); // Change every 200ms
}

function getRandomColor() {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFC300", "#DAF7A6", "#900C3F"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createFloatingOption(text) {
  const floatingOption = document.createElement("span");
  floatingOption.textContent = text;
  floatingOption.className = "floating-option";

  // Assign a random color
  floatingOption.style.color = getRandomColor();

  // Get the container's dimensions
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();

  let x, y;
  do {
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight; 
  } while (
    x > containerRect.left && x < containerRect.right && // Inside container horizontally
    y > containerRect.top && y < containerRect.bottom // Inside container vertically
  );

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
      radius: 180,
      maxSpeed: "fast",
      initSpeed: "normal",
      direction: 360,
      keep: true,
      reverseDirection: true,
  });
}