
// Прелоадер
$(window).on('load', function () {
    $preloader = $('#preloader');
    $preloader.delay(200).fadeOut('slow');
  });



// Клик по соответствующему id после перезагрузки страницы
$(document).ready(function() {
	// alert (window.location.hash);
	$(function(){
	    if ( window.location.hash ) {
	        // $(window.location.hash).click(); //clicks on element specified by hash
			document.getElementById(window.location.hash.replace('"', '')
				.replace("#", "")).click();
	    }
	    else{
	    	document.getElementById('arbitrage').click();
		}
	});
});


// Функция для проверки, введены ли числовые значения в поля на странице
function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}



// Открытие табов
function openContent(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("w-tab-pane");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tab_header_link w-inline-block w-tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w--current", "");
  }

  // Show the current tab, and add an "w--current" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " w--current";
}


$(document).ready(function() {
    $('.exchange_block_form').submit(function() { // catch the form's submit event
        $.ajax({ // create an AJAX call...
            this: $(this),
            data: $(this).serialize(), // get the form data
            type: $(this).attr('method'), // GET or POST
            success: function()
            {
                var arbitrage_btn = $('#arbitrage_btn');
                var flag_start_or_stop_arbitrage = $('#flag_start_or_stop_arbitrage');
                if ( arbitrage_btn.attr('name') === 'arbitrage_start_bot' ) {
                    arbitrage_btn.prop('name', 'arbitrage_stop_bot')
                        .prop('value', 'Остановить робота')
                        .addClass(' red');
                    flag_start_or_stop_arbitrage.prop('name', 'arbitrage_stop_bot');
                }
                else {
                    arbitrage_btn.prop('name', 'arbitrage_start_bot')
                        .prop('value', 'Запустить робота')
                        .removeClass(' red');
                    flag_start_or_stop_arbitrage.prop('name', 'arbitrage_start_bot');
                }
            }
        });
        return false;
    });
});
