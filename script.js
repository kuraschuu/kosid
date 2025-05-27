// script.js

// Flip card
document.getElementById('flipBtn').addEventListener('click', () => {
  document.querySelector('.card').classList.toggle('flipped');
});

// Photo upload
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

// Download card as PNG
function downloadCard() {
  const originalFront = document.getElementById('cardFront');

  // Clone the front card content
  const clone = originalFront.cloneNode(true);
  clone.style.width = '800px';
  clone.style.height = '450px';
  clone.style.backgroundSize = 'cover';
  clone.style.backgroundPosition = 'center';
  clone.style.borderRadius = '12px';
  clone.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
  clone.style.display = 'flex';
  clone.style.flexDirection = 'row';
  clone.style.justifyContent = 'space-between';
  clone.style.padding = '40px';
  clone.style.boxSizing = 'border-box';
  clone.style.position = 'fixed';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  clone.style.zIndex = '1000';
  clone.style.transform = 'none';
  clone.style.backfaceVisibility = 'visible';

  // Replace inputs with spans showing their values
  const inputs = clone.querySelectorAll('input');
  inputs.forEach(input => {
    const span = document.createElement('span');
    span.textContent = input.value || input.placeholder;
    span.style.display = 'block';
    span.style.color = '#f5f5dc';
    span.style.borderBottom = '1px solid #f0e9ca';
    span.style.marginBottom = '16px';
    span.style.fontFamily = "'Cinzel', serif";
    input.parentNode.replaceChild(span, input);
  });

  document.body.appendChild(clone);

  domtoimage.toPng(clone)
    .then((dataUrl) => {
      downloadURI(dataUrl, 'kingdom-of-science-id.png');
      document.body.removeChild(clone);
    })
    .catch((error) => {
      console.error('Download failed:', error);
      document.body.removeChild(clone);
    });
}
