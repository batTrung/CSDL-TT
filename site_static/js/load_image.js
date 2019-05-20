$(function(){

	var labels =  $("label[for*='id_form']");

	labels.each(function(){
		var label  = $(this);
		var input = $(this).next();

		input.hide();
		label.addClass('button');

		input.change(function(){
			var file  = this.value;
			var fileName = file.split("\\");
			$(this).prev().html(fileName[fileName.length-1]);

		});
	});
});