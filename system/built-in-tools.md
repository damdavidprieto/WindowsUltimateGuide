# 🧰 Herramientas Nativas Potentes

Windows incluye utilidades muy potentes que suelen estar algo escondidas.

## 1. Monitor de Recursos (`resmon`)
Mucho más detallado que el Administrador de Tareas. Muestra uso en tiempo real de Disco, Red y Memoria por proceso.

## 2. Diagnóstico de Memoria (`mdsched`)
Programa un reinicio para comprobar si tu RAM tiene errores físicos.

## 3. Monitor de Confiabilidad (`perfmon /rel`)
Muestra una línea de tiempo de cada fallo, actualización y error que ha ocurrido en tu PC.

## 4. Informes de Energía y Batería (`powercfg`)
- `powercfg /batteryreport`: genera `battery-report.html` con la **salud de la batería**, su capacidad real frente a la original y el historial de uso.
- `powercfg /energy`: ejecútalo como administrador para diagnosticar problemas de **eficiencia energética** (drivers o procesos que impiden la suspensión, etc.).

## 5. Sensor de Almacenamiento
Ve a `Configuración > Sistema > Almacenamiento`. Limpia automáticamente archivos temporales y la papelera.

## 6. Grabar la pantalla para tutoriales o informes de errores
La antigua *Grabación de acciones de usuario* (`psr`) está **obsoleta** y Microsoft la está retirando. En su lugar:
- `Win` + `Shift` + `R`: graba un vídeo de una zona de la pantalla con Recortes.
- `Win` + `Alt` + `R`: graba la ventana activa con la Xbox Game Bar.

Más atajos en [Capturas y Grabación](../hotkeys/screenshots.md).

## 7. Espacio aislado de Windows (Sandbox)
(Windows 11 Pro, Enterprise o Education; no está en Home). Un entorno virtual desechable para probar archivos sospechosos sin infectar tu sistema. Actívalo en "Activar o desactivar las características de Windows".

---
[⬅️ Volver al Inicio](../README.md)
