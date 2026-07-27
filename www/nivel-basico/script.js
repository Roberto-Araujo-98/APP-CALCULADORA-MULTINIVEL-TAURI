const display = document.getElementById("display");
const history = document.getElementById("history");
let current = "";
let prev = "";

/* --- Click en botones --- */
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        handleInput(btn.dataset.key);
    });
});

/* --- Teclado físico --- */
document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
    handleInput(e.key);
});

/* --- Lógica de Control --- */
function handleInput(key) {

    // Manejo de números y punto decimal
    if (!isNaN(key) || key === ".") {
        if (key === "." && current.includes(".")) return;
        current += key;
        update();
        return;
    }

    // Manejo de operadores binarios
    if (["+", "-", "*", "/"].includes(key)) {
        if (current === "" && prev === "") return;
        
        if (current === "" && prev !== "") {
            prev = prev.slice(0, -2) + key + " ";
            update();
            return;
        }

        prev = current + " " + key + " ";
        current = "";
        update();
        return;
    }

    if (key === "Enter") {
        calcular();
        return;
    }

    if (key === "C") {
        current = "";
        prev = "";
        update();
        return;
    }

    if (key === "Backspace") {
        current = current.slice(0, -1);
        update();
    }
}

/* --- Actualizar Interfaz --- */
function update() {
    display.textContent = current || "0";
    history.textContent = prev;
}

/* --- Motor de Cálculo --- */
function calcular() {
    if (current === "" || prev === "") return;

    try {
        let resultado = eval(prev + current);

        if (!isFinite(resultado)) {
            display.textContent = "Error";
            return;
        }

        history.textContent = prev + " " + current + " =";
        current = resultado.toString();
        prev = "";
        display.textContent = current;

    } catch {
        display.textContent = "Error";
    }
}

/* --- ⚡ RECEPTOR UNIVERSAL DE OVERCLOCK --- */
function aplicarOverclockGlobal() {
    const isOverclock = localStorage.getItem("overclock") === "true";
    const card = document.getElementById("calc-card");
    const body = document.body;

    if (!card) return; // Si no encuentra la tarjeta, no hace nada

    if (isOverclock) {
        // 1. Forzar fondo de pantalla en modo crítico
        body.style.backgroundImage = "linear-gradient(to bottom right, #0a0a0a, #000000, #170509)";
        
        // 2. Inyectar el Súper Neón Rojo Carmesí en la tarjeta
        card.style.borderColor = "rgba(244, 63, 94, 0.5)"; // rose-500
        card.style.boxShadow = "0 0 35px rgba(225, 29, 72, 0.5)"; // rose-600 shadow
        
        // 3. Mutar los textos y botones verdes/esmeralda a naranja/ámbar de advertencia
        document.querySelectorAll(".text-emerald-400, .text-green-400").forEach(el => {
            el.style.color = "#f59e0b"; // amber-500
        });
        document.querySelectorAll(".bg-emerald-600, .bg-green-600").forEach(el => {
            el.style.backgroundColor = "#dc2626"; // red-600
        });
    } else {
        // Restablecer estilos originales limpiando los estilos en línea
        body.style.backgroundImage = "";
        card.style.borderColor = "";
        card.style.boxShadow = "";
        document.querySelectorAll(".text-emerald-400, .text-green-400").forEach(el => {
            el.style.color = "";
        });
        document.querySelectorAll(".bg-emerald-600, .bg-green-600").forEach(el => {
            el.style.backgroundColor = "";
        });
    }
}



/* --- ⚡ RECEPTOR UNIVERSAL DE OVERCLOCK PREMIUM --- */
function aplicarOverclockGlobal() {
    const isOverclock = localStorage.getItem("overclock") === "true";
    const card = document.getElementById("calc-card");
    const activePill = document.getElementById("nav-active-pill");
    const body = document.body;

    if (!card) return;

    if (isOverclock) {
        // 1. Fondo de pantalla en modo crítico/sobrecarga
        body.style.backgroundImage = "linear-gradient(to bottom right, #0a0a0a, #000000, #170509)";
        
        // 2. Aplicar Súper Neón Rojo a la tarjeta externa
        card.style.borderColor = "rgba(244, 63, 94, 0.45)"; // rose-500
        card.style.boxShadow = "0 0 35px rgba(225, 29, 72, 0.5)"; // rose-600
        
        // 3. Mutar el botón de navegación activo de azul a Rojo Overclock
        if (activePill) {
            activePill.style.backgroundColor = "#e11d48"; // rose-600
            activePill.style.boxShadow = "0 0 12px rgba(225, 29, 72, 0.6)";
        }
        
        // 4. Cambiar textos o indicadores verdes a naranja/ámbar de advertencia
        document.querySelectorAll(".text-emerald-400, .text-green-400").forEach(el => {
            el.style.color = "#f59e0b"; // amber-500
        });
    } else {
        // Restablecer absolutamente todo a los colores Cyberpunk originales
        body.style.backgroundImage = "";
        card.style.borderColor = "";
        card.style.boxShadow = "";
        
        if (activePill) {
            activePill.style.backgroundColor = ""; // Regresa a su bg-blue original de Tailwind
            activePill.style.boxShadow = "";
        }
        
        document.querySelectorAll(".text-emerald-400, .text-green-400").forEach(el => {
            el.style.color = "";
        });
    }
}

// Escuchar cambios automáticos al cargar la página
window.addEventListener("DOMContentLoaded", aplicarOverclockGlobal);