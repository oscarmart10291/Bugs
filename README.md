# Actividad Práctica: Ciclo Completo de Depuración

## Objetivo
Aplicar un ciclo completo de gestión y depuración de bugs en un entorno colaborativo real, experimentando cada etapa del proceso profesional.

## Descripción del Proyecto
Esta es una aplicación web de formulario de registro de usuarios que contiene bugs intencionalmente introducidos para practicar el ciclo completo de depuración.

## Estructura del Proyecto
```
/
├── index.html      # Página principal con formulario de registro
├── script.js       # Lógica de validación (contiene bugs)
├── styles.css      # Estilos de la aplicación
└── README.md       # Este archivo
```

## Cómo Ejecutar
1. Abrir `index.html` en un navegador web
2. Completar el formulario de registro
3. Observar los comportamientos inesperados

## Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript (Vanilla)

## Funcionalidades
El formulario valida:
- Nombre completo (mínimo 3 caracteres)
- Correo electrónico (formato válido)
- Fecha de nacimiento (mayor de 18 años)
- Contraseña (mínimo 8 caracteres, mayúscula, minúscula y número)
- Confirmación de contraseña (debe coincidir)
- Teléfono (opcional, formato válido)

## Ciclo de Depuración
Este proyecto sigue las siguientes etapas:

### 1. Simular un Bug ✅
Se han introducido bugs realistas en la aplicación.

### 2. Registrar el Bug
Documentar errores encontrados en GitHub Issues.

### 3. Asignar Responsable
Designar miembro del equipo para corrección.

### 4. Depurar
Utilizar técnicas: console.log(), breakpoints, stack trace.

### 5. Verificar
Ejecutar pruebas de verificación post-corrección.

---

> "Depurar es entender lo que uno mismo escribió, y verificar es confirmar que el usuario lo entenderá también."
