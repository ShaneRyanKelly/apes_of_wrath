var current_direction = "";
var new_text = "";
var type_script = "";
var blocked_path = "<b><em><h5>Travelling " + current_direction + "</h5></em></b><p>The way is fruitless.</p>";

$('#game_canvas').on('click', '.direction', function(event){
  event.preventDefault();
  console.log('direction click');

    if (debug) {
      console.log($(event.target).attr('class'));
      console.log($(event.target).text());
    }
    var parentOffset = $(this).parent().offset();
    var relX = $(this).position().left - 40;
    var relY = $(this).position().top - 40;
    $('#game_canvas').hide();
    current_direction = $(event.target).text();
    direction_display_functions(current_direction, relX, relY);
    $('#canvas_overlay').show();
    $('#canvas_overlay').animate({scrollTop: $('#canvas_overlay').prop("scrollHeight")}, 1);
});

$('#mouse_functions').on('click', function(event){
  event.preventDefault();
  new_text = "";
  var selected_function = $(event.target).text();
  new_text = attributes[selected_function + "_" + current_direction.toLowerCase()];
  console.log(selected_function + "_" + current_direction.toLowerCase() );
  console.log(new_text);

  $('#game_canvas').hide();
  $('#canvas_overlay').hide();
  $('#type_canvas').show();
  typing = true;

  if (selected_function == 'travel'){
    console.log(new_text);
    if (new_text){
      console.log(new_text);
      move(new_text);
    }
  } else if (selected_function == 'look'){
    type_description(new_text);
    $('#game_canvas').show();
    $('#game_canvas').append(new_text);
    $('#canvas_overlay').append(new_text);
  }

  /*if (!new_text) {
    type_description(blocked_path);
    $('#game_canvas').append(blocked_path);
    $('#canvas_overlay').append(blocked_path);
  } else {
    type_description(new_text);

  }*/
});

$('#type_canvas').on('click', function(event){
  event.preventDefault();
  console.log('type click');
    $('#game_canvas').show();
    $('#game_canvas').animate({scrollTop: $('#game_canvas').prop("scrollHeight")}, 1);
    $('#type_canvas').hide();
    $('#type_canvas').empty();
    $('.typed-cursor').hide();
    typing = false;

});

$('#canvas_overlay').on('click', function(event){
  event.preventDefault();
  $('#canvas_overlay').hide();
  $('#mouse_functions').hide();
  $('#game_canvas').hide();
  $('#type_canvas').show();
  /*$game_canvas.show();
  $('#game_canvas').animate({scrollTop: $('#game_canvas').prop("scrollHeight")}, 500);*/
  console.log('canvas_click');
});
