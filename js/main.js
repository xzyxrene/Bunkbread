'use strict';

(function ($) {

    /*------------------
        Custom Functions
    --------------------*/
    function reloadRtAvt() {

        if ($("li.active").eq(0).text() == 'Home'){
            var room = ['Non-AC Mixed', 'AC Mixed', 'Non-AC Female', 'Private Room'];
            $.get("https://script.google.com/macros/s/AKfycbxluCazuHqyC7e_yP1v-us56ubD-LdeO0kUuc7v-F1pljYLPsQPUa3slOVbn9zEXW21pg/exec", (data, status)=>{
                $('.rt-availability-unit').each(function (i) {
                    if (i != 3) 
                    $(this).html(`<h6>${data.availability[i]} beds<br>in ${room[i]} Dorm</h6>`);
                    else
                    $(this).html(`<h6>${data.availability[i]} rooms<br>in ${room[i]}</h6>`);
                });
            });
        }
    }

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
        reloadRtAvt();
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Offcanvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
   $(".hero-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 1,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"]
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
		Date Picker
	--------------------*/
    $(".date-input").datepicker({
        minDate: 0,
        dateFormat: 'dd MM, yy'
    });

    /*------------------
		Nice Select
	--------------------*/
    $("select").niceSelect();

    /*------------------
		Custom jQuery
	--------------------*/
    // const { onRequest } = require('firebase-functions/v2/https');
    // const { defineInt, defineString } = require('firebase-functions/params');

    // For Home Tab:

    let today = new Date();

    $(".today-in").attr("value", `${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`);
    $(".today-out").attr("value", `${today.getDate() + 1} / ${today.getMonth() + 1} / ${today.getFullYear()}`);

    $(".full-booking").click(function() {
    
        $("html, body").animate({
          scrollTop: $(".availability-section").offset().top
        }, 1000, "easeOutSine");
    });

    $('#refresh-av').click(()=>{
        $('.rt-availability-unit').each(function(i){
            $(this).html(`<div class="av-loader"></div>`);
        });
        reloadRtAvt();
    });

    var checkInPicker = new Pikaday({
        field: document.getElementById('dateCheckIn'),
        format: 'Do MMM YYYY',
        minDate: today,
        onSelect: function() {
            
            var selectedDate = this.getDate();
            var nextDay = new Date(selectedDate);
            nextDay.setDate(selectedDate.getDate() + 1);
            checkOutPicker.setMinDate(nextDay);
            
            if (checkOutPicker.getDate() <= selectedDate) {
                checkOutPicker.setDate(nextDay);
            }
        }
    });

    var checkOutPicker = new Pikaday({
        field: document.getElementById('dateCheckOut'),
        format: 'Do MMM YYYY',
        minDate: today,
    });
    
    // For Contact Tab:

    $(".contact-form").attr("action", "https://script.google.com/macros/s/AKfycbwo_Ydt6pzqFaMRU9_XgB2fPP7oyLNdNO2wGDofyy9QNnx_purF6ZInRzboOec2SVGA/exec");

})(jQuery);

window.history.replaceState('','','/');