# Bugs Detectados en el Formulario de Registro

Este documento contiene la lista de bugs detectados durante las pruebas del formulario de registro.

---

## Bug #1: Validación de Email Incorrecta

### Severidad
🔴 **ALTA** - Permite registro de usuarios con emails inválidos

### Descripción
La validación del email permite emails con formato incorrecto que no deberían ser válidos.

### Pasos para Reproducir
1. Abrir `index.html` en el navegador
2. Ingresar los siguientes datos:
   - Nombre: "Juan Pérez"
   - Email: "test@com" (sin dominio apropiado)
   - Fecha de nacimiento: 01/01/2000
   - Contraseña: "Password123"
   - Confirmar contraseña: "Password123"
3. Hacer clic en "Registrarse"

### Resultado Esperado
El formulario debería mostrar error: "Por favor ingrese un email válido"

### Resultado Actual
El formulario acepta el email "test@com" como válido

### Ubicación del Bug
`script.js:56-60` - Función `validateEmail()`

### Causa Raíz
La expresión regular `/^[^\s@]+@[^\s@]+$/` es demasiado permisiva y no valida correctamente el formato de email (no requiere punto en el dominio).

---

## Bug #2: Validación de Edad Incorrecta

### Severidad
🟠 **MEDIA** - Permite registro de menores de 18 años

### Descripción
La validación de edad permite que usuarios de exactamente 18 años que aún no han cumplido años este año se registren, cuando no deberían poder hacerlo.

### Pasos para Reproducir
1. Abrir `index.html` en el navegador
2. Calcular una fecha que resulte en exactamente 18 años (por ejemplo, si hoy es 11/11/2025, usar 15/11/2007)
3. Ingresar los datos con esa fecha de nacimiento
4. Hacer clic en "Registrarse"

### Resultado Esperado
El formulario debería rechazar usuarios menores de 18 años o que tengan exactamente 18 pero no hayan cumplido años en el año actual

### Resultado Actual
El formulario solo considera el año, no el mes y día completos

### Ubicación del Bug
`script.js:65-73` - Función `validateAge()`

### Causa Raíz
El cálculo usa solo `today.getFullYear() - birth.getFullYear()` sin considerar mes y día. Además usa `> 18` en lugar de `>= 18`.

---

## Bug #3: Validación de Contraseña No Verifica Mayúsculas

### Severidad
🟠 **MEDIA** - Seguridad comprometida

### Descripción
El mensaje de error indica que la contraseña debe tener mayúsculas, pero la validación no verifica este requisito.

### Pasos para Reproducir
1. Abrir `index.html` en el navegador
2. Ingresar los siguientes datos:
   - Nombre: "Test User"
   - Email: "test@example.com"
   - Fecha de nacimiento: 01/01/2000
   - Contraseña: "password123" (sin mayúsculas)
   - Confirmar contraseña: "password123"
3. Hacer clic en "Registrarse"

### Resultado Esperado
El formulario debería mostrar error indicando que falta una mayúscula

### Resultado Actual
El formulario acepta la contraseña sin mayúsculas

### Ubicación del Bug
`script.js:78-88` - Función `validatePassword()`

### Causa Raíz
La función solo verifica minúsculas y números, pero no verifica mayúsculas:
```javascript
const hasLowerCase = /[a-z]/.test(password);
const hasNumber = /[0-9]/.test(password);
// Falta: const hasUpperCase = /[A-Z]/.test(password);
```

---

## Bug #4: Comparación de Contraseñas con Lógica Invertida

### Severidad
🔴 **CRÍTICA** - Funcionalidad completamente rota

### Descripción
La comparación de contraseñas tiene la lógica invertida: rechaza cuando las contraseñas coinciden y acepta cuando son diferentes.

### Pasos para Reproducir
1. Abrir `index.html` en el navegador
2. Ingresar todos los datos correctamente
3. En contraseña poner: "Password123"
4. En confirmar contraseña poner: "Password123" (idénticas)
5. Hacer clic en "Registrarse"

### Resultado Esperado
El formulario debería aceptar las contraseñas porque coinciden

### Resultado Actual
El formulario muestra error "Las contraseñas no coinciden" cuando SÍ coinciden

### Ubicación del Bug
`script.js:91-95` - Función `comparePasswords()`

### Causa Raíz
La lógica está invertida:
```javascript
return password == confirmPassword ? false : true;
```
Debería ser:
```javascript
return password === confirmPassword;
```

---

## Resumen de Bugs

| ID | Severidad | Ubicación | Estado |
|----|-----------|-----------|--------|
| #1 | 🔴 Alta | script.js:56-60 | Pendiente |
| #2 | 🟠 Media | script.js:65-73 | Pendiente |
| #3 | 🟠 Media | script.js:78-88 | Pendiente |
| #4 | 🔴 Crítica | script.js:91-95 | Pendiente |

---

**Fecha de Detección:** 2025-11-11
**Detectado por:** Equipo de Testing
**Versión:** 1.0.0
