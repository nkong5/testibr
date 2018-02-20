'use strict';

jQuery(function($) {
	var $Body = $("body"),
		$MainHeader = $("#mainHeader"),
		$RevealList = $("[data-reveal]"),
		$Sections = $("#mainContent > section");
		
	var ScrollBar;
		
	Preloader();
		
	function ActivePhoto() { 
		$("[data-activephoto]").each(function() {
			var It = $(this);
			var Image = It.children("[data-activephoto-child]");
			
			ScrollBar.addListener(_Parallax);
			_Parallax();
			
			function _Parallax() {
				var ContainerHeight = It.height();
					
				var A = ContainerHeight;
				var F = - It.height();
				var S = $(window).height();
				var C = It.offset().top;
				var I = Image.height();
					
				var Progress = -((C - S) / (S - F));
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
					Progress = Progress * ((A - I) / 2);
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
					ScrollBar.scrollTo(0, 0, 1000);
					return false;
				} else { 
					if ($(Link).length) { ScrollBar.scrollIntoView($(Link)[0]); }
					return false;
				}
			}
			if (Link.split("#")[0] == window.location.origin + window.location.pathname) 
			{ 
				if (!Link.split("#")[1].length) {
					ScrollBar.scrollTo(0,0, 1000);
					return false;
				} else {
					if ($("#" + Link.split("#")[1]).length) { ScrollBar.scrollIntoView($("#" + Link.split("#")[1])[0]); }
					return false;
				}
			}
			
		});
		
		
	}
	
	function Menu() {
		$("#mainHeaderBurgerBtn").click(function() { $("#mainHeaderOverlayMenu, #mainHeaderBurgerBtn").addClass("Active"); return false; });
		$("#mainHeaderOverlayMenuClose").click(function() { $("#mainHeaderOverlayMenu, #mainHeaderBurgerBtn").removeClass("Active"); return false; });
		$("#mainHeaderOverlayMenu").on("click","a", function() { $("#mainHeaderOverlayMenu, #mainHeaderBurgerBtn").removeClass("Active"); });
		$(window).scroll(function () {
			if ($(window).scrollTop() > 140) {
			   $("#mainHeader").addClass('mainHeader_AfterScroll');
			} else {
			   $("#mainHeader").removeClass('mainHeader_AfterScroll');
			}
		});
	}
	
	function ScrollBar() {				
		ScrollBar = Scrollbar.init($("[data-scrollbar]").eq(0)[0], { overscrollEffect: 'bounce' });

		ScrollBar.addListener(_onScroll); 
		_onScroll();
	}
	
	
	function Preloader() {
		var Element = $("#Preloader");
		

		$(window).load(function() {
			ScrollBar();
			Menu();
			InternalScroll();
			ActivePhoto();
			
			$("#mainHeader").css('transition','.3s all ease-in-out');
			$("#mainContent").focus();
			
			if (window.location.hash) {
				if ($(window.location.hash).length) { setTimeout(function() { ScrollBar.scrollIntoView($(window.location.hash)[0]); }, 10); }
			}
			
			_onScroll();
			Element.animate({opacity:0}, 600, function() {
				_onScroll();
				$("#mainContent").focus();
				Element.remove();
			});
		});
		
	}
	function _onScroll() { 
		if (ScrollBar.offset.y > 50 && !$Body.hasClass("AfterScroll")) { $Body.addClass('AfterScroll'); }
		if (ScrollBar.offset.y < 50 && $Body.hasClass("AfterScroll")) {  $Body.removeClass('AfterScroll'); }
			
		if (ScrollBar.offset.y > ScrollBar.limit.y - ($Body.width() / 4) && !$Body.hasClass("NearBottom")) { $Body.addClass('NearBottom'); }
		if (ScrollBar.offset.y < ScrollBar.limit.y - ($Body.width() / 4) && $Body.hasClass("NearBottom")) { $Body.removeClass('NearBottom'); }
			
		$.each($RevealList, function(Key, Value) {
			if (ScrollBar.isVisible($(Value)[0])) {
				$(Value).addClass("Visible");
			}
		});
		$.each($Sections, function(Key, Value) {
			if (ScrollBar.isVisible($(Value)[0])) {
				if ($(Value).attr("data-revealed") != "true") {
					$(Value).attr("data-revealed","true");
					$(Value).find("[data-svgsrc]").each(function() {
						var $It = $(this);
						$It.css("opacity","0");
						$.get($It.attr("data-svgsrc"), function(Data) {
							$It.html(Data);
							setTimeout(function() { $It.removeClass("Grayscale"); }, 1000);
							$It.animate({opacity:1}, 1500);
						},'text');
					});
				}
			}
		});
	}
});