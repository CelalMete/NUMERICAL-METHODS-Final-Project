import init, { resmi_olcekle } from './pkg/rustproject.js';

document.addEventListener("DOMContentLoaded", () => {
    async function baslat() {
        await init();
        const canvas = document.getElementById('img1'); 
        const buyutec=document.getElementById('buyutecCanvas')
        const buyutctx=buyutec.getContext('2d')
        const btn1 = document.getElementById('orgin');
        const btn2 = document.getElementById('zoom');
        const btn4 = document.getElementById('buyuk');
        const btn3 = document.getElementById('nokta');
        const btn5 = document.getElementById('buyutec');
        const ctx = canvas.getContext('2d');
        canvas.width = 670;//genişlik pixel sayisi  1 pixel 4 sayı 
        canvas.height = 500;//yükseklik pixel sayısı
        const image1 = new Image();
        image1.src = '/rustproject/resim/1.jpeg';
        

        image1.onload = () => {
            ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
            const scanned = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const hamVeri = scanned.data; 
            let sonucPixels; 
            let btn = 0;
            btn1.addEventListener('click', () => {
                btn = 1;
                console.log(btn+"siyahbeyaz")
                document.getElementById('cont2').style.width='100%'
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width, canvas.height);
                 console.log(sonucPixels.length)
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
            });
            btn2.addEventListener('click', () => {
                btn = 2;
                console.log(btn+"anti")
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width, canvas.height);
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
            });
            btn3.addEventListener('click', () => {
                btn = 3;
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width, canvas.height);
                
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
            });
            btn4.addEventListener('click', () => {
                btn = 4;
               console.log(hamVeri)
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width*2, canvas.height*2);
                console.log(sonucPixels.length)
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width*2, canvas.height*2);
            });
btn5.addEventListener('click', () => {
                const canvascoor = canvas.getBoundingClientRect();//coordinatları alıyo nası bilmiom
               canvas.addEventListener('mousemove',function(e){
                let farex=e.clientX-canvascoor.left;
                let farey=e.clientY-canvascoor.top;
                buyutctx.drawImage(image1,farex - 50,farey-50, 100, 100,0,0, buyutec.width, buyutec.height)
               })
});
        };
    }
    function resmi_guncelle(ctx, canvas, pixelData, genislik, yukseklik) {
    canvas.width = genislik;
    canvas.height = yukseklik;
    const yeniImageData = new ImageData(
        new Uint8ClampedArray(pixelData), 
        genislik,
        yukseklik
    );
    console.log(canvas.width)
    console.log(canvas.height)
    console.log(pixelData)
    ctx.putImageData(yeniImageData, 0, 0);
}
    baslat();
});