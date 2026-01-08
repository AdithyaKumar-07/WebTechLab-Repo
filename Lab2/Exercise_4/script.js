const registrationForm = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
const clearAllBtn = document.getElementById('clearAll');

let users = JSON.parse(localStorage.getItem('users')) || [];
displayUsers();

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        password: document.getElementById('password').value
    };

    if (newUser.mobile.length !== 10 || isNaN(newUser.mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }
    if (newUser.password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }
    if (users.some(user => user.email === newUser.email)) {
        alert("Email already registered!");
        return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    registrationForm.reset();
    displayUsers();
});

function displayUsers() {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
        </tr>`;
        userList.innerHTML += row;
    });
}

window.deleteUser = (index) => {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
};

clearAllBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all users?")) {
        users = [];
        localStorage.removeItem('users');
        displayUsers();
    }
});
