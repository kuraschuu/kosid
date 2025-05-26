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
document.getElementById('downloadBtn').addEventListener('click', () => {
  const card = document.querySelector('.card');
  const frontSide = card.querySelector('.card-front');
  const clone = frontSide.cloneNode(true);

  clone.style.position = 'fixed';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  clone.style.transform = 'none';
  clone.style.backfaceVisibility = 'visible';
  clone.style.zIndex = '1000';

  // Replace input fields with spans
  const inputs = clone.querySelectorAll('input');
  inputs.forEach(input => {
    const span = document.createElement('span');
    span.textContent = input.value || input.placeholder;
    span.style.display = 'inline-block';
    span.style.width = input.offsetWidth + 'px';
    span.style.height = input.offsetHeight + 'px';
    span.style.borderBottom = getComputedStyle(input).borderBottom;
    span.style.fontFamily = getComputedStyle(input).fontFamily;
    span.style.fontSize = getComputedStyle(input).fontSize;
    span.style.color = getComputedStyle(input).color;
    span.style.lineHeight = input.offsetHeight + 'px';
    input.parentNode.replaceChild(span, input);
  });

  // Preserve uploaded image
  const photo = clone.querySelector('#photoPreview');
  if (photo && photo.src && photo.style.display !== 'none') {
    photo.style.display = 'block';
    const placeholder = clone.querySelector('#photoPlaceholder');
    if (placeholder) placeholder.style.display = 'none';
  }

  document.body.appendChild(clone);

  html2canvas(clone, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'kingdom-of-science-id.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    document.body.removeChild(clone);
  });
});
