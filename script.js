document.addEventListener('DOMContentLoaded', function() {
    // Button Interactions
    const colorChanger = document.getElementById('color-changer');
    const textToggler = document.getElementById('text-toggler');
    const toggleText = document.getElementById('toggle-text');
    
    // Change button color on click
    colorChanger.addEventListener('click', function() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.backgroundColor = randomColor;
        this.classList.add('celebrate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('celebrate');
        }, 500);
    });
    
    // Toggle text visibility
    textToggler.addEventListener('click', function() {
        toggleText.style.display = toggleText.style.display === 'none' ? 'block' : 'none';
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Secret Interaction (double-click)
    const secretBox = document.getElementById('secret-box');
    
    secretBox.addEventListener('dblclick', function() {
        this.classList.add('revealed');
        this.innerHTML = '<p>🎉 You found the secret! 🎉</p>';
        
        // Add confetti effect (simple version)
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.borderRadius = '50%';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-10px';
            confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    });
    
    // Add CSS for confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Form Validation
    const userForm = document.getElementById('user-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateUsername() {
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Username is required';
            return false;
        } else {
            usernameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value && passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }
    
    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            userForm.reset();
        } else {
            alert('Please fix the errors in the form');
        }
    });
    
    // Bonus: Keypress detection
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});
