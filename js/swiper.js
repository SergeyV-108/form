let swiper = new Swiper('.inner-work__cards', {
	
	pagination: {
		el: ".inner-work__pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + "</span>";
		},
		dynamicBullets: true,
	},

	slidesPerView: 'auto',

	spaceBetween: 15,

	centeredSlides: true,

	initialSlide: 2,

	slidesPerGroup: 1,

	loop: true,
});