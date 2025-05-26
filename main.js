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
					downloadURI(dataUrl2, 'KOS-ID.png');
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

/*-- Flip Card ------*/
function flipCard() {
	var card = document.getElementById('districtCard');
	var btnFlip = document.getElementById('btnFlip');

	card.classList.toggle('flip');

	btnFlip.disabled = true;
	setTimeout(() => {
		btnFlip.disabled = false;
	}, 800);

	isFlipped = !isFlipped;
}

Array.prototype.forEach.call(radios, function (radio) {
	radio.addEventListener('change', changeHandler);
});

/*-- Image Input Preview ------*/
var reader = new FileReader();

reader.onload = function (e) {
	document.querySelector('#imager').setAttribute('src', e.target.result);
};

function readURL(input) {
	if (input.files && input.files[0]) {
		document.querySelector('#imager').style.visibility = 'visible';
		reader.readAsDataURL(input.files[0]);
	}
}

document.querySelector('#image-input').addEventListener('change', function () {
	readURL(this);
});

/*-- Auto Format Date Issued ------*/
var cleave = new Cleave('.IssDate', {
	date: true,
	delimiter: '-',
	datePattern: ['Y', 'm', 'd'],
});