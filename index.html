document.getElementById('upload').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');

                const width = img.width;
                const height = img.height;

                // Ajustar tamaños del canvas al tamaño de la imagen
                canvas.width = width;
                canvas.height = height;

                // Dibujar fondo blanco
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, width, height);

                // Dibujar la imagen original
                ctx.drawImage(img, 0, 0, width, height);

                // Crear la máscara con borde redondeado
                ctx.globalCompositeOperation = 'destination-in';
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(width - 60, 0);
                ctx.arcTo(width, 0, width, 60, 60);
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fill();

                // Restaurar operación por defecto y dibujar área sobre las zonas trasnparecentes
                ctx.globalCompositeOperation = 'destination-over'
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);

                // Mostrar el resultado
                const resultImg = document.getElementById('result');
                resultImg.src = canvas.toDataURL('image/png');

                // Cambiar el botón de descarga
                document.getElementById('download-btn').addEventListener('click', function () {
                    const link = document.createElement('a');
                    link.download = 'rounded.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                });
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});
