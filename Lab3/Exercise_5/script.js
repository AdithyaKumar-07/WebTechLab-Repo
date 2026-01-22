const workflowState = {
    currentStep: 0,
    totalSteps: 4,
    data: {}
};

const form = document.getElementById('workflow-form');
const stages = document.querySelectorAll('.stage');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressBar = document.getElementById('progress-bar');
const reviewContent = document.getElementById('review-content');

function updateUI() {
    stages.forEach((s, i) => s.classList.toggle('active', i === workflowState.currentStep));
    
    const progressPercent = ((workflowState.currentStep + 1) / workflowState.totalSteps) * 100;
    progressBar.style.width = `${progressPercent}%`;

    prevBtn.disabled = workflowState.currentStep === 0;
    nextBtn.innerText = workflowState.currentStep === workflowState.totalSteps - 1 ? 'Submit' : 'Next';

    if (workflowState.currentStep === 3) populateReview();
}

function validateStage() {
    const currentFields = stages[workflowState.currentStep].querySelectorAll('input, select');
    let isStepValid = true;

    currentFields.forEach(field => {
        if (!field.checkValidity()) {
            field.reportValidity(); 
            isStepValid = false;
        } else workflowState.data[field.name] = field.value;
    });
    return isStepValid;
}

function populateReview() {
    reviewContent.innerHTML = Object.entries(workflowState.data)
        .map(([key, val]) => `<p><strong>${key}:</strong> ${val}</p>`)
        .join('');
}

nextBtn.addEventListener('click', () => {
    if (validateStage()) {
        if (workflowState.currentStep < workflowState.totalSteps - 1) {
            workflowState.currentStep++;
            updateUI();
        } else {
            console.log('Final Submission Data:', workflowState.data);
            alert('Form Submitted! Check console for stored data.');
        }
    }
});

prevBtn.addEventListener('click', () => {
    if (workflowState.currentStep > 0) {
        workflowState.currentStep--;
        updateUI();
    }
});

form.addEventListener('submit', (e) => e.preventDefault());
