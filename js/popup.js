$(function() {
  var guest1 = $( "#guest1" ),
      guest2 = $( "#guest2" ),
      yes = $( "#yes" ),
      no = $( "#no" ),
      foodopt1 = $( "#foodopt1" ),
      foodopt2 = $( "#foodopt2" ),
      allFields = $( [] ).add( guest1 ).add( guest2 ).add( yes ).add( no ).add( foodopt1 ).add( foodopt2 );

   $('form :input').change(function() {
          var foodopt1 = $('.g1 #chicken').is(":checked") || 
              $('.g1 #cow').is(":checked") || 
              $('.g1 #fish').is(":checked");
          var foodopt2 = $('.g2 #chicken').is(":checked") || 
              $('.g2 #cow').is(":checked") || 
              $('.g2 #fish').is(":checked");

          if (($("#yes").is(":checked") && 
               $("#guest1").val!=="" && 
               foodopt1 && 
               (foodopt2) || $("#guest2").val()!=="") || 
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
    buttons: {
      "Submit":  function() {
        
      
          $( this ).dialog( "close" );
        }
      },
      Cancel: function() {
        $( this ).dialog( "close" );
      }
  });

          function rsvpAuth() {
          var uid = $('[name=uid]').val();
          rootRef.child('guests').child(uid).once('value', function(data) {
            if(data.val() !== null) {
              popup('popUpDiv')
            } else {
              alert("Oops! Are you sure your RSVP number is right?");
            }
          });
        }
  
  $( "#rsvp-popup" )
  .button()
  .click(function() {
    $( "#dialog-form" ).dialog( "open" );
  });
});