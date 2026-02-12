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
   btn1.addEventListener('click',()=>{
      ctx.drawImage(image1,0,0,img1.width,img1.heigh);
   })
   btn2.addEventListener('click',()=>{
  
   })
   btn3.addEventListener('click',()=>{
   })





})