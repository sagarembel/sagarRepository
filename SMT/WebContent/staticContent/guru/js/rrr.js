/* SIDE NAV COLLAPSE TOGGLE
=======================*/
$(function () {
    $('#sidebar-wrapper .dropdown-submenu').hide();
    $('#sidebar-wrapper .dropdown').append('<a href="#" class="dropdown-icon"><span class="caret"></span></a>');

    $('#sidebar-wrapper .dropdown-icon').click(function () {
          $(this).closest('.dropdown').find('.dropdown-submenu').first().slideToggle();
    });

    var active = '#sidebar-wrapper .active';
    $(active).parents('.dropdown').addClass('parent');
    $('#sidebar-wrapper .active .dropdown-submenu, #sidebar-wrapper .parent .dropdown-submenu').show();
});