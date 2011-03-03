$(document).ready(function($) {
    
    // size wrapper min-height for sticky footer
    $(window).bind('load resize', function() {
        var windowHeight = $(window).height();
        var footerHeight = $('footer').outerHeight();
        $('#wrapper').css({ 'min-height' : windowHeight - footerHeight });
    });
    
    // toggle Video
    $('.play').click(function() {
        $('#video').addClass('visible');
    });
    
});