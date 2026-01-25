# 🌐 Environment Variables

Variables that store information about the system environment, useful for scripts and navigating via Run/Explorer.

## Common Variables
You can use these in File Explorer or the `Win` + `R` dialog by wrapping them in `%`.

| Variable | Points to... | Example Value |
| :--- | :--- | :--- |
| `%USERPROFILE%` | Current user's root folder | `C:\Users\Name` |
| `%APPDATA%` | Roaming AppData folder | `...\AppData\Roaming` |
| `%LOCALAPPDATA%` | Local AppData folder | `...\AppData\Local` |
| `%PROGRAMFILES%` | 64-bit Programs folder | `C:\Program Files` |
| `%PROGRAMFILES(X86)%` | 32-bit Programs folder | `C:\Program Files (x86)` |
| `%WINDIR%` | Windows OS directory | `C:\Windows` |
| `%TEMP%` | Temporary files folder | `...\AppData\Local\Temp` |
| `%PUBLIC%` | Public user profile | `C:\Users\Public` |
| `%COMPUTERNAME%` | The name of your PC | `DESKTOP-ABC123` |
| `%USERNAME%` | Your current username | `JohnDoe` |

## How to Edit Them
Type `sysdm.cpl` in `Win` + `R`, go to **Advanced** tab, and click **Environment Variables**.

---
[⬅️ Back to Home](../README.md)
