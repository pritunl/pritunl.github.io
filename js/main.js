jQuery(document).ready(function($) {
  var $window = $(window);
  var $promoBg = $('.promo-background-color');
  var $promoImg = $('.promo-background-img');
  var $body = $('body');
  var $api = $('#api');
  var $apiCallList = $('.api-call-list-box');
  var $zone0 = $('.promo');
  var $zone1 = $('.feature-simple .feature-before');
  var $zone2 = $('.feature-dis .feature-glow');
  var $zone3 = $('.screenshots');
  var zoneEnabled0 = false;
  var zoneEnabled1 = false;
  var zoneEnabled2 = false;
  var zoneEnabled3 = false;
  var curX;
  var curY;
  var randTheme = 'theme' + Math.floor((Math.random() * 3)).toString();

  $promoBg.removeClass('theme0');
  $promoBg.addClass(randTheme);
  $promoImg.removeClass('theme0');
  $promoImg.addClass(randTheme);

  $body.mousemove(function(evt) {
    var x = Math.round(20 * evt.clientX / $window.width() - 10);
    var y = Math.round(20 * evt.clientY / $window.height() - 10);

    if (curX == x && curY == y) {
      return;
    }
    curX = x;
    curY = y;

    $promoImg.css('transform',
      'matrix(1.05, 0, 0, 1.05, ' + x + ', ' + y + ')');
  });

  $('a.scrollto').on('click', function(evt){
    var target = this.hash;
    if (!$(target).length) {
      return;
    }

    evt.preventDefault();
    $body.stop(true);
    $body.scrollTo(target, 800, {}, {easing: 'easeOutQuad'});

    var $navbarCollapse = $('.navbar-collapse');

    if ($navbarCollapse.hasClass('in')) {
      $navbarCollapse.removeClass('in').addClass('collapse');
    }
	});

  $('.navbar-toggle').on('click', function(evt) {
    var scrollTop = $(window).scrollTop();
    if ($('.navbar-collapse').hasClass('in') &&
        scrollTop <= 0 && $('.promo').length) {
      $('.header').addClass('header-top');
    }
    else {
      $('.header').removeClass('header-top');
    }
  });

  $('a[href^="#"]').on('click', function(evt) {
      evt.preventDefault();
      $('html, body').stop().animate({
          'scrollTop': $(this.hash).offset().top - 10
      }, 750, 'swing', function() {
          window.location.hash = this.hash;
      }.bind(this));
  });

  $(document).on('dblclick mousedown', '.no-select', false);

  $('.editor').show();
  $('.editor.python').each(function(index, element) {
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
  $('.editor.bash').each(function(index, element) {
    var editor = ace.edit(element);
    editor.setTheme('ace/theme/tomorrow_night');
    editor.setFontSize(16);
    editor.setReadOnly(true);
    editor.setShowPrintMargin(false);
    editor.setHighlightActiveLine(false);
    editor.setShowFoldWidgets(false);
    editor.renderer.setShowGutter(false);
    editor.getSession().setMode('ace/mode/sh');
    $(element).css('height', editor.getSession().getScreenLength() *
      editor.renderer.lineHeight + 24);
    $(editor.renderer.scroller).css('margin-top', '10px');
    $(editor.renderer.scroller).css('margin-left', '10px');
  });

  $('.tutorial-button button.btn').click(function(evt) {
    $(this).parent().siblings().find('.btn').removeClass('active');
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
            '.android-client-instructions'
          ];
        }
        pages.splice(pages.indexOf(page), 1);
        $(pages.join(', ')).hide();
        $(page).show();
        $(group).fadeIn(450);
      });
    };
    if ($(this).hasClass('digital-ocean')) {
      changeInstructions('.vps-instructions',
        '.digital-ocean-instructions');
    }
    else if ($(this).hasClass('linode')) {
      changeInstructions('.vps-instructions',
        '.linode-instructions');
    }
    else if ($(this).hasClass('amazon-aws')) {
      changeInstructions('.vps-instructions',
        '.amazon-aws-instructions');
    }
    else if ($(this).hasClass('ubuntu')) {
      changeInstructions('.distro-instructions',
        '.ubuntu-instructions');
    }
    else if ($(this).hasClass('arch')) {
      changeInstructions('.distro-instructions',
        '.arch-instructions');
    }
    else if ($(this).hasClass('centos')) {
      changeInstructions('.distro-instructions',
        '.centos-instructions');
    }
    else if ($(this).hasClass('ubuntu-client')) {
      changeInstructions('.client-instructions',
        '.ubuntu-client-instructions');
    }
    else if ($(this).hasClass('windows-client')) {
      changeInstructions('.client-instructions',
        '.windows-client-instructions');
    }
    else if ($(this).hasClass('android-client')) {
      changeInstructions('.client-instructions',
        '.android-client-instructions');
    }
  });

  (function() {
    var element;
    var $element;
    var elements = {
      '.header': null,
      '.header h1.logo .logo-title': null,
      '.header .main-nav button': null,
      '.header.header-top .main-nav button .icon-bar': null,
      '.header .main-nav .nav .nav-item a': null,
      '.header.header-top .navbar-collapse': null,
      '.header .twitter-logo': null,
      '.header .github-logo': null
    };
    for (element in elements) {
      $element = $(element);

      elements[element] = [
        $element.css('-webkit-transition'),
        $element.css('transition')
      ];
      $element.css('-webkit-transition', 'none');
      $element.css('transition', 'none');
    }
    setTimeout(function() {
      for (element in elements) {
        $element = $(element);
        $element.css('-webkit-transition', elements[element][0]);
        $element.css('transition', elements[element][1]);
        elements[element] = null;
      }
    }, 500);
  })();

  var inView = function($elem) {
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return (
      ((elemBottom <= docViewBottom) && (elemBottom >= docViewTop)) ||
      ((elemTop <= docViewBottom) && (elemTop >= docViewTop))
    );
  };

  var onScroll = function() {
    var scrollTop = $(this).scrollTop();

    if (scrollTop <= 0 && $('.promo').length &&
        !$('.navbar-collapse').hasClass('in')) {
      $('.header').addClass('header-top');
    }
    else if ($('.header').css('position') !== 'absolute') {
      $('.header').removeClass('header-top');
    }

    zoneEnabled0 = inView($zone0);
    zoneEnabled1 = inView($zone1);
    zoneEnabled2 = inView($zone2);
    zoneEnabled3 = inView($zone3);

    if ($api.length) {
      if (scrollTop >= $api.offset().top + 99) {
        $apiCallList.css('position', 'fixed');
        $apiCallList.css('top', '71px');
      }
      else {
        $apiCallList.css('position', 'absolute');
        $apiCallList.css('top', 'auto');
      }
    }
  }
  $(window).scroll(onScroll);
  onScroll();

  $('.label').tooltip();

  $('.server-region').click(function(evt) {
    var $serverRegion = $('.server-region');
    $serverRegion.addClass('btn-default');
    $serverRegion.removeClass('btn-primary');
    $(evt.target).addClass('btn-primary');
  });



  var loaderUrl = 'https://pritunl-loader.herokuapp.com';
  var id = null;
  var updateData = function(message, type, region, noAnimate, buttonState) {
    var $serverAlert = $('.server-alert');
    var $serverRegion = $('.server-region');
    var $serverRegionSel = $('.server-' + region);
    var $apiKey = $('.api-key-container');

    if (buttonState == undefined) {
      buttonState = true;
    }

    if (region && !$serverRegionSel.hasClass('btn-primary')) {
      $serverRegion.addClass('btn-default');
      $serverRegion.removeClass('btn-primary');
      $serverRegionSel.addClass('btn-primary');
    }

    $serverAlert.removeClass('alert-success alert-warning alert-danger');
    $serverAlert.addClass(type);
    if (message) {
      $serverAlert.html(message);
    }
    if (buttonState) {
      $('.server-region, .server-create').removeAttr('disabled');
    }
    else {
      $('.server-region, .server-create').attr('disabled', 'disabled');
    }
    if (noAnimate) {
      if (buttonState) {
        $apiKey.show();
      }
      else {
        $apiKey.hide();
      }
      if (message) {
        $serverAlert.show();
      }
      else {
        $serverAlert.hide();
      }
    }
    else {
      if (buttonState) {
        $apiKey.slideDown(250);
      }
      else {
        $apiKey.slideUp(250);
      }
      if (message) {
        $serverAlert.slideDown(250);
      }
      else {
        $serverAlert.slideUp(250);
      }
    }
  };
  var updateDataPending = function(region, noAnimate) {
    updateData('Pritunl droplet is being created, please ' +
        'allow several minutes for this to complete. You may leave or ' +
        'reload the page while the droplet is being created.',
        'alert-warning', region, noAnimate, false);
  };
  var poll = function() {
    $.ajax(loaderUrl + '/poll' + (id ? '/' + id : ''), {
      success: function(data) {
        id = data.id;
        if (data.status) {
          poll();
        }
        else if (data.error) {
          updateData(data.error, 'alert-danger', data.region);
        }
        else if (data.success) {
          updateData(data.success, 'alert-success', data.region);
        }
      },
      error: function(data) {
        setTimeout(function() {
          poll();
        }, 3000);
      }
    });
  };

  if (document.URL.indexOf('error=oad') !== -1) {
    updateData('Automated install was unable to get permission to ' +
      'create server, please try again.', 'alert-danger', null, true, true);
  }
  else if (document.URL.indexOf('error=err') !== -1) {
    updateData('Automated install was unable to create server, ' +
      'please try again later.', 'alert-danger', null, true, true);
  }

  $('.server-create').click(function() {
    var region;
    $('.server-region, .server-create').attr('disabled', 'disabled');

    if ($('.server-sfo1').hasClass('btn-primary')) {
      region = 'sfo1';
    }
    else if ($('.server-nyc3').hasClass('btn-primary')) {
      region = 'nyc3';
    }
    else if ($('.server-ams3').hasClass('btn-primary')) {
      region = 'ams3';
    }
    else if ($('.server-sgp1').hasClass('btn-primary')) {
      region = 'sgp1';
    }
    else if ($('.server-lon1').hasClass('btn-primary')) {
      region = 'lon1';
    }

    $.ajax(loaderUrl + '/loader' + (id ? '/' + id : ''), {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        region: region
      }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(data) {
        window.location.replace(data.oauth_url);
      },
      error: function(xhr) {
        var data = xhr.responseJSON || {};
        updateData('Automated install is currently unavailable, please ' +
          'try again later.', 'alert-danger', data.region, true, false);
      }
    });
  });

  var sliderCur = 0;
  var sliderUsed = false;
  var sliderLeft = function(clicked) {
    if (clicked) {
      sliderUsed = true;
    }
    if (sliderCur <= 0) {
      sliderCur = 5;
      $('.slider').css('left', '-50%');
      setTimeout(function() {
        $('.slider').css('left', '-600%');
      }, 700);
    }
    else {
      sliderCur -= 1;
      $('.slider').css('left', ((sliderCur * -100) - 100) + '%');
    }
  };
  var sliderRight = function(clicked) {
    if (clicked) {
      sliderUsed = true;
    }
    if (sliderCur >= 5) {
      sliderCur = 0;
      $('.slider').css('left', '-650%');
      setTimeout(function() {
        $('.slider').css('left', '-100%');
      }, 700);
    }
    else {
      sliderCur += 1;
      $('.slider').css('left', ((sliderCur * -100) - 100) + '%');
    }
  };
  $('.slider-box .left').click(function() {
    sliderLeft(true);
  });
  $('.slider-box .right').click(function() {
    sliderRight(true);
  });
  $(document).on('keyup', function(evt) {
    if (evt.which === 37) {
      sliderLeft(true);
    }
    else if (evt.which === 39) {
      sliderRight(true);
    }
  });

  var sliderAuto = function() {
    if (!zoneEnabled3) {
      setTimeout(sliderAuto, 50);
      return;
    }

    setTimeout(function() {
      if (sliderUsed) {
        sliderUsed = false;
        setTimeout(sliderAuto, 15000);
      }
      else {
        sliderRight();
        sliderAuto();
      }
    }, 3000);
  };
  sliderAuto();

  $.ajax(loaderUrl + '/loader' + (id ? '/' + id : ''), {
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    success: function(data) {
      id = data.id;
      if (data.status) {
        updateDataPending(data.region, data.cookies, true);
        poll();
      }
      else if (data.error) {
        updateData(data.error, 'alert-danger', data.region, true);
      }
      else if (data.success) {
        updateData(data.success, 'alert-success', data.region, true);
      }
    },
    error: function(xhr) {
      var data = xhr.responseJSON || {};
      updateData('Automated install is currently unavailable, please ' +
        'try again later.', 'alert-danger', data.region, true, false);
    }
  });



  var changeTheme = function() {
    if (!zoneEnabled0) {
      setTimeout(changeTheme, 50);
      return;
    }

    if ($promoBg.hasClass('theme0')) {
      $promoBg.addClass('theme-trans');
      $('.promo-background-img').addClass('theme-trans');
      setTimeout(function() {
        $promoBg.removeClass('theme-trans theme0');
        $promoBg.addClass('theme1');
        $promoImg.removeClass('theme-trans theme0');
        $promoImg.addClass('theme1');
      }, 1000);
    }
    else if ($promoBg.hasClass('theme1')) {
      $promoBg.addClass('theme-trans');
      $promoImg.addClass('theme-trans');
      setTimeout(function() {
        $promoBg.removeClass('theme-trans theme1');
        $promoBg.addClass('theme2');
        $promoImg.removeClass('theme-trans theme1');
        $promoImg.addClass('theme2');
      }, 1000);
    }
    else if ($promoBg.hasClass('theme2')) {
      $promoBg.addClass('theme-trans');
      $promoImg.addClass('theme-trans');
      setTimeout(function() {
        $promoBg.removeClass('theme-trans theme2');
        $promoBg.addClass('theme0');
        $promoImg.removeClass('theme-trans theme2');
        $promoImg.addClass('theme0');
      }, 1000);
    }
    setTimeout(changeTheme, 8000);
  };
  setTimeout(changeTheme, 6000);

  var diagram3GlowOn = function() {
    if (!zoneEnabled0) {
      setTimeout(diagram3GlowOn, 50);
      return;
    }

    setTimeout(diagram3GlowOff, 750);

    $('.diagram-3 .part-0-glow').css('opacity', '1');
    setTimeout(function() {
      $('.diagram-3 .part-1-glow').css('opacity', '1');
      setTimeout(function() {
        $('.diagram-3 .part-2-glow').css('opacity', '1');
        setTimeout(function() {
          $('.diagram-3 .part-3-glow').css('opacity', '1');
          setTimeout(function() {
            $('.diagram-3 .part-4-glow').css('opacity', '1');
          }, 250);
        }, 250);
      }, 250);
    }, 250);
  };
  var diagram3GlowOff = function() {
    if (!zoneEnabled0) {
      setTimeout(diagram3GlowOff, 50);
      return;
    }

    $('.diagram-3 .part-0-glow').css('opacity', '0');
    setTimeout(function() {
      $('.diagram-3 .part-1-glow').css('opacity', '0');
      setTimeout(function() {
        $('.diagram-3 .part-2-glow').css('opacity', '0');
        setTimeout(function() {
          $('.diagram-3 .part-3-glow').css('opacity', '0');
          setTimeout(function() {
            $('.diagram-3 .part-4-glow').css('opacity', '0');
            setTimeout(diagram3GlowOn, 1000);
          }, 250);
        }, 250);
      }, 250);
    }, 250);
  };
  setTimeout(function() {
    setTimeout(function() {
      $('.diagram-3 .part-0').css('opacity', '1');
    }, 0);
    setTimeout(function() {
      $('.diagram-3 .part-1').css('opacity', '1');
    }, 250);
    setTimeout(function() {
      $('.diagram-3 .part-2').css('opacity', '1');
    }, 500);
    setTimeout(function() {
      $('.diagram-3 .part-3').css('opacity', '1');
    }, 1000);
    setTimeout(function() {
      $('.diagram-3 .part-4').css('opacity', '1');
    }, 1500);

    setTimeout(function() {
      diagram3GlowOn();
    }, 2500);
  }, 500);

  var featureSimpleGlowOn = function() {
    if (!zoneEnabled1) {
      setTimeout(featureSimpleGlowOn, 50);
      return;
    }

    $('.feature-simple .feature-after').css('opacity', '1');
    setTimeout(featureSimpleGlowOff, 6000);
  };
  var featureSimpleGlowOff = function() {
    if (!zoneEnabled1) {
      setTimeout(featureSimpleGlowOff, 50);
      return;
    }

    $('.feature-simple .feature-after').css('opacity', '0');
    setTimeout(featureSimpleGlowOn, 3000);
  };
  setTimeout(featureSimpleGlowOn, 500);

  var featureDisGlowOn = function() {
    if (!zoneEnabled2) {
      setTimeout(featureDisGlowOn, 50);
      return;
    }

    $('.feature-dis .feature-preglow').css('opacity', '1');
    setTimeout(function() {
      $('.feature-dis .feature-glow').css('opacity', '1');
      setTimeout(featureDisGlowOff, 4000);
    }, 3000);
  };
  var featureDisGlowOff = function() {
    if (!zoneEnabled2) {
      setTimeout(featureDisGlowOff, 50);
      return;
    }

    $('.feature-dis .feature-glow').addClass('fast');
    $('.feature-dis .feature-preglow').addClass('fast');
    setTimeout(function() {
      $('.feature-dis .feature-preglow').css('opacity', '0');
      $('.feature-dis .feature-glow').css('opacity', '0');
      setTimeout(function() {
        $('.feature-dis .feature-glow').removeClass('fast');
        $('.feature-dis .feature-preglow').removeClass('fast');
        setTimeout(featureDisGlowOn, 500);
      }, 1500);
    }, 500);
  };
  setTimeout(featureDisGlowOn, 500);
});
