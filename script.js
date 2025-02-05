async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user message in chat
    addMessage(userInput, "user-message");

    // Clear input field
    document.getElementById("user-input").value = "";

    // Fetch AI response from Together AI API (or any AI API)
    let aiResponse = await fetchAIResponse(userInput);

    // Display AI response in chat
    addMessage(aiResponse, "ai-message");
}

function addMessage(text, className) {
    let chatBox = document.getElementById("chat-box");
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    
    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Fetch AI response from API
async function fetchAIResponse(userInput) {
    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY" // Replace with your Together AI API key
        },
        body: JSON.stringify({
            model: "mistral-7b", // Change model if needed
            messages: [{"role": "user", "content": userInput}]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content || "Sorry, I couldn't generate a response.";
}
