$(function(){

  $('form').on('submit', function(){
    $form = $(this);

    $.ajax({
      url: $form.attr("data-href"),
      data: $form.serialize(),
      type: 'post',
      datType: 'json',
      success: function(data){
        alert(data.error)
      }
    });

  });
});