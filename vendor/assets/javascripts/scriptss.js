$(document).on('ready page:load', function () { 

  $('#preloader .loader-wrapper').fadeOut('slow');
  $('#preloader').delay(350).fadeOut('slow');

  $('#navigation').localScroll({
    duration: 1000,
    easing: 'easeInOutExpo'
  });
  

  $('body').scrollspy({ target: '.navbar-fixed-top' });

  function updateHash() {
    $("#url input").val(location.hash);
  }

  updateHash();

  $(window).on("hashchange", updateHash);

  $("#url").submit(function (e) {
      window.location.hash = $("input", this).val();
      e.preventDefault();
  });

  $(window).on('activate.bs.scrollspy', function (e) {
    location.hash = $("a[href^='#']", e.target).attr("href") || location.hash;
  });

  $(window).on('scroll', function(){
    if( $(document).scrollTop() > 150 ) {
      $('.navbar').addClass('active');
    }else {
      $('.navbar').removeClass('active');
    } 
  });

  $('#navigation li a').on('click', function() {
    if($(this).parents('.navbar-collapse.collapse').hasClass('in')) {
      $('#navigation').collapse('hide');
    }
  });

  $('.page-video-wrapper').fitVids();

  $('.feature-slides').bxSlider({
    mode: 'fade',
    auto: true,
    speed: 500,
    controls: false,
    adaptiveHeight: true
  });

  $('.app-screenshots').slick({
    dots: true,
    centerMode: true,
    cssEase: 'ease-in',
    variableWidth: true,
  });

  $(window).scroll( function() {
    if( $(this).scrollTop() > 300 ) {
      $('.back-to-top').fadeIn();
    } else {
      $('.back-to-top').fadeOut();
    }
  });

  $('.back-to-top').on( 'click', function(e) {
    e.preventDefault();

    $('body, html').animate({
      scrollTop: 0
    }, 800, 'easeInOutExpo');
  });

  if($('.learn-more').length > 0) {
    $('.learn-more').localScroll({
      duration: 1000,
      easing: 'easeInOutExpo'
    });
  }

  if($(".fullscreen-video-bg").length > 0) {
    if($.browser.mobile) {
      $(".fullscreen-video-bg").addClass('no-video-bg');
    }
  }

});