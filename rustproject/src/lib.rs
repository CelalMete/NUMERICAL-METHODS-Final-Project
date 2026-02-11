use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn selam_ver() -> String {
    "Merhaba! Ben Rust, senin bilgisayarında çalışıyorum.".to_string()
}
