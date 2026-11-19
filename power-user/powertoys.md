# 🚀 PowerToys: Superpoderes para Windows 11

[Microsoft PowerToys](https://learn.microsoft.com/es-es/windows/powertoys/) es un conjunto gratuito de utilidades para usuarios avanzados. Instálalo con:

```powershell
winget install Microsoft.PowerToys
```

> [!NOTE]
> Muchas utilidades vienen **desactivadas**. Actívalas en la página principal de PowerToys. Todos los atajos se pueden cambiar en la configuración de cada utilidad.

## ⌨️ Atajos Predeterminados

### Lanzador y Productividad
| Atajo | Utilidad | Acción |
| :--- | :--- | :--- |
| `Win` + `Alt` + `Espacio` | **Paleta de comandos** | Lanzador para abrir apps, archivos, ajustes y comandos, calcular y cambiar de ventana. Sustituye a PowerToys Run. |
| `Alt` + `Espacio` | PowerToys Run | Lanzador anterior. Sigue disponible, pero se recomienda la Paleta de comandos. |
| `Win` + `Shift` + `V` | Pegado avanzado | Abrir el menú: pegar como texto plano, Markdown, JSON, archivo o texto de una imagen. |
| `Win` + `Ctrl` + `Alt` + `V` | Pegado avanzado | Pegar como texto plano directamente. |
| `Win` + `Shift` + `?` | Guía de atajos | Ver los atajos de Windows y de la app abierta. También aparece si mantienes `Win` pulsado. |
| `Ctrl` + `Espacio` | Peek | Vista previa rápida del archivo seleccionado en el Explorador. |

### Ventanas
| Atajo | Utilidad | Acción |
| :--- | :--- | :--- |
| `Win` + `Ctrl` + `T` | Siempre visible | Fijar la ventana activa por encima de las demás. |
| `Win` + `Shift` + `` ` `` | FancyZones | Abrir el editor de zonas. |
| `Shift` + arrastrar | FancyZones | Soltar la ventana en una zona. |
| `Win` + `Ctrl` + `` ` `` | Workspaces | Abrir el editor de espacios de trabajo (abrir un grupo de apps en sus posiciones). |
| `Win` + `Ctrl` + `Shift` + `T` | Crop And Lock | Crear una miniatura en vivo de una parte de la ventana. |
| `Win` + `Ctrl` + `Shift` + `R` | Crop And Lock | Recortar la ventana y seguir usándola (modo *reparent*). |
| `Alt` + `` ` `` | Window Hopper | Cambiar entre las ventanas **de la misma app**. Con `Shift` vas hacia atrás. |
| `Alt` + arrastrar | Grab And Move | Mover la ventana arrastrando desde cualquier punto. Con clic derecho, cambiar el tamaño. |

### Pantalla y Capturas
| Atajo | Utilidad | Acción |
| :--- | :--- | :--- |
| `Win` + `Shift` + `C` | Selector de colores | Copiar el color de cualquier píxel (HEX, RGB…). |
| `Win` + `Shift` + `T` | Extractor de texto | Copiar texto de cualquier parte de la pantalla (OCR). |
| `Win` + `Ctrl` + `Shift` + `M` | Regla de pantalla | Medir distancias en píxeles. |
| `Ctrl` + `1` | ZoomIt | Modo zoom. |
| `Ctrl` + `2` | ZoomIt | Dibujar sobre la pantalla. |
| `Ctrl` + `3` | ZoomIt | Temporizador de descanso. |
| `Ctrl` + `4` | ZoomIt | Zoom en vivo. |

### Ratón
| Atajo | Utilidad | Acción |
| :--- | :--- | :--- |
| `Ctrl` izq. dos veces | Buscar mi mouse | Resaltar la posición del puntero. |
| `Win` + `Shift` + `H` | Resaltador del mouse | Mostrar los clics en pantalla (útil para grabar tutoriales). |
| `Win` + `Shift` + `D` | Mouse Jump | Saltar a cualquier punto o monitor. |
| `Win` + `Alt` + `P` | Cruz del puntero | Mostrar una cruz centrada en el puntero. |
| `Win` + `Alt` + `.` | Cruz del puntero | Cursor deslizante: mover el puntero con un solo botón (accesibilidad). |

### Escritura
| Atajo | Utilidad | Acción |
| :--- | :--- | :--- |
| Mantener una letra + `Espacio` o flechas | Quick Accent | Escribir letras con acento o diacríticos (á, ñ, ç, ü…). |

> [!WARNING]
> Algunos atajos de PowerToys **sustituyen** a atajos de Windows mientras la utilidad está activa:
> - `Win` + `Shift` + `V` (Pegado avanzado) sustituye a "recorrer notificaciones".
> - `Win` + `Shift` + `T` (Extractor de texto) sustituye a "recorrer la barra de tareas hacia atrás".
> - `Alt` + `Espacio` (PowerToys Run) sustituye al menú de la ventana.

## 🧰 Utilidades sin Atajo (pero muy útiles)
- **PowerRename**: renombrar muchos archivos a la vez con buscar y reemplazar o expresiones regulares. Selecciona los archivos, haz clic derecho y elige *Cambiar nombre con PowerRename*.
- **Keyboard Manager**: reasignar teclas o crear tus propios atajos.
- **File Locksmith**: ver qué proceso está bloqueando un archivo (clic derecho en el archivo).
- **Image Resizer**: cambiar el tamaño de imágenes desde el menú contextual.
- **Awake**: evitar que el PC entre en suspensión.
- **Light Switch**: cambiar entre modo claro y oscuro según la hora.
- **New+**: crear archivos y carpetas a partir de tus plantillas.

---
[⬅️ Volver al Inicio](../README.md)
