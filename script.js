// Formulario de Registro - BUGS CORREGIDOS
// Actividad Práctica: Ciclo Completo de Depuración

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Limpiar mensajes de error previos
        clearErrors();

        // Obtener valores del formulario
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const birthdate = document.getElementById('birthdate').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phone').value.trim();

        let isValid = true;

        // Validar nombre completo
        if (!validateFullName(fullName)) {
            showError('nameError', 'El nombre debe tener al menos 3 caracteres');
            isValid = false;
        }

        // Validar email
        if (!validateEmail(email)) {
            showError('emailError', 'Por favor ingrese un email válido');
            isValid = false;
        }

        // Validar edad (mayor de 18 años)
        if (!validateAge(birthdate)) {
            showError('birthdateError', 'Debe ser mayor de 18 años');
            isValid = false;
        }

        // Validar fortaleza de contraseña
        if (!validatePassword(password)) {
            showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
            isValid = false;
        }

        // Comparar contraseñas
        if (!comparePasswords(password, confirmPassword)) {
            showError('confirmPasswordError', 'Las contraseñas no coinciden');
            isValid = false;
        }

        // Validar teléfono (opcional)
        if (phone && !validatePhone(phone)) {
            showError('phoneError', 'Formato de teléfono inválido');
            isValid = false;
        }

        if (isValid) {
            showSuccess(fullName, email, birthdate, phone);
        }
    });
});

function validateFullName(name) {
    return name.length >= 3;
}

// CORREGIDO: Validación de email mejorada
// Ahora requiere dominio con extensión (ej: .com, .es, etc.)
function validateEmail(email) {
    // Regex corregida - requiere formato: usuario@dominio.extensión
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// CORREGIDO: Cálculo de edad preciso
// Ahora considera año, mes y día completos para verificar edad
function validateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);

    // Calcular edad considerando mes y día
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Ajustar si no ha cumplido años este año
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    // Ahora permite usuarios con 18 años o más
    return age >= 18;
}

// CORREGIDO: Validación de contraseña completa
// Ahora verifica TODOS los requisitos: mayúsculas, minúsculas y números
function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }

    // Verificar todos los requisitos de fortaleza
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    // Retornar true solo si cumple todos los requisitos
    return hasUpperCase && hasLowerCase && hasNumber;
}

// CORREGIDO: Comparación de contraseñas correcta
function comparePasswords(password, confirmPassword) {
    // Usa comparación estricta (===) y lógica correcta
    return password === confirmPassword;
}

function validatePhone(phone) {
    // Validación básica de teléfono (opcional, sin bugs intencionados)
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;

    const inputId = elementId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.textContent = '');

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('error'));
}

function showSuccess(name, email, birthdate, phone) {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const userData = document.getElementById('userData');

    // Calcular edad
    const birth = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();

    userData.innerHTML = `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${birthdate}</p>
        <p><strong>Edad:</strong> ${age} años</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
    `;

    form.style.display = 'none';
    successMessage.style.display = 'block';
}
