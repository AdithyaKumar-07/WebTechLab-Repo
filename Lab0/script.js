document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        const studentName = document.getElementById('studentName');
        const studentMailId = document.getElementById('studentMailId');
        const studentMobileNo = document.getElementById('studentMobileNo');
        const studentRegNo = document.getElementById('studentRegNo')
        
        const nameError = document.getElementById('nameError');
        const mailError = document.getElementById('mailError');
        const mobileError = document.getElementById('mobileError');
        const regNoError = document.getElementById('regNoError')


        function clearErrors() {
            nameError.textContent = '';
            mailError.textContent = '';
            mobileError.textContent = '';
            regNoError.textContent = '';
        }

        function validateForm() {
            clearErrors();
            let isValid = true;
            
            if (studentName.value.trim() === '') {
                nameError.textContent = 'Student Name is required.';
                isValid = false;
            }

            const requiredDomain = '@vitapstudent.ac.in';
            const emailValue = studentMailId.value.trim();
            if (emailValue === '' || !emailValue.endsWith(requiredDomain)) {
                mailError.textContent = `Mail ID must be a valid email and end with ${requiredDomain}`;
                isValid = false;
            }

            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(studentMobileNo.value.trim())) {
                mobileError.textContent = 'Mobile Number must be exactly 10 digits.';
                isValid = false;
            }

            const regNoRegex = /^\d{2}[A-Z]{3,4}\d{4,5}$/;
            const regNoValue = studentRegNo.value.trim();
            if(!regNoRegex.test(regNoValue)) {
                regNoError.textContent = 'Invalid Registration Number Format must be 2 digits, 3 letters and 4-5 digits (e.g., 23BCE7208).';
                isValid = false;
            }


            return isValid;
        }

        // Form Submission Event Listener
        loginForm.addEventListener('submit', (e) => {
            if (!validateForm()) {
                e.preventDefault();
                alert('Please correct the errors in the form.');
            } else {
                e.preventDefault(); 
                alert('Form submitted successfully! (Data would typically be sent to a server now)');
                window.location.href = 'index.html'; 
            }
        });

        loginForm.addEventListener('reset', () => {
            setTimeout(clearErrors, 50); 
        });
    }
});