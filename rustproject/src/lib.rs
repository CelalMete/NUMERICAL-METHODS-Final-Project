use std::{process::Output, usize};

use wasm_bindgen::prelude::*;
#[derive(Copy, Clone, Debug)]
struct Centroid{r: f32,g: f32,b: f32}
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
fn karesini_alma(data: &[u8], merkezler: &mut [Centroid], w: usize, h: usize) -> Vec<u8> {
    let mut sonuc = vec![0u8; w * h * 4];
    for tur in 0..10 { // 0'dan 9'a kadar
        let mut yeni_r_toplam = vec![0.0f32; 8];
        let mut yeni_g_toplam = vec![0.0f32; 8];
        let mut yeni_b_toplam = vec![0.0f32; 8];
        let mut piksel_sayisi = vec![0u32; 8];
        for y in 0..h {
            for x in 0..w {
                let ind = (y * w + x) * 4;
                let r = data[ind] as f32;
                let g = data[ind + 1] as f32;
                let b = data[ind + 2] as f32;

                let mut yakin = f32::MAX;
                let mut yakinindex = 0;
                for (i, cen) in merkezler.iter().enumerate() {
                    let d = (cen.r - r).powi(2) + (cen.g - g).powi(2) + (cen.b - b).powi(2);
                    if d < yakin {
                        yakin = d;
                        yakinindex = i; 

                    }
                }
                if tur < 9 {
                    yeni_r_toplam[yakinindex] += r;
                    yeni_g_toplam[yakinindex] += g;
                    yeni_b_toplam[yakinindex] += b;
                    piksel_sayisi[yakinindex] += 1;
                } else {
                    sonuc[ind] = merkezler[yakinindex].r as u8;
                    sonuc[ind + 1] = merkezler[yakinindex].g as u8;
                    sonuc[ind + 2] = merkezler[yakinindex].b as u8;
                    sonuc[ind + 3] = 255;
                }
            }
        }
        if tur < 9 {
            for i in 0..8 {
                if piksel_sayisi[i] > 0 {
                    merkezler[i].r = yeni_r_toplam[i] / piksel_sayisi[i] as f32;
                    merkezler[i].g = yeni_g_toplam[i] / piksel_sayisi[i] as f32;
                    merkezler[i].b = yeni_b_toplam[i] / piksel_sayisi[i] as f32;
                }
            }
        }
    }
    sonuc
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

fn cubicColorization(data: &[u8], w: usize, h: usize)->Vec<u8>{
 let mut sonuc = vec![0u8; w * h * 4];

 return sonuc;
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
#[wasm_bindgen]
pub fn gaussian_blur(data:&[u8],w:usize,h:usize)->Vec<u8>{
    let mut sonuc =vec![0;w*h*4];
    let kernel:[f32;9]=[
        1.0/16.0, 2.0/16.0, 1.0/16.0,
        2.0/16.0, 4.0/16.0, 2.0/16.0,
        1.0/16.0, 2.0/16.0, 1.0/16.0,
    ];
    for y in 1..h-1{
        for x in 1..w-1{
            for c in 0..3{
            let mut sum =0.0;//o pikselin değerleri
                for i in -1isize..=1{
                    for j in -1isize..=1{
                    let idx=(((y as isize+1)as usize*w+(x as isize +j)as usize)*4)+c;
                    let k_idx=((i+1)*3+(j+1))as usize;
                    sum += data[idx] as f32 * kernel[k_idx];
                }
            }
            sonuc[(y*w+x)*4+c]=sum as u8;
        }
        sonuc[(y*w+x)*4+3]=255;
    }
}
    return sonuc;
}
#[wasm_bindgen]
pub fn k_means(data:&[u8],w:usize,h:usize)->Vec<u8>{
    let mut merkezler = vec![
    Centroid { r: 0.0, g: 0.0, b: 0.0 },// siyah
    Centroid { r: 255.0, g: 255.0, b: 255.0 },// beyaz
    Centroid { r: 255.0, g: 0.0, b: 0.0 },//kırmızı
    Centroid { r: 0.0, g: 255.0, b: 0.0 },//yesil
    Centroid { r: 0.0, g: 0.0, b: 255.0 },//mavi
    Centroid { r: 0.0, g: 255.0, b: 255.0 },//cyan
    Centroid { r: 255.0, g: 0.0, b: 255.0 },//magenta
    Centroid { r: 255.0, g: 255.0, b: 0.0 }//sarı
];
    let mut sonuc=karesini_alma(data,&mut merkezler, w, h);
   
    return sonuc;
}
//kmeans oto k belirleme ve oto başlangıç rengi belirleme eklenecek 
#[wasm_bindgen]
pub fn Color_Quantization(data:&[u8],w:usize,h:usize)->Vec<u8>{
    let mut sonuc=cubicColorization(data, w, h);
    return sonuc;//later
}
