async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Display user message in chat
    addMessage(userInput, "user-message");

    // Clear input field
    document.getElementById("user-input").value = "";

    // Fetch AI response
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

// Fetch AI response from Together AI using Mistral 7B
async function fetchAIResponse(userInput) {
    try {
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer a0c401a7e04b7c7ca48121f14f3e41cd59e8bdf5ba54ab33fa179b8d10adb02f" // Your actual API key
            },
            body: JSON.stringify({
                model: "mistral-7b",
                messages: [{"role": "user", "content": userInput}]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            return "Sorry, I couldn't generate a response.";
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Oops! AI is not responding. Check your API key.";
    }
}