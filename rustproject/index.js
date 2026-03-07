import init, { resmi_olcekle,kenarlari_bul } from './pkg/rustproject.js';

document.addEventListener("DOMContentLoaded", () => {
    async function baslat() {
await init();
        const canvas = document.getElementById('img1'); 
        const buyutec=document.getElementById('buyutecCanvas')
        const cerceve =document.getElementById('cerceve');
        const buyutctx=buyutec.getContext('2d')
        const btn1 = document.getElementById('orgin');
        const btn2 = document.getElementById('zoom');
        const btn3 = document.getElementById('nokta');
        const btn4 = document.getElementById('buyuk');
        const btn5 = document.getElementById('buyutec');
        const btn6 = document.getElementById('partikul');
        const btn7 = document.getElementById('kes');

        const ctx = canvas.getContext('2d');
        
        const image1 = new Image();
        image1.src = '/rustproject/resim/1.svg';
        image1.onload = () => {
            canvas.width = image1.width;   // Örn: 1920 olur
             canvas.height = image1.height;
            console.log(canvas.width)
            console.log(canvas.height)
             canvas.style.width = '670px';
        canvas.style.height = '500px';
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
  

            btn1.addEventListener('click', () => {
                btn = 1;
                console.log(btn+"siyahbeyaz")
                canvas.width = image1.width;   // Örn: 1920 olur
             canvas.height = image1.height;
                document.getElementById('cont2').style.width='100%'
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width, canvas.height);
                 console.log(sonucPixels.length)
                 console.log(canvas.width+ canvas.height)
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
            });
            btn2.addEventListener('click', () => {
                btn = 2;
                canvas.width = image1.width;   // Örn: 1920 olur
             canvas.height = image1.height;
                console.log(btn+"anti")
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width, canvas.height);
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
            });
            btn3.addEventListener('click', () => {
                btn = 3;
                canvas.width = image1.width;   // Örn: 1920 olur
             canvas.height = image1.height;
                sonucPixels = kenarlari_bul(hamVeri, canvas.width, canvas.height);
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width, canvas.height);
                
                console.log(a.length)
            });
            btn4.addEventListener('click', () => {
                btn = 4;
                canvas.width = image1.width;   // Örn: 1920 olur
             canvas.height = image1.height;
               console.log('ham'+hamVeri)
                console.log('ctx'+ctx)
                sonucPixels = resmi_olcekle(hamVeri, btn, canvas.width, canvas.height, canvas.width*2, canvas.height*2);
                console.log(sonucPixels.length)
                
                resmi_guncelle(ctx, canvas, sonucPixels, canvas.width*2, canvas.height*2);
            });
        btn5.addEventListener('click', () => {
           canvas.width = image1.width;   // Örn: 1920 olur
             canvas.height = image1.height;
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
        inita();
        animate();});
    btn7.addEventListener('click', () => {
        
    let x,y,kirpma=false,fare=false;
        canvas.addEventListener('click',function(e){
            canvas.style.cursor = "crosshair";
             if(!kirpma)kirpma=true;
        })
      
        canvas.addEventListener('mousedown',(e)=>{
            if(!kirpma)return;
            fare=true;
            cerceve.style.display='block';
              x=e.pageX; y=e.pageY;
            cerceve.style.top=y+ 'px';
            cerceve.style.left=x + 'px';
            cerceve.style.width = '0px';
            cerceve.style.height = '0px';
        })
          canvas.addEventListener('mouseup',function(e){
            const canvascoor = canvas.getBoundingClientRect();
            if(!kirpma)return;
            if(fare){
            let Genislik = parseInt(cerceve.style.width);
            let Yukseklik = parseInt(cerceve.style.height);
            let secilenX = parseInt(cerceve.style.left);
            let secilenY = parseInt(cerceve.style.top);
            let oranx=canvas.width/canvascoor.width;
            let orany=canvas.height/canvascoor.height;
            cerceve.style.width = Genislik+'px';
            cerceve.style.height = Yukseklik+'px';
            let X = (secilenX - canvascoor.left)*oranx ;
             let Y = (secilenY - canvascoor.top)*orany ;
             console.log(`Kesilecek Alan - X: ${secilenX-canvascoor.left}, Y: ${secilenY-canvascoor.top}`);
            kirpma=false;fare=false;
            cerceve.style.display = 'none';
            console.log(`${X} ${Y} ${Genislik} ${Yukseklik}`)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
           ctx.drawImage(image1,X, Y, Genislik*oranx,Yukseklik*orany,0, 0,canvas.width, canvas.height );
        }
    })
         canvas.addEventListener('mousemove',(a)=>{
            
            if(!kirpma||!fare)return;
            let x2=a.pageX
            let y2=a.pageY;
            cerceve.style.width=x2-x +'px';
            cerceve.style.height=y2-y +'px';
        })
   
    });
/////////////////////////
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