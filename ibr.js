'use strict';

jQuery(function($) {
	var $Body = $("body"),
		$MainHeader = $("#mainHeader"),
		$RevealList = $("[data-reveal]"),
		$Sections = $("#mainContent > section");
		
	var ScrollBar;
		
	Reveal();
	Preloader();
	LoadGraphs();
	Menu();
	InternalScroll();
	ActivePhoto();

	function LoadGraphs() {
		$("[data-svgsrc]").each(function() {
			var $It = $(this);
			$.get($It.attr("data-svgsrc"), function(Data) {
				$It.html(Data);
				setTimeout(function() { $It.removeClass("Grayscale"); }, 1000);
				$It.animate({opacity:1}, 1500);
			},'text');
		});
	}
	function Reveal() {
		window.sr = ScrollReveal({viewFactor: 0.5, opacity:1, scale:1, distance:0,duration: 1000});
		sr.reveal("[data-reveal='Classic']", { opacity:0 });
		sr.reveal(".Section", { viewFactor: 0.65, reset:true, beforeReveal: function (El) { $(El).addClass("Seen"); $(El).addClass("Revealed"); }, beforeReset: function (El) {  $(El).removeClass("Revealed"); }});
	}

	function ActivePhoto() { 
		var $Window = $(window);

		$("[data-activephoto]").each(function() {
			var It = $(this);
			var Image = It.children("[data-activephoto-child]");
			
			$Window.on('scroll resize', _Parallax);
			
			
			function _Parallax() {
				var ContainerHeight = It.height();
					
				var X = window.pageYOffset || document.documentElement.scrollTop;
				var A = ContainerHeight;
				var F = It.height();
				var S = $Window.height();
				var C = It.offset().top;
				var I = Image.height();
				var B = $Body.scrollTop;
					
				var Progress = (X-C+S) / (C+F);
				if (Progress < 0) { Progress = 0; }
				if (Progress > 1) { Progress = 1; }
				if (It.attr("data-activephoto") == "movesmall") { 
					Progress = Progress * (ContainerHeight * 0.2);
					It.css("transform","translateY(" + Progress + "px)");
					return;
				}
				if (It.attr("data-activephoto") == "intro") { 
					Progress = (Progress + F / S) * (ContainerHeight) - 30;
					Image.css("transform","translateY(" + Progress + "px)");
					return;
				}
				if (It.attr("data-activephoto") == "ins" ) { 
					Progress = Progress * ((A - I) / 1.5);
					Image.css("transform","translateY(" + Progress + "px)");
					return;
				}
			}		
		});
	}
	
	function InternalScroll() {
		$Body.on("click", "a", function() {
			var Link = $(this).attr("href");
			
			if (Link.charAt(0) == "#") {
				if (Link == "#") {
					$('html, body').animate({ scrollTop: 0 }, 1000);
					return false;
				} else { 
					if ($(Link).length) { $('html, body').animate({ scrollTop: $(Link)[0].offsetTop }, 1000); }
					return false;
				}
			}
			if (Link.split("#")[0] == window.location.origin + window.location.pathname) 
			{ 
				if (!Link.split("#")[1].length) {
					$('html, body').animate({ scrollTop: 0 }, 1000);
					return false;
				} else {
					if ($("#" + Link.split("#")[1]).length) { $('html, body').animate({ scrollTop: $("#" + Link.split("#")[1])[0].offsetTop }, 1000); }
					return false;
				}
			}
			
		});
		
		
	}
	
	function Menu() {

		$("#mainHeaderBurgerBtn").click(function() { $("#mainHeaderOverlayMenu, #mainHeaderBurgerBtn").addClass("Active"); return false; });
		$("#mainHeaderOverlayMenuClose").click(function() { $("#mainHeaderOverlayMenu, #mainHeaderBurgerBtn").removeClass("Active"); return false; });
		$("#mainHeaderOverlayMenu").on("click","a", function() { 
			if ($(this).parent("[data-accordion]").length) { 
				if ($(this).next().css("display") == "block") {
					$("#mainHeaderOverlayMenu, #mainHeaderBurgerBtn").removeClass("Active"); 
					return true;
				} else {
					return true; 
				}
			}
			$("#mainHeaderOverlayMenu, #mainHeaderBurgerBtn").removeClass("Active"); 
			return true;
		});
		$("#mainHeaderOverlayMenu li[data-accordion] > ul").slideUp(0);
		$("#mainHeaderOverlayMenu").on("click", "li[data-accordion] > a", function() { 
			var $Next = $(this).next();
			if ($Next.css("display") == "none") {
				$("#mainHeaderOverlayMenu li[data-accordion] > ul").not($Next).slideUp(1000);
				$Next.slideDown(1000);
				return false;
			} else {
				return true;
			}
		});
		$(window).scroll(function () {
			if ($(window).scrollTop() > 50) {
			   $("body").addClass('AfterScroll');
			} else {
			   $("body").removeClass('AfterScroll');
			}
		});

	}
	
	
	function Preloader() {
		var $Element = $("#Preloader");
		

		$(window).load(function() {
			
			$("#mainHeader").css('transition','.3s all ease-in-out');
			$("#mainContent").focus();
			
			
			$Element.animate({opacity:0}, 600, function() { $Element.remove(); });
		});
		
	}
});