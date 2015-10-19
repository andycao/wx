(function($){
  $('.collapse').on('hide.bs.collapse', function () {
    var toggle = $(this).parent().find(".arrow-down").addClass("arrow-right").removeClass("arrow-down");
    console.log(this);
  });
  $('.collapse').on('show.bs.collapse', function () {
    var toggle = $(this).parent().find(".arrow-right").addClass("arrow-down").removeClass("arrow-right");
    console.log('show');
  });

  $("#main .rule").click(function(){
    location.href = "rule.html";
  });


  $("#citys").click(function(){
    $('#myModal').modal('show');
  });

  $("#myModal .modal-body .luoyang").click(function(){
    console.log('luoyang');
  });
  $("#myModal .modal-body .haikou").click(function(){
    console.log('haikou');
  });
  $("#myModal .modal-body .zhengzhou").click(function(){
    console.log('zhengzhou');
  });
  })(jQuery);

