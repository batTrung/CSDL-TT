
$(function(){
	$("#js-upload").click(function () {
    	$("#fileupload").click();
  	});

	$("#fileupload").fileupload({
	    url: $("#fileupload").attr('data-url'),
	    dataType: 'json',
	    beforeSend: function(){
	    	$('#submit').addClass('is-loading');
	    },
	    done: function (e, data) {
	      if (data.result.is_valid) {
	      	$('#show-file').html(data.result.name)
	        $('#submit').removeClass('is-loading');
	      }
	    }
	});

});