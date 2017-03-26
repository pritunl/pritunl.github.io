jQuery(document).ready(function($) {
  var $window = $(window);
  var randTheme = 'theme' + Math.floor((Math.random() * 3)).toString();
  randTheme = 'theme0';
  var $body = $('body');
  var $promoBg = $('.promo-background-color');
  var $promoImg = $('.promo-background-img');
  var $promoshortImg = $('.promo-short-background-img');

  if ($promoBg.length) {
    //$promoBg.removeClass('theme0');
    //$promoBg.addClass(randTheme);
    //$promoImg.removeClass('theme0');
    //$promoImg.addClass(randTheme);
    var promoBg = $promoBg[0];

    var bgObj;
    var bgProps;
    var repeatDelay = .5;
    if (randTheme === 'theme0') {
      bgObj = {
        left: '#3076d5',
        right: '#1026a1'
      };
      bgProps = {
        left: '#582cc3',
        right: '#36107f'
      };
    } else if (randTheme === 'theme1') {
      bgObj = {
        left: '#18212d',
        right: '#030618'
      };
      bgProps = {
        left: '#2d181b',
        right: '#180303'
      };
    } else if (randTheme === 'theme2') {
      repeatDelay = 2;
      bgObj = {
        left: '#1f0b35',
        right: '#501d0c'
      };
      bgProps = {
        left: '#501d0c',
        right: '#1f0b35'
      };
    } else if (randTheme === 'theme3') {
      bgObj = {
        left: '#900b0b',
        right: '#1b711c'
      };
      bgProps = {
        left: '#1b711c',
        right: '#900b0b'
      };
    }

    TweenMax.to(bgObj, 6, {
      delay: 2,
      repeat: -1,
      repeatDelay: repeatDelay,
      yoyo: true,
      colorProps: bgProps,
      onUpdate: function() {
        promoBg.style.background = 'linear-gradient(to right, ' +
          bgObj.left + ' 0%, ' + bgObj.right + '100%)'
      }
    }, .25);
  }
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
  var $featPreglow = $('.feature-preglow');
  var $featGlow = $('.feature-glow');
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

  var curX;
  var curY;
  if ($promoImg.length) {
    $body.mousemove(function (evt) {
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
    window.ondevicemotion = function (evt) {
      var x = Math.round(evt.accelerationIncludingGravity.x * 3);
      var y = Math.round(evt.accelerationIncludingGravity.y * 3);

      if (curX == x && curY == y) {
        return;
      }
      curX = x;
      curY = y;

      if (window.innerWidth / window.innerHeight > 1) {
        var xx = x;
        x = y;
        y = xx;
      }

      $promoImg.css('transform',
        'matrix(1.05, 0, 0, 1.05, ' + x + ', ' + y + ')');
    };
  } else if ($promoshortImg.length) {
    $body.mousemove(function (evt) {
      var x = Math.round(25 * evt.clientX / $window.width() - 10);
      var y = Math.round(25 * evt.clientY / $window.height() - 10);

      if (curX == x && curY == y) {
        return;
      }
      curX = x;
      curY = y;

      $promoshortImg.css('transform',
        'matrix(1.1, 0, 0, 1.1, ' + x + ', ' + y + ')');
    });
  }

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
      if ($(this).scrollTop() <= 0 && !$navbarCollaspe.hasClass('in')) {
        $header.addClass('header-top');
      } else if ($header.css('position') !== 'absolute') {
        $header.removeClass('header-top');
      }
    };
    $(window).scroll(onScroll);
    onScroll();
  }

  $('.label').tooltip();
  $('.price').tooltip();

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

    $('.client .install-archlinux').hide();
    $('.client .install-centos-7').hide();
    $('.client .install-debian-wheezy').hide();
    $('.client .install-debian-jessie').hide();
    $('.client .install-ubuntu-precise').hide();
    $('.client .install-ubuntu-trusty').hide();
    $('.client .install-ubuntu-wily').hide();
    $('.client .install-ubuntu-xenial').hide();
    $('.client .install-ubuntu-yakkety').hide();
    $('.client .install-other').hide();

    if ($target.hasClass('client-archlinux')) {
      type = 'archlinux';
      $('.client .install-archlinux').show();
    } else if ($target.hasClass('client-centos-7')) {
      type = 'centos-7';
      $('.client .install-centos-7').show();
    } else if ($target.hasClass('client-debian-wheezy')) {
      type = 'debian-wheezy';
      $('.client .install-debian-wheezy').show();
    } else if ($target.hasClass('client-debian-jessie')) {
      type = 'debian-jessie';
      $('.client .install-debian-jessie').show();
    } else if ($target.hasClass('client-ubuntu-precise')) {
      type = 'ubuntu-precise';
      $('.client .install-ubuntu-precise').show();
    } else if ($target.hasClass('client-ubuntu-trusty')) {
      type = 'ubuntu-trusty';
      $('.client .install-ubuntu-trusty').show();
    } else if ($target.hasClass('client-ubuntu-wily')) {
      type = 'ubuntu-wily';
      $('.client .install-ubuntu-wily').show();
    } else if ($target.hasClass('client-ubuntu-xenial')) {
      type = 'ubuntu-xenial';
      $('.client .install-ubuntu-xenial').show();
    } else if ($target.hasClass('client-ubuntu-yakkety')) {
      type = 'ubuntu-yakkety';
      $('.client .install-ubuntu-yakkety').show();
    } else if ($target.hasClass('client-other')) {
      type = 'other';
      $('.client .install-other').show();
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

    $('.server .install-archlinux').hide();
    $('.server .install-amazon-linux').hide();
    $('.server .install-centos-7').hide();
    $('.server .install-fedora-22').hide();
    $('.server .install-debian-wheezy').hide();
    $('.server .install-debian-jessie').hide();
    $('.server .install-ubuntu-precise').hide();
    $('.server .install-ubuntu-trusty').hide();
    $('.server .install-ubuntu-wily').hide();
    $('.server .install-ubuntu-xenial').hide();

    if ($target.hasClass('server-archlinux')) {
      type = 'archlinux';
      $('.server .install-archlinux').show();
    } else if ($target.hasClass('server-amazon-linux')) {
      type = 'amazon-linux';
      $('.server .install-amazon-linux').show();
    } else if ($target.hasClass('server-centos-7')) {
      type = 'centos-7';
      $('.server .install-centos-7').show();
    } else if ($target.hasClass('server-fedora-22')) {
      type = 'fedora-22';
      $('.server .install-fedora-22').show();
    } else if ($target.hasClass('server-debian-wheezy')) {
      type = 'debian-wheezy';
      $('.server .install-debian-wheezy').show();
    } else if ($target.hasClass('server-debian-jessie')) {
      type = 'debian-jessie';
      $('.server .install-debian-jessie').show();
    } else if ($target.hasClass('server-ubuntu-precise')) {
      type = 'ubuntu-precise';
      $('.server .install-ubuntu-precise').show();
    } else if ($target.hasClass('server-ubuntu-trusty')) {
      type = 'ubuntu-trusty';
      $('.server .install-ubuntu-trusty').show();
    } else if ($target.hasClass('server-ubuntu-wily')) {
      type = 'ubuntu-wily';
      $('.server .install-ubuntu-wily').show();
    } else if ($target.hasClass('server-ubuntu-xenial')) {
      type = 'ubuntu-xenial';
      $('.server .install-ubuntu-xenial').show();
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

  $('.enterprise-vid').bind('play', function(evt) {
    var $vid = $(evt.currentTarget);

    $vid.animate({
      duration: 400,
      width: '100%'
    });
  }).bind('ended', function(evt) {
    var $vid = $(evt.currentTarget);

    $vid.animate({
      duration: 400,
      width: '50%'
    });
  });


  $('.plans .plan-list li').click(function(evt) {
    var $tar = $(evt.currentTarget);

    if ($tar.hasClass('expanded')) {
      $tar.removeClass('expanded');
      $tar.find('.fa-angle-up').removeClass(
        'fa-angle-up').addClass('fa-angle-down');
      $tar.find('.info').slideUp(200);
    } else {
      $tar.addClass('expanded');
      $tar.find('.fa-angle-down').removeClass(
        'fa-angle-down').addClass('fa-angle-up');
      $tar.find('.info').slideDown(200);
    }
  });

  var checkoutPlan;
  var checkout = window.StripeCheckout.configure({
    allowRememberMe: false,
    image: '//s3.amazonaws.com/pritunl-static/logo_stripe.png',
    key: 'pk_live_plmoOl3lS3k5dMNQViZWGfVR',
    zipCode: true,
    closed: function() {
      unlockCheckout();
    }.bind(this),
    token: function(token) {
      lockCheckout();
      setCheckoutAlert('success', 'Order processing, please wait...');

      $.ajax({
        type: 'POST',
        url: 'https://app.pritunl.com/subscription',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          'plan': checkoutPlan,
          'card': token.id,
          'email': token.email
        }),
        success: function(response) {
          setCheckoutAlert('success', response.msg);
          unlockCheckout();
        }.bind(this),
        error: function(response) {
          if (response.responseJSON) {
            setCheckoutAlert('danger', response.responseJSON.error_msg);
          }
          else {
            setCheckoutAlert('danger',
              'Server error occured, please try again later.');
          }
          unlockCheckout();
        }.bind(this)
      });
    }.bind(this)
  });
  var setCheckoutAlert = function(alertType, alertMsg) {
    var $alert = $('.' + checkoutPlan + '-sub-alert');

    $alert.removeClass('alert-success alert-info alert-danger');
    $alert.addClass('alert-' + alertType);
    $alert.text(alertMsg);
    $alert.slideDown(250);
  };
  var clearCheckoutAlert = function() {
    var $alert = $('.' + checkoutPlan + '-sub-alert');

    $alert.removeClass('alert-success alert-info alert-danger');
    $alert.addClass('alert-' + alertType);
    $alert.text('');
    $alert.slideUp(250);
  };
  var lockCheckout = function() {
    $('.plans .premium-sub-btn').attr('disabled', 'disabled');
    $('.plans .enterprise-sub-btn').attr('disabled', 'disabled');
    $('.plans .support-sub-btn').attr('disabled', 'disabled');
    $('.plans .premium-apple-pay').attr('disabled', 'disabled');
    $('.plans .enterprise-apple-pay').attr('disabled', 'disabled');
    $('.plans .support-apple-pay').attr('disabled', 'disabled');
  };
  var unlockCheckout = function() {
    $('.plans .premium-sub-btn').removeAttr('disabled');
    $('.plans .enterprise-sub-btn').removeAttr('disabled');
    $('.plans .support-sub-btn').removeAttr('disabled');
    $('.plans .premium-apple-pay').removeAttr('disabled');
    $('.plans .enterprise-apple-pay').removeAttr('disabled');
    $('.plans .support-apple-pay').removeAttr('disabled');
  };
  var openCheckout = function(plan) {
    checkoutPlan = plan;

    if (plan === 'premium') {
      checkout.open({
        amount: 1000,
        name: 'Pritunl Premium',
        description: 'Subscribe to Premium ($10/month)',
        panelLabel: 'Subscribe'
      });
    } else if (plan === 'enterprise') {
      checkout.open({
        amount: 5000,
        name: 'Pritunl Enterprise',
        description: 'Subscribe to Enterprise ($50/month)',
        panelLabel: 'Subscribe'
      });
    } else {
      checkout.open({
        amount: 25000,
        name: 'Pritunl Support',
        description: 'Subscribe to Support ($250/month)',
        panelLabel: 'Subscribe'
      });
    }
  };
  $('.plans .premium-sub-btn').click(function() {
    openCheckout('premium');
  });
  $('.plans .enterprise-sub-btn').click(function() {
    openCheckout('enterprise');
  });
  $('.plans .support-sub-btn').click(function() {
    openCheckout('support');
  });

  var openApplePay = function(plan) {
    checkoutPlan = plan;

    var paymentRequest;
    if (plan === 'premium') {
      paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        requiredShippingContactFields: ['email'],
        total: {
          label: 'Premium ($10/month)',
          amount: '10.00'
        }
      };
    } else if (plan === 'enterprise') {
      paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        requiredShippingContactFields: ['email'],
        total: {
          label: 'Enterprise ($50/month)',
          amount: '50.00'
        }
      };
    } else {
      paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        requiredShippingContactFields: ['email'],
        total: {
          label: 'Support ($750/quarterly)',
          amount: '750.00'
        }
      };
    }

    var session = Stripe.applePay.buildSession(paymentRequest,
      function(result, completion) {
        $.ajax({
          type: 'POST',
          url: 'https://app.pritunl.com/subscription',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            'plan': checkoutPlan,
            'card': result.token.id,
            'email': result.shippingContact.emailAddress
          }),
          success: function(response) {
            completion(ApplePaySession.STATUS_SUCCESS);
            setCheckoutAlert('success', response.msg);
          }.bind(this),
          error: function(response) {
            completion(ApplePaySession.STATUS_FAILURE);
            if (response.responseJSON) {
              setCheckoutAlert('danger', response.responseJSON.error_msg);
            }
            else {
              setCheckoutAlert('danger',
                'Server error occured, please try again later.');
            }
          }.bind(this)
        });
      }, function(error) {
        setCheckoutAlert('danger', error.message);
      });

    session.begin();
  };
  $('.plans .premium-apple-pay').click(function() {
    openApplePay('premium');
  });
  $('.plans .enterprise-apple-pay').click(function() {
    openApplePay('enterprise');
  });
  $('.plans .support-apple-pay').click(function() {
    openApplePay('support');
  });

  Stripe.setPublishableKey('pk_live_plmoOl3lS3k5dMNQViZWGfVR');
  Stripe.applePay.checkAvailability(function(available) {
    if (available) {
      $('.premium-apple-pay').show('block');
      $('.enterprise-apple-pay').show('block');
      $('.support-apple-pay').show('block');
    }
  });

  var videos = $('video');
  for (var i = 0; i < videos.legnth; i++) {
    videos[i].play();
  }
});
