/*
	Lightbox for the media grid.
	Tap a photo to open it full size; tap anywhere (or press Esc) to close.
	Each tile's link (href) points to the full-size image.
*/
(function () {
	var box = document.createElement('div');
	box.className = 'lightbox';
	box.innerHTML = '<img alt="" />';
	document.body.appendChild(box);
	var img = box.querySelector('img');

	function close() { box.classList.remove('open'); }

	document.querySelectorAll('.gram a').forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			img.src = link.getAttribute('href');
			img.alt = (link.querySelector('img') || {}).alt || '';
			box.classList.add('open');
		});
	});

	box.addEventListener('click', close);
	document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
