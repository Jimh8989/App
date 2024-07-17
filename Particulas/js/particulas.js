const toggleToolbar = document.querySelectorAll('.toggle-toolbar');
const stickyToolbarContainer = document.querySelector(
	'.sticky-toolbar-container'
);

toggleToolbar.forEach(function (element) {
	element.addEventListener('click', function () {
		stickyToolbarContainer.classList.toggle('show-toolbar');
	});
});

particlesJS('space', {
	particles: {
		number: {
			value: 50,
			density: {
				enable: true,
				value_area: 500,
			},
		},
		color: {
			value: '#fff',
		},
		opacity: {
			value: 1,
			anim: {
				enable: true,
				speed: 8,
				opacity_min: 0.4,
				sync: false,
			},
		},
		shape: {
			type: 'circle',
		},
		size: {
			value: 5,
			random: true,
		},
		line_linked: {
			enable: false,
		},
		move: {
			enable: true,
			speed: 3,
			direction: 'right',
			straight: true,
		},
	},
	interactivity: {
		detect_on: 'canvas',
		events: {
			onhover: {
				enable: false,
			},
			onclick: {
				enable: false,
			},
		},
	},
});

