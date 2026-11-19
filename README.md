# ⌨️ Atajos de Teclado: Windows 11, Visual Studio 2026 y VS Code

Guía gratuita en español con **todos los atajos de teclado** de Windows 11, Visual Studio 2026 y Visual Studio Code. Cada atajo explica **qué hace**, **cuándo usarlo** y su **nivel** (Básico, Intermedio o Avanzado). Está pensada para quien acaba de empezar.

> **Revisado:** noviembre de 2026 · Windows 11 (24H2 o posterior) · Visual Studio 2026 · Visual Studio Code.

### 🌐 [Abrir la web interactiva](https://damdavidprieto.github.io/WindowsUltimateGuide/)
Buscador ("¿qué quieres hacer?"), filtro por nivel, **teclado dibujado** que te enseña qué teclas pulsar, favoritos y modo práctica. Funciona en el ordenador y en el móvil.

## 🎓 ¿Primera vez?
Empieza por **[Cómo usar los atajos](./hotkeys/empieza-aqui.md)**: qué es un atajo, cómo se pulsa una combinación y dónde está cada tecla.

## 🗂️ Índice

### ⊞ Windows 11
- [Tecla Windows](./hotkeys/general.md): sistema, paneles, búsqueda, escritura y Copilot.
- [Ventanas y Escritorios](./hotkeys/navigation.md): cambiar de ventana, Snap, escritorios virtuales y barra de tareas.
- [Explorador de Archivos](./hotkeys/explorer.md): copiar, mover, renombrar y organizar archivos.
- [Texto y Diálogos](./hotkeys/text-editing.md): copiar, pegar y seleccionar en cualquier programa.
- [Capturas y Grabación](./hotkeys/screenshots.md): capturas de pantalla y vídeos de la pantalla.
- [Accesibilidad](./hotkeys/accessibility.md): Lupa, Narrador, subtítulos y ayudas del teclado.
- [Terminal](./hotkeys/terminal.md): Windows Terminal, PowerShell y CMD.

### 🧑‍💻 Programación
- [Visual Studio 2026](./development/visual-studio.md): editar, navegar, refactorizar, depurar, pruebas y Copilot.
- [Visual Studio Code](./development/vscode.md): editar, varios cursores, terminal, depurar y Copilot.

### ➕ Extras
- [Navegadores](./hotkeys/browser.md) · [PowerToys](./power-user/powertoys.md)
- Win + R: [Apps](./win-plus-r/essentials.md) · [Panel de Control](./win-plus-r/control-panel.md) · [Administración](./win-plus-r/system-admin.md)
- Sistema: [Variables de entorno](./system/env-vars.md) · [Herramientas nativas](./system/built-in-tools.md) · [Comandos](./system/cli-tips.md) · [WSL](./power-user/wsl.md) · [God Mode](./power-user/god-mode.md) · [Registro](./power-user/registry-hacks.md)

---

## 🌐 La web (GitHub Pages)
La web está en [`site/`](./site/) y lee directamente estos archivos Markdown: **solo hay que editar los `.md`**. Cada cambio que llega a `main` se publica solo con GitHub Actions.

- **Ver en local:** `bash scripts/build-site.sh && python3 -m http.server -d _site 8000` y abre `http://localhost:8000`.
- **Añadir una página:** crea el `.md` y añádelo a la lista `PAGES` de [`site/app.js`](./site/app.js).
- **Formato de las tablas:** `| Atajo | Qué hace | Cuándo usarlo | Nivel |`. El nivel es `Básico`, `Intermedio` o `Avanzado`. Si la primera columna se llama **Comando** o **Variable**, se muestra como código con botón de copiar.

## 🛠️ Contribuciones
¡Añade o corrige atajos con un pull request! Indica la versión de Windows o de la app en la que lo has comprobado.
