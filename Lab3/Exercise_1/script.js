const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');
const skillsContainer = document.getElementById('skillsContainer');

roleSelect.addEventListener('change', () => {
    const role = roleSelect.value;
    const passHint = document.getElementById('passHint');
    skillsContainer.style.display = (role === 'Admin') ? 'none' : 'block';
    passHint.textContent = (role === 'Admin') 
        ? "Admin: Min 10 chars, 1 number, 1 special char" 
        : "Standard: Min 6 characters";
});

const setFeedback = (inputId, message, isValid) => {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(`${inputId}Error`);
    errorSpan.textContent = message;
    input.classList.toggle('invalid', !isValid);
};

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ['vitapstudent.ac.in', 'vitapscholar.ac.in', 'vitapfaculty.ac.in', 'registar.ac.in', 'vicechancellor.ac.in', 'chancellor.ac.in'];
    const domain = email.split('@')[1];
    return regex.test(email) && allowedDomains.includes(domain);
};

const validatePassword = (pass, role) => {
    if (role === 'Admin') {
        return pass.length >= 10 && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass);
    }
    return pass.length >= 6;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;
    if (document.getElementById('name').value.trim() === "") {
        setFeedback('name', "Name is required", false);
        isFormValid = false;
    }

    if (!validateEmail(document.getElementById('email').value)) {
        setFeedback('email', "Use a valid institutional email (e.g., @vitapstudent.ac.in)", false);
        isFormValid = false;
    }

    const pass = document.getElementById('password').value;
    const role = roleSelect.value;
    if (!validatePassword(pass, role)) {
        setFeedback('password', "Password does not meet role requirements", false);
        isFormValid = false;
    }

    if (pass !== document.getElementById('confirmPassword').value) {
        setFeedback('confirm', "Passwords do not match", false);
        isFormValid = false;
    }

    if (isFormValid) {
        alert("Registration Successful!");
        form.reset();
    }
});
