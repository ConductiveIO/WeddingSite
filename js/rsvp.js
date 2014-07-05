$(function() {
  $("[name=attend]").click(function() {
    console.log($(this).val());
    if ($(this).val() == 'yes') {
      $('.g1').show('slow');
      if ($('#guest2').val() !== '') {
        $('.g2').show('slow');
      }
    } else if ($(this).val() == 'no') {
      $('.g1').hide();
      $('.g2').hide();
    }
  });

  var root = new Firebase('https://glaring-fire-3118.firebaseio.com');
  var nodeRef;
  function rsvpAuth() {
    var uid = $('[name=uid]').val();
    nodeRef = root.child('guests').child(uid);
    nodeRef.once('value', function(data) {
      if(data.val() !== null) {
        $( "#dialog-form" ).dialog( "open" );
        /// disable_scroll();
      } else {
        alert("Oops! Are you sure your RSVP number is right?");
      }
    });
  }
  $("#rsvp-button").click(rsvpAuth);

  $('form :input').change(function() {
    var foodopt1 = $('.g1 #chicken').is(":checked") || 
        $('.g1 #cow').is(":checked") || 
        $('.g1 #fish').is(":checked");
    var foodopt2 = $('.g2 #chicken2').is(":checked") || 
        $('.g2 #cow2').is(":checked") || 
        $('.g2 #fish2').is(":checked");

    if (($("#yes").is(":checked") && 
         $("#guest1").val()!=="" && 
         foodopt1 && 
         ((foodopt2) || $("#guest2").val()==="")) || 
        ($("#no").is(":checked") && 
         $("#guest1")!=="")) {
      $("#submit").prop('disabled', false);
    } else {
      $("#submit").prop('disabled', true);
    }
  });

  $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    open: function() {
      $('.ui-widget-overlay').addClass('custom-overlay');
    },
    close: function() {
      $('.ui-widget-overlay').removeClass('custom-overlay');
    },
  });
  $("#cancel").on('click', function() {
    $( "#dialog-form" ).dialog( "close" );
  })

  $("#submit").on('click', function() {
    
    

    var addressee = nodeRef.child('addressee').once('value', function(data) { return data;});

    nodeRef.update({guest1: $("#guest1").val(),
                    guest2: $("#guest2").val(),
                    attend: $("input[name=attend]:checked").val(),
                    foodopt1: $('[name=foodopt1]:checked').val() ? $('[name=foodopt1]:checked').val() : "null",
                    foodopt2: $('[name=foodopt2]:checked').val() ? $('[name=foodopt2]:checked').val() : "null"
                   });
    $( "#dialog-form" ).empty().html("<p>Thank you!</p><button id='close-dialog'>Close</button>");
    $( "#close-dialog" ).click(function() {
      $( "#dialog-form").dialog("close");
    });
  });
}); 

