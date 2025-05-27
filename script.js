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
let isFlipped = false;

/*-- Download Card ------*/

function downloadCard() {
	let card = document.getElementById('districtCard');
	let cardFront = document.getElementById('cardFront');
	let cardBack = document.getElementById('cardBack');

	let scale = 2;

	if (isFlipped) {
		cardFront.classList.add('hide');
		cardBack.style.transform = 'rotateY(0)';
	} else {
		cardBack.classList.add('hide');
	}

	domtoimage
		.toPng(card, {
			width: card.clientWidth * scale,
			height: card.clientHeight * scale,
			style: {
				transform: 'scale(' + scale + ')',
				transformOrigin: 'top left',
			},
		})
		.then((dataUrl) => {
			domtoimage
				.toPng(card, {
					width: card.clientWidth * scale,
					height: card.clientHeight * scale,
					style: {
						transform: 'scale(' + scale + ')',
						transformOrigin: 'top left',
					},
				})
				.then((dataUrl2) => {
					var img = new Image();
					img.src = dataUrl2;
					downloadURI(dataUrl2, 'Loona-Island-Card.png');
					cardFront.classList.remove('hide');
					cardBack.style.transform = 'rotateY(180deg)';
					cardBack.classList.remove('hide');
					card.style.backgroundImage = 'none';
				});
		});
}

function downloadURI(uri, name) {
	var link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}
