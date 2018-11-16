(function($){
"use strict"; // Start of use strict
$(function() {
	//Product Inner Zoom
	if($('.inner-zoom').length>0){
		$('.inner-zoom').on('mouseover',function(){
			var self = $(this);
			self.find('img').elevateZoom({
				zoomType: "lens",
				lensShape: "square",
				lensSize: 100,
				borderSize:1,
				containLensZoom:true,
				responsive:true
			});
		})
	}
	//Check RTL
	if($('body').attr('dir')=="rtl"){
		$('body').addClass("right-to-left");
	}else{
		$('body').removeClass("right-to-left");
	}
	//Full Mega Menu
	if($('.full-mega-menu').length>0){
		$('.main-nav').each(function(){
			var self = $(this);
			if($('body').attr('dir')=="rtl"){
				var nav_os = ($(window).width() - (self.offset().left + self.outerWidth()));
				var par_os = ($(window).width() - (self.parents('.container,.container-fluid').offset().left + self.parents('.container,.container-fluid').outerWidth()));
				var nav_right = nav_os - par_os - 15;
				self.find('.full-mega-menu').css('margin-right','-' + nav_right + 'px');
			}else{
				var nav_os = self.offset().left;
				var par_os = self.parents('.container,.container-fluid').offset().left;
				var nav_left = nav_os - par_os - 15;
				self.find('.full-mega-menu').css('margin-left','-' + nav_left + 'px');
			}
		});
	}
	//Qty Up-Down
	$('.detail-qty').each(function(){
		var self = $(this);
		self.find('.qty-up').on('click',function(event){
			event.preventDefault();
			var qtyval = parseInt($(this).parent().find('.qty-val').text(),10);
			qtyval=qtyval+1;
			$(this).parent().find('.qty-val').text(qtyval);
		});
		self.find('.qty-down').on('click',function(event){
			event.preventDefault();
			var qtyval = parseInt($(this).parent().find('.qty-val').text(),10);
			qtyval=qtyval-1;
			if(qtyval>1){
				$(this).parent().find('.qty-val').text(qtyval);
			}else{
				qtyval=1;
				$(this).parent().find('.qty-val').text(qtyval);
			}
		});
	});
	//Filter Price
	if($('.range-filter').length>0){
		$('.range-filter').each(function(){
			var self = $(this);
			self.find( ".slider-range" ).slider({
				range: true,
				min: 0,
				max: 500,
				values: [ 70, 350 ],
				slide: function( event, ui ) {
					$(this).parents('.range-filter').find( ".amount" ).html( '<label>$</label>' + '<span>' +ui.values[ 0 ]+'</span>' + ' - ' + '<span>' + ui.values[ 1 ]+'</span>');
				}
			});
			self.find( ".amount" ).html( '<label>$</label>' + '<span>' + self.find( ".slider-range" ).slider( "values", 0 )+'</span>' + ' - ' + '<span>' + self.find( ".slider-range" ).slider( "values", 1 )+'</span>');
		});
	}
	//Toggle Class
	if($('.list-attr').length>0){
		$('.list-attr a').on('click',function(event){
			event.preventDefault();
			$(this).toggleClass('active');
		});
	}
	//Tag Toggle
	if($('.toggle-tab').length>0){
		$('.toggle-tab').each(function(){
			var self = $(this);
			self.find('.item-toggle-tab').first().find('.toggle-tab-content').show();
			self.find('.toggle-tab-title').on('click',function(event){
				if($(this).next().length>0){
					event.preventDefault();
					$(this).parent().siblings().removeClass('active');
					$(this).parent().addClass('active');
					$(this).parents('.toggle-tab').find('.toggle-tab-content').slideUp();
					$(this).next().stop(true,false).slideDown();
				}
			});
		});
	}
	//Hover Active
	if($('.box-hover-active').length>0){
		$('.box-hover-active').each(function(){
			var self = $(this);
			self.find('.item-hover-active').on('mouseover',function(){
				$(this).parents('.box-hover-active').find('.item-hover-active').removeClass('active');
				$(this).addClass('active');
			});
			self.on('mouseout',function(){
				self.find('.item-hover-active').removeClass('active');
				self.find('.item-active').addClass('active');
			});
		});
	}
	//Popup Wishlist
	$('.wishlist-link').on('click',function(event){
		event.preventDefault();
		$('.wishlist-mask').fadeIn();
		var counter = 5;
		var popup;
		popup = setInterval(function() {
			counter--;
			if(counter < 0) {
				clearInterval(popup);
				$('.wishlist-mask').hide();
			} else {
				$(".wishlist-countdown").text(counter.toString());
			}
		}, 1000);
	});
	//Menu Responsive
	$('.toggle-mobile-menu').on('click',function(event){
		event.preventDefault();
		$(this).parents('.main-nav').toggleClass('active');
	});
	//Custom ScrollBar
	if($('.custom-scroll').length>0){
		$('.custom-scroll').each(function(){
			$(this).mCustomScrollbar({
				advanced:{
					autoScrollOnFocus: false,
				}  
			});
		});
	}
	//Horizontal Custom ScrollBar
	if($('.hoz-custom-scroll').length>0){
		$('.hoz-custom-scroll').each(function(){
			$(this).mCustomScrollbar({
				horizontalScroll:true,
			});
		});
	}
	//Animate
	if($('.wow').length>0){
		new WOW().init();
	}
	//Light Box
	if($('.fancybox').length>0){
		$('.fancybox').fancybox();	
	}
	if($('.fancybox-media').length>0){
		$('.fancybox-media').attr('rel', 'media-gallery').fancybox({
			openEffect : 'none',
			closeEffect : 'none',
			prevEffect : 'none',
			nextEffect : 'none',
			arrows : false,
			helpers : {
				media : {},
				buttons : {}
			}
		});
	}
	//Back To Top
	$('.scroll-top').on('click',function(event){
		event.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow');
	});
	//Box Hover Dir
	$('.box-hover-dir').each( function() {
		$(this).hoverdir(); 
	});
	//Background Image
	if($('.banner-background').length>0){
		$('.banner-background').each(function(){
			var b_url = $(this).attr("data-image");
			$(this).css('background-image','url("'+b_url+'")');	
		});
	}
	//Box Parallax	
	if($('.parallax').length>0){
		$('.parallax').each(function(){
			var p_url = $(this).attr("data-image");
			$(this).css('background-image','url("'+p_url+'")');	
		});
	}
});
//Offset Menu
function offset_menu(){
	if($(window).width()>767){
		$('.main-nav .sub-menu').each(function(){
			var wdm = $(window).width();
			var wde = $(this).width();
			var offset = $(this).offset().left;
			var tw = offset+wde;
			if(tw>wdm){
				$(this).addClass('offset-right');
			}
		});
	}else{
		return false;
	}
}
//Fixed Header
function fixed_header(){
	if($('.header-ontop').length>0){
		if($(window).width()>1023){
			var ht = $('#header').height();
			var st = $(window).scrollTop();
			if(st>ht){
				$('.header-ontop').addClass('fixed-ontop');
			}else{
				$('.header-ontop').removeClass('fixed-ontop');
			}
		}else{
			$('.header-ontop').removeClass('fixed-ontop');
		}
	}
} 
//Slider Background
function background(){
	$('.bg-slider .item-slider').each(function(){
		var src=$(this).find('.banner-thumb a img').attr('src');
		$(this).css('background-image','url("'+src+'")');
	});	
}
function animated(){
	$('.banner-slider .owl-item').each(function(){
		var check = $(this).hasClass('active');
		if(check==true){
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).addClass(anime);
			});
			if($(this).find('video').length>0){
				$(this).find('video').get(0).play();
			}
		}else{
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).removeClass(anime);
			});
		}
		
	});
}
function slick_animated(){
	$('.slider-slick .item-slick').removeClass('slick-before');
	$('.slider-slick .item-slick').removeClass('slick-after');
	$('.slider-slick .item-slick.slick-active').prev().addClass('slick-before');
	$('.slider-slick .item-slick.slick-active').next().addClass('slick-after');
}
//Detail Gallery
function detail_gallery(){
	if($('.detail-gallery').length>0){
		$('.detail-gallery').each(function(){
			var self = $(this);
			var data=self.find(".carousel").data();
			self.find(".carousel").jCarouselLite({
				btnNext: $(this).find(".gallery-control .next"),
				btnPrev: $(this).find(".gallery-control .prev"),
				speed: 800,
				visible:data.visible,
				vertical:data.vertical,
			});
			//Elevate Zoom
			self.find('.mid img').elevateZoom({
				zoomType: "lens",
				lensShape: "square",
				lensSize: 100,
				borderSize:1,
				containLensZoom:true
			});
			self.find(".carousel a").on('click',function(event) {
				event.preventDefault();
				$(this).parents('.detail-gallery').find(".carousel a").removeClass('active');
				$(this).addClass('active');
				var z_url =  $(this).find('img').attr("src");
				$(this).parents('.detail-gallery').find(".mid img").attr("src", z_url);
				$('.zoomLens').css('background-image','url("'+z_url+'")');
			});
		});
	}
}
//Menu Responsive
function menu_responsive(){
	if($(window).width()<768){
		if($('.btn-toggle-mobile-menu').length>0){
			return false;
		}else{
			$('.main-nav li.menu-item-has-children,.main-nav li.has-mega-menu').append('<span class="btn-toggle-mobile-menu"></span>');
			$('.main-nav .btn-toggle-mobile-menu').on('click',function(event){
				$(this).toggleClass('active');
				$(this).prev().stop(true,false).slideToggle();
			});
		}
	}else{
		$('.btn-toggle-mobile-menu').remove();
		$('.main-nav .sub-menu,.main-nav .mega-menu').slideDown();
	}
}
//Parallax Slider
function parallax_slider(){
	if($('.parallax-slider').length>0){
		var ot = $('.parallax-slider').offset().top;
		var sh = $('.parallax-slider').height();
		var st = $(window).scrollTop();
		var top = (($(window).scrollTop() - ot) * 0.5) + 'px';
		if(st>ot&&st<ot+sh){
			$('.parallax-slider .item-slider').css({
				'background-position': 'center ' + top
			});
		}else if(st<ot){
			$('.parallax-slider .item-slider').css({
				'background-position': 'center 0'
			});
		}else{
			return false;
		}
	}
}
//Document Ready
jQuery(document).ready(function(){
	//Featured Product Tab
	if($('.featured-product2').length>0){
		$('.inner-tab-control a').on('click',function(event){
			event.preventDefault();
			var control = $(this).attr('data-control');
			$('.inner-tab-control a').removeClass('active');
			$(this).addClass('active');
			$('.featured-tab2 .bx-slider').each(function(){
				if($(this).attr('id')==control){
					$(this).addClass('active');
				}else{
					$(this).removeClass('active');
				}
			});
		});
	}
	//Close Search
	if($('.refine-search').length>0){
		$('.refine-search').each(function(){
			$(this).find('.close-search').on('click',function(event){
				event.preventDefault();
				$(this).parent().slideUp();
			});
		});
	}
	//Toggle Widget
	$('.widget-title').on('click',function(){
		$(this).toggleClass('active');
		$(this).next().slideToggle();
	});
	//Menu Responsive
	menu_responsive();
	//Detail Gallery
	detail_gallery();
	//Offset Menu
	offset_menu();
});
//Window Load
jQuery(window).on('load',function(){ 
	//Pre Load
	$('body').removeClass('preload'); 
	//Owl Carousel
	if($('.wrap-item').length>0){
		$('.wrap-item').each(function(){
			var self = $(this);
			var data = self.data();
			self.owlCarousel({
				addClassActive:true,
				stopOnHover:true,
				lazyLoad:true,
				itemsCustom:data.itemscustom,
				autoPlay:data.autoplay,
				transitionStyle:data.transition, 
				paginationNumbers:data.paginumber,
				beforeInit:background,
				afterAction:animated,
				navigationText:['<i class="icon ion-ios-arrow-left"></i>','<i class="icon ion-ios-arrow-right"></i>'],
			});
		});
	}
	parallax_slider();
	//Trigger Slider
	$('.control-slider .prev').on('click', function(e){
		e.preventDefault();
		$('.control-slider .wrap-item').trigger('owl.prev');
	});
	$('.control-slider .next').on('click', function(e){
		e.preventDefault();
		$('.control-slider .wrap-item').trigger('owl.next');
	});
	//Slick Slider
	if($('.slider-slick .slick').length>0){
		$('.slider-slick .slick').each(function(){
			$(this).slick({
				centerMode: true,
				centerPadding: '370px',
				slidesToShow: 1,
				prevArrow:'<span class="slick-prev"><i class="icon ion-ios-arrow-left"></i></span>',
				nextArrow:'<span class="slick-next"><i class="icon ion-ios-arrow-right"></i></span>',
				responsive: [
					{
					  breakpoint: 1441,
					  settings: {
						centerPadding: '200px',
					  }
					},
					{
					  breakpoint: 1025,
					  settings: {
						centerPadding: '0px',
					  }
					}
				  ]
			});
			slick_animated();
			$('.slick').on('afterChange', function(event){
				slick_animated();
			});
		});
	}
	//Bx Slider
	if($('.bx-slider').length>0){
		$('.bx-slider').each(function(){
			$(this).find('.bxslider').bxSlider({
				prevText:'<i class="icon ion-android-arrow-back"></i>',
				nextText:'<i class="icon ion-android-arrow-forward"></i>',
				pagerCustom: $(this).find('.bx-pager'),
			});
		});
	}
	//Time Countdown
	if($('.time-countdown').length>0){
		$(".time-countdown").each(function(){
			var data = $(this).data(); 
			$(this).TimeCircles({
				fg_width: data.width,
				bg_width: 0,
				text_size: 0,
				circle_bg_color: data.bg,
				time: {
					Days: {
						show: data.day,
						text: data.text[0],
						color: data.color,
					},
					Hours: {
						show: data.hou,
						text: data.text[1],
						color: data.color,
					},
					Minutes: {
						show: data.min,
						text: data.text[2],
						color: data.color,
					},
					Seconds: {
						show: data.sec,
						text: data.text[3],
						color: data.color,
					}
				}
			}); 
		});
	}
	//Count Down Master
	if($('.countdown-master').length>0){
		$('.countdown-master').each(function(){
			$(this).FlipClock(65100,{
		        clockFace: 'HourlyCounter',
		        countdown: true,
		        autoStart: true,
		    });
		});
	}
	//List Item Masonry 
	if($('.list-item-masonry').length>0){
		$('.list-item-masonry').masonry({
			itemSelector: '.item-masonry',
		});
	}
	//Percentage
	$('.percentage').each(function(){
		var data = $(this).data();
		// console.log(data);
		$(this).circularloader({
			backgroundColor: "#ffffff",//background colour of inner circle
			fontColor: "#000000",//font color of progress text
			fontSize: "40px",//font size of progress text
			radius: 90,//radius of circle
			progressBarBackground: "#e9e9e9",//background colour of circular progress Bar
			progressBarColor: data.color,//colour of circular progress bar
			progressBarWidth: 10,//progress bar width
			progressPercent: data.value,//progress percentage out of 100
			progressValue:0,//diplay this value instead of percentage
			showText: false,//show progress text or not
			title: "",//show header title for the progress bar
		});
	});
});
//Window Resize
jQuery(window).on('resize',function(){
	offset_menu();
	fixed_header();
	detail_gallery();
	menu_responsive();
});
//Window Scroll
jQuery(window).on('scroll',function(){
	//Scroll Top
	if($(this).scrollTop()>$(this).height()){
		$('.scroll-top').addClass('active');
	}else{
		$('.scroll-top').removeClass('active');
	}
	//Fixed Header
	fixed_header();
	parallax_slider();
});
})(jQuery); // End of use strict