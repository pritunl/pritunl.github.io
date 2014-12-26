jQuery(document).ready(function($) {
  var randTheme = 'theme' + Math.floor(
    (Math.random() * ((3) - 0)) + 0).toString();

  // $('.promo-background-color').removeClass('theme0');
  // $('.promo-background-color').addClass(randTheme);
  // $('.promo-background-img').removeClass('theme0');
  // $('.promo-background-img').addClass(randTheme);

  $('a.scrollto').on('click', function(evt){
    var target = this.hash;
    if (!$(target).length) {
      return;
    }
    evt.preventDefault();
    $('body').stop(true);
    $('body').scrollTo(target, 800, {}, {easing: 'easeOutQuad'});
    if ($('.navbar-collapse').hasClass('in')) {
      $('.navbar-collapse').removeClass('in').addClass('collapse');
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
    else if ($(this).hasClass('android-client')) {
      changeInstructions('.client-instructions', '.android-client-instructions');
    }
  });

  (function() {
    var element;
    var elements = {
      '.header': null,
      '.header h1.logo .logo-title': null,
      '.header .main-nav button': null,
      '.header.header-top .main-nav button .icon-bar': null,
      '.header .main-nav .nav .nav-item a': null,
      '.header.header-top .navbar-collapse': null,
      '.header .twitter-logo': null,
      '.header .github-logo': null
    }
    for (element in elements) {
      elements[element] = [
        $(element).css('-webkit-transition'),
        $(element).css('transition')
      ];
      $(element).css('-webkit-transition', 'none');
      $(element).css('transition', 'none');
    }
    setTimeout(function() {
      for (element in elements) {
        $(element).css('-webkit-transition', elements[element][0]);
        $(element).css('transition', elements[element][1]);
        elements[element] = null;
      }
    }, 500);
  })();

  var onScroll = function() {
    var scrollTop = $(this).scrollTop();

    if (scrollTop <= 0 && $('.promo').length &&
        !$('.navbar-collapse').hasClass('in')) {
      $('.header').addClass('header-top');
    }
    else if ($('.header').css('position') !== 'absolute') {
      $('.header').removeClass('header-top');
    }

    if ($('#api').length) {
      if (scrollTop >= $('#api').offset().top + 99) {
        $('.api-call-list-box').css('position', 'fixed');
        $('.api-call-list-box').css('top', '71px');
      }
      else {
        $('.api-call-list-box').css('position', 'absolute');
        $('.api-call-list-box').css('top', 'auto');
      }
    }
  }
  $(window).scroll(onScroll);
  onScroll();
  $('.label').tooltip();

  $('.server-region').click(function(evt) {
    $('.server-region').addClass('btn-default');
    $('.server-region').removeClass('btn-primary');
    $(evt.target).addClass('btn-primary');
  });

  var loaderUrl = 'https://pritunl-loader.herokuapp.com';
  var id = null;
  var updateData = function(message, type, region, noAnimate, buttonState) {
    if (buttonState == undefined) {
      buttonState = true;
    }

    if (region && !$('.server-' + region).hasClass('btn-primary')) {
      $('.server-region').addClass('btn-default');
      $('.server-region').removeClass('btn-primary');
      $('.server-' + region).addClass('btn-primary');
    }

    $('.server-alert').removeClass('alert-success alert-warning alert-danger');
    $('.server-alert').addClass(type);
    if (message) {
      $('.server-alert').html(message);
    }
    if (buttonState) {
      $('.server-region, .server-create').removeAttr('disabled');
    }
    else {
      $('.server-region, .server-create').attr('disabled', 'disabled');
    }
    if (noAnimate) {
      if (buttonState) {
        $('.api-key-container').show();
      }
      else {
        $('.api-key-container').hide();
      }
      if (message) {
        $('.server-alert').show();
      }
      else {
        $('.server-alert').hide();
      }
    }
    else {
      if (buttonState) {
        $('.api-key-container').slideDown(250);
      }
      else {
        $('.api-key-container').slideUp(250);
      }
      if (message) {
        $('.server-alert').slideDown(250);
      }
      else {
        $('.server-alert').slideUp(250);
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
      sliderLeft();
    }
    else if (evt.which === 39) {
      sliderRight();
    }
  });

  var sliderAuto = function() {
    setTimeout(function() {
      if (sliderUsed) {
        sliderUsed = false;
        setTimeout(sliderAuto, 8000);
      }
      else {
        sliderRight();
        sliderAuto();
      }
    }, 3000);
  }
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
    if ($('.promo-background-color').hasClass('theme0')) {
      $('.promo-background-color').addClass('theme-trans');
      $('.promo-background-img').addClass('theme-trans');
      setTimeout(function() {
        $('.promo-background-color').removeClass('theme-trans theme0');
        $('.promo-background-color').addClass('theme1');
        $('.promo-background-img').removeClass('theme-trans theme0');
        $('.promo-background-img').addClass('theme1');
      }, 1000);
    }
    else if ($('.promo-background-color').hasClass('theme1')) {
      $('.promo-background-color').addClass('theme-trans');
      $('.promo-background-img').addClass('theme-trans');
      setTimeout(function() {
        $('.promo-background-color').removeClass('theme-trans theme1');
        $('.promo-background-color').addClass('theme2');
        $('.promo-background-img').removeClass('theme-trans theme1');
        $('.promo-background-img').addClass('theme2');
      }, 1000);
    }
    else if ($('.promo-background-color').hasClass('theme2')) {
      $('.promo-background-color').addClass('theme-trans');
      $('.promo-background-img').addClass('theme-trans');
      setTimeout(function() {
        $('.promo-background-color').removeClass('theme-trans theme2');
        $('.promo-background-color').addClass('theme0');
        $('.promo-background-img').removeClass('theme-trans theme2');
        $('.promo-background-img').addClass('theme0');
      }, 1000);
    }
    setTimeout(changeTheme, 8000);
  };
  //setTimeout(changeTheme, 6000);

  var diagram3GlowReady = false;
  var diagram3GlowEnabled = true;
  var diagram3GlowOn = function() {
    setTimeout(diagram3GlowOff, 750);
    if (!diagram3GlowEnabled) {
      return;
    }

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
    if (!diagram3GlowEnabled) {
      setTimeout(diagram3GlowOn, 1000);
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
      diagram3GlowReady = true;
      diagram3GlowOn();
    }, 2500);
  }, 500);

  var featureDisGlowOn = function() {
    $('.feature-dis .feature-preglow').css('opacity', '1');
    setTimeout(function() {
      $('.feature-dis .feature-glow').css('opacity', '1');
      setTimeout(featureDisGlowOff, 4000);
    }, 3000);
  };
  var featureDisGlowOff = function() {
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

  var featureSimpleGlowOn = function() {
    $('.feature-simple .feature-after').css('opacity', '1');
    setTimeout(featureSimpleGlowOff, 6000);
  };
  var featureSimpleGlowOff = function() {
    $('.feature-simple .feature-after').css('opacity', '0');
    setTimeout(featureSimpleGlowOn, 3000);
  };
  setTimeout(featureSimpleGlowOn, 500);

  // $('.diagram-3').on('mouseenter', function(evt) {
  //   diagram3GlowEnabled = false;
  // });

  // $('.diagram-3').on('mouseleave', function(evt) {
  //   diagram3GlowEnabled = true;
  // });

  // $('.diagram-3').on('mousemove', function(evt) {
  //   if (!diagram3GlowReady) {
  //     return;
  //   }

  //   var thisElm = $(this);
  //   var parentOffset = thisElm.parent().offset();
  //   var x = evt.pageX - parentOffset.left;
  //   var y = evt.pageY - parentOffset.top;
  //   var width = thisElm.width();
  //   var height = width / 2;
  //   var xPer = x / width;
  //   var yPer = y / height;

  //   if (xPer < 0.29 && yPer < 0.39) {
  //     $('.diagram-3 .part-0-glow').css('opacity', '0');
  //     $('.diagram-3 .part-1-glow').css('opacity', '0');
  //     $('.diagram-3 .part-2-glow').css('opacity', '0');
  //     $('.diagram-3 .part-3-glow').css('opacity', '0');
  //     $('.diagram-3 .part-4-glow').css('opacity', '0');
  //   }
  //   else if (xPer < 0.29 && yPer < 0.84) {
  //     $('.diagram-3 .part-0-glow').css('opacity', '1');
  //     $('.diagram-3 .part-1-glow').css('opacity', '0');
  //     $('.diagram-3 .part-2-glow').css('opacity', '0');
  //     $('.diagram-3 .part-3-glow').css('opacity', '0');
  //     $('.diagram-3 .part-4-glow').css('opacity', '0');
  //   }
  //   else if (xPer < 0.38) {
  //     $('.diagram-3 .part-0-glow').css('opacity', '0');
  //     $('.diagram-3 .part-1-glow').css('opacity', '1');
  //     $('.diagram-3 .part-2-glow').css('opacity', '0');
  //     $('.diagram-3 .part-3-glow').css('opacity', '0');
  //     $('.diagram-3 .part-4-glow').css('opacity', '0');
  //   }
  //   else if (xPer < 0.63 && yPer < 0.34) {
  //     $('.diagram-3 .part-0-glow').css('opacity', '0');
  //     $('.diagram-3 .part-1-glow').css('opacity', '1');
  //     $('.diagram-3 .part-2-glow').css('opacity', '0');
  //     $('.diagram-3 .part-3-glow').css('opacity', '0');
  //     $('.diagram-3 .part-4-glow').css('opacity', '0');
  //   }
  //   else if (xPer < 0.63 && yPer < 0.78) {
  //     $('.diagram-3 .part-0-glow').css('opacity', '0');
  //     $('.diagram-3 .part-1-glow').css('opacity', '0');
  //     $('.diagram-3 .part-2-glow').css('opacity', '1');
  //     $('.diagram-3 .part-3-glow').css('opacity', '0');
  //     $('.diagram-3 .part-4-glow').css('opacity', '0');
  //   }
  //   else if (xPer < 0.73) {
  //     $('.diagram-3 .part-0-glow').css('opacity', '0');
  //     $('.diagram-3 .part-1-glow').css('opacity', '0');
  //     $('.diagram-3 .part-2-glow').css('opacity', '0');
  //     $('.diagram-3 .part-3-glow').css('opacity', '1');
  //     $('.diagram-3 .part-4-glow').css('opacity', '0');
  //   }
  //   else if (yPer < 0.27) {
  //     $('.diagram-3 .part-0-glow').css('opacity', '0');
  //     $('.diagram-3 .part-1-glow').css('opacity', '0');
  //     $('.diagram-3 .part-2-glow').css('opacity', '0');
  //     $('.diagram-3 .part-3-glow').css('opacity', '1');
  //     $('.diagram-3 .part-4-glow').css('opacity', '0');
  //   }
  //   else if (yPer < 0.71) {
  //     $('.diagram-3 .part-0-glow').css('opacity', '0');
  //     $('.diagram-3 .part-1-glow').css('opacity', '0');
  //     $('.diagram-3 .part-2-glow').css('opacity', '0');
  //     $('.diagram-3 .part-3-glow').css('opacity', '0');
  //     $('.diagram-3 .part-4-glow').css('opacity', '1');
  //   }
  //   else {
  //     $('.diagram-3 .part-0-glow').css('opacity', '0');
  //     $('.diagram-3 .part-1-glow').css('opacity', '0');
  //     $('.diagram-3 .part-2-glow').css('opacity', '0');
  //     $('.diagram-3 .part-3-glow').css('opacity', '0');
  //     $('.diagram-3 .part-4-glow').css('opacity', '0');
  //   }
  // });
});
