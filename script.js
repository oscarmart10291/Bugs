// Formulario de Registro con Bugs Intencionados
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

        // BUG 1: Validación de email incorrecta
        if (!validateEmail(email)) {
            showError('emailError', 'Por favor ingrese un email válido');
            isValid = false;
        }

        // BUG 2: Validación de edad incorrecta
        if (!validateAge(birthdate)) {
            showError('birthdateError', 'Debe ser mayor de 18 años');
            isValid = false;
        }

        // BUG 3: Validación de fortaleza de contraseña incorrecta
        if (!validatePassword(password)) {
            showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
            isValid = false;
        }

        // BUG 4: Comparación de contraseñas incorrecta
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

// BUG 1: La expresión regular no valida correctamente el email
// Permite emails sin punto después del @, o sin dominio apropiado
function validateEmail(email) {
    // Esta regex es incorrecta - permite emails inválidos como "test@com" o "test@."
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
}

// BUG 2: Error en el cálculo de edad (off-by-one error)
// Permite que usuarios con exactamente 18 años pero que aún no han cumplido años este año pasen
function validateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);

    // BUG: Usa solo el año para calcular la edad, no considera mes y día
    let age = today.getFullYear() - birth.getFullYear();

    // Esta verificación es insuficiente
    return age > 18;
}

// BUG 3: Validación de contraseña incorrecta
// No verifica correctamente todos los requisitos
function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }

    // BUG: Falta verificar mayúsculas
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    // No verifica mayúsculas, pero el mensaje de error dice que es necesario
    return hasLowerCase && hasNumber;
}

// BUG 4: Comparación de contraseñas con operador incorrecto
function comparePasswords(password, confirmPassword) {
    // BUG: Usa == en lugar de ===, puede causar coerción de tipos
    // Además, tiene una lógica invertida
    return password == confirmPassword ? false : true;
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
