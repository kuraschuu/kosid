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
  const card = document.querySelector('.card');
  const front = document.querySelector('.card-front');
  const back = document.querySelector('.card-back');

  // Temporarily hide the back side
  back.classList.add('hide');

  // Ensure the card is not flipped
  card.classList.remove('flipped');

  // Clone only the front side
  const clone = front.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.top = '-10000px';
  clone.style.left = '-10000px';
  clone.style.transform = 'none';
  clone.style.backfaceVisibility = 'visible';
  clone.style.zIndex = '9999';

  // Add clone to document
  document.body.appendChild(clone);

  // Capture with dom-to-image
  domtoimage.toPng(clone).then((dataUrl) => {
    downloadURI(dataUrl, 'kingdom-of-science-id.png');

    // Cleanup
    document.body.removeChild(clone);
    back.classList.remove('hide'); // restore visibility
  }).catch((error) => {
    console.error('Download failed:', error);
    document.body.removeChild(clone);
    back.classList.remove('hide');
  });
}

function downloadURI(uri, name) {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
