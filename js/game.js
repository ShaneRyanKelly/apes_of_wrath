var $game_canvas = $('#game_canvas');

var fps;
var debug = false;

var typed;
var typing = false;

var time;
var one_second = true;

var area = [ "area_00" ];
var current_area = "area_00";
var area_description = "";
var area_changed = true;
var mouse_functions = '<div id="mouse_functions"></div>';

var direction_functions = ['look', 'travel'];

var attributes = {"area": "", "header": "", "date_time": "", "description": "", "look_north": "", "look_east": "", "look_south": "", "look_west": "", "go_north": "", "go_east": "", "go_south": "", "go_west": ""};

var frame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || fallbackRequestAnimationFrame;

$(function(){
  console.log('ready');
  $game_canvas.attr("disabled", "disabled");
  if ( area_changed ) {
    check_area("area_00");
  }
  $('body').append('<script src="./js/controls.js"></script>');
  runFrame();
  function runFrame() {
    update();
    frame(runFrame);
  }
});

function update() {
  get_FPS();

}

function check_area(current_area) {
  area_changed = false;
  msg="";
  $.ajax({
    dataType: "json",
    url: './data/script.json',
    success: function(msg){
      console.log(msg);
      attributes = [];
      attributes["area"] = msg[0][current_area].area;
      attributes["header"] = msg[0][current_area].header;
      attributes["date_time"] = msg[0][current_area].date_time;
      attributes["description"] = msg[0][current_area].description;
      attributes["look_north"] = msg[0][current_area].look_north;
      attributes["look_east"] = msg[0][current_area].look_east;
      attributes["look_south"] = msg[0][current_area].look_south;
      attributes["look_west"] = msg[0][current_area].look_west;
      attributes["travel_north"] = msg[0][current_area].travel_north;
      attributes["travel_east"] = msg[0][current_area].travel_east;
      attributes["travel_south"] = msg[0][current_area].travel_south;
      attributes["travel_west"] = msg[0][current_area].travel_west;
      console.log(attributes.travel_north);

      current_area = attributes["area"];

      area_description = "";
      area_description += attributes.header + "<br /><br />";
      area_description += attributes.date_time + "<br /><br />";
      area_description += attributes.description + "<br /><br />";

      $('#game_canvas').append(area_description);
      $('#canvas_overlay').append(area_description);
      $('#type_canvas').show();
      type_description(area_description);

    }
  });
}

function move(area){
  check_area(area);
}

function direction_display_functions(current_direction, x, y) {
  $('#mouse_functions').html('');
  for ( var functions in direction_functions ) {
    $('#mouse_functions').append('<li><a>' + direction_functions[functions] + "</a></li>");
    console.log(direction_functions[functions]);
  }
  $('#mouse_functions').css({
    "margin-left" : "" + x + "px",
    "margin-top" : "" + y + "px"
  });
  $('#mouse_functions').show();
}

function type_description(area_description) {
  type_script = "";
  type_script = area_description;
  typing = true;
  $('#type_canvas').html(area_description);

  hide_canvas();
  animate_element();
}

function hide_canvas() {
  $('#type_canvas').children().each(function () {
    $(this).hide();
  });
}

function animate_element() {
  $('#type_canvas').children().each(function () {
    $(this).show();
    $(this).textillate({in: { effect: 'fadeInRight' }});
  });
}

function get_FPS(){

    fps = fps + 1;
    var d = new Date();
    var currentTime = d.getTime();
    //console.log(currentTime);

    if ( currentTime >= (time + 1000) ) {
      one_second = true;
      if ( debug ) {
        console.log('fps: ' + fps);
      }
      //windowUpdate();
    }

    if ( one_second ) {
      fps = 0;
      time = currentTime;
      one_second = false;
    }

}
