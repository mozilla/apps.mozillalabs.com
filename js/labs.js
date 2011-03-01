$(document).ready(function($) {

/*
    // isotope: Mason projects and sidebar
    $('aside, #contentWrap').isotope({
        itemSelector : 'div.sidebar, .contentBlock',
        layoutMode : 'masonry',
        animationOptions: {
            duration: 200
        }
    });
    
    // isotope: Fit team and page content into rows
    $('ul#projectList, ul#teamList').isotope({
        itemSelector : '.project, .team',
        layoutMode : 'fitRows',
        animationOptions: {
            duration: 200
        }
    });
*/
    
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
    
    // keyboard shortcuts
    $(document.documentElement).keyup(function (event) {
        if (event.keyCode == 71) {
            $('#grid').fadeToggle(100); // G toggles grid
        }
    });
    
    // peace out
    
});