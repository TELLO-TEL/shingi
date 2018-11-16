$(document).ready(() => {

   $('.form').find('input, textarea').on('keyup blur focus', function (e) {

       var $this = $(this),
           label = $this.prev('label');

       if (e.type === 'keyup') {
           if ($this.val() === '') {
               label.removeClass('active highlight');
           } else {
               label.addClass('active highlight');
           }
       } else if (e.type === 'blur') {
           if ($this.val() === '') {
               label.removeClass('active highlight');
           } else {
               label.removeClass('highlight');
           }
       } else if (e.type === 'focus') {

           if ($this.val() === '') {
               label.removeClass('highlight');
           } else if ($this.val() !== '') {
               label.addClass('highlight');
           }
       }

   });
    
    $('a.page-item-btn').bind('click', function (e) {
        const id = "#" + $(this).attr('id');
        const pageid = "#content-" + $(this).attr('id');
        $(".active").removeClass("page-current").removeClass("active");
        $(id).addClass("page-current").addClass("active");
        $(".show").removeClass("show").addClass("hidden")
        $(pageid).removeClass("hidden").addClass("show")
        $('html, body').animate({
            scrollTop: '0px'
        }, 0);
        e.preventDefault();
    });
    $('a#prev').on('click', (e) => {
        const pageid = $('.show').attr('id');
        const id = $("a.page-item-btn.active").attr('id')
        const num = parseInt(id.slice(4));
        const prevpgid = "#page" + (num - 1);
        const prevcontent = "#content-page" + (num - 1);
        const prev = $('input#prevdisable').val();

        const next = $('input#nextdisable').val();

        if (pageid == prev) {
            $('a#prev').addClass("disabled");
        } else {
            $(".active").removeClass("page-current").removeClass("active");
            $(prevpgid).addClass("page-current").addClass("active");
            $(".show").removeClass("show").addClass("hidden")
            $(prevcontent).removeClass("hidden").addClass("show")
            $('html, body').animate({
                scrollTop: '0px'
            }, 0);

        }
        e.preventDefault();
    })

    $('#qty_id').on( 'click', function () {
        const val = document.getElementById('qty_id').innerHTML
        $('input[name=quantity]').val(val);
    });

    $('a#next').on('click', (e) => {
        const pageid = $('.show').attr('id');
        const id = $("a.page-item-btn.active").attr('id')
        const num = parseInt(id.slice(4));
        const prevpgid = "#page" + (num + 1);
        const prevcontent = "#content-page" + (num + 1);
        const next = $('input#nextdisable').val();

        if (pageid == next) {
            $('a#next').addClass("disabled");
        } else {
            $(".active").removeClass("page-current").removeClass("active");
            $(prevpgid).addClass("page-current").addClass("active");
            $(".show").removeClass("show").addClass("hidden")
            $(prevcontent).removeClass("hidden").addClass("show")
            $('html, body').animate({
                scrollTop: '0px'
            }, 0);

        }
        e.preventDefault();
    })

});