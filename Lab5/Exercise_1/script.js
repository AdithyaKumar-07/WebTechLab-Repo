let xmlDoc = null;

window.onload = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                xmlDoc = this.responseXML;
                if (!xmlDoc || xmlDoc.getElementsByTagName("parsererror").length > 0) {
                    showMessage("Error: Malformed XML file.", "error");
                } else {
                    displayEmployees();
                }
            } else {
                showMessage("Error: Could not load employees.xml.", "error");
            }
        }
    };
    xhr.send();
};

function displayEmployees() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    const employees = xmlDoc.getElementsByTagName("employee");

    if (employees.length === 0) {
        showMessage("No employee records found.", "error");
        return;
    }

    for (let i = 0; i < employees.length; i++) {
        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        const row = `<tr>
            <td>${id}</td><td>${name}</td><td>${dept}</td><td>${salary}</td>
            <td>
                <button onclick="updateSalary('${id}')">Update Salary</button>
                <button onclick="deleteEmployee('${id}')">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    }
}

function addEmployee() {
    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    if (!id || !name || !dept || !salary) {
        showMessage("All fields are required!", "error");
        return;
    }

    const newEmp = xmlDoc.createElement("employee");
    
    const idTag = xmlDoc.createElement("id");
    idTag.textContent = id;
    newEmp.appendChild(idTag);

    const nameTag = xmlDoc.createElement("name");
    nameTag.textContent = name;
    newEmp.appendChild(nameTag);

    const deptTag = xmlDoc.createElement("department");
    deptTag.textContent = dept;
    newEmp.appendChild(deptTag);

    const salTag = xmlDoc.createElement("salary");
    salTag.textContent = salary;
    newEmp.appendChild(salTag);

    xmlDoc.documentElement.appendChild(newEmp);
    displayEmployees();
    showMessage("Employee added successfully (In-memory)!", "success");

}

function updateSalary(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    let found = false;
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent === id) {
            const newSalary = prompt("Enter new salary:");
            if (newSalary) {
                employees[i].getElementsByTagName("salary")[0].textContent = newSalary;
                found = true;
                break;
            }
        }
    }
    if (found) {
        displayEmployees();
        showMessage("Salary updated!", "success");
    }

}

function deleteEmployee(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent === id) {
            employees[i].parentNode.removeChild(employees[i]);
            break;
        }
    }
    displayEmployees();
    showMessage("Employee deleted!", "success");

}

function showMessage(msg, type) {
    const msgEl = document.getElementById("message");
    msgEl.textContent = msg;
    msgEl.className = type;
}

function saveToFile() {
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_employees.php", true);
    xhr.setRequestHeader("Content-Type", "text/xml");

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
    };
    xhr.send(xmlString);
}