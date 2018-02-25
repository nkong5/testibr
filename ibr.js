'use strict';

jQuery(function($) {
	var $Body = $("body"),
		$MainHeader = $("#mainHeader"),
		$RevealList = $("[data-reveal]"),
		$Sections = $("#mainContent > section");
		
	var ScrollBar;
		
	Introduction();
	LoadGraphs();
	Reveal();
	Preloader();
	Menu();
	InternalScroll();
	ActivePhoto();
	IESVGFix();

	function Introduction() {
		$('[data-introduction]').on('click', function() { $("body").addClass("IntroductionActive"); });
		$('[data-closeintroduction]').on('click', function() { $("body").removeClass("IntroductionActive"); return false; });
	}

	function detectIE() {
		var ua = window.navigator.userAgent;
	
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			return true;
		}
	
		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			return true;
		}
		return false;
	}

	function IESVGFix() {
		if (!detectIE()) { return false; } 
		$(window).on("resize", function() { 
			$("svg").each(function() {
				SingleIESVGFix($(this).parent());
			});
		});
	}
	function SingleIESVGFix($It) { 
		if (!detectIE()) { return false; }
		if ($It) {
			$It.children('svg').each(function() {
				var $Svg = $(this);
				var Viewbox = $Svg.attr("data-viewBox");
				Viewbox = Viewbox.split(" ");
				var Aspect = (Viewbox[3] - Viewbox[1]) / (Viewbox[2] - Viewbox[0]) ;
				$(this).height(Aspect * $(this).width());
			});
		}
	}
	function LoadGraphs() {
		$("[data-svgsrc]").each(function() {
			var $It = $(this);
			$.get($It.attr("data-svgsrc"), function(Data) {
				$It.html(Data);
				setTimeout(function() { 
					$It.parent().parent().parent().addClass("Loaded");
					$It.find("svg").each(_prepRevealAnim);
					SingleIESVGFix($It);
				}, 10);
			},'text');
		});
	}
	function Reveal() {
		window.sr = ScrollReveal({viewFactor: 0.5, opacity:1, scale:1, distance:0,duration: 1000});
		sr.reveal("[data-reveal='Classic']", { opacity:0 });
		sr.reveal(".Section", { 
			viewFactor: 0.65, 
			reset:true, 
			beforeReveal: function (El) { 
				$(El).addClass("Revealed"); 
				if (!$(El).hasClass("Loaded")) { 
					setTimeout(function() {					
						if (!$(El).hasClass("Seen")) { 
							$(El).find("svg").each(_revealAnim);
							$(El).addClass("Seen");
						}
					}, 400);
					return false;
				}
				if (!$(El).hasClass("Seen")) { 
					$(El).find("svg").each(_revealAnim);
					$(El).addClass("Seen");
				}
			}, 
			beforeReset: function (El) {  
				$(El).removeClass("Revealed"); 
			}
		});

	}

	function _prepRevealAnim() {
		var $Element = $(this);
		var Id = $Element.attr("id");
		switch (Id) {
			case 'SVG_T1G1':
				SVG.select("#SVG_T1G1 .t1-g1-anim1").rotate(-15).opacity(0);
				SVG.select("#SVG_T1G1 .t1-g1-anim2").opacity(0);
				SVG.select("#SVG_T1G1 .t1-g1-anim3").transform({ scaleX: 0.00001, cx:130 });
				SVG.select("#SVG_T1G1 .t1-g1-anim4").transform({ scaleX: 0.00001, cx:0 });
				SVG.select("#SVG_T1G1 .t1-g1-anim5").opacity(0);
				SVG.select("#SVG_T1G1 .t1-g1-anim6").opacity(0);
			break;
			case 'SVG_T1G2':
				SVG.select("#SVG_T1G2 .anim1").opacity(0);
				SVG.select("#SVG_T1G2 .anim2").opacity(0).dy(5);
				SVG.select("#SVG_T1G2 .anim3").opacity(0);
				SVG.select("#SVG_T1G2 .anim4").opacity(0).dy(-5).dx(5);
				SVG.select("#SVG_T1G2 .anim5").scale(0.9).opacity(0);
				SVG.select("#SVG_T1G2 .anim6").opacity(0);
				SVG.select("#SVG_T1G2 .anim7").scale(0.9).opacity(0);
				SVG.select("#SVG_T1G2 .anim8").opacity(0);
				SVG.select("#SVG_T1G2 .anim9").scale(0.9).opacity(0);
				SVG.select("#SVG_T1G2 .anim10").opacity(0);
			break;
			case 'SVG_T1G3':
				SVG.select("#SVG_T1G3 .anim1").opacity(0);
				SVG.select("#SVG_T1G3 .anim2").opacity(0).dy(5);
				SVG.select("#SVG_T1G3 .anim3").scale(0.9).opacity(0);
				SVG.select("#SVG_T1G3 .anim4").scale(0.9).opacity(0);
				SVG.select("#SVG_T1G3 .anim5").scale(0.9).opacity(0);
				SVG.select("#SVG_T1G3 .anim6").scale(0.9).opacity(0);
			break;
			case 'SVG_T1G4':
				SVG.select("#SVG_T1G4 .anim1").transform({ scaleY: 0.00001, cy:454.4 });
				SVG.select("#SVG_T1G4 .anim2").transform({ scaleY: 0.00001, cy:454.4 });
				SVG.select("#SVG_T1G4 .anim3").transform({ scaleY: 0.00001, cy:454.4 });
				SVG.select("#SVG_T1G4 .anim4").opacity(0);
				SVG.select("#SVG_T1G4 .anim5").opacity(0);
				SVG.select("#SVG_T1G4 .anim6").opacity(0);
			break;
			case 'SVG_T2G1':
				SVG.select("#SVG_T2G1 .anim1").opacity(0);
				SVG.select("#SVG_T2G1 .anim2").opacity(0).transform({ scaleX: 0.00001, cx:709.9 });
				SVG.select("#SVG_T2G1 .anim3").opacity(0).transform({ scaleY: 0.00001, cy:490 });
				SVG.select("#SVG_T2G1 .anim4").opacity(0);
				SVG.select("#SVG_T2G1 .anim5").opacity(0).transform({ scaleY: 0.00001, cy:494.1 });
				SVG.select("#SVG_T2G1 .anim6").opacity(0);
				SVG.select("#SVG_T2G1 .anim7").opacity(0);
				SVG.select("#SVG_T2G1 .anim8").opacity(0);
				SVG.select("#SVG_T2G1 .anim9").opacity(0);
				SVG.select("#SVG_T2G1 .anim10").opacity(0);
			break;
			case 'SVG_T2G2':
				SVG.select("#SVG_T2G2 .anim1").opacity(0);
				SVG.select("#SVG_T2G2 .anim2").opacity(0).transform({ scaleX: 0.00001, cx:709.9 });
				SVG.select("#SVG_T2G2 .anim3").opacity(0).transform({ scaleY: 0.00001, cy:490 });
				SVG.select("#SVG_T2G2 .anim4").opacity(0);
				SVG.select("#SVG_T2G2 .anim5").opacity(0).transform({ scaleY: 0.00001, cy:494.1 });
				SVG.select("#SVG_T2G2 .anim6").opacity(0)
				SVG.select("#SVG_T2G2 .anim6-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G2 .anim6-2").opacity(0);
				SVG.select("#SVG_T2G2 .anim7").opacity(0);
				SVG.select("#SVG_T2G2 .anim7-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G2 .anim7-2").opacity(0);
				SVG.select("#SVG_T2G2 .anim8").opacity(0);
				SVG.select("#SVG_T2G2 .anim8-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G2 .anim8-2").opacity(0);
				SVG.select("#SVG_T2G2 .anim9").opacity(0);
				SVG.select("#SVG_T2G2 .anim9-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G2 .anim9-2").opacity(0);
				SVG.select("#SVG_T2G2 .anim10").opacity(0);
			break;
			case 'SVG_T2G3':
				SVG.select("#SVG_T2G3 .anim1").opacity(0);
				SVG.select("#SVG_T2G3 .anim2").opacity(0).transform({ scaleX: 0.00001, cx:709.9 });
				SVG.select("#SVG_T2G3 .anim3").opacity(0).transform({ scaleY: 0.00001, cy:490 });
				SVG.select("#SVG_T2G3 .anim4").opacity(0);
				SVG.select("#SVG_T2G3 .anim5").opacity(0).transform({ scaleY: 0.00001, cy:494.1 });
				SVG.select("#SVG_T2G3 .anim6").opacity(0)
				SVG.select("#SVG_T2G3 .anim6-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G3 .anim6-2").opacity(0);
				SVG.select("#SVG_T2G3 .anim7").opacity(0);
				SVG.select("#SVG_T2G3 .anim7-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G3 .anim7-2").opacity(0);
				SVG.select("#SVG_T2G3 .anim8").opacity(0);
				SVG.select("#SVG_T2G3 .anim8-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G3 .anim8-2").opacity(0);
				SVG.select("#SVG_T2G3 .anim10").opacity(0);
			break;
			case 'SVG_T2G4':
				SVG.select("#SVG_T2G4 .anim1").opacity(0);
				SVG.select("#SVG_T2G4 .anim2").opacity(0).transform({ scaleX: 0.00001, cx:709.9 });
				SVG.select("#SVG_T2G4 .anim3").opacity(0).transform({ scaleY: 0.00001, cy:490 });
				SVG.select("#SVG_T2G4 .anim4").opacity(0);
				SVG.select("#SVG_T2G4 .anim5").opacity(0).transform({ scaleY: 0.00001, cy:494.1 });
				SVG.select("#SVG_T2G4 .anim6").opacity(0)
				SVG.select("#SVG_T2G4 .anim6-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G4 .anim6-2").opacity(0);
				SVG.select("#SVG_T2G4 .anim7").opacity(0);
				SVG.select("#SVG_T2G4 .anim7-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G4 .anim7-2").opacity(0);
				SVG.select("#SVG_T2G4 .anim8").opacity(0);
				SVG.select("#SVG_T2G4 .anim8-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G4 .anim8-2").opacity(0);
				SVG.select("#SVG_T2G4 .anim10").opacity(0);
			break;
			case 'SVG_T2G5':
				SVG.select("#SVG_T2G5 .anim1").opacity(0);
				SVG.select("#SVG_T2G5 .anim2").opacity(0).transform({ scaleX: 0.00001, cx:709.9 });
				SVG.select("#SVG_T2G5 .anim3").opacity(0).transform({ scaleY: 0.00001, cy:490 });
				SVG.select("#SVG_T2G5 .anim4").opacity(0);
				SVG.select("#SVG_T2G5 .anim5").opacity(0).transform({ scaleY: 0.00001, cy:494.1 });
				SVG.select("#SVG_T2G5 .anim6").opacity(0)
				SVG.select("#SVG_T2G5 .anim6-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G5 .anim6-2").opacity(0);
				SVG.select("#SVG_T2G5 .anim7").opacity(0);
				SVG.select("#SVG_T2G5 .anim7-1").opacity(0).transform({ scaleX: 0.00001, cx:84.8 });
				SVG.select("#SVG_T2G5 .anim7-2").opacity(0);
				SVG.select("#SVG_T2G5 .anim10").opacity(0);
			break;
			case 'SVG_T2G6':
				SVG.select("#SVG_T2G6 .anim1").opacity(0);
				SVG.select("#SVG_T2G6 .anim2").opacity(0).transform({ scaleX: 0.00001, cx:709.9 });
				SVG.select("#SVG_T2G6 .anim3").opacity(0).transform({ scaleY: 0.00001, cy:490 });
				SVG.select("#SVG_T2G6 .anim4").opacity(0);
				SVG.select("#SVG_T2G6 .anim5").opacity(0).transform({ scaleY: 0.00001, cy:494.1 });
				SVG.select("#SVG_T2G6 .anim6").opacity(0);
				SVG.select("#SVG_T2G6 .anim6-1").opacity(0).rotate(-15);
				SVG.select("#SVG_T2G6 .anim7").opacity(0);
				SVG.select("#SVG_T2G6 .anim7-1").opacity(0).transform({ scaleX: 0.00001, cx:308.7 });
				SVG.select("#SVG_T2G6 .anim10").opacity(0);
			break;
			case 'SVG_T3G1':
				SVG.select("#SVG_T3G1 .anim1").opacity(0);
				SVG.select("#SVG_T3G1 .anim2").opacity(0).transform({ scaleX: 0.00001, cx:709.9 });
				SVG.select("#SVG_T3G1 .anim3").opacity(0).transform({ scaleY: 0.00001, cy:490 });
				SVG.select("#SVG_T3G1 .anim4").opacity(0);
				SVG.select("#SVG_T3G1 .anim5").opacity(0).transform({ scaleY: 0.00001, cy:494.1 });
				SVG.select("#SVG_T3G1 .anim6").opacity(0);
				SVG.select("#SVG_T3G1 .anim7").opacity(0);
				SVG.select("#SVG_T3G1 .anim8").opacity(0);
				SVG.select("#SVG_T3G1 .anim9").opacity(0);
				SVG.select("#SVG_T3G1 .anim10").opacity(0);
				SVG.select("#SVG_T3G1 .anim11").opacity(0);
			break;
			case 'SVG_T3G2':
				SVG.select("#SVG_T3G2 .anim1").opacity(0).scale(0.9);
				SVG.select("#SVG_T3G2 .anim2").opacity(0).scale(0.9);
				SVG.select("#SVG_T3G2 .anim3").opacity(0).scale(0.9);
				SVG.select("#SVG_T3G2 .anim4").opacity(0).scale(0.9);
				SVG.select("#SVG_T3G2 .anim5").opacity(0).scale(0.9);
				SVG.select("#SVG_T3G2 .anim1-0").opacity(0);
				SVG.select("#SVG_T3G2 .anim2-0").opacity(0);
				SVG.select("#SVG_T3G2 .anim3-0").opacity(0);
				SVG.select("#SVG_T3G2 .anim4-0").opacity(0);
				SVG.select("#SVG_T3G2 .anim5-0").opacity(0);
				SVG.select("#SVG_T3G2 .anim1-1").opacity(0);
				SVG.select("#SVG_T3G2 .anim2-1").opacity(0);
				SVG.select("#SVG_T3G2 .anim3-1").opacity(0);
				SVG.select("#SVG_T3G2 .anim4-1").opacity(0);
				SVG.select("#SVG_T3G2 .anim5-1").opacity(0);
				SVG.select("#SVG_T3G2 .anim1-2").opacity(0).transform({ scaleX: 0.00001, cx:185.5 });
				SVG.select("#SVG_T3G2 .anim2-2").opacity(0).transform({ scaleX: 0.00001, cx:185.5 });
				SVG.select("#SVG_T3G2 .anim3-2").opacity(0).transform({ scaleX: 0.00001, cx:185.5 });
				SVG.select("#SVG_T3G2 .anim4-2").opacity(0).transform({ scaleX: 0.00001, cx:185.5 });
				SVG.select("#SVG_T3G2 .anim5-2-1").opacity(0).transform({ scaleY: 0.00001, cy:81.7});
				SVG.select("#SVG_T3G2 .anim5-2-2").transform({ scaleX: 0.00001, cx:634.6 });
				SVG.select("#SVG_T3G2 .anim1-4").opacity(0);
				SVG.select("#SVG_T3G2 .anim2-4").opacity(0);
				SVG.select("#SVG_T3G2 .anim3-4").opacity(0);
				SVG.select("#SVG_T3G2 .anim4-4").opacity(0);
				SVG.select("#SVG_T3G2 .anim5-4").opacity(0);
			break;
			case 'SVG_T3G3':
				SVG.select("#SVG_T3G3 .anim1-0").opacity(0);
				SVG.select("#SVG_T3G3 .anim2-0").opacity(0);
				SVG.select("#SVG_T3G3 .anim3-0").opacity(0);
				SVG.select("#SVG_T3G3 .anim1-1").transform({ scaleY: 0.00001, cy:451.3 });
				SVG.select("#SVG_T3G3 .anim2-1").transform({ scaleY: 0.00001, cy:451.3 });
				SVG.select("#SVG_T3G3 .anim3-1").transform({ scaleY: 0.00001, cy:451.3 });
				SVG.select("#SVG_T3G3 .anim1-2").opacity(0);
				SVG.select("#SVG_T3G3 .anim2-2").opacity(0);
				SVG.select("#SVG_T3G3 .anim3-2").opacity(0);
				SVG.select("#SVG_T3G3 .anim4-0").opacity(0);
				SVG.select("#SVG_T3G3 .anim4-1").opacity(0).dy(10);
				SVG.select("#SVG_T3G3 .anim4-2").opacity(0);
				SVG.select("#SVG_T3G3 .anim4-3").opacity(0).transform({ scaleX: 0.00001, cx:609.7 });
			break;
			case 'SVG_T3G4':
				SVG.select("#SVG_T3G4 .anim1-0").opacity(0);
				SVG.select("#SVG_T3G4 .anim1-1-1").transform({ scaleY: 0.00001, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim1-2-1").transform({ scaleY: 0.00001, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim1-3-1").transform({ scaleY: 0.00001, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim1-1-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim1-2-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim1-3-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim2-0").opacity(0);
				SVG.select("#SVG_T3G4 .anim2-1-1").transform({ scaleY: 0.00001, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim2-2-1").transform({ scaleY: 0.00001, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim2-3-1").transform({ scaleY: 0.00001, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim2-1-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim2-2-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim2-3-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim2-0").opacity(0);
				SVG.select("#SVG_T3G4 .anim3-1-1").transform({ scaleY: 0.00001, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim3-2-1").transform({ scaleY: 0.00001, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim3-3-1").transform({ scaleY: 0.00001, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim3-1-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim3-2-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim3-3-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim3-0").opacity(0);
				SVG.select("#SVG_T3G4 .anim4-1-1").transform({ scaleY: 0.00001, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim4-2-1").transform({ scaleY: 0.00001, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim4-3-1").transform({ scaleY: 0.00001, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim4-1-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim4-2-2").opacity(0);
				SVG.select("#SVG_T3G4 .anim4-3-2").opacity(0);
			break;
			case 'SVG_T4':
				SVG.select("#SVG_T4 .anim1-0").opacity(0);
				SVG.select("#SVG_T4 .anim1-1").opacity(0);
				SVG.select("#SVG_T4 .anim2-0").opacity(0);
				SVG.select("#SVG_T4 .anim2-1").opacity(0);
				SVG.select("#SVG_T4 .anim3-0").opacity(0);
				SVG.select("#SVG_T4 .anim3-1").opacity(0);
				SVG.select("#SVG_T4 .anim4-0").opacity(0);
				SVG.select("#SVG_T4 .anim4-1").opacity(0);
				SVG.select("#SVG_T4 .anim5").opacity(0).dy(0);
			break;
			case 'SVG_T5-1':
				SVG.select("#SVG_T5-1 .anim0").opacity(0);
				SVG.select("#SVG_T5-1 .anim1-1").opacity(0);
				SVG.select("#SVG_T5-1 .anim2-1").opacity(0);
				SVG.select("#SVG_T5-1 .anim3-1").opacity(0);
				SVG.select("#SVG_T5-1 .anim4-1").opacity(0);
				SVG.select("#SVG_T5-1 .anim5-1").opacity(0);
				SVG.select("#SVG_T5-1 .anim6-1").opacity(0);
				SVG.select("#SVG_T5-1 .anim7-1").opacity(0);
				SVG.select("#SVG_T5-1 .anim1-2").opacity(0).transform({ scaleY: 0.00001, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim2-2").opacity(0).transform({ scaleY: 0.00001, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim3-2").opacity(0).transform({ scaleY: 0.00001, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim4-2").opacity(0).transform({ scaleY: 0.00001, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim5-2").opacity(0).transform({ scaleY: 0.00001, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim6-2").opacity(0).transform({ scaleY: 0.00001, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim7-2").opacity(0).transform({ scaleY: 0.00001, cy:208.3 });
			break;
			case 'SVG_T5-2':
				SVG.select("#SVG_T5-2 .anim0").opacity(0);
				SVG.select("#SVG_T5-2 .anim1").rotate(-15).opacity(0);
				SVG.select("#SVG_T5-2 .anim2").opacity(0);
			break;
			case 'SVG_T5-3':
				SVG.select("#SVG_T5-3 .anim0").opacity(0);
				SVG.select("#SVG_T5-3 .anim1-1").opacity(0);
				SVG.select("#SVG_T5-3 .anim2-1").opacity(0);
				SVG.select("#SVG_T5-3 .anim3-1").opacity(0);
				SVG.select("#SVG_T5-3 .anim4-1").opacity(0);
				SVG.select("#SVG_T5-3 .anim5-1").opacity(0);
				SVG.select("#SVG_T5-3 .anim6-1").opacity(0);
				SVG.select("#SVG_T5-3 .anim1-2").opacity(0).transform({ scaleX: 0.00001, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim2-2").opacity(0).transform({ scaleX: 0.00001, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim3-2").opacity(0).transform({ scaleX: 0.00001, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim4-2").opacity(0).transform({ scaleX: 0.00001, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim5-2").opacity(0).transform({ scaleX: 0.00001, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim6-2").opacity(0).transform({ scaleX: 0.00001, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim1-3").opacity(0);
				SVG.select("#SVG_T5-3 .anim2-3").opacity(0);
				SVG.select("#SVG_T5-3 .anim3-3").opacity(0);
				SVG.select("#SVG_T5-3 .anim4-3").opacity(0);
				SVG.select("#SVG_T5-3 .anim5-3").opacity(0);
				SVG.select("#SVG_T5-3 .anim6-3").opacity(0);
			break;
			case 'SVG_T5-4':
				SVG.select("#SVG_T5-4 .anim0").opacity(0);
				SVG.select("#SVG_T5-4 .anim1").opacity(0);
			break;
			case 'SVG_T5-5':
				SVG.select("#SVG_T5-5 .anim0").opacity(0);
				SVG.select("#SVG_T5-5 .anim1").rotate(-15).opacity(0);
				SVG.select("#SVG_T5-5 .anim2").opacity(0);
			break;
			case 'SVG_T5-6':
				SVG.select("#SVG_T5-6 .anim0").opacity(0);
				SVG.select("#SVG_T5-6 .anim1").opacity(0).transform({ scaleY: 0.00001, cy:223 });
				SVG.select("#SVG_T5-6 .anim2-1").opacity(0);
				SVG.select("#SVG_T5-6 .anim2-0").opacity(0);
				SVG.select("#SVG_T5-6 .anim3-1").opacity(0);
				SVG.select("#SVG_T5-6 .anim3-0").opacity(0);
				SVG.select("#SVG_T5-6 .anim4-1").opacity(0);
				SVG.select("#SVG_T5-6 .anim4-0").opacity(0);
				SVG.select("#SVG_T5-6 .anim5-1").opacity(0);
				SVG.select("#SVG_T5-6 .anim5-0").opacity(0);
				SVG.select("#SVG_T5-6 .anim6-1").opacity(0);
				SVG.select("#SVG_T5-6 .anim6-0").opacity(0);
				SVG.select("#SVG_T5-6 .anim7-1").opacity(0);
				SVG.select("#SVG_T5-6 .anim7-0").opacity(0);
			break;
		}
	}
	function _revealAnim() {
		var $Element = $(this);
		var Id = $Element.attr("id");
		switch (Id) {
			case 'SVG_T1G1':
				SVG.select("#SVG_T1G1 .t1-g1-anim1").animate(1500, '<>', 0).rotate(0).opacity(1);
				SVG.select("#SVG_T1G1 .t1-g1-anim2").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T1G1 .t1-g1-anim3").animate(1000, '<>', 800).transform({ scaleX: 1, cx:130 });
				SVG.select("#SVG_T1G1 .t1-g1-anim4").animate(1000, '<>', 800).transform({ scaleX: 1, cx:0 });
				SVG.select("#SVG_T1G1 .t1-g1-anim5").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T1G1 .t1-g1-anim6").animate(1000, '<>', 1000).opacity(1);
			break;
			case 'SVG_T1G2':
				SVG.select("#SVG_T1G2 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T1G2 .anim2").animate(1000, '<>', 200).opacity(1).dy(-5);
				SVG.select("#SVG_T1G2 .anim3").animate(1000, '<>', 400).opacity(1);
				SVG.select("#SVG_T1G2 .anim4").animate(1000, '<>', 600).opacity(1).dy(5).dx(-5);
				SVG.select("#SVG_T1G2 .anim5").animate(1000, '<>', 800).scale(1).opacity(1);
				SVG.select("#SVG_T1G2 .anim6").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T1G2 .anim7").animate(1000, '<>', 1000).scale(1).opacity(1);
				SVG.select("#SVG_T1G2 .anim8").animate(1000, '<>', 1100).opacity(1);
				SVG.select("#SVG_T1G2 .anim9").animate(1000, '<>', 1200).scale(1).opacity(1);
				SVG.select("#SVG_T1G2 .anim10").animate(1000, '<>', 1300).opacity(1);
			break;
			case 'SVG_T1G3':
				SVG.select("#SVG_T1G3 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T1G3 .anim2").animate(1000, '<>', 300).opacity(1).dy(-5);
				SVG.select("#SVG_T1G3 .anim3").animate(1000, '<>', 400).opacity(1).scale(1);
				SVG.select("#SVG_T1G3 .anim4").animate(1000, '<>', 600).opacity(1).scale(1);
				SVG.select("#SVG_T1G3 .anim5").animate(1000, '<>', 800).opacity(1).scale(1);
				SVG.select("#SVG_T1G3 .anim6").animate(1000, '<>', 1000).opacity(1).scale(1);
			break;
			case 'SVG_T1G4':
				SVG.select("#SVG_T1G4 .anim1").animate(1000, '<>', 0).transform({ scaleY: 1, cy:454.4 });
				SVG.select("#SVG_T1G4 .anim2").animate(1000, '<>', 300).transform({ scaleY: 1, cy:454.4 });
				SVG.select("#SVG_T1G4 .anim3").animate(500, '<>', 600).transform({ scaleY: 1, cy:454.4 });
				SVG.select("#SVG_T1G4 .anim4").animate(500, '<>', 1200).opacity(1);
				SVG.select("#SVG_T1G4 .anim5").animate(500, '<>', 1500).opacity(1);
				SVG.select("#SVG_T1G4 .anim6").animate(500, '<>', 1800).opacity(1);
			break;
			case 'SVG_T2G1':
				SVG.select("#SVG_T2G1 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T2G1 .anim2").animate(1500, '<>', 0).opacity(1).transform({ scaleX: 1, cx:709.9 });
				SVG.select("#SVG_T2G1 .anim3").animate(1500, '<>', 0).opacity(1).transform({ scaleY: 1, cy:490 });
				SVG.select("#SVG_T2G1 .anim4").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T2G1 .anim5").animate(2500, '<>', 300).opacity(1).transform({ scaleY: 1, cy:494.1 });
				SVG.select("#SVG_T2G1 .anim6").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T2G1 .anim7").animate(1000, '<>', 1100).opacity(1);
				SVG.select("#SVG_T2G1 .anim8").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T2G1 .anim9").animate(1000, '<>', 1300).opacity(1);
				SVG.select("#SVG_T2G1 .anim10").animate(1000, '<>', 1400).opacity(1);
			break;
			case 'SVG_T2G2':
				SVG.select("#SVG_T2G2 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T2G2 .anim2").animate(1500, '<>', 0).opacity(1).transform({ scaleX: 1, cx:709.9 });
				SVG.select("#SVG_T2G2 .anim3").animate(1500, '<>', 0).opacity(1).transform({ scaleY: 1, cy:490 });
				SVG.select("#SVG_T2G2 .anim4").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T2G2 .anim5").animate(2500, '<>', 300).opacity(1).transform({ scaleY: 1, cy:494.1 });				
				SVG.select("#SVG_T2G2 .anim6").animate(1000, '<>', 800).opacity(1);
				SVG.select("#SVG_T2G2 .anim6-1").animate(1000, '<>', 900).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G2 .anim6-2").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T2G2 .anim7").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T2G2 .anim7-1").animate(1000, '<>', 1000).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G2 .anim7-2").animate(1000, '<>', 1500).opacity(1);
				SVG.select("#SVG_T2G2 .anim8").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T2G2 .anim8-1").animate(1000, '<>', 1100).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G2 .anim8-2").animate(1000, '<>', 1700).opacity(1);
				SVG.select("#SVG_T2G2 .anim9").animate(1000, '<>', 1100).opacity(1);
				SVG.select("#SVG_T2G2 .anim9-1").animate(1000, '<>', 1200).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G2 .anim9-2").animate(1000, '<>', 1900).opacity(1);
				SVG.select("#SVG_T2G2 .anim10").animate(1000, '<>', 2100).opacity(1);
			break;
			case 'SVG_T2G3':
				SVG.select("#SVG_T2G3 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T2G3 .anim2").animate(1500, '<>', 0).opacity(1).transform({ scaleX: 1, cx:709.9 });
				SVG.select("#SVG_T2G3 .anim3").animate(1500, '<>', 0).opacity(1).transform({ scaleY: 1, cy:490 });
				SVG.select("#SVG_T2G3 .anim4").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T2G3 .anim5").animate(2500, '<>', 300).opacity(1).transform({ scaleY: 1, cy:494.1 });				
				SVG.select("#SVG_T2G3 .anim6").animate(1000, '<>', 800).opacity(1);
				SVG.select("#SVG_T2G3 .anim6-1").animate(1000, '<>', 900).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G3 .anim6-2").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T2G3 .anim7").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T2G3 .anim7-1").animate(1000, '<>', 1000).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G3 .anim7-2").animate(1000, '<>', 1500).opacity(1);
				SVG.select("#SVG_T2G3 .anim8").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T2G3 .anim8-1").animate(1000, '<>', 1100).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G3 .anim8-2").animate(1000, '<>', 1700).opacity(1);
				SVG.select("#SVG_T2G3 .anim10").animate(1000, '<>', 1900).opacity(1);
			break;
			case 'SVG_T2G4':
				SVG.select("#SVG_T2G4 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T2G4 .anim2").animate(1500, '<>', 0).opacity(1).transform({ scaleX: 1, cx:709.9 });
				SVG.select("#SVG_T2G4 .anim3").animate(1500, '<>', 0).opacity(1).transform({ scaleY: 1, cy:490 });
				SVG.select("#SVG_T2G4 .anim4").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T2G4 .anim5").animate(2500, '<>', 300).opacity(1).transform({ scaleY: 1, cy:494.1 });				
				SVG.select("#SVG_T2G4 .anim6").animate(1000, '<>', 800).opacity(1);
				SVG.select("#SVG_T2G4 .anim6-1").animate(1000, '<>', 900).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G4 .anim6-2").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T2G4 .anim7").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T2G4 .anim7-1").animate(1000, '<>', 1000).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G4 .anim7-2").animate(1000, '<>', 1500).opacity(1);
				SVG.select("#SVG_T2G4 .anim8").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T2G4 .anim8-1").animate(1000, '<>', 1100).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G4 .anim8-2").animate(1000, '<>', 1700).opacity(1);
				SVG.select("#SVG_T2G4 .anim10").animate(1000, '<>', 1900).opacity(1);
			break;
			case 'SVG_T2G5':
				SVG.select("#SVG_T2G5 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T2G5 .anim2").animate(1500, '<>', 0).opacity(1).transform({ scaleX: 1, cx:709.9 });
				SVG.select("#SVG_T2G5 .anim3").animate(1500, '<>', 0).opacity(1).transform({ scaleY: 1, cy:490 });
				SVG.select("#SVG_T2G5 .anim4").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T2G5 .anim5").animate(2500, '<>', 300).opacity(1).transform({ scaleY: 1, cy:494.1 });				
				SVG.select("#SVG_T2G5 .anim6").animate(1000, '<>', 800).opacity(1);
				SVG.select("#SVG_T2G5 .anim6-1").animate(1000, '<>', 900).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G5 .anim6-2").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T2G5 .anim7").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T2G5 .anim7-1").animate(1000, '<>', 1000).opacity(1).transform({ scaleX: 1, cx:84.8 });
				SVG.select("#SVG_T2G5 .anim7-2").animate(1000, '<>', 1500).opacity(1);
				SVG.select("#SVG_T2G5 .anim10").animate(1000, '<>', 1700).opacity(1);
			break;
			case 'SVG_T2G6':
				SVG.select("#SVG_T2G6 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T2G6 .anim2").animate(1500, '<>', 0).opacity(1).transform({ scaleX: 1, cx:709.9 });
				SVG.select("#SVG_T2G6 .anim3").animate(1500, '<>', 0).opacity(1).transform({ scaleY: 1, cy:490 });
				SVG.select("#SVG_T2G6 .anim4").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T2G6 .anim5").animate(2500, '<>', 300).opacity(1).transform({ scaleY: 1, cy:494.1 });	
				SVG.select("#SVG_T2G6 .anim6").animate(1000, '<>', 800).opacity(1);
				SVG.select("#SVG_T2G6 .anim6-1").animate(1000, '<>', 800).opacity(1).rotate(0);
				SVG.select("#SVG_T2G6 .anim7").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T2G6 .anim7-1").animate(1000, '<>', 1000).opacity(1).transform({ scaleX: 1, cx:308.7 });
				SVG.select("#SVG_T2G6 .anim10").animate(1000, '<>', 1200).opacity(1);
			break;
			case 'SVG_T3G1':
				SVG.select("#SVG_T3G1 .anim1").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T3G1 .anim2").animate(1500, '<>', 0).opacity(1).transform({ scaleX: 1, cx:709.9 });
				SVG.select("#SVG_T3G1 .anim3").animate(1500, '<>', 0).opacity(1).transform({ scaleY: 1, cy:490 });
				SVG.select("#SVG_T3G1 .anim4").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T3G1 .anim5").animate(2500, '<>', 300).opacity(1).transform({ scaleY: 1, cy:494.1 });
				SVG.select("#SVG_T3G1 .anim6").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T3G1 .anim7").animate(1000, '<>', 1100).opacity(1);
				SVG.select("#SVG_T3G1 .anim8").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T3G1 .anim9").animate(1000, '<>', 1300).opacity(1);
				SVG.select("#SVG_T3G1 .anim10").animate(1000, '<>', 2000).opacity(1);
				SVG.select("#SVG_T3G1 .anim11").animate(1000, '<>', 2200).opacity(1);
			break;
			case 'SVG_T3G2':
				SVG.select("#SVG_T3G2 .anim1").animate(1000, '<>', 0).opacity(1).scale(1);
				SVG.select("#SVG_T3G2 .anim2").animate(1000, '<>', 200).opacity(1).scale(1);
				SVG.select("#SVG_T3G2 .anim3").animate(1000, '<>', 400).opacity(1).scale(1);
				SVG.select("#SVG_T3G2 .anim4").animate(1000, '<>', 600).opacity(1).scale(1);
				SVG.select("#SVG_T3G2 .anim5").animate(1000, '<>', 800).opacity(1).scale(1);
				
				SVG.select("#SVG_T3G2 .anim1-1").animate(1000, '<>', 200).opacity(1);
				SVG.select("#SVG_T3G2 .anim2-1").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T3G2 .anim3-1").animate(1000, '<>', 700).opacity(1);
				SVG.select("#SVG_T3G2 .anim4-1").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T3G2 .anim5-1").animate(1000, '<>', 1100).opacity(1);

				SVG.select("#SVG_T3G2 .anim1-0").animate(1000, '<>', 200).opacity(1);
				SVG.select("#SVG_T3G2 .anim2-0").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T3G2 .anim3-0").animate(1000, '<>', 700).opacity(1);
				SVG.select("#SVG_T3G2 .anim4-0").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T3G2 .anim5-0").animate(1000, '<>', 1100).opacity(1);
				
				SVG.select("#SVG_T3G2 .anim1-2").animate(1000, '<>', 400).opacity(1).transform({ scaleX: 1, cx:185.5 });
				SVG.select("#SVG_T3G2 .anim2-2").animate(1000, '<>', 600).opacity(1).transform({ scaleX: 1, cx:185.5 });
				SVG.select("#SVG_T3G2 .anim3-2").animate(1000, '<>', 900).opacity(1).transform({ scaleX: 1, cx:185.5 });
				SVG.select("#SVG_T3G2 .anim4-2").animate(1000, '<>', 1100).opacity(1).transform({ scaleX: 1, cx:185.5 });
				SVG.select("#SVG_T3G2 .anim5-2-1").animate(500, '<', 1300).opacity(1).transform({ scaleY: 1, cy:81.7});
				SVG.select("#SVG_T3G2 .anim5-2-2").animate(500, '>', 1800).transform({ scaleX: 1, cx:634.6 });
				
				SVG.select("#SVG_T3G2 .anim1-4").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T3G2 .anim2-4").animate(1000, '<>', 1100).opacity(1);
				SVG.select("#SVG_T3G2 .anim3-4").animate(1000, '<>', 1300).opacity(1);
				SVG.select("#SVG_T3G2 .anim4-4").animate(1000, '<>', 1500).opacity(1);
				SVG.select("#SVG_T3G2 .anim5-4").animate(1000, '<>', 1700).opacity(1);
			break;
			case 'SVG_T3G3':
				SVG.select("#SVG_T3G3 .anim1-0").animate(500, '<>', 0).opacity(1);
				SVG.select("#SVG_T3G3 .anim2-0").animate(500, '<>', 200).opacity(1);
				SVG.select("#SVG_T3G3 .anim3-0").animate(500, '<>', 400).opacity(1);
				SVG.select("#SVG_T3G3 .anim1-1").animate(1000, '<>', 0).transform({ scaleY: 1, cy:454.4 });
				SVG.select("#SVG_T3G3 .anim2-1").animate(1000, '<>', 300).transform({ scaleY: 1, cy:454.4 });
				SVG.select("#SVG_T3G3 .anim3-1").animate(1000, '<>', 600).transform({ scaleY: 1, cy:454.4 });
				SVG.select("#SVG_T3G3 .anim1-2").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T3G3 .anim2-2").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T3G3 .anim3-2").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T3G3 .anim4-0").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T3G3 .anim4-1").animate(1000, '<>', 1500).opacity(1).dy(-10);
				SVG.select("#SVG_T3G3 .anim4-2").animate(1000, '<>', 1600).opacity(1);
				SVG.select("#SVG_T3G3 .anim4-3").animate(1000, '<>', 1700).opacity(1).transform({ scaleX: 1, cx:609.7 });
			break;
			case 'SVG_T3G4':
				SVG.select("#SVG_T3G4 .anim1-0").animate(500, '<>', 0).opacity(1);
				SVG.select("#SVG_T3G4 .anim1-1-1").animate(1000, '>', 0).transform({ scaleY: 1, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim1-2-1").animate(1000, '>', 200).transform({ scaleY: 1, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim1-3-1").animate(1000, '>', 400).transform({ scaleY: 1, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim1-1-2").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T3G4 .anim1-2-2").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T3G4 .anim1-3-2").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T3G4 .anim2-0").animate(500, '<>', 0).opacity(1);
				SVG.select("#SVG_T3G4 .anim2-1-1").animate(1000, '>', 0).transform({ scaleY: 1, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim2-2-1").animate(1000, '>', 200).transform({ scaleY: 1, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim2-3-1").animate(1000, '>', 400).transform({ scaleY: 1, cy:256.3 });
				SVG.select("#SVG_T3G4 .anim2-1-2").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T3G4 .anim2-2-2").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T3G4 .anim2-3-2").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T3G4 .anim3-0").animate(500, '<>', 0).opacity(1);
				SVG.select("#SVG_T3G4 .anim3-1-1").animate(1000, '>', 0).transform({ scaleY: 1, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim3-2-1").animate(1000, '>', 200).transform({ scaleY: 1, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim3-3-1").animate(1000, '>', 400).transform({ scaleY: 1, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim3-1-2").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T3G4 .anim3-2-2").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T3G4 .anim3-3-2").animate(1000, '<>', 1400).opacity(1);
				SVG.select("#SVG_T3G4 .anim4-0").animate(500, '<>', 0).opacity(1);
				SVG.select("#SVG_T3G4 .anim4-1-1").animate(1000, '>', 0).transform({ scaleY: 1, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim4-2-1").animate(1000, '>', 200).transform({ scaleY: 1, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim4-3-1").animate(1000, '>', 400).transform({ scaleY: 1, cy:546.4 });
				SVG.select("#SVG_T3G4 .anim4-1-2").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T3G4 .anim4-2-2").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T3G4 .anim4-3-2").animate(1000, '<>', 1400).opacity(1);
			break;
			case 'SVG_T4':
				SVG.select("#SVG_T4 .anim1-0").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T4 .anim1-1").animate(1000, '<>', 100).opacity(1);
				SVG.select("#SVG_T4 .anim2-0").animate(1000, '<>', 100).opacity(1);
				SVG.select("#SVG_T4 .anim2-1").animate(1000, '<>', 200).opacity(1);
				SVG.select("#SVG_T4 .anim3-0").animate(1000, '<>', 100).opacity(1);
				SVG.select("#SVG_T4 .anim3-1").animate(1000, '<>', 200).opacity(1);
				SVG.select("#SVG_T4 .anim4-0").animate(1000, '<>', 300).opacity(1);
				SVG.select("#SVG_T4 .anim4-1").animate(1000, '<>', 400).opacity(1);
				SVG.select("#SVG_T4 .anim5").animate(1000, '<>', 200).opacity(1).dy(10);
			break;
			case 'SVG_T5-1':
				SVG.select("#SVG_T5-1 .anim0").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T5-1 .anim1-1").animate(1000, '<>', 100).opacity(1);
				SVG.select("#SVG_T5-1 .anim2-1").animate(1000, '<>', 200).opacity(1);
				SVG.select("#SVG_T5-1 .anim3-1").animate(1000, '<>', 300).opacity(1);
				SVG.select("#SVG_T5-1 .anim4-1").animate(1000, '<>', 400).opacity(1);
				SVG.select("#SVG_T5-1 .anim5-1").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T5-1 .anim6-1").animate(1000, '<>', 600).opacity(1);
				SVG.select("#SVG_T5-1 .anim7-1").animate(1000, '<>', 700).opacity(1);
				SVG.select("#SVG_T5-1 .anim1-2").animate(1000, '<>', 100).opacity(1).transform({ scaleY: 1, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim2-2").animate(1000, '<>', 200).opacity(1).transform({ scaleY: 1, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim3-2").animate(1000, '<>', 300).opacity(1).transform({ scaleY: 1, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim4-2").animate(1000, '<>', 400).opacity(1).transform({ scaleY: 1, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim5-2").animate(1000, '<>', 500).opacity(1).transform({ scaleY: 1, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim6-2").animate(1000, '<>', 600).opacity(1).transform({ scaleY: 1, cy:208.3 });
				SVG.select("#SVG_T5-1 .anim7-2").animate(1000, '<>', 700).opacity(1).transform({ scaleY: 1, cy:208.3 });
			break;
			case 'SVG_T5-2':
				SVG.select("#SVG_T5-2 .anim0").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T5-2 .anim1").animate(1000, '<>', 0).rotate(0).opacity(1);
				SVG.select("#SVG_T5-2 .anim2").animate(1000, '<>', 400).opacity(1);
			break;
			case 'SVG_T5-3':				
				SVG.select("#SVG_T5-3 .anim0").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T5-3 .anim1-1").animate(1000, '<>', 100).opacity(1);
				SVG.select("#SVG_T5-3 .anim2-1").animate(1000, '<>', 200).opacity(1);
				SVG.select("#SVG_T5-3 .anim3-1").animate(1000, '<>', 300).opacity(1);
				SVG.select("#SVG_T5-3 .anim4-1").animate(1000, '<>', 400).opacity(1);
				SVG.select("#SVG_T5-3 .anim5-1").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T5-3 .anim6-1").animate(1000, '<>', 600).opacity(1);
				SVG.select("#SVG_T5-3 .anim1-2").animate(1000, '<>', 100).opacity(1).transform({ scaleX: 1, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim2-2").animate(1000, '<>', 200).opacity(1).transform({ scaleX: 1, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim3-2").animate(1000, '<>', 300).opacity(1).transform({ scaleX: 1, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim4-2").animate(1000, '<>', 400).opacity(1).transform({ scaleX: 1, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim5-2").animate(1000, '<>', 500).opacity(1).transform({ scaleX: 1, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim6-2").animate(1000, '<>', 600).opacity(1).transform({ scaleX: 1, cx:107.1 });
				SVG.select("#SVG_T5-3 .anim1-3").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T5-3 .anim2-3").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T5-3 .anim3-3").animate(1000, '<>', 1100).opacity(1);
				SVG.select("#SVG_T5-3 .anim4-3").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T5-3 .anim5-3").animate(1000, '<>', 1300).opacity(1);
				SVG.select("#SVG_T5-3 .anim6-3").animate(1000, '<>', 1400).opacity(1);
			break;
			case 'SVG_T5-4':
				SVG.select("#SVG_T5-4 .anim0").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T5-4 .anim1").animate(1000, '<>', 300).opacity(1);
			break;
			case 'SVG_T5-5':
				SVG.select("#SVG_T5-5 .anim0").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T5-5 .anim1").animate(1000, '<>', 0).rotate(0).opacity(1);
				SVG.select("#SVG_T5-5 .anim2").animate(1000, '<>', 400).opacity(1);
			break;
			case 'SVG_T5-6':
				SVG.select("#SVG_T5-6 .anim0").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T5-6 .anim1").animate(1500, '<>', 0).opacity(1).transform({ scaleY: 1, cy:223 });
				SVG.select("#SVG_T5-6 .anim2-0").animate(1000, '<>', 0).opacity(1);
				SVG.select("#SVG_T5-6 .anim2-1").animate(1000, '<>', 800).opacity(1);
				SVG.select("#SVG_T5-6 .anim3-0").animate(1000, '<>', 100).opacity(1);
				SVG.select("#SVG_T5-6 .anim3-1").animate(1000, '<>', 900).opacity(1);
				SVG.select("#SVG_T5-6 .anim4-0").animate(1000, '<>', 200).opacity(1);
				SVG.select("#SVG_T5-6 .anim4-1").animate(1000, '<>', 1000).opacity(1);
				SVG.select("#SVG_T5-6 .anim5-0").animate(1000, '<>', 300).opacity(1);
				SVG.select("#SVG_T5-6 .anim5-1").animate(1000, '<>', 1100).opacity(1);
				SVG.select("#SVG_T5-6 .anim6-0").animate(1000, '<>', 400).opacity(1);
				SVG.select("#SVG_T5-6 .anim6-1").animate(1000, '<>', 1200).opacity(1);
				SVG.select("#SVG_T5-6 .anim7-0").animate(1000, '<>', 500).opacity(1);
				SVG.select("#SVG_T5-6 .anim7-1").animate(1000, '<>', 1300).opacity(1);
			break;
		}
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
				$("#mainHeaderOverlayMenu li[data-accordion] > ul").not($Next).slideUp(500);
				$Next.slideDown(500);
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
			
			
			setTimeout(function() {
				$Element.animate({opacity:0}, 600, function() { $Element.remove(); });
			}, 200);
		});
		
	}
});