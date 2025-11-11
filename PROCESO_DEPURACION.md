# Proceso de Depuración - Formulario de Registro

## Técnicas de Depuración Utilizadas
1. ✅ Análisis de código estático
2. ✅ console.log() para trazar valores
3. ✅ Pruebas manuales con casos de prueba
4. ✅ Análisis de lógica booleana
5. ✅ Revisión de expresiones regulares

---

## Bug #1: Validación de Email Incorrecta

### Investigación
**Ubicación:** script.js:56-60

**Código Original:**
```javascript
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
}
```

**Proceso de Depuración:**
1. **Prueba manual:** Intenté registrar con email "test@com"
2. **Resultado:** El formulario lo aceptó como válido ❌
3. **console.log() agregado:**
   ```javascript
   console.log('Email ingresado:', email);
   console.log('¿Es válido?:', emailRegex.test(email));
   ```
4. **Análisis de regex:**
   - `/^[^\s@]+@[^\s@]+$/` solo requiere: algo + @ + algo
   - No valida que después del @ haya un dominio con punto
   - Ejemplos que pasa incorrectamente: "test@com", "user@localhost"

**Solución Identificada:**
```javascript
function validateEmail(email) {
    // Regex mejorada que requiere dominio.extensión
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
```

---

## Bug #2: Validación de Edad Incorrecta

### Investigación
**Ubicación:** script.js:65-73

**Código Original:**
```javascript
function validateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    return age > 18;
}
```

**Proceso de Depuración:**
1. **Prueba manual:** Fecha de nacimiento: 15/11/2007 (hoy es 11/11/2025)
2. **Resultado:** El formulario lo aceptó (edad = 18 años) ❌
3. **console.log() agregado:**
   ```javascript
   console.log('Fecha de nacimiento:', birthdate);
   console.log('Edad calculada:', age);
   console.log('Fecha de hoy:', today);
   console.log('¿Ha cumplido años este año?:', today.getMonth() > birth.getMonth());
   ```
4. **Problemas identificados:**
   - Solo resta años, no considera mes/día
   - Usa `> 18` en lugar de `>= 18`
   - Usuario de 18 años y 364 días es rechazado incorrectamente

**Solución Identificada:**
```javascript
function validateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Ajustar si no ha cumplido años este año
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age >= 18;
}
```

---

## Bug #3: Validación de Contraseña No Verifica Mayúsculas

### Investigación
**Ubicación:** script.js:78-88

**Código Original:**
```javascript
function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLowerCase && hasNumber;
}
```

**Proceso de Depuración:**
1. **Prueba manual:** Contraseña "password123" (sin mayúsculas)
2. **Resultado:** El formulario lo aceptó ❌
3. **console.log() agregado:**
   ```javascript
   console.log('Contraseña:', password);
   console.log('Longitud:', password.length);
   console.log('Tiene minúsculas:', hasLowerCase);
   console.log('Tiene números:', hasNumber);
   console.log('Tiene MAYÚSCULAS:', /[A-Z]/.test(password));
   ```
4. **Problema identificado:**
   - El mensaje de error menciona mayúsculas
   - Pero el código NO verifica mayúsculas
   - Falta la variable `hasUpperCase`

**Solución Identificada:**
```javascript
function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber;
}
```

---

## Bug #4: Comparación de Contraseñas con Lógica Invertida

### Investigación
**Ubicación:** script.js:91-95

**Código Original:**
```javascript
function comparePasswords(password, confirmPassword) {
    return password == confirmPassword ? false : true;
}
```

**Proceso de Depuración:**
1. **Prueba manual:** Ambas contraseñas "Password123"
2. **Resultado:** Muestra error "Las contraseñas no coinciden" ❌
3. **console.log() agregado:**
   ```javascript
   console.log('Password 1:', password);
   console.log('Password 2:', confirmPassword);
   console.log('¿Son iguales?:', password === confirmPassword);
   console.log('Resultado función:', password == confirmPassword ? false : true);
   ```
4. **Análisis de lógica:**
   ```
   Si password === confirmPassword (CORRECTO):
     Función retorna: false ❌ (debería retornar true)

   Si password !== confirmPassword (INCORRECTO):
     Función retorna: true ❌ (debería retornar false)
   ```
5. **Problemas identificados:**
   - Operador ternario invertido
   - Usa `==` en lugar de `===` (débil comparación)

**Solución Identificada:**
```javascript
function comparePasswords(password, confirmPassword) {
    return password === confirmPassword;
}
```

---

## Resumen de Técnicas Aplicadas

| Bug | Técnica de Depuración | Herramienta |
|-----|----------------------|-------------|
| #1 | Análisis de regex, console.log() | DevTools Console |
| #2 | Análisis de fechas, console.log() | DevTools Console |
| #3 | Análisis de expresiones, console.log() | DevTools Console |
| #4 | Análisis de lógica booleana, console.log() | DevTools Console |

---

## Notas del Desarrollador

**Breakpoints sugeridos:**
- script.js:58 - Validación de email
- script.js:70 - Cálculo de edad
- script.js:84 - Validación de contraseña
- script.js:92 - Comparación de contraseñas

**Variables a observar en DevTools:**
- `email` y resultado de `emailRegex.test()`
- `age`, `today`, `birth` en validateAge()
- `hasUpperCase`, `hasLowerCase`, `hasNumber` en validatePassword()
- `password` y `confirmPassword` en comparePasswords()

---

**Responsable de Depuración:** Desarrollador Asignado
**Fecha:** 2025-11-11
**Estado:** Depuración completada ✅
