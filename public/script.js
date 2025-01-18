const placeholderWords = [
    "Time", "People", "Work", "Food", "Water", "Music", "Movies", "Travel", "Friends", "Family",
    "Sunshine", "Language", "Health", "Coffee", "Internet", "Books", "Nature", "Education", "Power", "Phone",
    "Laptop", "Ocean", "Forest", "Mountain", "Art", "History", "Culture", "Dance", "Party", "Happiness",
    "Freedom", "Dreams", "Reality", "Lightning", "Storm", "Rainbow", "Poetry", "Experience", "Cheese", "Wisdom"
  ];

const apiEndpoint = "/api/llm";

// Suggested prompts
const dropdownArrow = document.getElementById("dropdown-arrow");
const dropdownMenu = document.getElementById("dropdown-menu");
const userInput = document.getElementById("userInput");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");


dropdownArrow.addEventListener("mouseenter", () => {
  dropdownMenu.style.display = "block";
});
dropdownArrow.addEventListener("click", () => {
  dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

// Hide dropdown when mouse leaves
dropdownMenu.addEventListener("mouseleave", () => {
  dropdownMenu.style.display = "none";
});

// Fill input field with selected prompt
document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      userInput.value = e.target.textContent; 
      dropdownMenu.style.display = "none"; 
    });
});
  
document.addEventListener("DOMContentLoaded", () => {
    displayTagCloud([]);
  });

async function getSuggestions(prompt) {
    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }), // sending {prompt: "..." }
        });

        if (!response.ok) {
            console.error(Server returned an error: ", await response.text());
                return [];
        }
        
        const data = await response.json();
        if (!data.suggestions) return [];

        // "dimsum, rice, beef..."
        const arr = data.suggestions.split(",").map((i) => i.trim()).filter(Boolean);
        return arr;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
}

function displayTagCloud(wordsArray) {
    // Clear old cloud
    const cloudContainer = document.getElementById("cloud-container");
    cloudContainer.innerHTML = ""; 

    if (!wordsArray.length) {
        wordsArray = placeholderWords; // Use placeholder words if no suggestions
    }

    TagCloud("#cloud-container", wordsArray, {
        radius: 150,
        maxSpeed: "fast",
        initSpeed: "normal",
        direction: 360,
        keep: true,
        reverseDirection: true,
    });
}

// Random pick
function pickRandomSuggestion(suggestions) {
    if (!suggestions.length) {
        document.getElementById("chosenOption").textContent = "";
        return;
    }
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    const chosen = suggestions[randomIndex];
    document.getElementById("chosenOption").textContent = `Suggestion: ${chosen}`;
}

