const usernameInput = document.getElementById('username');
const statusMsg = document.getElementById('statusMsg');
const loader = document.getElementById('loader');
const regForm = document.getElementById('regForm');

let isUsernameValid = false; 

usernameInput.addEventListener('input', async () => {
    const username = usernameInput.value.trim().toLowerCase();
    
    if (username.length < 3) {
        statusMsg.textContent = "";
        isUsernameValid = false;
        return;
    }

    loader.style.display = "inline";
    statusMsg.textContent = "";

    try {
        const response = await fetch('users.json');
        const data = await response.json();
        
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
        }, 400);
    } catch (err) {
        console.error("Fetch error:", err);
    }
});

regForm.addEventListener('submit', (e) => {
    if (!isUsernameValid) {
        e.preventDefault();
        alert("Please choose a valid, available username first!");
    } else {
        alert("Form submitted successfully!");
    }
});
