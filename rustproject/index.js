import init, { resmi_olcekle, kenarlari_bul ,karakalem } from './pkg/rustproject.js';
document.addEventListener("DOMContentLoaded", () => {
    async function baslat() {
        await init();
        const canvas = document.getElementById('img1');
        const ust = document.getElementById('ust');
        const paintCtx = ust.getContext('2d');
        const buyutec = document.getElementById('buyutecCanvas');
        const buyutctx = buyutec.getContext('2d');
        const cerceve = document.getElementById('cerceve');
        const btn1 = document.getElementById('orgin');
        const btn2 = document.getElementById('zoom');
        const btn3 = document.getElementById('nokta');
        const btn4 = document.getElementById('buyuk');
        const btn5 = document.getElementById('buyutec');
        const boyaBtn = document.getElementById('boya');
        const btn7 = document.getElementById('kes');
        const renkButonlari = document.querySelectorAll('.color');
        const renkSecici = document.getElementById('renk-secici');
        const silgiBtn = document.getElementById('btnErase');
        const size= document.getElementById('size')
        const ctx = canvas.getContext('2d');
        let hamVeri;
        let isDrawing = false;
        let isErasing = false;
        let secilenRenk = '#ff0000';

        renkButonlari.forEach(kutu => {
            let color = kutu.dataset.color;
            kutu.style.backgroundColor = color;
            kutu.addEventListener('click', () => {
                secilenRenk = color;
                isErasing = false;
            });
        });

        renkSecici.addEventListener('input', (e) => {
            secilenRenk = e.target.value;
            console.log(secilenRenk)
            isErasing = false;
        });

        silgiBtn.addEventListener('click', () => {
            isErasing = true;
        });

        const image1 = new Image();
        image1.src = '/rustproject/resim/1.png';
        image1.onload = () => {
            canvas.width = image1.width;
            canvas.height = image1.height;
            ust.width = image1.width;
            ust.height = image1.height;
            
            canvas.style.width = '48vw';
            canvas.style.height = '60vh';
            ust.style.width = '48vw';
            ust.style.height = '60vh';
            
            ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
            const scanned = ctx.getImageData(0, 0, canvas.width, canvas.height);
            hamVeri = scanned.data;
        };

        function getMousePos(e, target) {
            const rect = target.getBoundingClientRect();
            const scaleX = target.width / rect.width;
            const scaleY = target.height / rect.height;
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        }
        size.addEventListener('input',()=>{
            document.getElementById('sizenum').style.height=size.value+'px';
            document.getElementById('sizenum').style.width=size.value+'px';
        })
        function startPosition(e) {
            isDrawing = true;
            paintCtx.beginPath();
            const pos = getMousePos(e, ust);
            paintCtx.moveTo(pos.x, pos.y);
        }

        function endPosition() {
            isDrawing = false;
            paintCtx.beginPath();
        }

        function draw(e) {
            if (!isDrawing) return;
            const pos = getMousePos(e, ust);
            console.log(isDrawing)
            console.log(isErasing)
            if (isErasing) {
                paintCtx.globalCompositeOperation = 'destination-out';
                paintCtx.lineWidth = 30;
                
            } else {
                paintCtx.globalCompositeOperation = 'source-over';
                paintCtx.lineWidth = size.value/5;
                paintCtx.strokeStyle = secilenRenk;
            }

            paintCtx.lineCap = 'round';
            paintCtx.lineTo(pos.x, pos.y);
            paintCtx.stroke();
            paintCtx.beginPath();
            paintCtx.moveTo(pos.x, pos.y);
        }

        boyaBtn.addEventListener('click', () => {
            document.getElementById('boyacont').style.display='block';
            ust.style.display = 'block';
        });

        ust.addEventListener('mousedown', startPosition);
        ust.addEventListener('mousemove', draw);
        window.addEventListener('mouseup', endPosition);

        btn1.addEventListener('click', () => {
            let sonuc = resmi_olcekle(hamVeri, 1, canvas.width, canvas.height, canvas.width, canvas.height);
            resmi_guncelle(ctx, canvas, sonuc, canvas.width, canvas.height);
        });

        btn2.addEventListener('click', () => {
            let sonuc = resmi_olcekle(hamVeri, 2, canvas.width, canvas.height, canvas.width, canvas.height);
            resmi_guncelle(ctx, canvas, sonuc, canvas.width, canvas.height);
        });

        btn3.addEventListener('click', () => {
            let sonuc = karakalem(hamVeri, canvas.width, canvas.height);
            resmi_guncelle(ctx, canvas, sonuc, canvas.width, canvas.height);
        });

        btn4.addEventListener('click', () => {
            let sonuc = resmi_olcekle(hamVeri, 4, canvas.width, canvas.height, canvas.width * 2, canvas.height * 2);
            resmi_guncelle(ctx, canvas, sonuc, canvas.width * 2, canvas.height * 2);
        });

        btn5.addEventListener('click', () => {
            canvas.addEventListener('mousemove', (e) => {
                buyutec.style.display = 'block';
                const pos = getMousePos(e, canvas);
                buyutec.style.left = (e.pageX + 15) + 'px';
                buyutec.style.top = (e.pageY - 55) + 'px';
                buyutctx.clearRect(0, 0, buyutec.width, buyutec.height);
                buyutctx.drawImage(canvas, pos.x - 25, pos.y - 25, 50, 50, 0, 0, buyutec.width, buyutec.height);
            });
            canvas.addEventListener('mouseleave', () => {
                buyutec.style.display = 'none';
            });
        });

        let kX, kY, kirpmaModu = false, fareBasili = false;

        btn7.addEventListener('click', () => {
            kirpmaModu = true;
            ust.style.cursor = "crosshair";
        });

        ust.addEventListener('mousedown', (e) => {
            if (!kirpmaModu) return;
            fareBasili = true;
            kX = e.pageX;
            kY = e.pageY;
            cerceve.style.display = 'block';
            cerceve.style.left = kX + 'px';
            cerceve.style.top = kY + 'px';
            cerceve.style.width = '0px';
            cerceve.style.height = '0px';
        });

        window.addEventListener('mousemove', (e) => {
            if (!kirpmaModu || !fareBasili) return;
            cerceve.style.width = (e.pageX - kX) + 'px';
            cerceve.style.height = (e.pageY - kY) + 'px';
        });

        window.addEventListener('mouseup', (e) => {
            if (!kirpmaModu || !fareBasili) return;
            fareBasili = false;
            const rect = ust.getBoundingClientRect();
            
            let Genislik = parseInt(cerceve.style.width);
            let Yukseklik = parseInt(cerceve.style.height);
            let sX = (kX - (rect.left + window.scrollX)) * (ust.width / rect.width);
            let sY = (kY - (rect.top + window.scrollY)) * (ust.height / rect.height);
            let sW = Genislik * (ust.width / rect.width);
            let sH = Yukseklik * (ust.height / rect.height);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image1, sX, sY, sW, sH, 0, 0, canvas.width, canvas.height);
            
            cerceve.style.display = 'none';
            kirpmaModu = false;
            ust.style.cursor = "default";
        });
    }

    function resmi_guncelle(ctx, canvas, pixelData, genislik, yukseklik) {
        canvas.width = genislik;
        canvas.height = yukseklik;
        const yeniImageData = new ImageData(new Uint8ClampedArray(pixelData), genislik, yukseklik);
        ctx.putImageData(yeniImageData, 0, 0);
    }

    baslat();
});