VERSIÓN CON BUGS ORIGINALES
============================

Esta carpeta contiene la versión ORIGINAL del formulario con los 4 bugs intencionados.

BUGS PRESENTES:
1. Validación de email incorrecta (permite "test@com")
2. Cálculo de edad incorrecto (solo considera año)
3. Validación de contraseña sin verificar mayúsculas
4. Comparación de contraseñas con lógica invertida

CÓMO ABRIR:
Abre index.html en tu navegador:
  file:///home/user/Bugs/version-con-bugs/index.html

CASOS DE PRUEBA PARA VER LOS BUGS:

Bug #1 - Probar email: "test@com" (será ACEPTADO incorrectamente)
Bug #2 - Probar fecha: 15/12/2007 (será ACEPTADO cuando no debería)
Bug #3 - Probar contraseña: "password123" (será ACEPTADO sin mayúsculas)
Bug #4 - Contraseñas IGUALES "Password123" (será RECHAZADO incorrectamente)

Compara esta versión con la del directorio padre para ver las diferencias.
