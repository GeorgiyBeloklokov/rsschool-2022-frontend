window.addEventListener('load', () => {
	const trackButton = document.querySelector('.donation__amount-track');
	const pointsSpan = document.querySelectorAll('.donation__amount-point');
	const buttonsActive = document.querySelectorAll('.donation__amount-button');
	const dollars = document.querySelectorAll('.donation__amount-dollar');
	const donationForm = document.querySelector('.donation__form');
	const headerBurger = document.querySelector('.header-burger');
	const burgerNav = document.querySelector('.burger-nav');
	const burgerNavLinks = document.querySelectorAll('.burger-nav__link');

	burgerNavLinks.forEach((item) => {
		item.addEventListener('click', () => {
			let anim = burgerNav.animate(
				[
					{
						opacity: 1,
						transform: 'translateX(0%)',
					},
					{
						opacity: 0,
						transform: 'translateX(100%)',
					},
				],
				{
					duration: 500,
				}
			);
			headerBurger.classList.remove('active--button');

			anim.addEventListener('finish', () => {
				burgerNav.classList.remove('active--nav');
				document.documentElement.classList.remove('_lock');
			});
		});
	});

	headerBurger.addEventListener('click', (e) => {
		if (headerBurger.classList.contains('active--button')) {
			let anim = burgerNav.animate(
				[
					{
						opacity: 1,
						transform: 'translateX(0%)',
					},
					{
						opacity: 0,
						transform: 'translateX(100%)',
					},
				],
				{
					duration: 500,
				}
			);
			headerBurger.classList.remove('active--button');

			anim.addEventListener('finish', () => {
				burgerNav.classList.remove('active--nav');
				document.documentElement.classList.remove('_lock');
			});
		} else {
			burgerNav.classList.add('active--nav');
			headerBurger.classList.toggle('active--button');
			document.documentElement.classList.add('_lock');
		}
	});

	donationForm.addEventListener('submit', (e) => {
		e.preventDefault();
	});

	trackButton.addEventListener('click', (e) => {
		let btnIdx = 0;
		const target = e.target;
		if (target.classList.contains('donation__amount-button')) {
			pointsSpan.forEach((item) => item.classList.remove('point--active'));
			target
				.querySelector('.donation__amount-point')
				.classList.add('point--active');
			buttonsActive.forEach((item, i) => {
				if (item === target) {
					btnIdx = i;
				}
			});
			dollars.forEach((item) => item.classList.remove('dollar--active'));
			dollars[btnIdx].classList.add('dollar--active');
		}
	});

	if (window.innerWidth < 767) {
		pointsSpan.forEach((item) => item.classList.remove('point--active'));
		dollars.forEach((item) => item.classList.remove('dollar--active'));
		dollars[5].classList.add('dollar--active');
		pointsSpan[5].classList.add('point--active');
	}

	const inputAmount = document.querySelector('.donation__form-amount');

	const maxLength = +inputAmount.dataset.maxlength;

	inputAmount.addEventListener('input', (e) => {
		inputAmount.value = inputAmount.value.replace(/[^0-9]/g, '');
		if (inputAmount.value.length >= maxLength - 1) {
			inputAmount.value = inputAmount.value.substring(0, maxLength);
		}
	});
});
