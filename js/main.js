jQuery(document).ready(function($) {
  var $window = $(window);
  var $body = $('body');
  var $promoBg = $('.promo-background-color');
  var $promoImg = $('.promo-background-img');
  var $promoshortImg = $('.promo-short-background-img');

  // if ($promoBg.length) {
  //   var promoBg = $promoBg[0];
  //
  //   var bgObj = {
  //     left: '#3076d5',
  //     right: '#1026a1'
  //   };
  //   var bgProps = {
  //     left: '#582cc3',
  //     right: '#36107f'
  //   };
  //
  //   TweenMax.to(bgObj, 6, {
  //     delay: 2,
  //     repeat: -1,
  //     repeatDelay: .5,
  //     yoyo: true,
  //     colorProps: bgProps,
  //     onUpdate: function() {
  //       promoBg.style.background = 'linear-gradient(to right, ' +
  //         bgObj.left + ' 0%, ' + bgObj.right + '100%)'
  //     }
  //   }, .25);
  // }
  // var $diag3 = $('.diagram-3 .part');
  // if ($diag3.length) {
  //   TweenMax.staggerTo($diag3, 2, {
  //     delay: 1,
  //     opacity: 1
  //   }, .25);
  // }
  // var $diag3glow = $('.diagram-3 .part-glow');
  // if ($diag3glow.length) {
  //   TweenMax.staggerTo($('.diagram-3 .part-glow'), .7, {
  //     delay: 3,
  //     repeat: -1,
  //     repeatDelay: 1,
  //     yoyo: true,
  //     opacity: 1
  //   }, .25);
  // }
  // var $featSimp = $('.feature-simple .feature-after');
  // if ($featSimp.length) {
  //   TweenMax.to($featSimp, 2, {
  //     delay: 3,
  //     repeat: -1,
  //     repeatDelay: .75,
  //     yoyo: true,
  //     opacity: 1
  //   });
  // }
  // var $featPreglow = $('.feature-preglow');
  // var $featGlow = $('.feature-glow');
  // if ($featPreglow.length && $featGlow.length) {
  //   TweenMax.staggerTo([
  //     $featPreglow,
  //     $featGlow
  //   ], 2, {
  //     delay:.2,
  //     repeat: -1,
  //     repeatDelay: 2,
  //     yoyo: true,
  //     opacity: 1
  //   }, 1);
  // }

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
    var $navbarCollapse = $('.navbar-collapse');
    var scrollTop = $(window).scrollTop();
    if ($navbarCollapse.hasClass('in') &&
        scrollTop <= 0 && $('.promo').length) {
      $('.header').addClass('header-top');
      $navbarCollapse.removeClass('in');
    }
    else {
      $('.header').removeClass('header-top');
      $navbarCollapse.addClass('in');
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

  var loaded = ['server-archlinux', 'client-archlinux'];
  $('.editor.python').each(function(index, element) {
    CodeMirror.fromTextArea(element, {
      mode: 'python',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true
    });
  });
  $('.install-archlinux .editor.bash').each(function(index, element) {
    CodeMirror.fromTextArea(element, {
      mode: 'shell',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true
    });
  });
  $('.server-auto .editor.bash').each(function(index, element) {
    CodeMirror.fromTextArea(element, {
      mode: 'shell',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true
    });
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

  $('.client .client-distro').click(function(evt) {
    var type;
    var $target = $(evt.target);

    $('.client-distro').removeClass('btn-primary').addClass('btn-default');
    $target.removeClass('btn-default').addClass('btn-primary');

    $('.client .install-archlinux').hide();
    $('.client .install-centos-7').hide();
    $('.client .install-debian-jessie').hide();
    $('.client .install-debian-stretch').hide();
    $('.client .install-fedora').hide();
    $('.client .install-ubuntu-one').hide();
    $('.client .install-ubuntu-two').hide();
    $('.client .install-ubuntu-three').hide();
    $('.client .install-other').hide();

    if ($target.hasClass('client-archlinux')) {
      type = 'archlinux';
      $('.client .install-archlinux').show();
    } else if ($target.hasClass('client-centos-7')) {
      type = 'centos-7';
      $('.client .install-centos-7').show();
    } else if ($target.hasClass('client-debian-jessie')) {
      type = 'debian-jessie';
      $('.client .install-debian-jessie').show();
    } else if ($target.hasClass('client-debian-stretch')) {
      type = 'debian-stretch';
      $('.client .install-debian-stretch').show();
    } else if ($target.hasClass('client-fedora')) {
      type = 'fedora';
      $('.client .install-fedora').show();
    } else if ($target.hasClass('client-ubuntu-one')) {
      type = 'ubuntu-one';
      $('.client .install-ubuntu-one').show();
    } else if ($target.hasClass('client-ubuntu-two')) {
      type = 'ubuntu-two';
      $('.client .install-ubuntu-two').show();
    } else if ($target.hasClass('client-ubuntu-three')) {
      type = 'ubuntu-three';
      $('.client .install-ubuntu-three').show();
    } else if ($target.hasClass('client-other')) {
      type = 'other';
      $('.client .install-other').show();
    }

    if (loaded.indexOf('client-' + type) === -1) {
      loaded.push('client-' + type);
      $('.client .install-' + type + ' .editor.bash').each(function(index, element) {
        CodeMirror.fromTextArea(element, {
          mode: 'shell',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
          readOnly: true
        });
      });
    }
  });


  $('.server .server-distro').click(function(evt) {
    var type;
    var $target = $(evt.target);

    $('.server-distro').removeClass('btn-primary').addClass('btn-default');
    $target.removeClass('btn-default').addClass('btn-primary');

    $('.server .install-archlinux').hide();
    $('.server .install-amazon-linux-two').hide();
    $('.server .install-centos-7').hide();
    $('.server .install-centos-8').hide();
    $('.server .install-debian-stretch').hide();
    $('.server .install-ubuntu-one').hide();
    $('.server .install-ubuntu-two').hide();
    $('.server .install-oracle-linux-7').hide();
    $('.server .install-oracle-linux-8').hide();

    if ($target.hasClass('server-archlinux')) {
      type = 'archlinux';
      $('.server .install-archlinux').show();
    } else if ($target.hasClass('server-amazon-linux-two')) {
      type = 'amazon-linux-two';
      $('.server .install-amazon-linux-two').show();
    } else if ($target.hasClass('server-centos-7')) {
      type = 'centos-7';
      $('.server .install-centos-7').show();
    } else if ($target.hasClass('server-centos-8')) {
      type = 'centos-8';
      $('.server .install-centos-8').show();
    } else if ($target.hasClass('server-debian-jessie')) {
      type = 'debian-jessie';
      $('.server .install-debian-jessie').show();
    } else if ($target.hasClass('server-debian-stretch')) {
      type = 'debian-stretch';
      $('.server .install-debian-stretch').show();
    } else if ($target.hasClass('server-ubuntu-one')) {
      type = 'ubuntu-one';
      $('.server .install-ubuntu-one').show();
    } else if ($target.hasClass('server-ubuntu-two')) {
      type = 'ubuntu-two';
      $('.server .install-ubuntu-two').show();
    } else if ($target.hasClass('server-oracle-linux-7')) {
      type = 'oracle-linux-7';
      $('.server .install-oracle-linux-7').show();
    } else if ($target.hasClass('server-oracle-linux-8')) {
      type = 'oracle-linux-8';
      $('.server .install-oracle-linux-8').show();
    }

    if (loaded.indexOf('server-' + type) === -1) {
      loaded.push('server-' + type);
      $('.server .install-' + type + ' .editor.bash').each(function(index, element) {
        CodeMirror.fromTextArea(element, {
          mode: 'shell',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
          readOnly: true
        });
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
    image: 'https://objectstorage.us-ashburn-1.oraclecloud.com/n/pritunl8472/b/pritunl-static/o/logo_stripe.png',
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
    $('.plans .enterprise-plus-sub-btn').attr('disabled', 'disabled');
    $('.plans .support-sub-btn').attr('disabled', 'disabled');
    $('.plans .premium-apple-pay').attr('disabled', 'disabled');
    $('.plans .enterprise-apple-pay').attr('disabled', 'disabled');
    $('.plans .support-apple-pay').attr('disabled', 'disabled');
  };
  var unlockCheckout = function() {
    $('.plans .premium-sub-btn').removeAttr('disabled');
    $('.plans .enterprise-sub-btn').removeAttr('disabled');
    $('.plans .enterprise-plus-sub-btn').removeAttr('disabled');
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
    } else if (plan === 'enterprise_plus') {
      checkout.open({
        amount: 10000,
        name: 'Pritunl Enterprise+',
        description: 'Subscribe to Enterprise+ ($100/month)',
        panelLabel: 'Subscribe'
      });
    } else {
      checkout.open({
        amount: 75000,
        name: 'Pritunl Support',
        description: 'Subscribe to Support ($750/quarter)',
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
  $('.plans .enterprise-plus-sub-btn').click(function() {
    openCheckout('enterprise_plus');
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
          label: 'Enterprise ($70/month)',
          amount: '70.00'
        }
      };
    } else if (plan === 'enterprise_plus') {
      paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        requiredShippingContactFields: ['email'],
        total: {
          label: 'Enterprise+ ($100/month)',
          amount: '100.00'
        }
      };
    } else {
      paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        requiredShippingContactFields: ['email'],
        total: {
          label: 'Support ($750/quarter)',
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
  $('.plans .enterprise-plus-apple-pay').click(function() {
    openApplePay('enterprise_plus');
  });
  $('.plans .support-apple-pay').click(function() {
    openApplePay('support');
  });
  Stripe.setPublishableKey('pk_live_plmoOl3lS3k5dMNQViZWGfVR');
  Stripe.applePay.checkAvailability(function(available) {
    if (available) {
      $('.premium-apple-pay').css('display', 'block');
      $('.enterprise-apple-pay').css('display', 'block');
      $('.enterprise-plus-apple-pay').css('display', 'block');
      $('.support-apple-pay').css('display', 'block');
    }
  });
});
