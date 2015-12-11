$(function() {

  var headings = $(".site-content").find("h1");
  var contents = $("#table-of-contents");
  var listOfHeadings = contents.find(".headings");

  headings.each(function(i, elem) {
    listOfHeadings.append('<li><a href="#' + elem.id + '">' + elem.textContent.trim() + '</a></li>');
  });

  contents.affix({
    offset: {
      top: function() {
        var top = contents.offset().top,
            marginTop = parseInt(contents.children(0).css("margin-top"), 10),
            navHeight = $(".navbar").height();
        return this.top = top - navHeight - marginTop;
      }
    }
  })

  $('body').scrollspy({ target: '#table-of-contents', offset: 50 });

  $('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 500);
      return false;
    }
  }
});

});
