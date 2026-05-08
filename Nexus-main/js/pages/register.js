import AuthService from '../services/AuthService.js';
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                await AuthService.register(name, email, password);
                alert('Registro existoso');
                window.location.href = 'login.html';
            }
            catch (error) {
                alert(error.message);
            }
        });
    }
}); 