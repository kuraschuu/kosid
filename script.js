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
  const wasFlipped = card.classList.contains('flipped');

  // Clone the entire card
  const clone = card.cloneNode(true);
  clone.classList.remove('flipped'); // force it to show front side

  // Hide back side from the clone entirely
  const back = clone.querySelector('.card-back');
  if (back) back.style.display = 'none';

  // Replace inputs with spans on the front side
  const frontClone = clone.querySelector('.card-front');
  const inputs = frontClone.querySelectorAll('input');
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

  // Keep uploaded photo
  const photo = frontClone.querySelector('#photoPreview');
  if (photo && photo.src) {
    photo.style.display = 'block';
    const placeholder = frontClone.querySelector('#photoPlaceholder');
    if (placeholder) placeholder.style.display = 'none';
  }

  // Style and append the clone off-screen
  clone.style.position = 'fixed';
  clone.style.top = '-9999px';
  clone.style.left = '-9999px';
  clone.style.zIndex = '1000';
  clone.style.transform = 'none';
  document.body.appendChild(clone);

  html2canvas(clone, {
    scale: 2,
    useCORS: true,
    backgroundColor: null
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'kingdom-of-science-id.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    document.body.removeChild(clone);

    // Restore flip state
    if (wasFlipped) {
      card.classList.add('flipped');
    }
  });
});
