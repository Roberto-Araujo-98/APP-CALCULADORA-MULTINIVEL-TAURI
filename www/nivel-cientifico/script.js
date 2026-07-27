const magnitudes = {
    longitud: {
        base: "m",
        units: {
            "m": { label: "Metros (m)", factor: 1 },
            "km": { label: "Kilómetros (km)", factor: 1000 },
            "cm": { label: "Centímetros (cm)", factor: 0.01 },
            "mm": { label: "Milímetros (mm)", factor: 0.001 },
            "in": { label: "Pulgadas (in)", factor: 0.0254 },
            "ft": { label: "Pies (ft)", factor: 0.3048 }
        }
    },
    masa: {
        base: "kg",
        units: {
            "kg": { label: "Kilogramos (kg)", factor: 1 },
            "g": { label: "Gramos (g)", factor: 0.001 },
            "lb": { label: "Libras (lb)", factor: 0.45359237 },
            "oz": { label: "Onzas (oz)", factor: 0.028349523 }
        }
    },
    volumen: {
        base: "L",
        units: {
            "L": { label: "Litros (L)", factor: 1 },
            "mL": { label: "Mililitros (mL)", factor: 0.001 },
            "m3": { label: "Metros Cúbicos (m³)", factor: 1000 },
            "gal": { label: "Galones (gal)", factor: 3.78541 },
            "cup": { label: "Tazas (cup)", factor: 0.236588 }
        }
    },
    temperatura: {
        base: "C",
        units: {
            "C": { label: "Celsius (°C)" },
            "F": { label: "Fahrenheit (°F)" },
            "K": { label: "Kelvin (K)" }
        }
    },
    sistema_numerico: { // NUEVO: Módulo Programador de Bases Informáticas
        base: "DEC",
        units: {
            "DEC": { label: "Decimal (DEC)" },
            "BIN": { label: "Binario (BIN)" },
            "OCT": { label: "Octal (OCT)" },
            "HEX": { label: "Hexadecimal (HEX)" }
        }
    }
};

// Componentes del DOM
const overclockBtn = document.getElementById("overclock-btn");
const calcCard = document.getElementById("calc-card");
const navActivePill = document.getElementById("nav-active-pill");
const displayOutputContainer = document.getElementById("display-output-container");

const categoryBtn = document.getElementById("category-btn");
const categoryCurrent = document.getElementById("category-current");
const categoryOptions = document.getElementById("category-options");
const categoryArrow = document.getElementById("category-arrow");

const unitFromBtn = document.getElementById("unit-from-btn");
const unitFromCurrent = document.getElementById("unit-from-current");
const unitFromOptions = document.getElementById("unit-from-options");

const unitToBtn = document.getElementById("unit-to-btn");
const unitToCurrent = document.getElementById("unit-to-current");
const unitToOptions = document.getElementById("unit-to-options");

const displayInput = document.getElementById("display-input");
const displayOutput = document.getElementById("display-output");

// Componentes Mutantes
const brandFox = document.getElementById("brand-fox");
const hexKeypad = document.getElementById("hex-keypad");

// Estados Locales
let currentCategory = "longitud";
let currentUnitFrom = "m";
let currentUnitTo = "km";
let currentInputStr = "0";

/* --- ⚡ SISTEMA GLOBAL DE OVERCLOCK (localStorage) --- */
overclockBtn.addEventListener("click", () => {
    const isOverclock = localStorage.getItem("overclock") === "true";
    localStorage.setItem("overclock", !isOverclock);
    aplicarTemaOverclock();
});

function aplicarTemaOverclock() {
    const active = localStorage.getItem("overclock") === "true";
    
    if (active) {
        // Modo Overclock Activo (Rojos/Naranjas Neón)
        document.body.classList.replace("from-slate-950", "from-neutral-950");
        calcCard.className = "w-full max-w-[400px] bg-neutral-950/95 rounded-2xl p-5 border border-rose-500/40 shadow-[0_0_35px_rgba(225,29,72,0.45)] transition-all duration-500 animate-pulse-subtle";
        navActivePill.className = "bg-rose-600 text-white text-[11px] font-semibold px-3 py-1 rounded-lg shadow-[0_0_10px_rgba(225,29,72,0.6)] transition-all duration-500";
        displayOutputContainer.className = "bg-black/80 rounded-xl p-3 mb-5 border border-rose-500/30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-between relative transition-all duration-500";
        overclockBtn.className = "bg-rose-950/30 border border-rose-500/60 text-rose-400 text-[10px] font-mono tracking-wider font-bold px-3 py-2.5 rounded-xl transition-all shadow-[0_0_8px_rgba(225,29,72,0.3)]";
        
        document.querySelectorAll(".dynamic-text").forEach(el => el.classList.replace("text-blue-400", "text-rose-400"));
        document.querySelectorAll(".dynamic-output-text").forEach(el => el.classList.replace("text-emerald-400", "text-amber-500"));
        document.querySelectorAll(".hex-btn").forEach(el => el.classList.replace("text-blue-400", "text-rose-400"));
    } else {
        // Modo Normal Restaurado (Azul/Verde Cyberpunk)
        document.body.classList.replace("from-neutral-950", "from-slate-950");
        calcCard.className = "w-full max-w-[400px] bg-slate-900/90 rounded-2xl p-5 border border-blue-500/30 shadow-[0_0_30px_rgba(30,58,138,0.4)] transition-all duration-500";
        navActivePill.className = "bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-lg shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-500";
        displayOutputContainer.className = "bg-black/80 rounded-xl p-3 mb-5 border border-blue-500/20 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-between relative transition-all duration-500";
        overclockBtn.className = "bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 text-[10px] font-mono tracking-wider font-bold px-3 py-2.5 rounded-xl transition-all";
        
        document.querySelectorAll(".dynamic-text").forEach(el => el.classList.replace("text-rose-400", "text-blue-400"));
        document.querySelectorAll(".dynamic-output-text").forEach(el => el.classList.replace("text-amber-500", "text-emerald-400"));
        document.querySelectorAll(".hex-btn").forEach(el => el.classList.replace("text-rose-400", "text-blue-400"));
    }
}

/* --- CONTROL ESTRICTO DE FILTRADO DE TECLADO --- */
function actualizarBloqueoTeclado() {
    const btnDot = document.getElementById("btn-dot");
    const btnSign = document.getElementById("btn-toggle-sign");
    
    // Resetear opacidad y bloqueos por defecto
    document.querySelectorAll("#keypad-grid button.num").forEach(btn => {
        btn.classList.remove("opacity-15", "pointer-events-none");
    });
    btnDot.classList.remove("opacity-15", "pointer-events-none");
    btnSign.classList.remove("opacity-15", "pointer-events-none");

    // Caso Especial: Sistema Numérico Programador
    if (currentCategory === "sistema_numerico") {
        btnDot.classList.add("opacity-15", "pointer-events-none"); // Enteros puros en informática
        btnSign.classList.add("opacity-15", "pointer-events-none");

        if (currentUnitFrom === "HEX") {
            brandFox.classList.add("hidden");
            hexKeypad.classList.remove("hidden");
        } else {
            brandFox.classList.remove("hidden");
            hexKeypad.classList.add("hidden");

            if (currentUnitFrom === "BIN") {
                // Bloquear del 2 al 9
                document.querySelectorAll("#keypad-grid button.num").forEach(btn => {
                    const k = btn.dataset.key;
                    if (k !== "0" && k !== "1") btn.classList.add("opacity-15", "pointer-events-none");
                });
            } else if (currentUnitFrom === "OCT") {
                // Bloquear 8 y 9
                document.querySelectorAll("#keypad-grid button.num").forEach(btn => {
                    const k = btn.dataset.key;
                    if (k === "8" || k === "9") btn.classList.add("opacity-15", "pointer-events-none");
                });
            }
        }
    } else {
        // Regresar imagen de Fox si estamos en magnitudes científicas
        brandFox.classList.remove("hidden");
        hexKeypad.classList.add("hidden");
    }
}

/* --- CONTROL INTERACTIVO DE DESPLEGABLES --- */
function setupDropdown(btn, container) {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        [categoryOptions, unitFromOptions, unitToOptions].forEach(c => { if(c !== container) c.classList.add("hidden"); });
        container.classList.toggle("hidden");
    });
}
setupDropdown(categoryBtn, categoryOptions);
setupDropdown(unitFromBtn, unitFromOptions);
setupDropdown(unitToBtn, unitToOptions);
document.addEventListener("click", () => {
    [categoryOptions, unitFromOptions, unitToOptions].forEach(c => c.classList.add("hidden"));
});

function populateUnits() {
    const unitsData = magnitudes[currentCategory].units;
    const keys = Object.keys(unitsData);

    currentUnitFrom = keys[0];
    currentUnitTo = keys[1] || keys[0];

    unitFromCurrent.textContent = unitsData[currentUnitFrom].label;
    unitToCurrent.textContent = unitsData[currentUnitTo].label;

    const hoverIn = localStorage.getItem("overclock") === "true" ? "hover:bg-rose-950/40 hover:text-rose-400" : "hover:bg-blue-950/40 hover:text-blue-400";
    const hoverOut = localStorage.getItem("overclock") === "true" ? "hover:bg-rose-950/40 hover:text-amber-400" : "hover:bg-emerald-950/40 hover:text-emerald-400";

    renderUnitList(unitFromOptions, keys, unitsData, hoverIn, (key) => {
        currentUnitFrom = key;
        unitFromCurrent.textContent = unitsData[key].label;
        currentInputStr = "0";
        actualizarBloqueoTeclado();
        actualizarPantallas();
    });

    renderUnitList(unitToOptions, keys, unitsData, hoverOut, (key) => {
        currentUnitTo = key;
        unitToCurrent.textContent = unitsData[key].label;
        ejecutarConversion();
    });

    currentInputStr = "0";
    actualizarBloqueoTeclado();
    actualizarPantallas();
}

function renderUnitList(container, keys, data, hoverClass, onSelect) {
    container.innerHTML = "";
    keys.forEach(key => {
        const item = document.createElement("div");
        item.className = `p-2.5 cursor-pointer transition-all border-b border-slate-900/40 last:border-0 text-white ${hoverClass}`;
        item.textContent = data[key].label;
        item.addEventListener("click", () => {
            onSelect(key);
            container.classList.add("hidden");
        });
        container.appendChild(item);
    });
}

categoryOptions.querySelectorAll("[data-value]").forEach(item => {
    item.addEventListener("click", () => {
        currentCategory = item.dataset.value;
        categoryCurrent.textContent = item.textContent;
        categoryOptions.classList.add("hidden");
        populateUnits();
    });
});

/* --- CAPTURA Y PROCESAMIENTO NUMÉRICO --- */
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => handleKeypad(btn.dataset.key));
});

function handleKeypad(key) {
    if (!key) return;
    
    // 1. Prioridad Absoluta: Si es el comando de limpiar, resetea a "0" de inmediato
    if (key === "CLEAR") {
        currentInputStr = "0";
    } 
    // 2. Si es un dígito, un punto o una letra de Base 16 (Aquí la 'C' actúa como número)
    else if (!isNaN(key) || ["A","B","C","D","E","F"].includes(key) || key === ".") {
        if (currentInputStr === "0" && key !== ".") currentInputStr = "";
        if (key === "." && currentInputStr.includes(".")) return;
        currentInputStr += key;
    } 
    // 3. Borrado de un solo carácter
    else if (key === "Backspace") {
        currentInputStr = currentInputStr.slice(0, -1);
        if (currentInputStr === "" || currentInputStr === "-") currentInputStr = "0";
    } 
    // 4. Inversor de signo
    else if (key === "+/-") {
        if (currentInputStr !== "0" && currentCategory !== "sistema_numerico") {
            currentInputStr = currentInputStr.startsWith("-") ? currentInputStr.slice(1) : "-" + currentInputStr;
        }
    }
    actualizarPantallas();
}


function actualizarPantallas() {
    displayInput.textContent = currentInputStr;
    ejecutarConversion();
}

/* --- MOTOR ARQUITECTÓNICO DE CONVERSIÓN DUAL --- */
function ejecutarConversion() {
    if (currentCategory === "sistema_numerico") {
        // MOTOR DE BASES INFORMÁTICAS (ENTEROS DIGITALES)
        let baseOrigen = 10;
        if (currentUnitFrom === "BIN") baseOrigen = 2;
        else if (currentUnitFrom === "OCT") baseOrigen = 8;
        else if (currentUnitFrom === "HEX") baseOrigen = 16;

        let baseDestino = 10;
        if (currentUnitTo === "BIN") baseDestino = 2;
        else if (currentUnitTo === "OCT") baseDestino = 8;
        else if (currentUnitTo === "HEX") baseDestino = 16;

        let valorDecimal = parseInt(currentInputStr, baseOrigen);
        if (isNaN(valorDecimal)) {
            displayOutput.textContent = "0";
            return;
        }

        let outputStr = valorDecimal.toString(baseDestino).toUpperCase();
        displayOutput.textContent = outputStr;
    } else {
        // MOTOR DE MAGNITUDES FÍSICAS (CON PIVOTE CENTRAL)
        const value = parseFloat(currentInputStr);
        if (isNaN(value)) {
            displayOutput.textContent = "0";
            return;
        }
        if (currentUnitFrom === currentUnitTo) {
            displayOutput.textContent = formatearResultado(value);
            return;
        }

        let resultado = 0;
        if (currentCategory === "temperatura") {
            let celsiusPivote = 0;
            if (currentUnitFrom === "C") celsiusPivote = value;
            else if (currentUnitFrom === "F") celsiusPivote = (value - 32) * 5 / 9;
            else if (currentUnitFrom === "K") celsiusPivote = value - 273.15;

            if (currentUnitTo === "C") resultado = celsiusPivote;
            else if (currentUnitTo === "F") resultado = (celsiusPivote * 9 / 5) + 32;
            else if (currentUnitTo === "K") resultado = celsiusPivote + 273.15;
        } else {
            const dataUnits = magnitudes[currentCategory].units;
            const valorEnBase = value * dataUnits[currentUnitFrom].factor;
            resultado = valorEnBase / dataUnits[currentUnitTo].factor;
        }
        displayOutput.textContent = formatearResultado(resultado);
    }
}

function formatearResultado(num) {
    if (num.toString().includes(".") && num.toString().split(".")[1].length > 5) {
        return parseFloat(num.toFixed(5)).toString();
    }
    return num.toString();
}

// Inicialización de arranque
populateUnits();
aplicarTemaOverclock();

