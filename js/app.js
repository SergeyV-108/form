//=============== Функционал кнопки menu1-header =================//
let menuHeaderButton = document.querySelector('.menu-header__button');
let menu1List = document.querySelector('.menu-header__list');
let bodyLock = document.querySelector('body');

menuHeaderButton.addEventListener("click", function (e) {
	menuHeaderButton.classList.toggle('active');
	menuHeaderButton.querySelector('.fa-power-off').classList.toggle('active');
	menu1List.classList.toggle('active');
	bodyLock.classList.toggle('lock');//отмента скролла документа при открытом меню header
});
//===============================================================//
//============== Функционал кнопки scroll-up-btn ================//
let scrollBtn = document.querySelector('.scroll-up-btn');
let pageAbout = document.querySelector('.page__about');

//Проверка после загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
	checkScroll();
});

//Проверка при скроле страницы
window.onscroll = function () {
	checkScroll();
}

//Появление
function checkScroll() {

	if (pageAbout.getBoundingClientRect().top <= 0) {
		scrollBtn.classList.add('active');
	} else {
		scrollBtn.classList.remove('active');
	}
}
//===============================================================//
//================== Функционал меню header =====================//
let dataScrolls = document.querySelectorAll('[data-scroll]');
let screensBody = document.querySelectorAll('.screen-body');
let screens = document.querySelectorAll('.page__screen');

//скролл к разделам

for (let dataScroll of dataScrolls) {
	let dataScrollId = dataScroll.getAttribute("data-scroll");
	let sectionId = document.querySelector(dataScrollId);

	dataScroll.addEventListener('click', scrollContent);

	function scrollContent(event) {
		event.preventDefault();

		if (!dataScroll.classList.contains('active')) {
			for (let dataScroll of dataScrolls) {
				dataScroll.classList.remove('active');
			}

			menuHeaderButton.classList.remove('active');
			menuHeaderButton.querySelector('.fa-power-off').classList.remove('active');
			menu1List.classList.remove('active');

			bodyLock.classList.remove('lock');

			dataScroll.classList.add('active');
		}

		sectionId.scrollIntoView({
			behavior: 'smooth',
		});
	}
	//document.querySelector('[data-scroll]').click();
}
//===============================================================//
// =================== Инициализация анимации ===================//
/* AOS.init({
	disable: 'mobile',
}); */
AOS.init();

new WOW().init();

//===============================================================//
// =================== Инициализация формы отправки ===================//
document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);
		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');
			form.nextElementSibling.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json(); //подтверждение отправки
				alert(result.message); //сообщение об отправке
				form.reset();//очистка формы после отправки
				form.classList.remove('_sending');
				form.nextElementSibling.classList.remove('_sending');
			} else {
				alert('Ошибка!');
				form.classList.remove('_sending');
				form.nextElementSibling.classList.remove('_sending');
			}
		} else {
			alert('Заполните правильно все поля');
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});
//===============================================================//
window.onbeforeunload = () => {
	for (const form of document.getElementsByTagName('form')) {
		form.reset();
	}
}