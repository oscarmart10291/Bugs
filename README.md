# Actividad Práctica: Ciclo Completo de Depuración

## Objetivo
Aplicar un ciclo completo de gestión y depuración de bugs en un entorno colaborativo real, experimentando cada etapa del proceso profesional.

## Descripción del Proyecto
Esta es una aplicación web de formulario de registro de usuarios que contiene bugs intencionalmente introducidos para practicar el ciclo completo de depuración.

## Estructura del Proyecto
```
/
├── index.html              # Página principal con formulario de registro
├── script.js               # Lógica de validación (BUGS CORREGIDOS)
├── styles.css              # Estilos de la aplicación
├── README.md               # Este archivo
├── BUGS_DETECTADOS.md      # Documentación detallada de bugs
├── PROCESO_DEPURACION.md   # Técnicas y proceso de depuración
└── VERIFICACION.md         # Casos de prueba y verificación
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

## Ciclo de Depuración - COMPLETADO ✅
Este proyecto ha completado todas las etapas del ciclo profesional:

### 1. Simular un Bug ✅
Se introdujeron 4 bugs realistas:
- Validación de email incorrecta
- Cálculo de edad con error off-by-one
- Validación de contraseña incompleta
- Comparación de contraseñas con lógica invertida

Ver detalles en: `BUGS_DETECTADOS.md`

### 2. Registrar el Bug ✅
Documentación completa de cada bug con:
- Descripción detallada
- Severidad (Alta/Media/Crítica)
- Pasos para reproducir
- Resultado esperado vs resultado actual
- Ubicación exacta en el código

### 3. Asignar Responsable ✅
Bugs asignados y priorizados según severidad.

### 4. Depurar ✅
Técnicas aplicadas:
- console.log() para trazar valores
- Análisis de expresiones regulares
- Análisis de lógica booleana
- Revisión de cálculos de fechas

Ver proceso completo en: `PROCESO_DEPURACION.md`

### 5. Verificar ✅
Verificación completa con:
- 18 casos de prueba específicos
- 3 pruebas de integración
- 5 pruebas de regresión
- 4 pruebas de edge cases
- **Resultado: 100% de casos pasados**

Ver reporte completo en: `VERIFICACION.md`

---

> "Depurar es entender lo que uno mismo escribió, y verificar es confirmar que el usuario lo entenderá también."
