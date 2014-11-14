$(document).ready(function() {
 
  var owl = $("#slider");
 
  owl.owlCarousel({
        singleItem : true,
        navigation : true,
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth: window,
        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,
        pagination : false,
      autoHeight : false,
  });
    
    
   $(".jumpto1").click(function(){
    owl.trigger('owl.goTo',0); //owl.play event accept autoPlay speed as second parameter
  })
   
   $(".jumpto2").click(function(){
    owl.trigger('owl.goTo',51); //owl.play event accept autoPlay speed as second parameter
  })
 
});

