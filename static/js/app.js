// To-do:
//   - cookie/session support
//   - hit graphics?
//   - make color selection less ugly

$(document).ready(function() {
  $('.sidenav').sidenav();
  $('.tooltipped').tooltip();

  $(".sidenav .join-room").click(function(e) {
    $(this).find(".row").show();
  });

  var betweenSlider = document.getElementById('time-between-hits-slider');
  var hitSlider = document.getElementById('hit-duration-slider');
  var prepareSlider = document.getElementById('prepare-duration-slider');
  var reHitSlider = document.getElementById('re-hit-slider');

  noUiSlider.create(betweenSlider, {
    start: [5.0, 8.0],
    connect: true,
    step: .5,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
      'min': .5,
      'max': 10
    },
    format: wNumb({
      decimals: 1
    })
  });

  noUiSlider.create(hitSlider, {
    start: [3.0, 6.0],
    connect: true,
    step: .5,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
      'min': 1,
      'max': 15
    },
    format: wNumb({
      decimals: 1
    })
  });

  noUiSlider.create(prepareSlider, {
    start: 5,
    // connect: true,
    step: 1,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
      'min': 1,
      'max': 15
    },
    format: wNumb({
      decimals: 0
    })
  });

  noUiSlider.create(reHitSlider, {
    start: 0,
    // connect: true,
    step: 5,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
      'min': 0,
      'max': 100
    },
    format: wNumb({
      decimals: 0
    })
  });

  $('form#settings').on('submit', function(e) {
    e.preventDefault();

    var values = $(this).serializeArray();

    values.push(
      {name: "time-between-min", value: betweenSlider.noUiSlider.get()[0]},
      {name: "time-between-max", value: betweenSlider.noUiSlider.get()[1]},
      {name: "hit-duration-min", value: hitSlider.noUiSlider.get()[0]},
      {name: "hit-duration-min", value: hitSlider.noUiSlider.get()[1]},
      {name: "prepare-time", value: prepareSlider.noUiSlider.get()},
      {name: "re-hit-chance", value: reHitSlider.noUiSlider.get()}
    );

    console.log(values);

    window.tokeio = new Tokeio(values);
    window.tokeio.start();
    window.tokeio.loop();
  });
});
