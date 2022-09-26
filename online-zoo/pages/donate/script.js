window.addEventListener('click', () => {
	const trackButton = document.querySelector('.donation__amount-track');
  const pointsSpan = document.querySelectorAll('.donation__amount-point')

	trackButton.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('donation__amount-button')) {
      pointsSpan.forEach(item => item.classList.remove('point--active'));

      target.querySelector('.donation__amount-point').classList.add('point--active');
    }
	});

	const inputs = document.querySelectorAll('input[type=number]');

	inputs.forEach((input) => {
		const maxLength = input.maxLength;
		input.addEventListener('input', (e) => {
			input.value = input.value.replace(/[^0-9]/g, '');
			if (input.value.length >= maxLength - 1) {
				input.value = input.value.substring(0, maxLength);
			}
		});
	});
});
