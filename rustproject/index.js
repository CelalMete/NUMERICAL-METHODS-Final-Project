document.addEventListener("DOMContentLoaded", () => {
   const img1=document.getElementById('img1')
   const img2=document.getElementById('img2')
   const btn1=document.getElementById('orgin')
   const btn2=document.getElementById('zoom')
   const btn3=document.getElementById('nokta')
   img1.style.display='block';
   img2.style.display='none';
   btn1.addEventListener('click',()=>{
   img1.style.display='block';
   img2.style.display='none';
   })
   btn2.addEventListener('click',()=>{
   img1.style.display='none';
   img2.style.display='block';
   })
   btn3.addEventListener('click',()=>{
      
   })
})