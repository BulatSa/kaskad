/***********************
 отправка формы в php BEGIN
 ***********************/
$(function () {
	$(".ajax-form").on("submit", function (event) {
		var form = $(this);
		var send = true;
		event.preventDefault();

		$(this).find("[data-req='true']").each(function () {
			if ($(this).val() === "") {
				$(this).addClass('error');
				send = false;
			}
			if ($(this).is('select')) {
				if ($(this).val() === null) {
					$(this).addClass('error');
					send = false;
				}
			}
			if ($(this).is('input[type="checkbox"]')) {
				if ($(this).prop('checked') !== true) {
					$(this).addClass('error');
					send = false;
				}
			}
		});

		$(this).find("[data-req='true']").on('focus', function () {
			$(this).removeClass('error');
		});

		var form_data = new FormData(this);

		$("[data-label]").each(function () {
			var input_name = $(this).attr('name');
			var input_label__name = input_name + '_label';
			var input_label__value = $(this).data('label').toString();
			form_data.append(input_label__name, input_label__value)
		});

		if (send === true) {
			$.ajax({
				type: "POST",
				async: true,
				url: "/send.php",
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				success: (function (result) {
					console.log(result);
					$.fancybox.close();
					if (result.indexOf("Mail FAIL") !== -1) {
						$.fancybox.open({src: '#modal-error'});
					} else {
						$.fancybox.open({src: '#modal-thanks'});
						setTimeout(function () {
							$.fancybox.close();
						}, 4500);
						form[0].reset();
					}
				})
			});
		}
	});
});
/***********************
 отправка формы в php END
 ***********************/


/***********************
 Input mask BEGIN
 ***********************/
$(function () {
	$("input[type='tel']:not(.not-phone)").mask("+7 (999) 999-99-99");
});

/***********************
 Input mask END
 ***********************/


/***********************
 fancybox BEGIN
 ***********************/
function init_fancy() {
	$().fancybox({
		selector: '.fancy',
		buttons: ['close'],
		backFocus: false,
		lang : 'ru',
		i18n : {
			'ru' : {
				CLOSE       : 'Закрыть',
				NEXT        : 'Дальше',
				PREV        : 'Назад',
				ERROR       : 'Не удается загрузить. <br/> Попробуйте позднее.',
				PLAY_START  : 'Начать слайдшоу',
				PLAY_STOP   : 'Остановить слайдшоу',
				FULL_SCREEN : 'На весь экран',
				THUMBS      : 'Превью'
			}
		}
	});
	$().fancybox({
		selector: '.fancy-modal',
		backFocus: false,
		touch: false,
		lang : 'ru',
		i18n : {
			'ru' : {
				CLOSE       : 'Закрыть',
				NEXT        : 'Дальше',
				PREV        : 'Назад',
				ERROR       : 'Не удается загрузить. <br/> Попробуйте позднее.',
				PLAY_START  : 'Начать слайдшоу',
				PLAY_STOP   : 'Остановить слайдшоу',
				FULL_SCREEN : 'На весь экран',
				THUMBS      : 'Превью'
			}
		}
	});
	$().fancybox({
		selector: '.fancy-map',
		toolbar: false,
		smallBtn: true,
		backFocus: false,
		lang : 'ru',
		i18n : {
			'ru' : {
				CLOSE       : 'Закрыть',
				NEXT        : 'Дальше',
				PREV        : 'Назад',
				ERROR       : 'Не удается загрузить. <br/> Попробуйте позднее.',
				PLAY_START  : 'Начать слайдшоу',
				PLAY_STOP   : 'Остановить слайдшоу',
				FULL_SCREEN : 'На весь экран',
				THUMBS      : 'Превью'
			}
		}
	});
}

function init_fancy__video() {
	$().fancybox({
		selector: '.fancy-video',
		toolbar: false,
		smallBtn: true,
		backFocus: false,
		youtube: {
			controls: 1,
			showinfo: 0,
			autoplay: 1
		}
	});
}

$(function () {
	init_fancy();
	init_fancy__video();
});
/***********************
 fancybox END
 ***********************/


/***********************
 Прокрутка к секциям BEGIN
 ***********************/
$(function () {
	$('.scrollto').on('click', function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top - 30;
		$('html,body').stop().animate({scrollTop: destination}, 1000);
		return false;
	});
});
/***********************
 Прокрутка к секциям END
 ***********************/


/***********************
 Waypoints BEGIN
 ***********************/
$(function () {
	$('.anim').waypoint(function () {
		$(this.element).toggleClass('animated');
	}, {
		offset: '85%'
	});
});
/***********************
 Waypoints END
 ***********************/


/***********************
Burger BEGIN
***********************/
$(function($){
	$('.hamburger').on('click', function(){
		$(this).toggleClass('is-active');
		$('.mobile-menu').toggleClass('open');
	});

	$(document).on('click touchstart',function (e) {
		var container = $(".top-menu-sec");
		if (container.has(e.target).length === 0){
			$('.hamburger').removeClass('is-active');
			$('.mobile-menu').removeClass('open');
		}
	});
});
/***********************
Burger END
***********************/


/***********************
Head Wall BEGIN
***********************/
$(function($){
	var randomImgIndx = [];
	var imgLength = $('.head-wall__img').length;
	var imgActiveCol = 6;

	function randomInteger(min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	}

	// Set massiv with random numbers
	function randomWallImg(mass,imgActiveCol,maxImgLength){
		for (i=0; i < imgActiveCol; i++) {
			mass.push(randomInteger(1, maxImgLength));
		}
	}

	function randomActiveImg(){
		$('.head-wall__img').removeClass('active');
		randomWallImg(randomImgIndx,imgActiveCol,imgLength);

		$('.head-wall__img').each(function (indx, el) {
			for(i=0; i < imgActiveCol;i++) {
				if(indx == randomImgIndx[i]) {
					$(el).addClass('active');
				}
			}
		});
	}

	randomActiveImg();

	setInterval(function () {
		randomActiveImg();
		randomImgIndx.length = 0;
	},2000);


});
/***********************
Head Wall END
***********************/


/***********************
Packages BEGIN
***********************/
$(function($){
	function calcPackageSum($input){
		if($('.packages__nav a.active').data('link') == 'base'){
			$('.packages__title-price b').text(1 * $input.val() * 1000);
		}
		if($('.packages__nav a.active').data('link') == 'standart'){
			$('.packages__title-price b').text(1 * $input.val() * 2000);
		}
		if($('.packages__nav a.active').data('link') == 'premium'){
			$('.packages__title-price b').text(1 * $input.val() * 2500);
		}
	}
	calcPackageSum($('.packages__input input'));

	$('.packages__input input').on('keyup', function(){
		calcPackageSum($(this));
	});

	$('.packages__nav a').on('click', function (e) {
		e.preventDefault();
		$('.packages__nav a').removeClass('active');
		$(this).addClass('active');
		$('.packages__list .packages__info').removeClass('standart premium');
		$('.packages__list .packages__info').addClass($(this).data('link'));

		$('.packages__title-name b').text($(this).text());
		calcPackageSum($('.packages__input input'));
	});
});
/***********************
Packages END
***********************/


/***********************
Flickity BEGIN
***********************/
$(document).ready(function() {
	$('.service__slider').flickity({
		// options
		cellAlign: 'center',
		initialIndex: 1,
		wrapAround: true,
		selectedAttraction: 1,
		draggable: false,
		friction: 1,
		contain: true,
		arrowShape: {
			x0: 25,
			x1: 55, y1: 35,
			x2: 60, y2: 30,
			x3: 35
		}
	});

	$('.about__slider').flickity({
		// options
		cellAlign: 'center',
		adaptiveHeight: true,
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true,
		contain: true,
		arrowShape: {
			x0: 25,
			x1: 55, y1: 35,
			x2: 60, y2: 30,
			x3: 35
		}
	});
	$('.about__slider-nav .next').on( 'click', function() {
		$('.about__slider').flickity('next');
	});
	$('.about__slider-nav .previous').on( 'click', function() {
		$('.about__slider').flickity('previous');
	});
});
/***********************
Flickity END
***********************/



/***********************
 Faq BEGIN
 ***********************/
$(document).ready(function() {
	if($('.faq__item-title').length) {
		$('.faq__item-answer').slideUp();
		$('.faq__item.open').find('.faq__item-answer').slideToggle();
		$('.faq__item-title').on('click', function(){
			var $this = $(this);
			var $faqList = $this.parents('.faq__list');
			var $otherItems = $faqList.find('.faq__item-title').not($this).closest('.faq__item');

			$otherItems.removeClass('open');
			$otherItems.find('.faq__item-answer').slideUp();

			$this.next('.faq__item-answer').slideToggle();
			$this.closest('.faq__item').toggleClass('open');
		});
	}
});
/***********************
 Faq END
 ***********************/


/***********************
 Link anchors BEGIN
 ***********************/
$(function($){

	$('.top-menu__nav a').each(function () {
		var target = $(this).attr('href');
		$(target).addClass('__nav-section');
	});

	$(window).scroll(function() {
		var w_scroll = $(window).scrollTop();
		var w_height = $(window).height();
		$('.top-menu__nav li').removeClass('active');
		$('.__nav-section').each(function() {
			var section_top = $(this).offset().top;
			var section_h = $(this).outerHeight();

			if ((w_scroll >= section_top-w_height/2) && (w_scroll < section_top + section_h-80)){
				var section_index = $(this).index('.__nav-section');
				$('.top-menu__nav li').eq(section_index).addClass('active');
			}
		});
	});

});
/***********************
 Link anchors END
 ***********************/