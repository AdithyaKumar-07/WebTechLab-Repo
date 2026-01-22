const surveySchema = [
    {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        max: 50
    },
    {
        id: "satisfaction",
        type: "radio",
        label: "Rate your experience (1-5)",
        options: ["1", "2", "3", "4", "5"],
        required: true
    },
    {
        id: "features",
        type: "checkbox",
        label: "Which features did you use? (Select at least 2)",
        options: ["Dashboard", "Reports", "Chat", "API"],
        required: true,
        minSelection: 2
    }
];

function renderForm() {
    const container = document.getElementById('formContainer');
    
    surveySchema.forEach(q => {
        const qBlock = document.createElement('div');
        qBlock.className = 'question-block';
        qBlock.innerHTML = `<label>${q.label}${q.required ? ' *' : ''}</label>`;
        
        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = q.id;
            input.id = q.id;
            if (q.max) input.maxLength = q.max;
            qBlock.appendChild(input);
        } else if (q.type === 'radio' || q.type === 'checkbox') {
            q.options.forEach(opt => {
                const label = document.createElement('label');
                label.style.fontWeight = 'normal';
                const input = document.createElement('input');
                input.type = q.type;
                input.name = q.id;
                input.value = opt;
                label.appendChild(input);
                label.appendChild(document.createTextNode(opt));
                qBlock.appendChild(label);
            });
        }

        const errorSpan = document.createElement('span');
        errorSpan.className = 'error';
        errorSpan.id = `error-${q.id}`;
        qBlock.appendChild(errorSpan);
        
        container.appendChild(qBlock);
    });
}

document.getElementById('dynamicSurveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    surveySchema.forEach(q => {
        const errorEl = document.getElementById(`error-${q.id}`);
        errorEl.style.display = 'none';
        errorEl.innerText = '';
        
        if (q.type === 'text') {
            const input = document.getElementById(q.id);
            if (q.required && input.value.trim() === '') {
                showError(errorEl, "This field is required.");
                isValid = false;
            } else if (q.max && input.value.length > q.max) {
                showError(errorEl, `Maximum ${q.max} characters allowed.`);
                isValid = false;
            }
        } else if (q.type === 'radio') {
            const checked = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !checked) {
                showError(errorEl, "Please select an option.");
                isValid = false;
            }
        } else if (q.type === 'checkbox') {
            const checked = document.querySelectorAll(`input[name="${q.id}"]:checked`);
            if (q.required && checked.length === 0) {
                showError(errorEl, "Please select at least one option.");
                isValid = false;
            } else if (q.minSelection && checked.length < q.minSelection) {
                showError(errorEl, `Please select at least ${q.minSelection} options.`);
                isValid = false;
            }
        }
    });
    
    if (isValid) {
        alert("Form submitted successfully!");
    }
});

function showError(el, message) {
    el.innerText = message;
    el.style.display = 'block';
}

renderForm();
