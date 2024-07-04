document.getElementById('upload').addEventListener('change', function (e) {
    const files = e.target.files;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear results div

    if (files.length > 0) {
        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
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

                    // Crear un elemento de imagen para mostrar el resultado
                    const resultImg = document.createElement('img');
                    resultImg.src = canvas.toDataURL('image/png');
                    resultImg.alt = 'Imagen Procesada';
                    resultsDiv.appendChild(resultImg);

                    resultImg.onload = function() {
                        // Agregar la imagen procesada al archivo ZIP
                        const base64Data = resultImg.src.split(',')[1];
                        zip.file(`imagen-procesada-${index + 1}.png`, base64Data, {base64: true});
                    };

                    // Habilitar el botón de descarga una vez que todas las imágenes se han procesado
                    if (index === files.length - 1) {
                        document.getElementById('download-all-btn').style.display = 'block';
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
});

// Crear una instancia de JSZip
const zip = new JSZip();

document.getElementById('download-all-btn').addEventListener('click', function () {
    // Generar el archivo ZIP y desencadenar la descarga
    zip.generateAsync({type: 'blob'})
        .then(function (content) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'imagenes-procesadas.zip';
            link.click();
        });
});
