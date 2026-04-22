let isDrawing = false;
let isErasing = false;
  
function startPosition(e) {
  isDrawing = true;
  draw(e); 
}
function endPosition() {
  isDrawing = false;
  paintCtx.beginPath();
   
} 
function draw(e) {
  if (!isDrawing) return;
   const rect = canvas.getBoundingClientRect();
   x= e.clientX - rect.left;
    y=e.clientY - rect.top;
 

  if (isErasing) {
    paintCtx.globalCompositeOperation = 'destination-out'; 
    paintCtx.lineWidth = 30; 
  } else {
    // FIRÇA MODU: Normal boyayı ÜST katmana (paintCtx) yapar.
    paintCtx.globalCompositeOperation = 'source-over'; 
    paintCtx.lineWidth = 5; 
    paintCtx.strokeStyle = 'red'; 
  }

  // Kritik: Tüm çizim işlemleri sadece ÜST context'e (paintCtx) yapılıyor
  paintCtx.lineTo(x,y);
  paintCtx.stroke();
  paintCtx.beginPath();
  paintCtx.moveTo(x, y);
}
////////
/////////////
boya.addEventListener('click',()=>{
                    document.getElementById('boyacont').style.display='block';
                    canvas.addEventListener('mousedown', startPosition());
                    canvas.addEventListener('mouseup', endPosition());
                    canvas.addEventListener('mousemove', draw(e));
                    canvas.addEventListener('mouseout', endPosition());
            console.log(isDrawing)
            })

document.getElementById('btnErase').addEventListener('click', () => {
  isErasing = true;
  isDrawing=false;
  console.log(isErasing)
});


    
