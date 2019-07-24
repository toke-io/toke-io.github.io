window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Tokeio(values) {
  this.interim_color = values[0]["value"];
  this.prepare_color = values[1]["value"];
  this.hit_color = values[2]["value"];
  this.time_between_min = parseFloat(values[3]["value"]*60);
  this.time_between_max = parseFloat(values[4]["value"]*60);
  this.hit_duration_min = parseFloat(values[5]["value"]);
  this.hit_duration_max = parseFloat(values[6]["value"]);
  this.prepare_time = values[7]["value"];
  this.re_hit_chance = parseFloat(values[8]["value"]/100);

  this.current_mode = "";
  this.next_mode = "interim";
  this.mode_start = 0;
  this.mode_duration = 0;
  this.mode_end = 0;
}

Tokeio.prototype.start = function() {
  $("#content").remove();
  this.change_mode();
}


Tokeio.prototype.loop = function() {
  requestAnimFrame(this.loop.bind(this));
  var currentTime = new Date();
  $("span.time-left, #message h1").html(this._time_left_str(currentTime));

  if(currentTime.getTime() > this.mode_end) {
    this.change_mode();
  }
}

Tokeio.prototype.change_mode = function() {
  this.current_mode = this.next_mode;
  this.mode_start = (new Date().getTime());
  this.mode_duration = this._gen_mode_duration(this.current_mode);
  this.mode_end = (this.mode_start + this.mode_duration);

  switch(this.current_mode) {
    case "interim":
      $("#message h2, #message h1").empty().hide();
      $("body").css("background-color", this.interim_color);
      this.next_mode = "prepare"; break;
    case "prepare":
      $("#message, #message h2, #message h1").show();
      $("body").css("background-color", this.prepare_color);
      this.next_mode = "hit"; break;
    case "hit":
      $("body").css("background-color", this.hit_color);
      if (Math.random() < this.re_hit_chance) {
        this.next_mode = "prepare";
        $("#message h2").html("Re-hit!");
      } else {
        this.next_mode = "interim";
      }
      break;
  }
}

Tokeio.prototype._gen_mode_duration = function(mode) {
  switch(mode) {
    case "interim":
      return(1000*(Math.random() * (this.time_between_min - this.time_between_max) + this.time_between_max));
      break;
    case "hit":
      return(1000*(Math.random() * (this.hit_duration_min - this.hit_duration_max) + this.hit_duration_max));
      break;
    case "prepare":
      return(1000*this.prepare_time); break;
  }
}

Tokeio.prototype._time_left_str = function(currentTime) {
  var timeLeft = new Date(this.mode_end - currentTime);
  var ret = "";
  ret += ('0'+timeLeft.getMinutes()).substr(-2) + ":";
  ret += ('0'+timeLeft.getSeconds()).substr(-2) + ".";
  return ret += ('00' + timeLeft.getMilliseconds()).slice(-3);
}
