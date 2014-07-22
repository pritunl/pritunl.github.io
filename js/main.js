jQuery(document).ready(function($) {
  $('a.scrollto').on('click', function(evt){
    var target = this.hash;
    if (!$(target).length) {
      return;
    }
    evt.preventDefault();
    $('body').scrollTo(target, 800, {offset: -80}, {easing: 'easeOutQuad'});
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
  $('.flexslider').flexslider({
    animation: 'fade',
    touch: true,
    directionNav: false
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
    else {
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

  $('.server-create').click(function() {
    var region;
    var apiKey = $('.api-key').val();
    if (!apiKey) {
      $('.api-key').addClass('error');
      return;
    }
    $('.api-key').removeClass('error');
    $('.server-region, .server-create').attr('disabled', 'disabled');
    $('.api-key-container').slideUp(250);

    if ($('.server-sfo1').hasClass('btn-primary')) {
      region = 'sfo1';
    }
    else if ($('.server-nyc2').hasClass('btn-primary')) {
      region = 'nyc2';
    }
    else if ($('.server-ams2').hasClass('btn-primary')) {
      region = 'ams2';
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
        api_key: apiKey,
        region: region
      }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(data) {
        id = data.id;
        if (data.status) {
          updateDataPending(data.region);
          poll();
        }
        else if (data.error) {
          updateData(data.error, 'alert-danger', data.region);
        }
        else if (data.success) {
          updateData(data.success, 'alert-success', data.region);
        }
      },
      error: function(xhr) {
        var data = xhr.responseJSON || {};
        updateData('Automated install is currently unavailable, please ' +
          'try again later.', 'alert-danger', data.region, true, false);
      }
    });
  });

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
      if (data.success) {
        updateData(data.success, 'alert-success', data.region, true);
      }
      else {
        updateData('Automated install is currently unavailable, please ' +
          'try again later.', 'alert-danger', data.region, true, false);
      }
    }
  });
});
