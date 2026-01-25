# 🔧 Trucos del Registro (Registry Hacks)

> [!CAUTION]
> Tocar el registro puede ser peligroso. Haz siempre una copia de seguridad antes de cambiar nada.

## 1. Menú Contextual Clásico (W11)
Si prefieres el menú de clic derecho antiguo sin tener que dar a "Mostrar más opciones":
1. Ve a `HKEY_CURRENT_USER\Software\Classes\CLSID`.
2. Crea una clave llamada `{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}`.
3. Crea una subclave llamada `InprocServer32`.
4. Deja el valor (Predeterminado) en blanco (pero asegúrate de que esté creado).
5. Reinicia el Explorador.

## 2. Desactivar Bing en el menú Inicio
Para que la búsqueda solo busque archivos locales y no en la web:
1. Ve a `HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\Explorer`.
2. Crea un valor DWORD (32 bits) llamado `DisableSearchBoxSuggestions`.
3. Ponle el valor `1`.

---
[⬅️ Volver al Inicio](../README.md)
