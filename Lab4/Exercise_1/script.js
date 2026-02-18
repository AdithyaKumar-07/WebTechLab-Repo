const usernameInput = document.getElementById('username');
const statusMsg = document.getElementById('statusMsg');
const loader = document.getElementById('loader');
const regForm = document.getElementById('regForm');

let isUsernameValid = false; // Flag to track availability

usernameInput.addEventListener('input', async () => {
    const username = usernameInput.value.trim().toLowerCase();
    
    // Clear feedback if input is too short
    if (username.length < 3) {
        statusMsg.textContent = "";
        isUsernameValid = false;
        return;
    }

    // Show loading and clear old messages
    loader.style.display = "inline";
    statusMsg.textContent = "";

    try {
        // AJAX Fetch request to local JSON
        const response = await fetch('users.json');
        const data = await response.json();
        
        // Simulated server delay
        setTimeout(() => {
            loader.style.display = "none";
            
            if (data.existingUsernames.includes(username)) {
                statusMsg.textContent = "❌ Username already taken";
                statusMsg.className = "error";
                isUsernameValid = false;
            } else {
                statusMsg.textContent = "✅ Username available";
                statusMsg.className = "success";
                isUsernameValid = true;
            }
        }, 400); // 400ms delay for realism
    } catch (err) {
        console.error("Fetch error:", err);
    }
});

// Prevent submission if validation fails
regForm.addEventListener('submit', (e) => {
    if (!isUsernameValid) {
        e.preventDefault();
        alert("Please choose a valid, available username first!");
    } else {
        alert("Form submitted successfully!");
    }
});
