use std::usize;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]

pub fn resmi_olcekle(
    data: &[u8],
    btn: u8,
    w: u32,       
    h: u32,    
    nw:u32,
    nh:u32   
) -> Vec<u8> {
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
         
    }else{let x_ks = w as f32 / nw as f32;
        let y_ks = h as f32 / nh as f32;

        for y in 0..nh {
            for x in 0..nw {
                let orgx = (x as f32 * x_ks).floor() as u32;
                let orgy = (y as f32 * y_ks).floor() as u32;
                let index = ((orgy * w + orgx) * 4) as usize;
                let mut nr;
                let mut ng;
                let mut nb;
                let mut na;
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
