# 🧮 APP-CALCULADORA-MULTINIVEL-TAURI

Aplicación de escritorio multiplataforma (Windows y Linux) basada en una calculadora web multinivel (3 niveles + intro), migrada a **Tauri** utilizando **TypeScript** y tecnologías web "Vanilla" (HTML/CSS).

## 🚀 Características
*   **Ligera y veloz:** Menor consumo de recursos gracias al motor nativo de Tauri.
*   **Estructura multinivel:** Interfaz fluida con pantalla de introducción y 3 modos de cálculo.
*   **Código robusto:** Migrado de JavaScript tradicional a TypeScript para un tipado seguro.

## 🛠️ Desarrollo Local

### Requisitos previos
*   Instalar [Node.js](https://nodejs.org)
*   Instalar [Rust](https://rust-lang.org) y el compilador de tu sistema (C++ Build Tools en Windows o build-essential en Linux).

### Pasos para ejecutar
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Roberto-Araujo-98/APP-CALCULADORA-MULTINIVEL-TAURI.git
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run tauri dev
   ```

## 📦 Compilación (Build)
Para generar el instalador nativo (`.exe` / `.msi` en Windows o `.deb` / `.AppImage` en Linux), ejecuta:
```bash
npm run tauri build
```
