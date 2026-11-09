/*
	Lightbox for the media grid.

	- Tap a tile to open it full size.
	- Swipe left/right (or use the arrows / arrow keys) to see the others.
	- Tap a photo, tap the dark background, press Esc, or tap × to close.

	Each tile's link (href) says what opens:
	  - an image file (.jpg, .png, ...)       -> shows the photo
	  - a video file (.mp4, .webm, .mov)      -> plays the video
	  - a YouTube or Vimeo link               -> plays the embedded video
*/
(function () {
	var links = Array.prototype.slice.call(document.querySelectorAll('.gram a'));
	if (!links.length) return;

	// Build the overlay once
	var box = document.createElement('div');
	box.className = 'lightbox';
	box.innerHTML =
		'<div class="lb-stage"></div>' +
		'<button class="lb-close" aria-label="Close">&times;</button>' +
		'<button class="lb-prev" aria-label="Previous">&lsaquo;</button>' +
		'<button class="lb-next" aria-label="Next">&rsaquo;</button>' +
		'<div class="lb-count"></div>';
	document.body.appendChild(box);

	var stage = box.querySelector('.lb-stage');
	var count = box.querySelector('.lb-count');
	var current = 0;

	function kindOf(url) {
		if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
		if (/vimeo\.com/.test(url)) return 'vimeo';
		if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(url)) return 'video';
		return 'image';
	}

	function youtubeId(url) {
		var m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
		return m ? m[1] : '';
	}

	function show(i) {
		current = (i + links.length) % links.length;
		var link = links[current];
		var url = link.getAttribute('href');
		var alt = (link.querySelector('img') || {}).alt || '';
		var html;

		switch (kindOf(url)) {
			case 'video':
				html = '<video src="' + url + '" controls autoplay playsinline></video>';
				break;
			case 'youtube':
				html = '<iframe src="https://www.youtube-nocookie.com/embed/' + youtubeId(url) +
					'?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
				break;
			case 'vimeo':
				html = '<iframe src="https://player.vimeo.com/video/' + url.split('/').pop() +
					'?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
				break;
			default:
				html = '<img src="' + url + '" alt="' + alt.replace(/"/g, '&quot;') + '" />';
		}

		stage.innerHTML = html;
		count.textContent = (current + 1) + ' / ' + links.length;

		// load the neighbouring photos in the background so swiping is instant
		[current - 1, current + 1].forEach(function (n) {
			var href = links[(n + links.length) % links.length].getAttribute('href');
			if (kindOf(href) === 'image') new Image().src = href;
		});
	}

	function open(i) { show(i); box.classList.add('open'); }
	function close() { box.classList.remove('open'); stage.innerHTML = ''; } // also stops any video

	links.forEach(function (link, i) {
		link.addEventListener('click', function (e) { e.preventDefault(); open(i); });
	});

	box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
	box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
	box.querySelector('.lb-close').addEventListener('click', function (e) { e.stopPropagation(); close(); });

	// tap to close (but not when tapping a playing video, so its controls work)
	var swiped = false;
	box.addEventListener('click', function (e) {
		if (swiped) { swiped = false; return; }
		if (e.target.tagName === 'VIDEO' || e.target.tagName === 'IFRAME') return;
		close();
	});

	// swipe left / right
	var startX = 0, startY = 0;
	box.addEventListener('touchstart', function (e) {
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
	}, { passive: true });
	box.addEventListener('touchend', function (e) {
		var dx = e.changedTouches[0].clientX - startX;
		var dy = e.changedTouches[0].clientY - startY;
		if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
			swiped = true;
			show(current + (dx < 0 ? 1 : -1));
			setTimeout(function () { swiped = false; }, 400);
		}
	});

	// keyboard
	document.addEventListener('keydown', function (e) {
		if (!box.classList.contains('open')) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') show(current + 1);
		if (e.key === 'ArrowLeft') show(current - 1);
	});
})();
