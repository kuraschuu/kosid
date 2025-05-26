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

  // Clone the front side element
  const clone = frontSide.cloneNode(true);

  // Style the clone so it's visible and positioned offscreen
  clone.style.position = 'fixed';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  clone.style.transform = 'none';
  clone.style.backfaceVisibility = 'visible';
  clone.style.zIndex = '1000';

  // Append clone to body
  document.body.appendChild(clone);

  // Use html2canvas to capture the clone
  html2canvas(clone, { scale: 2 }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'kingdom-of-science-id.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Remove the clone from the DOM after capture
    document.body.removeChild(clone);
  });
});
