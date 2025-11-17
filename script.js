document.addEventListener('DOMContentLoaded', () => {

    const dt = document.getElementById('datetime');
    setInterval(() => {
        dt.textContent = new Date().toLocaleString('en-MY', {
            weekday:'long', year:'numeric', month:'long', day:'numeric',
            hour:'2-digit', minute:'2-digit', second:'2-digit',
            hour12:true, timeZoneName:'short'
        }).replace(', ',' at ');
    }, 1000);

    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.onclick = e => {
            e.preventDefault();
            document.querySelector(a.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
    });

    document.getElementById('registrationForm').onsubmit = e => {
        e.preventDefault();
        let ok = true;

        document.querySelectorAll('#registrationForm [required]').forEach(f => {
            if (!f.value && f.type !== 'radio') { ok = false; f.style.borderColor = 'red'; }
            else f.style.borderColor = '#ddd';
        });
        if (!document.querySelector('input[name="gender"]:checked')) {
            ok = false; alert('Please select gender');
        }
        const email = document.getElementById('email').value;
        if (email && !/.+@.+\..+/.test(email)) {
            ok = false; alert('Invalid email');
        }
        if (ok) {
            alert('Registration Successful!\nWelcome to FitPulse!');
            location.reload();
        } else {
            alert('Please fill all fields correctly');
        }
    };
});