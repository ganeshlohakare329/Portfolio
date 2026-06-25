/* ==========================================================================
   Lohakare Ganesh - Secure Contact Form Submissions & Input Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const toastContainer = document.getElementById('toastContainer');

    // Create Toast Popup helper
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span class="toast-text">${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger reflow for slide up transition
        setTimeout(() => toast.classList.add('show'), 50);
        
        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Input Sanitizer to prevent XSS and SQL Injection patterns (escaping special characters)
    function sanitizeInput(str) {
        if (!str) return '';
        return str
            .trim()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .replace(/;/g, '&#59;') // Block SQL query termination
            .replace(/--/g, '&#45;&#45;'); // Block SQL comments
    }

    // Email Pattern Validation
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('form_subject');
            const messageInput = document.getElementById('message');

            // Sanitize values
            const name = sanitizeInput(nameInput.value);
            const email = sanitizeInput(emailInput.value);
            const subject = sanitizeInput(subjectInput.value);
            const message = sanitizeInput(messageInput.value);

            // Validation checks
            if (name.length < 2) {
                showToast("Name must be at least 2 characters.", "error");
                nameInput.focus();
                return;
            }

            if (!isValidEmail(emailInput.value)) {
                showToast("Please enter a valid email address.", "error");
                emailInput.focus();
                return;
            }

            if (subject.length < 4) {
                showToast("Subject must be at least 4 characters.", "error");
                subjectInput.focus();
                return;
            }

            if (message.length < 10) {
                showToast("Message must be at least 10 characters.", "error");
                messageInput.focus();
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Submit securely to local backend server (which holds Gmail credentials safely in a dotenv environment)
            fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(async (response) => {
                const data = await response.json();
                if (response.status === 200) {
                    showToast("Message sent successfully via secure SMTP!", "success");
                    contactForm.reset();
                } else {
                    showToast(data.error || "Failed to send message. Redirecting to mailto client...", "error");
                    triggerMailtoFallback(name, email, subject, message);
                }
            })
            .catch(error => {
                console.error("Connection error to secure backend:", error);
                showToast("Backend offline. Redirecting to standard mail client...", "error");
                triggerMailtoFallback(name, email, subject, message);
            })
            .finally(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            });
        });
    }

    function triggerMailtoFallback(name, email, subject, message) {
        const mailtoLink = `mailto:ganeshlohakare329@gmail.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    }
});
