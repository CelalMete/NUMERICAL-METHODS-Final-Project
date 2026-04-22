use std::usize;

use wasm_bindgen::prelude::*;
fn sobelAlgorithm(data: &[u8], w: usize, h: usize)->Vec<f32>{
let gri = gri(data, w, h);
let mut g_degerleri = vec![0.0; w * h];
    for y in 1..(h - 1) {
        for x in 1..(w - 1) {
            let mut gx: f32 = 0.0;
            let mut gy: f32 = 0.0;
            for i in -1isize..=1 {
                for j in -1isize..=1 {
                    let komsu_y = (y as isize + i) as usize;
                    let komsu_x = (x as isize + j) as usize;
                    let idx = (komsu_y * w + komsu_x);
                    let pixel = gri[idx] as f32;
                    let x_katsayi = match (i, j) {//x için matris
                        (-1, -1) => -1.0, (0, -1) => -2.0, (1, -1) => -1.0,
                        (-1, 1) => 1.0,  (0, 1) => 2.0,   (1, 1) => 1.0,
                        _ => 0.0
                    };
                    let y_katsayi = match (i, j) {//y için matris
                        (-1, -1) => -1.0, (-1, 0) => -2.0, (-1, 1) => -1.0,
                        (1, -1) => 1.0,  (1, 0) => 2.0,   (1, 1) => 1.0,
                        _ => 0.0
                    };
                    gx += pixel * x_katsayi;
                    gy += pixel * y_katsayi;     
                }
            }
            let g = (gx * gx + gy * gy).sqrt(); //hipotemus falan filan
            g_degerleri[y * w + x] = g; 
        }
    }
    return g_degerleri
}


fn gri(data: &[u8], w: usize, h: usize)->Vec<u8>{
    let mut gri_arr=vec![0; w * h];
    for y in 0..h{
        for x in 0..w {
            let ind = (y*w+x)*4;
            let r=data[ind]as f32;
            let g=data[ind+1]as f32;
            let b=data[ind+2]as f32;
            let parlaklik = (0.299 * r + 0.587 * g + 0.114 * b) as u8;
            gri_arr[y * w + x] = parlaklik;
        }
    }
    return gri_arr;
}

#[wasm_bindgen]
extern "C" {
    // JavaScript'teki console.log'u Rust'a 'log' adıyla kopyalıyoruz
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
#[wasm_bindgen]
pub fn resmi_olcekle(data: &[u8], btn: u8, w: u32, h: u32, nw:u32, nh:u32) -> Vec<u8> {
    let mut sonuc = Vec::with_capacity((nw * nh* 4 ) as usize);
    if nw==w&&nh==h{
    for i in (0..sonuc.capacity()).step_by(4) {
    let r =data[i] as u16;
    let g =data[i+1] as u16;
    let b =data[i+2] as u16;
            let a = data[i+3];
     let total = r+g+b;
    
     let ort=total/3;
    let gri_renk = ort as u8;
        if btn==1{
           sonuc.push(gri_renk);
           sonuc.push(gri_renk);
           sonuc.push(gri_renk);
           sonuc.push(a);
        
        }
        if btn==2{
            sonuc.push(255-data[i]);   
            sonuc.push(255-data[i+1]); 
            sonuc.push(255-data[i+2]); 
            sonuc.push(a);        
            } 
        if btn==3{

            sonuc.push(data[i]);   
            sonuc.push(data[i+1]); 
            sonuc.push(data[i+2]); 
            sonuc.push(255);  
            }
        }
         
    }else{
        let x_ks = w as f32 / nw as f32;
        let y_ks = h as f32 / nh as f32;

        for y in 0..nh {
            for x in 0..nw {
                let orgx = (x as f32 * x_ks).floor() as u32;
                let orgy = (y as f32 * y_ks).floor() as u32;
                let index = ((orgy * w + orgx) * 4) as usize;
                let nr;
                let ng;
                let nb;
                let na;
                let sagda_komsu_var_mi = (orgx < w - 1) && (index + 7 < data.len());
                if orgx == x * 2 || !sagda_komsu_var_mi {
                    nr = data[index] as u16;
                    ng = data[index + 1] as u16;
                    nb = data[index + 2] as u16;
                    na = data[index + 3] as u16;
                     
                } else {
                    nr = (data[index] as u16 + data[index + 4] as u16) / 2;
                    ng = (data[index + 1] as u16 + data[index + 5] as u16) / 2;
                    nb = (data[index + 2] as u16 + data[index + 6] as u16) / 2;
                    na = (data[index + 3] as u16 + data[index + 7] as u16) / 2;
                }
                sonuc.push(nr as u8);
                sonuc.push(ng as u8);
                sonuc.push(nb as u8);
                sonuc.push(na as u8);
            }
        }
        
    }
    return sonuc;
}



#[wasm_bindgen]
pub fn karakalem(data: &[u8], w: usize, h: usize) -> Vec<u8>{
   let g_degerleri=sobelAlgorithm(data, w, h);
    let mut b=0.0;
   let mut arr = [0u32; 256]; 
    for i in 0..g_degerleri.len() {
        let mut g = g_degerleri[i];
          if g > 255.0 {
            g = 255.0;
        }
        b += g_degerleri[i];
        let a = g as usize;
        arr[a] += 1; 
    }
    
    let sayi=g_degerleri.len() as f32;
    let ort=b/sayi;
  let mut gorsel_px=Vec::with_capacity(w * h *4);
    for &g in g_degerleri.iter() {
        let renk = g as u8;
        gorsel_px.push(renk); // Kırmızı
        gorsel_px.push(renk); // Yeşil
        gorsel_px.push(renk); // Mavi
        gorsel_px.push(255);  // Alfa
    }   
return gorsel_px;
}

#[wasm_bindgen]
pub fn kenarlari_bul(data: &[u8], w: usize, h: usize) -> Vec<u8>{
    let g_degerleri=sobelAlgorithm(data, w, h);
    let mut b=0.0;
   let mut arr = [0u32; 256]; 
    for i in 0..g_degerleri.len() {
        let mut g = g_degerleri[i];
          if g > 255.0 {
            g = 255.0;
        }
        b += g_degerleri[i];
        let a = g as usize;
        arr[a] += 1; 
    }
    let sayi=g_degerleri.len() as f32;
    let ort=b/sayi;
  let mut gorsel_px=Vec::with_capacity(w * h *4);
    for &g in g_degerleri.iter() {
        let renk = if g > ort { 0 } else { 255 };
        gorsel_px.push(renk); // Kırmızı
        gorsel_px.push(renk); // Yeşil
        gorsel_px.push(renk); // Mavi
        gorsel_px.push(255);  // Alfa
    }   
    
return gorsel_px;
}
