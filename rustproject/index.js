
document.addEventListener("DOMContentLoaded", () => {
   const img1=document.getElementById('img1')
   const btn1=document.getElementById('orgin')
   const btn2=document.getElementById('zoom')
   const btn3=document.getElementById('nokta')
   const ctx = img1.getContext('2d')
   img1.width=800;
   img1.heigh=500;
   const image1=new Image();
   image1.src='/rustproject/resim/1.png';
    ctx.drawImage(image1,0,0,img1.width,img1.heigh);
   const scanned =ctx.getImageData(0,0,img1.width,img1.heigh);
     const sonucPixels = resmi_olcekle(scanned, img1.width, img1.height,img1.widht*2,  img1.height*2);
   btn1.addEventListener('click',()=>{
     
   })
   btn2.addEventListener('click',()=>{
  
   })
   btn3.addEventListener('click',()=>{
   })
})