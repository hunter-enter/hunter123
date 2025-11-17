document.addEventListener('DOMContentLoaded', function() {
    const datetimeElement = document.getElementById('datetime');
    
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        const formattedDate = now.toLocaleDateString('en-MY', options); 
        datetimeElement.textContent = formattedDate;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight; 
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[type="text"][required], input[type="email"][required], select[required]');
        
        function isChecked(name) {
            return document.querySelector(`input[name="${name}"]:checked`);
        }

        requiredFields.forEach(field => {
            field.style.borderColor = '#ddd';
        });

        requiredFields.forEach(field => {
            if (field.value.trim() === '' || (field.tagName === 'SELECT' && field.value === '')) {
                isValid = false;
                field.style.borderColor = 'red';
            }
        });
        
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField && emailField.value.trim() !== '' && !emailRegex.test(emailField.value.trim())) {
            isValid = false;
            emailField.style.borderColor = 'red';
            alert('Please enter a valid email address.');
        }

        if (!isChecked('gender')) {
            isValid = false;
            alert('Please select your gender.');
        }

        if (isValid) {
            const name = document.getElementById('name').value.trim();
            const goal = document.getElementById('goal').options[document.getElementById('goal').selectedIndex].text;
            
            alert(
                `Registration Successful,!\n\n` +
                `Welcome to the FitPulse Community! We're excited to help you on your journey. The page will now refresh.`
            );
            
            window.location.reload(); 
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });

    form.addEventListener('reset', function() {
        setTimeout(function() {
            form.querySelectorAll('input, select').forEach(field => {
                field.style.borderColor = '#ddd';
            });
        }, 100);
    });
});