(function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();

$(function(){

	$('img.img-modal').on('click',function(){
		$('#img-modal').attr('src',$(this).attr('src'));
		$('.xmodal').fadeIn();
	});
	$('.modal-close').on('click',function(){
		$('.xmodal').hide();
	});
	$(window).on('click',function(e){
		if(e.target.className == 'modal-background'){
			$('.xmodal').hide();
		}
		
	});

})

