$(function() {

  var headings = $(".homepage-content").find("h1");
  var contents = $("#table-of-contents");

  var listOfHeaders = contents.find(".headers");

  headings.each(function(i, elem) {
    listOfHeaders.append('<li><a href="#' + elem.id + '">' + elem.textContent.trim() + '</a></li>');
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

  $('body').scrollspy({ target: '#table-of-contents', offset: 80 });

});
