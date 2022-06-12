//init feather icons
feather.replace();

let menuItem = $(".menu-item");
let wrapper = $("#wrapper");

menuItem.click(function() {
  let activeClass = $(this).data("color");
  wrapper.removeClass();
  wrapper.addClass(activeClass);
  menuItem.addClass("inactive");
  $(this).removeClass("inactive");
});
