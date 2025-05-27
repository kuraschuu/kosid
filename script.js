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
  const originalCard = document.querySelector('.card');
  const front = originalCard.querySelector('.card-front');

  // Create a clean container for the front
  const cleanCard = document.createElement('div');
  cleanCard.style.width = '800px';
  cleanCard.style.height = '450px';
  cleanCard.style.backgroundImage = getComputedStyle(front).backgroundImage;
  cleanCard.style.backgroundSize = 'cover';
  cleanCard.style.backgroundPosition = 'center';
  cleanCard.style.borderRadius = '12px';
  cleanCard.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
  cleanCard.style.display = 'flex';
  cleanCard.style.flexDirection = 'row';
  cleanCard.style.justifyContent = 'space-between';
  cleanCard.style.padding = '40px';
  cleanCard.style.boxSizing = 'border-box';
  cleanCard.style.position = 'fixed';
  cleanCard.style.top = '-9999px';
  cleanCard.style.left = '-9999px';
  cleanCard.style.zIndex = '1000';

  // Clone input fields as spans
  const inputsContainer = front.querySelector('.input-fields');
  const cleanInputs = inputsContainer.cloneNode(true);
  cleanInputs.querySelectorAll('input').forEach(input => {
    const span = document.createElement('span');
    span.textContent = input.value || input.placeholder;
    span.style.display = 'block';
    span.style.borderBottom = '1px solid #f0e9ca';
    span.style.marginBottom = '20px';
    span.style.color = '#f5f5dc';
    span.style.fontFamily = "'Cinzel', serif";
    span.style.fontSize = '1rem';
    input.parentNode.replaceChild(span, input);
  });

  // Clone the photo box
  const photoBox = front.querySelector('.photo-box').cloneNode(true);
  const photoPreview = photoBox.querySelector('#photoPreview');
  const placeholder = photoBox.querySelector('#photoPlaceholder');
  if (photoPreview && photoPreview.src) {
    photoPreview.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  }

  cleanCard.appendChild(cleanInputs);
  cleanCard.appendChild(photoBox);
  document.body.appendChild(cleanCard);

  html2canvas(cleanCard, {
    scale: 2,
    useCORS: true,
    backgroundColor: null
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'kingdom-of-science-id.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    document.body.removeChild(cleanCard);
  });
});
