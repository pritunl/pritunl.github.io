$('[data-toggle="tooltip"]').tooltip();

$(window).scroll(function(evt) {
  var scrollTop = $(this).scrollTop();

  if (scrollTop >= $('#api').offset().top) {
    $('.navbar-brand').removeClass('blue green red purple orange');
    $('.navbar-brand').addClass('pink');
  }
  else if (scrollTop >= $('#faq').offset().top) {
    $('.navbar-brand').removeClass('blue green red purple pink');
    $('.navbar-brand').addClass('orange');
  }
  else if (scrollTop >= $('#install').offset().top) {
    $('.navbar-brand').removeClass('blue green red orange pink');
    $('.navbar-brand').addClass('purple');
  }
  else if (scrollTop >= $('#screenshots').offset().top) {
    $('.navbar-brand').removeClass('blue green purple orange pink');
    $('.navbar-brand').addClass('red');
  }
  else if (scrollTop >= $('#features').offset().top) {
    $('.navbar-brand').removeClass('blue red purple orange pink');
    $('.navbar-brand').addClass('green');
  }
  else {
    $('.navbar-brand').removeClass('green red purple orange pink');
    $('.navbar-brand').addClass('blue');
  }
});

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
    if (screenshot > 5) {
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
  else if ($(evt.target).hasClass('screenshot5')) {
    screenshot = '5';
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
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  var changeInstructions = function(group, page) {
    $(group).fadeOut(450, function() {
      var pages;
      if (group === '.vps-instructions') {
        pages = [
          '.digital-ocean-instructions',
          '.linode-instructions',
          '.amazon-aws-instructions'
        ];
      }
      else if (group === '.distro-instructions') {
        pages = [
          '.ubuntu-instructions',
          '.arch-instructions',
          '.centos-instructions'
        ];
      }
      else {
        pages = [
          '.ubuntu-client-instructions',
          '.windows-client-instructions',
          '.osx-client-instructions'
        ];
      }
      pages.splice(pages.indexOf(page), 1);
      $(pages.join(', ')).hide();
      $(page).show();
      $(group).fadeIn(450);
    });
  };
  if ($(this).hasClass('digital-ocean')) {
    changeInstructions('.vps-instructions', '.digital-ocean-instructions');
  }
  else if ($(this).hasClass('linode')) {
    changeInstructions('.vps-instructions', '.linode-instructions');
  }
  else if ($(this).hasClass('amazon-aws')) {
    changeInstructions('.vps-instructions', '.amazon-aws-instructions');
  }
  else if ($(this).hasClass('ubuntu')) {
    changeInstructions('.distro-instructions', '.ubuntu-instructions');
  }
  else if ($(this).hasClass('arch')) {
    changeInstructions('.distro-instructions', '.arch-instructions');
  }
  else if ($(this).hasClass('centos')) {
    changeInstructions('.distro-instructions', '.centos-instructions');
  }
  else if ($(this).hasClass('ubuntu-client')) {
    changeInstructions('.client-instructions', '.ubuntu-client-instructions');
  }
  else if ($(this).hasClass('windows-client')) {
    changeInstructions('.client-instructions', '.windows-client-instructions');
  }
  else if ($(this).hasClass('osx-client')) {
    changeInstructions('.client-instructions', '.osx-client-instructions');
  }
});

$('.editor').show();
$('.editor').each(function(index, element) {
  var editor = ace.edit(element);
  editor.setTheme('ace/theme/tomorrow_night');
  editor.setReadOnly(true);
  editor.setShowPrintMargin(false);
  editor.setHighlightActiveLine(false);
  editor.setHighlightGutterLine(false);
  editor.setShowFoldWidgets(false);
  editor.getSession().setMode('ace/mode/python');
  $(element).css('height', editor.getSession().getScreenLength() *
    editor.renderer.lineHeight + 2);
});
