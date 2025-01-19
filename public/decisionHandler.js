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

  const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your desired URL
  window.open(url, "_blank"); // Opens in a new tab
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
  chosenOptionElement.innerHTML = "<span class='static-label'>Suggestion:</span> "; // Reset with static label
  chosenOptionElement.appendChild(dynamicElement); // Add the dynamic part
  
  cyclingInterval = setInterval(() => {
    const chosen = suggestions[currentIndex];
    //document.getElementById("chosenOption").textContent = `Suggestion: ${chosen}`;
    dynamicElement.textContent = chosen;
    createFloatingOption(chosen); 
    currentIndex = (currentIndex + 1) % suggestions.length;
  }, 200); // Change every 200ms
}

function getRandomColor(isInContainer) {
  const colors = ["	#ffffff", " #bfbfbf", " #7f7f7f", " #404040", " #000000"];
  const colorIndex = Math.floor(Math.random() * colors.length);
  if (isInContainer && colorIndex > 0) {
    colorIndex = colorIndex - 1;
  }
  return colors[colorIndex];
  // return "080808"
}

function createFloatingOption(text) {
  const floatingOption = document.createElement("span");
  floatingOption.textContent = text;
  floatingOption.className = "floating-option";

  document.body.appendChild(floatingOption);
  const optionRect = floatingOption.getBoundingClientRect();
  const optionWidth = optionRect.width;
  const optionHeight = optionRect.height;

  // Get the container's dimensions
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();
  

  let x, y, isInContainer;
  /*
  do {
    x = Math.random() * window.innerWidth;
    y = Math.random() * window.innerHeight; 
  } while (
    x > containerRect.left && x < containerRect.right && // Inside container horizontally
    y > containerRect.top && y < containerRect.bottom // Inside container vertically
  );
  */
  x = Math.random() * (window.innerWidth - optionWidth);
  y = Math.random() * (window.innerHeight - optionHeight);

  isInContainer = x > containerRect.left && x < containerRect.right && y > containerRect.top && y < containerRect.bottom;

  if (isInContainer && Math.random() > 0.5) {
    return ;
  }

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
    radius: 180,
    maxSpeed: "fast",
    initSpeed: "normal",
    direction: 360,
    keep: true,
    reverseDirection: true,
  });
}