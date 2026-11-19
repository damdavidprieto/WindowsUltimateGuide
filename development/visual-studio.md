# 🟣 Visual Studio 2026

Atajos del perfil de teclado predeterminado de **Visual Studio 2026** (el de "Configuración general"), sacados de la [documentación oficial de Microsoft](https://learn.microsoft.com/es-es/visualstudio/ide/default-keyboard-shortcuts-in-visual-studio). Casi todos funcionan igual en Visual Studio 2022.

> [!TIP]
> **¿Te pierdes?** Pulsa `Ctrl` + `Q` y escribe lo que quieres hacer ("formatear", "renombrar", "terminal"…). Visual Studio te muestra la opción **y su atajo**. Todos los atajos se ven y se cambian en *Herramientas > Opciones > Entorno > Teclado*.

## 🚀 Primeros Pasos
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `F5` | Compila y ejecuta el programa con el depurador. | Para probar tu programa. Si se detiene en un error, verás dónde está. | Básico |
| `Ctrl` + `F5` | Ejecuta el programa sin depurar. | Para probarlo más rápido cuando no necesitas detenerte en el código. | Básico |
| `Shift` + `F5` | Detiene la ejecución. | Para cerrar el programa que estás probando. | Básico |
| `Ctrl` + `Shift` + `B` | Compila la solución. | Para comprobar si hay errores sin ejecutar. | Básico |
| `Ctrl` + `S` | Guarda el archivo. | Después de cada cambio importante. | Básico |
| `Ctrl` + `Shift` + `S` | Guarda todos los archivos. | Antes de compilar o cerrar Visual Studio. | Básico |
| `Ctrl` + `Q` | Busca cualquier comando u opción. | Cuando no sabes dónde está algo. El atajo más útil para empezar. | Básico |
| `Ctrl` + `.` | Muestra acciones rápidas (la bombilla 💡). | Cuando ves una línea ondulada: te propone cómo arreglarlo. | Básico |
| `Ctrl` + `Espacio` | Muestra el autocompletado (IntelliSense). | Para ver qué puedes escribir: métodos, variables, propiedades… | Básico |
| `Ctrl` + `Z` / `Ctrl` + `Y` | Deshace / rehace. | Cuando te equivocas al editar. | Básico |
| `F1` | Abre la ayuda sobre lo que hay bajo el cursor. | Para leer la documentación de un método o una palabra clave. | Básico |

## 📁 Archivos y Proyectos
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `Shift` + `N` | Crea un proyecto nuevo. | Para empezar una aplicación desde cero. | Básico |
| `Ctrl` + `Shift` + `O` | Abre un proyecto o solución. | Para abrir un proyecto que ya existe. | Básico |
| `Ctrl` + `O` | Abre un archivo. | Para abrir un archivo suelto. | Intermedio |
| `Ctrl` + `N` | Crea un archivo nuevo. | Para un archivo suelto fuera del proyecto. | Intermedio |
| `Ctrl` + `Shift` + `A` | Añade un elemento nuevo al proyecto. | Para crear una clase, formulario, página… dentro del proyecto. | Básico |
| `Shift` + `Alt` + `A` | Añade un elemento existente al proyecto. | Para incluir un archivo que ya tienes en el disco. | Intermedio |
| `Ctrl` + `P` | Imprime. | Para imprimir el código. | Avanzado |
| `Alt` + `F4` | Cierra Visual Studio. | Al terminar de trabajar. | Básico |

## 🧭 Buscar y Moverse por el Código
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `T` o `Ctrl` + `,` | Ir a todo: archivos, clases, métodos… | Para abrir cualquier archivo o encontrar cualquier método escribiendo su nombre. | Básico |
| `Ctrl` + `G` | Ir a una línea. | Cuando un error te dice "línea 42". | Básico |
| `Ctrl` + `F` | Busca en el archivo. | Para encontrar una palabra en el archivo abierto. | Básico |
| `Ctrl` + `H` | Busca y reemplaza en el archivo. | Para cambiar un nombre en todo el archivo. | Básico |
| `Ctrl` + `Shift` + `F` | Busca en todos los archivos. | Para encontrar dónde se usa algo en todo el proyecto. | Básico |
| `Ctrl` + `Shift` + `H` | Reemplaza en todos los archivos. | Para cambiar un texto en todo el proyecto (revisa antes de aceptar). | Intermedio |
| `F3` / `Shift` + `F3` | Siguiente / anterior resultado de la búsqueda. | Para ir de un resultado a otro. | Intermedio |
| `Ctrl` + `F3` | Busca la palabra seleccionada. | Para buscar rápido lo que tienes seleccionado. | Intermedio |
| `Ctrl` + `I` | Búsqueda incremental. | Escribe y el cursor salta a la coincidencia mientras escribes. | Avanzado |
| `F12` | Va a la definición. | Para ver cómo está hecho el método o la clase que usas. | Básico |
| `Alt` + `F12` | Muestra la definición sin salir del archivo (Peek). | Para echar un vistazo rápido sin perder tu sitio. | Intermedio |
| `Ctrl` + `F12` | Va a la implementación o declaración. | Para saltar a la implementación de una interfaz. | Intermedio |
| `Shift` + `F12` | Busca todas las referencias. | Para ver en qué sitios se usa un método o variable. | Básico |
| `Ctrl` + `-` | Vuelve a la posición anterior. | Después de usar `F12`, para volver adonde estabas. | Básico |
| `Ctrl` + `Shift` + `-` | Avanza a la posición siguiente. | Para deshacer el "volver". | Intermedio |
| `Ctrl` + `]` | Salta a la llave `{ }` pareja. | Para ver dónde termina un bloque de código. | Intermedio |
| `Ctrl` + `1`, `Ctrl` + `M` | Va a un miembro de la clase. | Para saltar a un método de una clase larga. | Avanzado |
| `Ctrl` + `Shift` + `G` | Abre el archivo cuyo nombre está bajo el cursor. | Para abrir un archivo incluido o referenciado. | Avanzado |
| `F8` / `Shift` + `F8` | Siguiente / anterior error de la lista. | Para ir corrigiendo errores uno a uno. | Intermedio |
| `Alt` + `AvPág` / `Alt` + `RePág` | Siguiente / anterior problema del archivo. | Para revisar avisos y errores del archivo actual. | Intermedio |
| `Ctrl` + `K`, `Ctrl` + `K` | Pone o quita un marcador. | Para marcar una línea a la que quieres volver luego. | Intermedio |
| `Ctrl` + `K`, `Ctrl` + `N` / `Ctrl` + `P` | Siguiente / anterior marcador. | Para saltar entre tus marcadores. | Avanzado |
| `Ctrl` + `K`, `Ctrl` + `W` | Abre la ventana de marcadores. | Para ver y gestionar todos tus marcadores. | Avanzado |
| `Ctrl` + `K`, `Ctrl` + `T` | Muestra la jerarquía de llamadas. | Para ver quién llama a un método y a quién llama él. | Avanzado |

## ✏️ Editar Código
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `/` | Comenta o descomenta la línea. | Para desactivar una línea de código temporalmente. | Básico |
| `Ctrl` + `K`, `Ctrl` + `C` | Comenta la selección. | Para comentar varias líneas a la vez. | Básico |
| `Ctrl` + `K`, `Ctrl` + `U` | Quita el comentario de la selección. | Para volver a activar el código comentado. | Básico |
| `Ctrl` + `K`, `Ctrl` + `D` | Da formato a todo el documento. | Para ordenar sangrías y espacios automáticamente. Úsalo a menudo. | Básico |
| `Ctrl` + `K`, `Ctrl` + `F` | Da formato a la selección. | Para ordenar solo un trozo de código. | Intermedio |
| `Ctrl` + `D` | Duplica la línea o la selección. | Para crear una línea parecida a la actual. | Básico |
| `Alt` + `↑` / `↓` | Mueve la línea arriba o abajo. | Para reordenar líneas sin cortar y pegar. | Básico |
| `Ctrl` + `L` | Corta la línea entera. | Para mover una línea a otro sitio. | Intermedio |
| `Ctrl` + `Shift` + `L` | Borra la línea entera. | Para eliminar una línea rápido. | Intermedio |
| `Ctrl` + `Enter` | Inserta una línea en blanco encima. | Para escribir encima sin mover el cursor al principio. | Intermedio |
| `Ctrl` + `Shift` + `Enter` | Inserta una línea en blanco debajo. | Para escribir debajo aunque el cursor esté a mitad de línea. | Intermedio |
| `Tab` / `Shift` + `Tab` | Aumenta / reduce la sangría. | Selecciona varias líneas y pulsa para moverlas todas. | Básico |
| `Ctrl` + `U` | Convierte a minúsculas. | Para cambiar el texto seleccionado a minúsculas. | Avanzado |
| `Ctrl` + `Shift` + `U` | Convierte a mayúsculas. | Para constantes o textos en mayúsculas. | Avanzado |
| `Ctrl` + `Shift` + `V` | Pega desde el historial del portapapeles de VS. | Para pegar algo que copiaste antes. Púlsalo varias veces. | Intermedio |
| `Shift` + `Alt` + `T` | Intercambia la línea con la de debajo. | Para corregir el orden de dos líneas. | Avanzado |
| `Ctrl` + `Shift` + `T` | Intercambia la palabra con la siguiente. | Para corregir el orden de dos palabras. | Avanzado |
| `Ctrl` + `Retroceso` / `Ctrl` + `Supr` | Borra la palabra anterior / siguiente. | Para borrar palabras enteras. | Intermedio |
| `Ctrl` + `K`, `Ctrl` + `X` | Inserta un fragmento de código (snippet). | Para escribir estructuras comunes (`for`, `if`, `prop`…) automáticamente. | Intermedio |
| `Ctrl` + `K`, `Ctrl` + `\` | Borra los espacios en blanco alrededor del cursor. | Para limpiar espacios sobrantes. | Avanzado |
| `Ctrl` + `R`, `Ctrl` + `W` | Muestra u oculta los espacios en blanco. | Para ver tabulaciones y espacios como símbolos. | Avanzado |
| `Ctrl` + `E`, `Ctrl` + `W` | Activa o desactiva el ajuste de línea. | Para leer líneas muy largas sin desplazarte a la derecha. | Intermedio |
| `Insert` | Activa o desactiva el modo sobrescribir. | Si al escribir se "comen" las letras, lo activaste sin querer: púlsalo otra vez. | Intermedio |

## 🖱️ Varios Cursores y Selección
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Shift` + `Alt` + `.` | Selecciona la siguiente coincidencia y añade un cursor. | Para cambiar varias apariciones de una palabra a la vez. | Intermedio |
| `Shift` + `Alt` + `;` | Selecciona todas las coincidencias. | Para editar todas las apariciones de golpe. | Intermedio |
| `Ctrl` + `Alt` + clic | Añade un cursor donde haces clic. | Para escribir lo mismo en varios sitios. | Intermedio |
| `Shift` + `Alt` + flechas | Selección en bloque (columna). | Para editar varias líneas en la misma columna. | Avanzado |
| `Shift` + `Alt` + `=` | Amplía la selección. | Selecciona palabra, luego expresión, luego bloque… | Intermedio |
| `Shift` + `Alt` + `-` | Reduce la selección. | Para deshacer la ampliación. | Avanzado |
| `Ctrl` + `Shift` + `↑` / `↓` | Va a la referencia resaltada anterior / siguiente. | Para saltar entre usos de la misma variable. | Avanzado |

## 💡 IntelliSense y Ayuda al Escribir
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `J` | Lista los miembros disponibles. | Para ver los métodos y propiedades de un objeto. | Intermedio |
| `Ctrl` + `Shift` + `Espacio` | Muestra la información de parámetros. | Para recordar qué parámetros necesita un método. | Intermedio |
| `Ctrl` + `K`, `Ctrl` + `I` | Muestra la información rápida. | Para ver el tipo y la documentación de lo que hay bajo el cursor. | Intermedio |
| `Ctrl` + `Alt` + `Espacio` | Cambia el modo de completado. | Si IntelliSense completa cosas que no quieres. | Avanzado |

## 🔧 Refactorizar
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `R`, `Ctrl` + `R` | Cambia el nombre en todo el proyecto. | Para renombrar una variable, método o clase sin romper nada. | Básico |
| `Ctrl` + `R`, `Ctrl` + `M` | Extrae el código seleccionado a un método. | Cuando un método es demasiado largo. | Intermedio |
| `Ctrl` + `R`, `Ctrl` + `I` | Extrae una interfaz. | Para crear una interfaz a partir de una clase. | Avanzado |
| `Ctrl` + `R`, `Ctrl` + `E` | Encapsula un campo en una propiedad. | Para convertir un campo público en una propiedad. | Avanzado |
| `Ctrl` + `R`, `Ctrl` + `V` | Quita parámetros. | Para eliminar un parámetro y actualizar todas las llamadas. | Avanzado |
| `Ctrl` + `R`, `Ctrl` + `O` | Reordena parámetros. | Para cambiar el orden de los parámetros en todas las llamadas. | Avanzado |
| `Ctrl` + `R`, `Ctrl` + `G` | Quita y ordena los `using`. | Para limpiar los `using` que no se usan. | Intermedio |
| `Ctrl` + `K`, `Ctrl` + `M` | Genera un método. | Para crear un método que llamas pero aún no existe. | Avanzado |

## 📂 Plegar Código
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `M`, `Ctrl` + `M` | Pliega o despliega el bloque actual. | Para ocultar un método que no estás mirando. | Intermedio |
| `Ctrl` + `M`, `Ctrl` + `O` | Pliega todo hasta las definiciones. | Para ver un resumen de la clase: solo los nombres de los métodos. | Intermedio |
| `Ctrl` + `M`, `Ctrl` + `L` | Pliega o despliega todo. | Para alternar entre ver todo y ver el resumen. | Intermedio |
| `Ctrl` + `M`, `Ctrl` + `P` | Desactiva el plegado. | Para quitar los símbolos de plegado. | Avanzado |

## 🐞 Depurar
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `F9` | Pone o quita un punto de interrupción. | Para que el programa se detenga en esa línea y puedas ver los valores. | Básico |
| `F10` | Ejecuta la línea y pasa a la siguiente. | Para avanzar paso a paso sin entrar en los métodos. | Básico |
| `F11` | Entra en el método de la línea actual. | Para ver qué pasa dentro de un método. | Básico |
| `Shift` + `F11` | Sale del método actual. | Cuando ya viste lo que querías dentro del método. | Intermedio |
| `F5` | Continúa hasta el siguiente punto de interrupción. | Para seguir ejecutando después de detenerte. | Básico |
| `Ctrl` + `F10` | Ejecuta hasta el cursor. | Para saltar directamente a una línea sin poner un punto de interrupción. | Intermedio |
| `Ctrl` + `Shift` + `F5` | Reinicia la depuración. | Para volver a empezar después de un cambio. | Intermedio |
| `Ctrl` + `Shift` + `F9` | Elimina todos los puntos de interrupción. | Para empezar de cero. | Intermedio |
| `Ctrl` + `F9` | Activa o desactiva el punto de interrupción. | Para desactivarlo sin borrarlo. | Intermedio |
| `Ctrl` + `Alt` + `B` | Abre la ventana de puntos de interrupción. | Para ver y gestionar todos los puntos de interrupción. | Intermedio |
| `Shift` + `F9` | Inspección rápida de una variable. | Para ver el valor de una expresión mientras depuras. | Intermedio |
| `Ctrl` + `Shift` + `F10` | Establece la siguiente instrucción. | Para repetir o saltarse líneas mientras depuras. | Avanzado |
| `Ctrl` + `Alt` + `Pausa` | Pausa la ejecución. | Cuando el programa parece bloqueado, para ver dónde está. | Avanzado |
| `Alt` + `F10` | Aplica los cambios de código sin reiniciar. | Para corregir algo mientras depuras (Editar y continuar). | Avanzado |
| `Ctrl` + `Alt` + `E` | Abre la configuración de excepciones. | Para detenerte cuando se lanza un tipo de error. | Avanzado |
| `Ctrl` + `Alt` + `P` | Asocia el depurador a un proceso. | Para depurar un programa que ya está en marcha. | Avanzado |
| `Ctrl` + `Alt` + `I` | Abre la ventana Inmediato. | Para ejecutar código y ver valores mientras depuras. | Avanzado |
| `Ctrl` + `Alt` + `C` | Abre la pila de llamadas. | Para ver qué métodos llevaron hasta la línea actual. | Intermedio |
| `Ctrl` + `Alt` + `V`, `L` | Abre la ventana de variables locales. | Para ver todas las variables del método actual. | Intermedio |
| `Ctrl` + `Alt` + `V`, `A` | Abre la ventana Automático. | Para ver las variables de las líneas cercanas. | Avanzado |
| `Ctrl` + `Alt` + `W`, `1` | Abre la ventana Inspección 1. | Para vigilar el valor de expresiones que elijas. | Avanzado |
| `Ctrl` + `Alt` + `H` | Abre la ventana de subprocesos. | Para depurar programas con varios hilos. | Avanzado |

## 🧪 Pruebas
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `E`, `T` | Abre el Explorador de pruebas. | Para ver y ejecutar tus pruebas unitarias. | Intermedio |
| `Ctrl` + `R`, `A` | Ejecuta todas las pruebas. | Antes de subir cambios, para comprobar que nada se rompe. | Intermedio |
| `Ctrl` + `R`, `T` | Ejecuta las pruebas del contexto actual. | Para ejecutar solo la prueba o la clase donde está el cursor. | Intermedio |
| `Ctrl` + `R`, `L` | Repite la última ejecución de pruebas. | Después de corregir algo, para volver a probar. | Intermedio |
| `Ctrl` + `R`, `Ctrl` + `T` | Depura las pruebas del contexto actual. | Para depurar una prueba que falla. | Avanzado |
| `Ctrl` + `R`, `Ctrl` + `A` | Depura todas las pruebas. | Para depurar todas las pruebas. | Avanzado |
| `Ctrl` + `E`, `C` | Muestra los resultados de cobertura de código. | Para ver qué parte del código cubren tus pruebas. | Avanzado |

## 🪟 Ventanas y Paneles
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `Alt` + `L` | Abre el Explorador de soluciones. | Para ver los archivos de tu proyecto. | Básico |
| `Ctrl` + `;` | Busca en el Explorador de soluciones. | Para encontrar un archivo del proyecto por su nombre. | Intermedio |
| `Ctrl` + `[`, `S` | Sincroniza el Explorador con el archivo abierto. | Para ver en qué carpeta está el archivo que editas. | Intermedio |
| `Ctrl` + `` ` `` | Abre el Terminal integrado. | Para usar comandos (`git`, `dotnet`…) sin salir de VS. | Intermedio |
| `Ctrl` + `\`, `Ctrl` + `E` | Abre la Lista de errores. | Para ver todos los errores y avisos de compilación. | Básico |
| `Ctrl` + `Alt` + `O` | Abre la ventana de Salida. | Para ver mensajes de compilación o de tu programa. | Intermedio |
| `F4` | Abre la ventana Propiedades. | Para cambiar propiedades de un control o archivo. | Intermedio |
| `Ctrl` + `Alt` + `X` | Abre el Cuadro de herramientas. | Para arrastrar controles a un formulario. | Intermedio |
| `Ctrl` + `\`, `T` | Abre la Lista de tareas. | Para ver los comentarios `TODO` del código. | Avanzado |
| `Ctrl` + `Alt` + `T` | Abre el Esquema del documento. | Para ver la estructura de un archivo. | Avanzado |
| `Ctrl` + `Alt` + `K` | Abre la jerarquía de llamadas. | Para analizar quién llama a qué. | Avanzado |
| `Ctrl` + `Shift` + `C` | Abre la Vista de clases. | Para ver las clases del proyecto. | Avanzado |
| `Ctrl` + `Alt` + `J` | Abre el Examinador de objetos. | Para explorar las bibliotecas que usas. | Avanzado |
| `Ctrl` + `Alt` + `S` | Abre el Explorador de servidores. | Para conectarte a bases de datos o servidores. | Avanzado |
| `F7` / `Shift` + `F7` | Muestra el código / el diseñador. | Para alternar entre el diseño visual y su código. | Intermedio |
| `Ctrl` + `0`, `Ctrl` + `G` | Abre Cambios de Git. | Para ver tus cambios y hacer *commit*. | Intermedio |
| `Ctrl` + `0`, `Ctrl` + `N` | Abre las ramas de Git. | Para cambiar o crear ramas. | Intermedio |
| `Ctrl` + `0`, `Ctrl` + `O` | Abre el historial de *commits*. | Para ver el historial del repositorio. | Avanzado |
| `Esc` | Vuelve al editor. | Desde cualquier panel, para seguir escribiendo código. | Básico |
| `Shift` + `Esc` | Cierra el panel de herramientas activo. | Para cerrar un panel y ganar espacio. | Intermedio |
| `Shift` + `Alt` + `Enter` | Pantalla completa. | Para concentrarte solo en el código. | Intermedio |
| `Ctrl` + `Shift` + `.` / `Ctrl` + `Shift` + `,` | Amplía / reduce el zoom del editor. | Para ver el código más grande o más pequeño. | Básico |

## 🗂️ Pestañas de Documentos
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Ctrl` + `Tab` | Cambia entre archivos abiertos. | Mantén `Ctrl` y pulsa `Tab` varias veces para elegir. | Básico |
| `Ctrl` + `Shift` + `Tab` | Cambia de archivo en sentido contrario. | Igual, al revés. | Intermedio |
| `Ctrl` + `W` o `Ctrl` + `F4` | Cierra el archivo actual. | Para cerrar pestañas que no necesitas. | Básico |
| `Ctrl` + `AvPág` / `Ctrl` + `RePág` | Pestaña siguiente / anterior. | Para recorrer las pestañas en orden. | Intermedio |
| `Ctrl` + `Alt` + `↓` | Muestra la lista de archivos abiertos. | Cuando tienes tantas pestañas que no caben. | Intermedio |
| `Ctrl` + `Alt` + `Inicio` | Fija la pestaña de vista previa. | Para que un archivo abierto en vista previa no se cierre solo. | Avanzado |
| `Ctrl` + `Shift` + `RePág` / `AvPág` | Mueve la pestaña a la izquierda / derecha. | Para ordenar tus pestañas. | Avanzado |
| `Alt` + `` ` `` | Busca en las ventanas abiertas. | Para encontrar una ventana o archivo abierto por su nombre. | Avanzado |

## 🤖 GitHub Copilot
| Atajo | Qué hace | Cuándo usarlo | Nivel |
| :--- | :--- | :--- | :--- |
| `Tab` | Acepta la sugerencia de Copilot (texto en gris). | Cuando Copilot te propone código que te sirve. | Básico |
| `Esc` | Descarta la sugerencia. | Cuando la sugerencia no es lo que quieres. | Básico |
| `Ctrl` + `→` | Acepta solo la siguiente palabra. | Para aprovechar solo el principio de una sugerencia. | Intermedio |
| `Alt` + `.` / `Alt` + `,` | Muestra la sugerencia siguiente / anterior. | Para ver otras propuestas de Copilot. | Intermedio |
| `Alt` + `/` | Abre el chat de Copilot dentro del editor. | Para pedirle a Copilot que explique o cambie el código seleccionado. | Intermedio |

> [!NOTE]
> Los atajos de Copilot se pueden personalizar. Si alguno no te funciona, busca "Copilot" en *Herramientas > Opciones > Entorno > Teclado*.

---

## 💡 Trucos para Principiantes

### Puntos de interrupción condicionales
Pon un punto de interrupción con `F9`, haz clic derecho en el punto rojo y elige **Condiciones**. Solo se detendrá cuando se cumpla la condición (por ejemplo, `i == 50`). ¡Mucho más rápido que pulsar `F5` cincuenta veces!

### Comparar dos archivos
Selecciona dos archivos en el Explorador de soluciones, haz clic derecho y elige **Comparar seleccionados**.

### Extensiones recomendadas
Instálalas desde *Extensiones > Administrar extensiones*:
1. **GitHub Copilot**: ya viene integrado. Completa código y responde dudas en el chat.
2. **Roslynator**: cientos de correcciones y refactorizaciones extra para C#.
3. **CodeMaid**: ordena y limpia el código al guardar.
4. **Markdown Editor v2**: vista previa en directo de archivos `.md`.

---
[⬅️ Atajos](../hotkeys/README.md) · [🏠 Inicio](../README.md)
