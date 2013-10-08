$('[data-toggle="tooltip"]').tooltip();

$('a[href^="#"]').on('click', function(evt) {
    evt.preventDefault();
    $('html, body').stop().animate({
        'scrollTop': $(this.hash).offset().top
    }, 750, 'swing', function() {
        window.location.hash = this.hash;
    }.bind(this));
});

$('.intro-screenshots .button, .intro-screenshots img').click(function(evt) {
  var screenshot;
  var curScreenshot = $('.intro-screenshots img.current').attr(
    'src').substr(14, 1);

  if ($(evt.target).is('img')) {
    screenshot = parseInt(curScreenshot, 10) + 1;
    if (screenshot > 4) {
      screenshot = 1;
    }
    screenshot = screenshot.toString();
  }
  else if ($(evt.target).hasClass('screenshot1')) {
    screenshot = '1';
  }
  else if ($(evt.target).hasClass('screenshot2')) {
    screenshot = '2';
  }
  else if ($(evt.target).hasClass('screenshot3')) {
    screenshot = '3';
  }
  else if ($(evt.target).hasClass('screenshot4')) {
    screenshot = '4';
  }

  if (!screenshot || screenshot === curScreenshot) {
    return;
  }

  $('.intro-screenshots .button.current').removeClass('current');
  $('.intro-screenshots .button.screenshot' + screenshot).addClass('current');

  $('.intro-screenshots img.current').removeClass('current');
  $('.intro-screenshots img.screenshot' + screenshot).addClass('current');
});

$('.install-buttons button').click(function(evt) {
  $('.install-buttons button').removeClass('active');
  $(this).addClass('active');
  var changeInstructions = function(page) {
    $('.instructions').fadeOut(450, function() {
      var pages = [
        '.digital-ocean-instructions',
        '.linode-instructions',
        '.amazon-aws-instructions'
      ];
      pages.splice(pages.indexOf(page), 1);
      $(pages.join(', ')).hide();
      $(page).show();
      $('.instructions').fadeIn(450);
    });
  };
  if ($(this).hasClass('digital-ocean')) {
    changeInstructions('.digital-ocean-instructions');
  }
  else if ($(this).hasClass('linode')) {
    changeInstructions('.linode-instructions');
  }
  else if ($(this).hasClass('amazon-aws')) {
    changeInstructions('.amazon-aws-instructions');
  }
});
