// Select the canvas and its context
const memeCanvas = document.getElementById('memeCanvas');
const ctx = memeCanvas.getContext('2d');

// Set canvas size
memeCanvas.width = 600; // Example width
memeCanvas.height = 400; // Example height

let selectedImage = null; // Store the currently selected image
let text = ""; // Text to be added
let textX = 50; // Initial text X position
let textY = 50; // Initial text Y position
let isDragging = false; // Whether the text is being dragged

// Load and resize image to fit canvas
const images = document.querySelectorAll('.select-image');
images.forEach(image => {
    image.addEventListener('click', function () {
        const selectedImageSrc = this.getAttribute('src');
        const img = new Image();
        img.src = selectedImageSrc;

        img.onload = function () {
            // Store the selected image for redrawing
            selectedImage = img;
            redrawCanvas(); // Redraw the canvas with the new image
        };
    });
});

// Handle text input
document.getElementById('addText').addEventListener('click', function () {
    text = document.getElementById('textInput').value; // Get the input text
    redrawCanvas(); // Redraw the canvas with the new text
});

// Redraw the canvas (image + text)
function redrawCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);

    // Draw the selected image if it exists
    if (selectedImage) {
        const canvasWidth = memeCanvas.width;
        const canvasHeight = memeCanvas.height;

        const imageWidth = selectedImage.width;
        const imageHeight = selectedImage.height;

        const canvasAspectRatio = canvasWidth / canvasHeight;
        const imageAspectRatio = imageWidth / imageHeight;

        let drawWidth, drawHeight;

        if (imageAspectRatio > canvasAspectRatio) {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imageAspectRatio;
        } else {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imageAspectRatio;
        }

        const offsetX = (canvasWidth - drawWidth) / 2;
        const offsetY = (canvasHeight - drawHeight) / 2;

        ctx.drawImage(selectedImage, offsetX, offsetY, drawWidth, drawHeight);
    }


    
    // Draw the text if it exists
    if (text) {
        ctx.font = '30px Arial';
        ctx.fontSize = "20px";
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.fillText(text, textX, textY);
        ctx.strokeText(text, textX, textY);
    }
}

// Make text movable
memeCanvas.addEventListener('mousedown', function (e) {
    const rect = memeCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the click is on the text
    if (
        mouseX >= textX &&
        mouseX <= textX + ctx.measureText(text).width &&
        mouseY >= textY - 30 && // Approximate text height
        mouseY <= textY
    ) {
        isDragging = true;
    }
});

memeCanvas.addEventListener('mousemove', function (e) {
    const rect = memeCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Update cursor style when hovering over text
    if (
        mouseX >= textX &&
        mouseX <= textX + ctx.measureText(text).width &&
        mouseY >= textY - 30 &&
        mouseY <= textY
    ) {
        memeCanvas.style.cursor = 'pointer';
    } else {
        memeCanvas.style.cursor = 'default';
    }

    // Move the text if dragging
    if (isDragging) {
        textX = mouseX; // Update X position
        textY = mouseY; // Update Y position
        redrawCanvas(); // Update the canvas
    }
});

memeCanvas.addEventListener('mouseup', function () {
    isDragging = false;
});

memeCanvas.addEventListener('mouseout', function () {
    isDragging = false;
});

// Download the canvas as an image
document.getElementById('downloadMeme').addEventListener('click', function () {
    const link = document.createElement('a');
    link.download = 'meme.png'; // Filename for the downloaded image
    link.href = memeCanvas.toDataURL('image/png'); // Convert canvas to data URL
    link.click();
});
