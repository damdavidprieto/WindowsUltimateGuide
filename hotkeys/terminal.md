# 🐚 Terminal, PowerShell y CMD

La terminal es la ventana donde se escriben comandos. Windows 11 trae **Windows Terminal**, que agrupa PowerShell, el Símbolo del sistema (CMD) y Linux (WSL). Ábrela con `Win` + `X` y eligiendo **Terminal**.

## 🖥️ Windows Terminal: Pestañas y Ventanas
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `Shift` + `T` | Abre una pestaña nueva. | Para trabajar en varias cosas a la vez sin abrir más ventanas. | Básico |
| `Ctrl` + `Shift` + `1`…`9` | Abre una pestaña con el perfil de esa posición. | Por ejemplo, una pestaña de CMD o de Ubuntu en lugar de PowerShell. | Intermedio |
| `Ctrl` + `Shift` + `Espacio` | Abre el menú de perfiles. | Para elegir qué tipo de terminal abrir. | Intermedio |
| `Ctrl` + `Shift` + `D` | Duplica la pestaña. | Para abrir otra pestaña en la misma carpeta. | Intermedio |
| `Ctrl` + `Shift` + `N` | Abre una ventana nueva. | Para separar trabajos en ventanas distintas. | Intermedio |
| `Ctrl` + `Shift` + `W` | Cierra el panel o la pestaña. | Cuando hayas terminado con una pestaña. | Básico |
| `Ctrl` + `Tab` | Va a la pestaña siguiente. | Para cambiar de pestaña. | Básico |
| `Ctrl` + `Shift` + `Tab` | Va a la pestaña anterior. | Igual, en sentido contrario. | Básico |
| `Ctrl` + `Alt` + `1`…`9` | Va a la pestaña con ese número. | Para saltar directamente a una pestaña. | Avanzado |

## 🪟 Windows Terminal: Paneles
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Alt` + `Shift` + `D` | Divide la pantalla con un panel nuevo. | Para ver dos terminales a la vez (por ejemplo, un servidor y tus comandos). | Intermedio |
| `Alt` + `Shift` + `+` | Divide en vertical (panel a la derecha). | Para paneles lado a lado. | Avanzado |
| `Alt` + `Shift` + `-` | Divide en horizontal (panel abajo). | Para paneles uno encima de otro. | Avanzado |
| `Alt` + flechas | Pasa a otro panel. | Para escribir en el panel de al lado. | Intermedio |
| `Alt` + `Shift` + flechas | Cambia el tamaño del panel. | Para dar más espacio a un panel. | Avanzado |

## ⚙️ Windows Terminal: Uso General
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `C` | Copia el texto seleccionado. Sin selección, **detiene** el comando en marcha. | Para copiar un resultado, o para parar un comando que no termina. | Básico |
| `Ctrl` + `V` | Pega. | Para pegar un comando que copiaste de una web. | Básico |
| `Ctrl` + `Shift` + `F` | Busca en el texto de la terminal. | Para encontrar un error en una salida larga. | Intermedio |
| `Ctrl` + `Shift` + `P` | Abre la paleta de comandos. | Para buscar cualquier acción de Terminal por su nombre. | Intermedio |
| `Ctrl` + `,` | Abre la configuración. | Para cambiar colores, fuente o el perfil por defecto. | Intermedio |
| `Ctrl` + `Shift` + `A` | Selecciona todo el texto. | Para copiar toda la salida. | Intermedio |
| `Ctrl` + `Shift` + `M` | Activa el modo marca. | Para seleccionar texto solo con el teclado. | Avanzado |
| `Ctrl` + `+` / `Ctrl` + `-` | Agranda o reduce la letra. | Si el texto se ve muy pequeño o muy grande. | Básico |
| `Ctrl` + `0` | Restablece el tamaño de la letra. | Para volver al tamaño normal. | Intermedio |
| `Ctrl` + `Shift` + `↑` / `↓` | Desplaza una línea arriba o abajo. | Para releer la salida sin ratón. | Avanzado |
| `Ctrl` + `Shift` + `RePág` / `AvPág` | Desplaza una página. | Para salidas largas. | Avanzado |
| `Ctrl` + `Shift` + `Inicio` / `Fin` | Va al principio o al final de la salida. | Para volver arriba del todo o al final. | Avanzado |
| `F11` o `Alt` + `Enter` | Pantalla completa. | Para concentrarte en la terminal. | Intermedio |
| `Win` + `` ` `` | Abre la terminal desplegable (modo Quake). | Para tener una terminal siempre a mano que baja desde arriba. Con teclado español, prueba `Win` + `Ñ`. | Avanzado |

## ⚡ PowerShell: Escribir Comandos
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Tab` | Completa el nombre del comando, archivo o carpeta. | Escribe las primeras letras y pulsa `Tab`: te ahorra escribir y evita errores. | Básico |
| `Shift` + `Tab` | Vuelve a la opción anterior de autocompletado. | Si pasaste la opción que querías. | Intermedio |
| `Ctrl` + `Espacio` | Muestra todas las opciones de autocompletado. | Para ver qué comandos o parámetros existen. | Intermedio |
| `↑` / `↓` | Recorre los comandos anteriores. | Para repetir un comando sin volver a escribirlo. | Básico |
| `→` (al final de la línea) | Acepta la sugerencia en gris. | PowerShell sugiere comandos que usaste antes: acéptalos con la flecha. | Intermedio |
| `Ctrl` + `→` | Acepta solo la siguiente palabra de la sugerencia. | Para aprovechar parte de una sugerencia. | Avanzado |
| `F2` | Cambia las sugerencias entre una línea y una lista. | Para ver varias sugerencias a la vez. | Avanzado |
| `Ctrl` + `R` | Busca en el historial de comandos. | Escribe parte de un comando que usaste días atrás para encontrarlo. | Intermedio |
| `F8` | Busca comandos anteriores que empiecen igual. | Escribe el inicio de un comando y pulsa `F8`. | Avanzado |
| `Alt` + `.` | Inserta el último argumento del comando anterior. | Para reutilizar una ruta larga que acabas de escribir. | Avanzado |
| `Shift` + `Enter` | Añade una línea sin ejecutar. | Para escribir un comando de varias líneas. | Avanzado |
| `Esc` | Borra la línea actual. | Para empezar el comando de nuevo. | Básico |
| `Ctrl` + `L` | Limpia la pantalla. | Cuando la terminal está llena de texto. | Básico |
| `Ctrl` + `Retroceso` | Borra la palabra anterior. | Para corregir rápido. | Intermedio |
| `Ctrl` + `Z` | Deshace en la línea actual. | Si borraste algo de la línea por error. | Intermedio |
| `Ctrl` + `C` | Cancela el comando en marcha. | Para detener un comando que tarda demasiado. | Básico |

## 📟 CMD (Símbolo del sistema)
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Tab` | Completa nombres de archivos y carpetas. | Para no escribir rutas largas. | Básico |
| `↑` / `↓` | Recorre los comandos anteriores. | Para repetir un comando. | Básico |
| `F7` | Muestra el historial en una lista. | Para elegir un comando anterior de una lista. | Intermedio |
| `F8` | Busca comandos anteriores que empiecen igual. | Escribe el inicio y pulsa `F8`. | Avanzado |
| `F9` | Ejecuta un comando del historial por su número. | Combínalo con `F7` para ver los números. | Avanzado |
| `F3` | Repite el último comando. | Para volver a ejecutar lo mismo. | Intermedio |
| `F1` | Repite el último comando letra a letra. | Para reutilizar solo el principio de un comando. | Avanzado |
| `Esc` | Borra la línea actual. | Para empezar de nuevo. | Básico |
| `Ctrl` + `C` | Detiene el comando en marcha. | Para parar un comando que no termina. | Básico |

---
[⬅️ Atajos](./README.md) · [🏠 Inicio](../README.md)
