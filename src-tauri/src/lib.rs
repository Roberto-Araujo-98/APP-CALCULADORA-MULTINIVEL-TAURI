#[tauri::command]
fn resolver_en_rust(pantalla: String) -> Result<String, String> {
    // Aquí invocaremos tu simulador
    Ok(format!("Resultado Rust: {}", pantalla))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // Registramos tus comandos 
        .invoke_handler(tauri::generate_handler![resolver_en_rust])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}