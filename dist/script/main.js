(function($) {
	$(function() {

		$('input, select').styler();
		$('input, checkbox').styler('destroy');
		$('.main__filters-sort select').styler('destroy');

	});

})(jQuery);


function PopUpShow(id){
	var elem = id;
	console.log(elem);
    $(id).show();
}
function PopUpHide(id){
    $(id).hide();
}


$(".hamburger").click(function() {
  $(this).toggleClass("hamburger-open");
  $('.wrapper__blur').toggleClass("wrapper__blur-open");
});

$(document).ready(function() {
	 setInterval(function () {
	 	$.fn.Slider.autoPlay();
	 },  $.fn.Slider.autoplay);
});