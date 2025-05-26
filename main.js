<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script>
document.getElementById('flip').addEventListener('click', () => {
  document.querySelector('.card').classList.toggle('flipped');
});

document.getElementById('photo-upload').addEventListener('change', function () {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.createElement('img');
    img.src = e.target.result;
    img.style.width = "80px";
    img.style.height = "80px";
    img.style.objectFit = "cover";
    document.getElementById('photo-preview').innerHTML = '';
    document.getElementById('photo-preview').appendChild(img);
  };
  reader.readAsDataURL(this.files[0]);
});

document.getElementById('download').addEventListener('click', function () {
  html2canvas(document.querySelector("#id-card")).then(canvas => {
    const link = document.createElement("a");
    link.download = "kingdom-id.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
</script>
