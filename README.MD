# 🧮 APP-CALCULADORA-MULTINIVEL-TAURI

Aplicación de escritorio multiplataforma (**Windows** y **Linux**) basada en una calculadora web multinivel (Intro, Básico, Avanzado y Científico), desarrollada con **Tauri v2** y tecnologías web "Vanilla" (**HTML5, CSS3 y JavaScript**).

---

## 🚀 Características

* ⚡ **Ligera y veloz:** Compilada sobre Rust con Tauri v2, logrando un consumo mínimo de recursos de CPU y RAM.
* 📱 **Estructura multinivel:** Interfaz fluida con pantalla de bienvenida (Intro) y 3 modos de cálculo (Básico, Avanzado y Científico).
* 🛠️ **Sin sobrecarga (Zero-bundler):** Desarrollada en JavaScript "Vanilla" puro, manteniendo el proyecto liviano, rápido y sin dependencias complejas de Node/npm en el frontend.
* 🎨 **Identidad visual personalizada:** Ícono nativo empaquetado para la barra de tareas y el ejecutable a partir de arte propio (`fox.png`).

---

## 🛠️ Desarrollo Local

### Requisitos previos
* Instalar [Rust](https://www.rust-lang.org/) (junto con las herramientas de compilación de tu sistema: *C++ Build Tools* en Windows o `build-essential` en Linux).
* Tener instalado el CLI de Tauri:
  ```bash
  cargo install tauri-cli --version "^2.0.0"

### Pasos para ejecutar

Clonar el repositorio:


git clone [https://github.com/Roberto-Araujo-98/APP-CALCULADORA-MULTINIVEL-TAURI.git](https://github.com/Roberto-Araujo-98/APP-CALCULADORA-MULTINIVEL-TAURI.git)

cd APP-CALCULADORA-MULTINIVEL-TAURI
(Opcional) Regenerar íconos de la aplicación:
Si actualizas la imagen fuente fox.png, puedes regenerar los íconos automáticamente corriendo:


cargo tauri icon fox.png

### Ejecutar en modo desarrollo:


cargo tauri dev

#### 📦 Compilación (Build)
Para generar el ejecutable e instalador nativo (.exe / .msi en Windows o .deb / .AppImage en Linux), ejecuta:

cargo tauri build

### Los instaladores finales se generarán automáticamente en la carpeta:


src-tauri/target/release/bundle/

---