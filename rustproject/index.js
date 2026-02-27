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
        const btn7 = document.getElementById('mousepart')
        const btn6 = document.getElementById('partikul')
        const ctx = canvas.getContext('2d');
        canvas.width = 670;//genişlik pixel sayisi  1 pixel 4 sayı 
        canvas.height = 500;//yükseklik pixel sayısı
        const image1 = new Image();
       const orjinalGenislik = 670; 
        const orjinalYukseklik = 500;
        image1.src = '/rustproject/resim/1.png';
        image1.onload = () => {
             ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    const scanned = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hamVeri = scanned.data; // <-- Artık herkes bu veriye erişebilir!
    let sonucPixels; 
    let btn = 0;
     let particlesArray=[];
    const numberOfParticles=500;
    class Particle{
        constructor(){
            this.x=Math.random()*canvas.width;
            this.y=0;
            
            this.velocity=Math.random()*0.5;
            this.size=Math.random()+1;
        }
        update(){
            this.y+=this.velocity;
            if(this.y>=canvas.height){
                this.y=0;
                this.x=Math.random()*canvas.width;
            }
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle='white';
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.fill();
        }
    }
    function inita(){
        for(let i=0;i<numberOfParticles;i++){
            particlesArray.push(new Particle);
        }
    }
    inita();
    function animate(){
        ctx.globalAlpha = 1.0; 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
        for(let i=0;i<particlesArray.length;i++){
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    animate();

            btn1.addEventListener('click', () => {
                btn = 1;
                console.log(btn+"siyahbeyaz")
                canvas.width = orjinalGenislik;
                canvas.height = orjinalYukseklik;
                document.getElementById('cont2').style.width='100%'
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width, canvas.height);
                 console.log(sonucPixels.length)
                 console.log(canvas.width+ canvas.height)
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
            });
            btn2.addEventListener('click', () => {
                btn = 2;
                canvas.width = orjinalGenislik;
                canvas.height = orjinalYukseklik; 
                console.log(btn+"anti")
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width, canvas.height);
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
            });
            btn3.addEventListener('click', () => {
                btn = 3;
                canvas.width = orjinalGenislik;
                canvas.height = orjinalYukseklik;
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width, canvas.height);
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
            });
            btn4.addEventListener('click', () => {
                btn = 4;
                canvas.width = orjinalGenislik;
                canvas.height = orjinalYukseklik;
               console.log('ham'+hamVeri)
                console.log('ctx'+ctx)
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width*2, canvas.height*2);
                console.log(sonucPixels.length)
                
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width*2, canvas.height*2);
            });
        btn5.addEventListener('click', () => {
           canvas.width = orjinalGenislik;
                canvas.height = orjinalYukseklik;
                 ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
             
                const canvascoor = canvas.getBoundingClientRect();//coordinatları alıyo nası bilmiom
                canvas.addEventListener('mouseenter', function() {
                     buyutec.style.display = 'block';
                });

             canvas.addEventListener('mouseleave', function() {
                  buyutec.style.display = 'none';
                });
               canvas.addEventListener('mousemove',function(e){
                let farex=e.clientX-canvascoor.left;
                let farey=e.clientY-canvascoor.top;
                buyutec.style.left = (e.pageX + 15) + 'px';
                buyutec.style.top = (e.pageY - 55) + 'px';
                buyutctx.drawImage(canvas,farex - 15,farey-25, 50, 50,0,0, buyutec.width, buyutec.height)
               })
              
});
    btn6.addEventListener('click', () => {
        
        animate();});
    btn7.addEventListener('click', () => {
        
        canvas.addEventListener('mousemove',function(e){
                x=e.clientX;
                 y=e.clientY;
                 
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
    ctx.putImageData(yeniImageData, 0, 0);
}
    baslat();

});