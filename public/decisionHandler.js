let cyclingInterval; // Store the interval for cycling suggestions

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
    currentIndex = (currentIndex + 1) % suggestions.length; 
  }, 50); // Change every 200ms
}

document.getElementById("stopBtn").addEventListener("click", () => {
  clearInterval(cyclingInterval); 
  document.getElementById("stopBtn").style.display = "none"; 
});