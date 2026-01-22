const surveyQuestions = [
    { id: "q1", title: "Full Name", type: "text", required: true, maxLen: 50 },
    { id: "q2", title: "Experience Level", type: "radio", options: ["Junior", "Mid", "Senior"], required: true },
    { id: "q3", title: "Skills", type: "checkbox", options: ["HTML", "CSS", "JS"], required: true },
    { id: "q4", title: "Feedback", type: "text", required: false, maxLen: 200 }
];

function renderForm() {
    const form = document.getElementById("dynamicSurvey");
    surveyQuestions.forEach(q => {
        const div = document.createElement("div");
        div.className = "form-group";
        
        const label = document.createElement("label");
        label.innerText = q.title + (q.required ? " *" : "");
        div.appendChild(label);

        if (q.type === "text") {
            const input = document.createElement("input");
            input.type = "text";
            input.name = q.id;
            input.dataset.required = q.required;
            input.dataset.maxLen = q.maxLen;
            div.appendChild(input);
        } else if (q.type === "radio" || q.type === "checkbox") {
            q.options.forEach(option => {
                const labelCheck = document.createElement("label");
                const input = document.createElement("input");
                input.type = q.type;
                input.name = q.id;
                input.value = option;
                if(q.required) input.dataset.required = true;
                
                labelCheck.appendChild(input);
                labelCheck.append(option);
                labelCheck.style.fontWeight = "normal";
                div.appendChild(labelCheck);
            });
        }

        const errorSpan = document.createElement("span");
        errorSpan.className = "error-message";
        errorSpan.id = `${q.id}-error`;
        div.appendChild(errorSpan);
        
        form.appendChild(div);
    });
}

function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    const form = event.target;

    document.querySelectorAll(".error-message").forEach(span => {
        span.style.display = "none";
        span.innerText = "";
    });
    document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));

    surveyQuestions.forEach(q => {
        const fieldGroup = document.querySelector(`[name="${q.id}"]`)?.parentElement;
        const errorSpan = document.getElementById(`${q.id}-error`);
        let fieldValid = true;
        let errorMessage = "";

        if (q.type === "text") {
            const input = form.elements[q.id];
            if (q.required && input.value.trim() === "") {
                fieldValid = false;
                errorMessage = "This field is required.";
            } else if (input.value.length > q.maxLen) {
                fieldValid = false;
                errorMessage = `Max length is ${q.maxLen}.`;
            }
        } else if (q.type === "radio") {
            const checked = form.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !checked) {
                fieldValid = false;
                errorMessage = "Please select an option.";
            }
        } else if (q.type === "checkbox") {
            const checked = form.querySelectorAll(`input[name="${q.id}"]:checked`);
            if (q.required && checked.length === 0) {
                fieldValid = false;
                errorMessage = "Select at least one option.";
            }
        }

        if (!fieldValid) {
            errorSpan.innerText = errorMessage;
            errorSpan.style.display = "block";
            errorSpan.style.color = "red";
            isValid = false;
        }
    });

    if (isValid) alert("Form submitted successfully!");
}

renderForm();
document.getElementById("dynamicSurvey").addEventListener("submit", validateForm);
