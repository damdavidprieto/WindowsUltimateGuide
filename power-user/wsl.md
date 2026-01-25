# 🐧 WSL (Windows Subsystem for Linux)

Ejecuta un entorno de Linux directamente en Windows sin necesidad de máquinas virtuales tradicionales.

## Comandos Básicos
| Comando | Acción |
| :--- | :--- |
| `wsl --install` | Instala WSL y Ubuntu por defecto. |
| `wsl --list --online` | Lista las distribuciones disponibles. |
| `wsl --set-default-version 2` | Asegura que usas WSL 2. |
| `wsl --shutdown` | Apaga todas las instancias de Linux inmediatamente. |
| `wsl -d [distro]` | Inicia una distribución específica. |

## Integración de Archivos
- Accede a tus archivos de Windows desde Linux: `/mnt/c/Users/...`
- Accede a tus archivos de Linux desde Windows: Escribe `\\wsl$` en el Explorador de Archivos.

---
[⬅️ Volver al Inicio](../README.md)
