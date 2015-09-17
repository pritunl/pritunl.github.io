jQuery(document).ready(function($) {
  var $window = $(window);

  var $diag3 = $('.diagram-3 .part');
  if ($diag3.length) {
    TweenMax.staggerTo($diag3, 2, {
      delay: 1,
      opacity: 1
    }, .25);
  }
  var $diag3glow = $('.diagram-3 .part-glow');
  if ($diag3glow.length) {
    TweenMax.staggerTo($('.diagram-3 .part-glow'), .7, {
      delay: 3,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      opacity: 1
    }, .25);
  }
  var $featSimp = $('.feature-simple .feature-after');
  if ($featSimp.length) {
    TweenMax.to($featSimp, 2, {
      delay: 3,
      repeat: -1,
      repeatDelay: .75,
      yoyo: true,
      opacity: 1
    });
  }
  var $featSimp = $('.feature-simple .feature-after');
  if ($featSimp.length) {
    TweenMax.to($featSimp, 2, {
      delay: 3,
      repeat: -1,
      repeatDelay: .75,
      yoyo: true,
      opacity: 1
    });
  }
  var $featPreglow = $('.feature-dis .feature-preglow');
  var $featGlow = $('.feature-dis .feature-glow');
  if ($featPreglow.length && $featGlow.length) {
    TweenMax.staggerTo([
      $featPreglow,
      $featGlow
    ], 2, {
      delay:.2,
      repeat: -1,
      repeatDelay: 2,
      yoyo: true,
      opacity: 1
    }, 1);
  }

  var randTheme = 'theme' + Math.floor((Math.random() * 3)).toString();
  var $body = $('body');
  var $promoBg = $('.promo-background-color');
  var $promoImg = $('.promo-background-img');
  $promoBg.removeClass('theme0');
  $promoBg.addClass(randTheme);
  $promoImg.removeClass('theme0');
  $promoImg.addClass(randTheme);
  var curX;
  var curY;
  $body.mousemove(function(evt) {
    var x = Math.round(50 * evt.clientX / $window.width() - 10);
    var y = Math.round(50 * evt.clientY / $window.height() - 10);

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

  var loaded = ['archlinux'];
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
  $('.install-archlinux .editor.bash').each(function(index, element) {
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
  $('.server-auto .editor.bash').each(function(index, element) {
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
    $(element).click(function() {
      editor.selectAll();
    });
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

      elements[element] = $element.css('transition');
      $element.css('transition', 'none');
    }
    setTimeout(function() {
      for (element in elements) {
        $element = $(element);
        $element.css('transition', elements[element]);
        elements[element] = null;
      }
    }, 500);
  })();

  var $header = $('.header');
  var $navbarCollaspe = $('.navbar-collapse');
  if ($('.promo').length) {
    var onScroll = function() {
      if ($(this).scrollTop() <= 0) {
        $header.addClass('header-top');
      } else if ($header.css('position') !== 'absolute') {
        $header.removeClass('header-top');
      }
    };
    $(window).scroll(onScroll);
    onScroll();
  }

  $('.label').tooltip();

  // $('.server-region').click(function(evt) {
  //   var $serverRegion = $('.server-region');
  //   $serverRegion.addClass('btn-default');
  //   $serverRegion.removeClass('btn-primary');
  //   $(evt.target).addClass('btn-primary');
  // });

  // var loaderUrl = 'https://pritunl-loader.herokuapp.com';
  // var id = null;
  // var updateData = function(message, type, region, noAnimate, buttonState) {
  //   var $serverAlert = $('.server-alert');
  //   var $serverRegion = $('.server-region');
  //   var $serverRegionSel = $('.server-' + region);
  //   var $apiKey = $('.api-key-container');

  //   if (buttonState == undefined) {
  //     buttonState = true;
  //   }

  //   if (region && !$serverRegionSel.hasClass('btn-primary')) {
  //     $serverRegion.addClass('btn-default');
  //     $serverRegion.removeClass('btn-primary');
  //     $serverRegionSel.addClass('btn-primary');
  //   }

  //   $serverAlert.removeClass('alert-success alert-warning alert-danger');
  //   $serverAlert.addClass(type);
  //   if (message) {
  //     $serverAlert.html(message);
  //   }
  //   if (buttonState) {
  //     $('.server-region, .server-create').removeAttr('disabled');
  //   }
  //   else {
  //     $('.server-region, .server-create').attr('disabled', 'disabled');
  //   }
  //   if (noAnimate) {
  //     if (buttonState) {
  //       $apiKey.show();
  //     }
  //     else {
  //       $apiKey.hide();
  //     }
  //     if (message) {
  //       $serverAlert.show();
  //     }
  //     else {
  //       $serverAlert.hide();
  //     }
  //   }
  //   else {
  //     if (buttonState) {
  //       $apiKey.slideDown(250);
  //     }
  //     else {
  //       $apiKey.slideUp(250);
  //     }
  //     if (message) {
  //       $serverAlert.slideDown(250);
  //     }
  //     else {
  //       $serverAlert.slideUp(250);
  //     }
  //   }
  // };
  // var updateDataPending = function(region, noAnimate) {
  //   updateData('Pritunl droplet is being created, please ' +
  //       'allow several minutes for this to complete. You may leave or ' +
  //       'reload the page while the droplet is being created.',
  //       'alert-warning', region, noAnimate, false);
  // };
  // var poll = function() {
  //   $.ajax(loaderUrl + '/poll' + (id ? '/' + id : ''), {
  //     success: function(data) {
  //       id = data.id;
  //       if (data.status) {
  //         poll();
  //       }
  //       else if (data.error) {
  //         updateData(data.error, 'alert-danger', data.region);
  //       }
  //       else if (data.success) {
  //         updateData(data.success, 'alert-success', data.region);
  //       }
  //     },
  //     error: function(data) {
  //       setTimeout(function() {
  //         poll();
  //       }, 3000);
  //     }
  //   });
  // };

  // if (document.URL.indexOf('error=oad') !== -1) {
  //   updateData('Automated install was unable to get permission to ' +
  //     'create server, please try again.', 'alert-danger', null, true, true);
  // }
  // else if (document.URL.indexOf('error=err') !== -1) {
  //   updateData('Automated install was unable to create server, ' +
  //     'please try again later.', 'alert-danger', null, true, true);
  // }

  // $('.server-create').click(function() {
  //   var region;
  //   $('.server-region, .server-create').attr('disabled', 'disabled');

  //   if ($('.server-sfo1').hasClass('btn-primary')) {
  //     region = 'sfo1';
  //   }
  //   else if ($('.server-nyc3').hasClass('btn-primary')) {
  //     region = 'nyc3';
  //   }
  //   else if ($('.server-ams3').hasClass('btn-primary')) {
  //     region = 'ams3';
  //   }
  //   else if ($('.server-sgp1').hasClass('btn-primary')) {
  //     region = 'sgp1';
  //   }
  //   else if ($('.server-lon1').hasClass('btn-primary')) {
  //     region = 'lon1';
  //   }

  //   $.ajax(loaderUrl + '/loader' + (id ? '/' + id : ''), {
  //     type: 'POST',
  //     contentType: 'application/json',
  //     data: JSON.stringify({
  //       region: region
  //     }),
  //     xhrFields: {
  //       withCredentials: true
  //     },
  //     crossDomain: true,
  //     success: function(data) {
  //       window.location.replace(data.oauth_url);
  //     },
  //     error: function(xhr) {
  //       var data = xhr.responseJSON || {};
  //       updateData('Automated install is currently unavailable, please ' +
  //         'try again later.', 'alert-danger', data.region, true, false);
  //     }
  //   });
  // });

  // $.ajax(loaderUrl + '/loader' + (id ? '/' + id : ''), {
  //   type: 'GET',
  //   xhrFields: {
  //     withCredentials: true
  //   },
  //   crossDomain: true,
  //   success: function(data) {
  //     id = data.id;
  //     if (data.status) {
  //       updateDataPending(data.region, data.cookies, true);
  //       poll();
  //     }
  //     else if (data.error) {
  //       updateData(data.error, 'alert-danger', data.region, true);
  //     }
  //     else if (data.success) {
  //       updateData(data.success, 'alert-success', data.region, true);
  //     }
  //   },
  //   error: function(xhr) {
  //     var data = xhr.responseJSON || {};
  //     updateData('Automated install is currently unavailable, please ' +
  //       'try again later.', 'alert-danger', data.region, true, false);
  //   }
  // });

  $('.client .client-distro').click(function(evt) {
    var type;
    var $target = $(evt.target);

    $('.client-distro').removeClass('btn-primary').addClass('btn-default');
    $target.removeClass('btn-default').addClass('btn-primary');

    $('.install-archlinux').hide();
    $('.install-centos-7').hide();
    $('.install-debian-wheezy').hide();
    $('.install-debian-jessie').hide();
    $('.install-ubuntu-precise').hide();
    $('.install-ubuntu-trusty').hide();
    $('.install-ubuntu-vivid').hide();
    $('.install-ubuntu-wily').hide();

    if ($target.hasClass('client-archlinux')) {
      type = 'archlinux';
      $('.install-archlinux').show();
    } else if ($target.hasClass('client-centos-7')) {
      type = 'centos-7';
      $('.install-centos-7').show();
    } else if ($target.hasClass('client-debian-wheezy')) {
      type = 'debian-wheezy';
      $('.install-debian-wheezy').show();
    } else if ($target.hasClass('client-debian-jessie')) {
      type = 'debian-jessie';
      $('.install-debian-jessie').show();
    } else if ($target.hasClass('client-ubuntu-precise')) {
      type = 'ubuntu-precise';
      $('.install-ubuntu-precise').show();
    } else if ($target.hasClass('client-ubuntu-trusty')) {
      type = 'ubuntu-trusty';
      $('.install-ubuntu-trusty').show();
    } else if ($target.hasClass('client-ubuntu-vivid')) {
      type = 'ubuntu-vivid';
      $('.install-ubuntu-vivid').show();
    } else if ($target.hasClass('client-ubuntu-wily')) {
      type = 'ubuntu-wily';
      $('.install-ubuntu-wily').show();
    }

    if (loaded.indexOf(type) === -1) {
      loaded.push(type);
      $('.install-' + type + ' .editor.bash').each(function(index, element) {
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
    }
  });


  $('.server .server-distro').click(function(evt) {
    var type;
    var $target = $(evt.target);

    $('.server-distro').removeClass('btn-primary').addClass('btn-default');
    $target.removeClass('btn-default').addClass('btn-primary');

    $('.install-archlinux').hide();
    $('.install-amazon-linux').hide();
    $('.install-centos-7').hide();
    $('.install-fedora-22').hide();
    $('.install-debian-wheezy').hide();
    $('.install-debian-jessie').hide();
    $('.install-ubuntu-precise').hide();
    $('.install-ubuntu-trusty').hide();
    $('.install-ubuntu-vivid').hide();
    $('.install-ubuntu-wily').hide();

    if ($target.hasClass('server-archlinux')) {
      type = 'archlinux';
      $('.install-archlinux').show();
    } else if ($target.hasClass('server-amazon-linux')) {
      type = 'amazon-linux';
      $('.install-amazon-linux').show();
    } else if ($target.hasClass('server-centos-7')) {
      type = 'centos-7';
      $('.install-centos-7').show();
    } else if ($target.hasClass('server-fedora-22')) {
      type = 'fedora-22';
      $('.install-fedora-22').show();
    } else if ($target.hasClass('server-debian-wheezy')) {
      type = 'debian-wheezy';
      $('.install-debian-wheezy').show();
    } else if ($target.hasClass('server-debian-jessie')) {
      type = 'debian-jessie';
      $('.install-debian-jessie').show();
    } else if ($target.hasClass('server-ubuntu-precise')) {
      type = 'ubuntu-precise';
      $('.install-ubuntu-precise').show();
    } else if ($target.hasClass('server-ubuntu-trusty')) {
      type = 'ubuntu-trusty';
      $('.install-ubuntu-trusty').show();
    } else if ($target.hasClass('server-ubuntu-vivid')) {
      type = 'ubuntu-vivid';
      $('.install-ubuntu-vivid').show();
    } else if ($target.hasClass('server-ubuntu-wily')) {
      type = 'ubuntu-wily';
      $('.install-ubuntu-wily').show();
    }

    if (loaded.indexOf(type) === -1) {
      loaded.push(type);
      $('.install-' + type + ' .editor.bash').each(function(index, element) {
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
    }
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

  if ($('#google-cache-hdr').length) {
    $('.header').css('position', 'absolute')
  }
  setTimeout(function() {
    if ($('#google-cache-hdr').length) {
      $('.header').css('position', 'absolute')
    }
    setTimeout(function() {
      if ($('#google-cache-hdr').length) {
        $('.header').css('position', 'absolute')
      }
    }, 500);
  }, 500);
});
