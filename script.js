// script.js

// Flip card
document.getElementById('flipBtn').addEventListener('click', () => {
  document.querySelector('.card').classList.toggle('flipped');
});

// Handle photo upload and preview
document.getElementById('photoInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const photoPreview = document.getElementById('photoPreview');
    photoPreview.src = e.target.result;
    photoPreview.style.display = 'block';
    document.getElementById('photoPlaceholder').style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// Generate PNG of card
document.getElementById('downloadBtn').addEventListener('click', () => {
  const card = document.querySelector('.card');
  // Make sure we show the front if flipped
  if (card.classList.contains('flipped')) {
    card.classList.remove('flipped');
    setTimeout(() => downloadCardAsImage(), 500);
  } else {
    downloadCardAsImage();
  }
});

function downloadCardAsImage() {
  const node = document.querySelector('.card');

  html2canvas(node, { scale: 2 }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'kingdom-of-science-id.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}
