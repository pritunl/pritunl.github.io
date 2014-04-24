jQuery(document).ready(function($) {
  $('a.scrollto').on('click', function(e){
    var target = this.hash;
    if (!$(target).length) {
      return;
    }
    e.preventDefault();
    $('body').scrollTo(target, 800, {offset: -80}, {easing: 'easeOutQuad'});
    if ($('.navbar-collapse').hasClass('in')) {
      $('.navbar-collapse').removeClass('in').addClass('collapse');
    }
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
});
