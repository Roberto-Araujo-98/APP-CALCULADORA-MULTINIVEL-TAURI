const display = document.getElementById("display");
const history = document.getElementById("history");

let current = "";
let storedValue = null;
let activeOp = null;
let startNewNumber = false;
let is2nd = false;

/* --- Captura de Eventos --- */
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => handleInput(btn.dataset.key));
});

document.addEventListener("keydown", e => {
    if (e.key === "Enter") e.preventDefault();
    
    // Mapeos rápidos de teclado físico comunes
    if (!isNaN(e.key) || e.key === ".") return handleInput(e.key);
    if (["+", "-", "*", "/"].includes(e.key)) return handleInput(e.key);
    if (e.key === "Enter" || e.key === "Backspace") return handleInput(e.key);
    if (e.key === "Escape") return handleInput("C");
});

/* --- Enrutador de acciones --- */
function handleInput(key) {
    if (!isNaN(key) || key === ".") {
        if (startNewNumber) {
            current = "";
            startNewNumber = false;
        }
        if (key === "." && current.includes(".")) return;
        current += key;
        updateUI();
        return;
    }

    if (key === "pi") { current = Math.PI.toString(); startNewNumber = true; updateUI(); return; }
    if (key === "e") { current = Math.E.toString(); startNewNumber = true; updateUI(); return; }
    if (key === "C") { current = ""; storedValue = null; activeOp = null; updateUI(); return; }
    if (key === "CE") { current = ""; updateUI(); return; }
    if (key === "Backspace") { current = current.slice(0, -1); updateUI(); return; }

    if (key === "2nd") {
        is2nd = !is2nd;
        document.querySelector(".toggle-2nd").classList.toggle("active", is2nd);
        document.querySelectorAll(".switchable").forEach(btn => {
            btn.innerHTML = is2nd ? btn.dataset.lbl2 : btn.dataset.lbl1;
        });
        return;
    }

    // Resolver si la tecla activa es la primaria o secundaria (2nd)
    let targetKey = key;
    const btnElement = document.querySelector(`[data-key="${key}"]`);
    if (btnElement && is2nd && btnElement.dataset.sec) {
        targetKey = btnElement.dataset.sec;
    }

    // Agrupación de operaciones
    const unaryOps = ["sin", "cos", "tan", "asin", "acos", "atan", "x2", "x3", "1/x", "abs", "sqrt", "cbrt", "10x", "2x", "log", "ln", "ex", "fact", "+/-"];
    const binaryOps = ["+", "-", "*", "/", "mod", "xy", "yroot", "logyx", "exp"];

    if (unaryOps.includes(targetKey)) {
        ejecutarUnaria(targetKey);
    } else if (binaryOps.includes(targetKey)) {
        ejecutarBinaria(targetKey);
    } else if (targetKey === "Enter") {
        if (activeOp && current !== "") {
            resolverCalculo();
            activeOp = null;
            startNewNumber = true;
            updateUI();
        }
    }
}

/* --- Operaciones Unarias (Inmediatas) --- */
function ejecutarUnaria(op) {
    let val = parseFloat(current || "0");
    let result = 0;

    switch (op) {
        // Trigonometría (Entrada en Grados Sexagesimales)
        case "sin": result = Math.sin(val * Math.PI / 180); break;
        case "cos": result = Math.cos(val * Math.PI / 180); break;
        case "tan": result = Math.tan(val * Math.PI / 180); break;
        // Inversas (Salida convertida a Grados Sexagesimales)
        case "asin": result = Math.asin(val) * 180 / Math.PI; break;
        case "acos": result = Math.acos(val) * 180 / Math.PI; break;
        case "atan": result = Math.atan(val) * 180 / Math.PI; break;
        
        case "x2": result = Math.pow(val, 2); break;
        case "x3": result = Math.pow(val, 3); break;
        case "1/x": result = val !== 0 ? 1 / val : NaN; break;
        case "abs": result = Math.abs(val); break;
        case "sqrt": result = val >= 0 ? Math.sqrt(val) : NaN; break;
        case "cbrt": result = Math.cbrt(val); break;
        case "10x": result = Math.pow(10, val); break;
        case "2x": result = Math.pow(2, val); break;
        case "log": result = val > 0 ? Math.log10(val) : NaN; break;
        case "ln": result = val > 0 ? Math.log(val) : NaN; break;
        case "ex": result = Math.exp(val); break;
        case "fact": result = calcularFactorial(val); break;
        case "+/-": result = -val; break;
    }

    if (isNaN(result) || !isFinite(result)) {
        current = "Error";
    } else {
        // Redondeo de precisión para limpiar errores de flotantes en JS (ej: sin(180) -> 0)
        current = Number(result.toFixed(10)).toString();
    }
    startNewNumber = true;
    updateUI();
}

/* --- Operaciones Binarias (Dos operandos) --- */
function ejecutarBinaria(op) {
    if (activeOp && current !== "") {
        resolverCalculo();
    }
    storedValue = parseFloat(current || "0");
    activeOp = op;
    current = "";
    startNewNumber = false;
    updateUI();
}

function resolverCalculo() {
    let val2 = parseFloat(current || "0");
    let result = 0;

    switch (activeOp) {
        case "+": result = storedValue + val2; break;
        case "-": result = storedValue - val2; break;
        case "*": result = storedValue * val2; break;
        case "/": result = val2 !== 0 ? storedValue / val2 : NaN; break;
        case "mod": result = storedValue % val2; break;
        case "xy": result = Math.pow(storedValue, val2); break;
        case "yroot": result = val2 !== 0 ? Math.pow(storedValue, 1 / val2) : NaN; break;
        case "logyx": result = (storedValue > 0 && val2 > 0 && val2 !== 1) ? Math.log(storedValue) / Math.log(val2) : NaN; break;
        case "exp": result = storedValue * Math.pow(10, val2); break;
    }

    if (isNaN(result) || !isFinite(result)) {
        current = "Error";
        storedValue = null;
    } else {
        current = Number(result.toFixed(10)).toString();
        storedValue = result;
    }
}

/* --- Auxiliares --- */
function calcularFactorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

function updateUI() {
    display.textContent = current || "0";
    if (activeOp !== null) {
        history.textContent = `${storedValue} ${obtenerSimbolo(activeOp)}`;
    } else {
        history.textContent = "";
    }
}

function obtenerSimbolo(op) {
    const simbolos = { "+": "+", "-": "−", "*": "×", "/": "÷", "mod": "mod", "xy": "^", "yroot": "yroot", "logyx": "log_y", "exp": "e" };
    return simbolos[op] || "";
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

// Ejecutar apenas cargue la página
window.addEventListener("DOMContentLoaded", aplicarOverclockGlobal);

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