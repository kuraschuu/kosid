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
  const backSide = card.querySelector('.card-back');

  const wasFlipped = card.classList.contains('flipped');

  // Temporarily unflip card and hide back side for clear capture
  if (wasFlipped) card.classList.remove('flipped');

  backSide.style.visibility = 'hidden';

  // Ensure front side styles for proper rendering
  frontSide.style.transform = 'none';
  frontSide.style.backfaceVisibility = 'visible';
  frontSide.style.position = 'relative';
  frontSide.style.zIndex = 10;

  setTimeout(() => {
    html2canvas(frontSide, { scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'kingdom-of-science-id.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Restore previous states and styles
      if (wasFlipped) card.classList.add('flipped');
      backSide.style.visibility = 'visible';

      frontSide.style.transform = '';
      frontSide.style.backfaceVisibility = '';
      frontSide.style.position = '';
      frontSide.style.zIndex = '';
    });
  }, 200);
});
