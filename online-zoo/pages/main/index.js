window.addEventListener('load', () => {
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
					duration: 200,
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
					duration: 200,
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
});
