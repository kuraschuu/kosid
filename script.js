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
  const frontSide = card.querySelector('.card-front');

  const wasFlipped = card.classList.contains('flipped');
  if (wasFlipped) card.classList.remove('flipped');

  setTimeout(() => {
    html2canvas(frontSide, { scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'kingdom-of-science-id.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      if (wasFlipped) card.classList.add('flipped');
    });
  }, 200); // 200ms delay to let browser repaint front side
});
