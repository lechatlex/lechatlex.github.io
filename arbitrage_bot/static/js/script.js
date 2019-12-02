
// Login page
(function ($) {
    // [ Show pass ]
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass === 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 0;
        }
            });
})(jQuery);


// Preloader
$(window).on('load', function () {
    $preloader = $('#preloader');
    $preloader.delay(200).fadeOut('slow');
});



// Reset all forms on the page
$(window).on('load', function () {
    var all_forms = document.getElementsByTagName("form");
    for( var i = 0; i < all_forms.length; i++)
    {
       all_forms[i].reset();
    }
});


// Page scroll top
function PageScrollTop() {
    jQuery("html").animate({ scrollTop: 0 }, "fast");
}


// Click on the corresponding id after reloading the page
$(document).ready(function() {
	$(function(){
	    if ( window.location.hash ) {
			document.getElementById(window.location.hash.replace('"', '')
				.replace("#", "")).click();
	    }
	    else{
	        if ( document.getElementById('arbitrage') ) {
	           document.getElementById('arbitrage').click();
            }
		}
	    // Page scroll top
        PageScrollTop();
	});
});


// Function to check if numeric values are entered in the fields on the page
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



// Tabs opening
function openContent(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tab_pane");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tab_header_link tab_inline_block tab_link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active_tab", "");
  }

  // Show the current tab, and add an "active_tab" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active_tab";
  // Page scroll top
  PageScrollTop();
}

// =====================================================================================================================
// Clear data in form
function clearDataForm(obj) {
    var obj_to_return = '';
    $.each(obj.serialize().split('&'), function(field, value) {
        var field_value = value[value.length - 1];
        var param = value.split('=')[0];
        if ( field_value !== '=' ) {
            obj_to_return = obj_to_return.concat(value).concat('&');
        }
    });
    return(obj_to_return);
}
// =====================================================================================================================

// Only save data from the arbitrage form by Ajax
$('#arbitrage_save_changes').click(function(){
    var arbitrage_btn = $('#arbitrage_btn');
    var arbitrage_save_changes = $('#arbitrage_save_changes');
    var start_stop_or_save_arbitrage = $('#start_stop_or_save_arbitrage');
    var arbitrage_form = $('#arbitrage_form');
    start_stop_or_save_arbitrage.prop('name', 'arbitrage_settings');
    $.ajax({ // create an AJAX call...
        this: arbitrage_form,
        // data: arbitrage_form.serialize(), // get the form data
        data: clearDataForm(arbitrage_form), // get and clear the form data
        type: arbitrage_form.attr('method'), // GET or POST
        success: function (data) {
            arbitrage_save_changes.prop('value', 'Изменения сохранены!').addClass(' background_teal');
            function return_old_value() {
                arbitrage_save_changes.prop('value', 'Сохранить изменения').removeClass(' background_teal')
            }
            setTimeout(return_old_value, 1500);
            if (arbitrage_btn.attr('name') === 'arbitrage_start_bot') {
                start_stop_or_save_arbitrage.prop('name', 'arbitrage_start_bot');
            } else {
                start_stop_or_save_arbitrage.prop('name', 'arbitrage_stop_bot');
            }
        }
    });
    return false;
});



// Save data from the arbitrage form by Ajax and start arbitrage bot
$('#arbitrage_btn').click(function(){
    var arbitrage_btn = $('#arbitrage_btn');
    var start_stop_or_save_arbitrage = $('#start_stop_or_save_arbitrage');
    var arbitrage_form = $('#arbitrage_form');
    $.ajax({ // create an AJAX call...
        this: arbitrage_form,
        // data: arbitrage_form.serialize(), // get the form data
        data: clearDataForm(arbitrage_form), // get and clear the form data
        type: arbitrage_form.attr('method'), // GET or POST
        success: function () {
            if (arbitrage_btn.attr('name') === 'arbitrage_start_bot') {
                arbitrage_btn.prop('name', 'arbitrage_stop_bot')
                    .prop('value', 'Остановить робота')
                    .addClass(' background_red');
                start_stop_or_save_arbitrage.prop('name', 'arbitrage_stop_bot');
            } else {
                arbitrage_btn.prop('name', 'arbitrage_start_bot')
                    .prop('value', 'Запустить робота')
                    .removeClass(' background_red');
                start_stop_or_save_arbitrage.prop('name', 'arbitrage_start_bot');
            }
        }
    });
    return false;
});


// Save data from the catch_market form by Ajax
$('#catch_market_settings').click(function(){
    var catch_market_settings = $('#catch_market_settings');
    var catch_market_form = $('#catch_market_form');
    $('#save_or_create_orders_catch_market').prop('name', 'catch_market_settings');
    $.ajax({ // create an AJAX call...
        this: catch_market_form,
        // data: catch_market_form.serialize(), // get the form data
        data: clearDataForm(catch_market_form), // get and clear the form data
        type: catch_market_form.attr('method'), // GET or POST
        success: function () {
            catch_market_settings.prop('value', 'Изменения сохранены!').addClass(' background_teal');
            function return_old_value() {
                catch_market_settings.prop('value', 'Сохранить изменения').removeClass(' background_teal')
            }
            setTimeout(return_old_value, 1500);
        }
    });
    return false;
});



// Save data from the catch_market form by Ajax and create orders
$('#catch_market_create_orders').click(function(){
    var catch_market_create_orders = $('#catch_market_create_orders');
    var catch_market_form = $('#catch_market_form');
    catch_market_create_orders.prop('value', 'Обрабатывается...').addClass(' background_teal');
    $('#save_or_create_orders_catch_market').prop('name', 'catch_market_create_orders');
    $.ajax({ // create an AJAX call...
        this: catch_market_form,
        // data: catch_market_form.serialize(), // get the form data
        data: clearDataForm(catch_market_form), // get and clear the form data
        type: catch_market_form.attr('method'), // GET or POST
        success: function (response) {
            if ( response.error_message ) {
                for (var err = 0; err < response.error_message.length; err++) {
                    // alert('Ошибка!\n' + response.error_message[err]);
                    alert(response.error_message[err]);
                }
            }
            catch_market_create_orders.prop('value', 'Ордера выставлены!').addClass(' background_teal');
            function return_old_value() {
                catch_market_create_orders.prop('value', 'Выставить ордера').removeClass(' background_teal')
            }
            setTimeout(return_old_value, 1500);

            // Fill table with catch market data orders
            var orders_data_catch_market = document.getElementById('orders_data_catch_market');
            jQuery(orders_data_catch_market).empty();
            // Create and fill rows with orders data
            var table = document.getElementById('orders_data_catch_market');
            var orders_data = response.orders_data;
            if ( orders_data.length ) {
                // alert(orders_data);
                // jQuery(orders_data_catch_market).show();
                for (var j = 0; j < orders_data.length; j++) {
                    var row_order_data = document.createElement("div");
                    jQuery(row_order_data).addClass('div-block-14 items stat');
                    table.appendChild(row_order_data);
                    for (var k = 0; k < orders_data[j].length; k++) {
                        var elem_data = orders_data[j][k];
                        var cell_data = document.createElement("div");
                        if ( j !== orders_data.length - 1 ){
                            jQuery(cell_data).addClass('text-block-7 stat_cell name_field');
                        }
                        else {
                            jQuery(cell_data).addClass('text-block-7 stat_cell name_field last_bottom_cell');
                        }
                        if ( k === orders_data[j].length - 1 ) {
                            jQuery(cell_data).addClass('text-block-7 stat_cell name_field last_cell');
                        }
                        row_order_data.appendChild(cell_data).append(document.createTextNode(elem_data));
                    }
                }
                $(document.getElementById('catch_market_orders').getElementsByClassName('separator')[0]).hide();
            }
            // else {
            //     jQuery(orders_data_catch_market).hide();
            //     $(document.getElementById('catch_market_orders').getElementsByClassName('separator')[0]).show();
            // }
        }
    });
    return false;
});


// Save data from the main_settings form by Ajax
$('#main_settings').click(function(){
    var main_settings = $('#main_settings');
    var main_settings_form = $('#main_settings_form');
    $.ajax({ // create an AJAX call...
        this: main_settings_form,
        // data: main_settings_form.serialize(), // get the form data
        data: clearDataForm(main_settings_form), // get and clear the form data
        type: main_settings_form.attr('method'), // GET or POST
        success: function (response) {
            main_settings.prop('value', 'Изменения сохранены!').addClass(' background_teal');
            function return_old_value() {
                main_settings.prop('value', 'Сохранить изменения').removeClass(' background_teal')
            }
            setTimeout(return_old_value, 1500);
            if ( response.mes ) {
                alert(response.mes);
                if ( response.mes.includes('Пароль изменён!') ) {
                    window.location = '/';
                }
            }
        }
    });
    return false;
});




// Show balances statistics
$('#statistics_exchanges_balances').click(function(){
    var btn = $('#statistics_exchanges_balances');
    btn.prop('value', 'Обновляю...').addClass(' background_teal');
    $.ajax({ // create an AJAX call...
        type: 'POST',
        data: {
            'csrfmiddlewaretoken': btn.attr('name'),
            'statistics_exchanges_balances': 1
        },
        success: function (response) {
            btn.prop('value', 'Обновить').removeClass(' background_teal');
            var obj = response.all_users_balances;
            var total_balance = obj.total_balance;

            // Clear all balance fields
            var all_balance_fields = document.getElementsByClassName('stat_table exchange_block_form')[0].getElementsByClassName('text-block-7 stat_cell');
            for (var i = 0; i < all_balance_fields.length; i++) {
                field_id = all_balance_fields[i].getAttribute('id');
                if ( typeof field_id === 'string' && (field_id.includes('_balance') || field_id.includes('total')) ) {
                    $(document.getElementById(field_id)).empty();
                }
            }
            Object.keys(obj).map(function(exchange) {
                var key_values = obj[exchange];
                Object.keys(key_values).map(function(coin) {
                    var all_data = [exchange.concat('_').concat(coin).concat('_balance'), key_values[coin]];
                    // Fill field
                    $(document.getElementById(all_data[0])).append(document.createTextNode(all_data[1]));
                });
            });
            Object.keys(total_balance).map(function(coin) {
                var all_total_balances = [coin.concat('_total'), total_balance[coin]];
                // Fill field
                $(document.getElementById(all_total_balances[0])).append(document.createTextNode(all_total_balances[1]));
            });
        }
    });
    return false;
});





// Show statistics of balances changes for the period
$('#show_statistic_from_to').click(function(){
    var btn = $('#show_statistic_from_to');
    var statistic_from_to_form = $('#statistics_change_balance');
    btn.prop('value', 'Обновляю...').addClass(' background_teal');
    // Clear all balance fields
    function clear_balances_fields() {
        var all_balance_fields = document.getElementsByClassName('stat_table_from_to exchange_block_form')[0].getElementsByClassName('text-block-7 stat_cell');
        for (var i = 0; i < all_balance_fields.length; i++) {
            field_id = all_balance_fields[i].getAttribute('id');
            if ( typeof field_id === 'string' && (field_id.includes('_change_balance') || field_id.includes('_total_change_balance')) ) {
                $(document.getElementById(field_id)).empty().removeClass('background_darkseagreen').removeClass('background_red');
            }
        }
    }
    $.ajax({ // create an AJAX call...
        type: 'POST',
        data: statistic_from_to_form.serialize(),
        success: function (response) {
            btn.prop('value', 'Посмотреть').removeClass(' background_teal');
            if ( !response.res_balance ) {
                // Clear all balance fields
                clear_balances_fields();
            }
            var obj = response.res_balance;
            var total_balance = obj.total_balance;
            // alert(JSON.stringify(obj));

            // Clear all balance fields
            clear_balances_fields();

            Object.keys(obj).map(function(exchange) {
                var key_values = obj[exchange];
                Object.keys(key_values).map(function(coin) {
                    var all_data = [exchange.concat('_').concat(coin).concat('_change_balance'), key_values[coin]];
                    // Fill field
                    if ( all_data[1] > 0 ) {
                        $(document.getElementById(all_data[0])).append(document.createTextNode(all_data[1])).addClass(' background_darkseagreen');
                    }
                    else {
                        $(document.getElementById(all_data[0])).append(document.createTextNode(all_data[1])).addClass(' background_red');
                    }
                    if ( all_data[1] === 0 ) {
                        $(document.getElementById(all_data[0])).empty().removeClass('background_darkseagreen').removeClass('background_red');
                    }
                });
            });
            Object.keys(total_balance).map(function(coin) {
                var all_total_balances = [coin.concat('_total_change_balance'), total_balance[coin]];
                // Fill field
                if ( all_total_balances[1] > 0 ) {
                    $(document.getElementById(all_total_balances[0])).append(document.createTextNode(all_total_balances[1])).addClass(' background_darkseagreen');
                }
                else {
                    $(document.getElementById(all_total_balances[0])).append(document.createTextNode(all_total_balances[1].toString().replace('-', ''))).addClass(' background_red');
                }
                if ( all_total_balances[1] === 0 ) {
                        $(document.getElementById(all_total_balances[0])).empty().removeClass('background_darkseagreen').removeClass('background_red');
                }
            });
        }
    });
    return false;
});




// Show operations statistics
$('#statistics_operations').click(function(){
    var btn = $('#statistics_operations');
    btn.prop('value', 'Обновляю...').addClass(' background_teal');
    $.ajax({ // create an AJAX call...
        type: 'POST',
        data: {
            'csrfmiddlewaretoken': btn.attr('name'),
            'statistics_operations': 1
        },
        success: function (response) {
            btn.prop('value', 'Обновить').removeClass(' background_teal');
            var orders_data = response.orders_data;
            var statistic_operation_name_fields = response.statistic_operation_name_fields;
            var table = document.getElementById('table_operations');
            var old_block = $('#fields_operation_names');

            // Clear old data
            while (table.childNodes.length > 1) {
                table.removeChild(table.lastChild);
            }

            // Create row with field operation names
            if ( old_block.css('display') !== 'none' ) {
                old_block.hide();
                var row_fields_name = document.createElement("div");
                jQuery(row_fields_name).addClass('div-block-14 items stat');
                table.appendChild(row_fields_name);
                for (var i = 0; i < statistic_operation_name_fields.length; i++) {
                    var cell = document.createElement("div");
                    if ( orders_data.length ) {
                        if (i !== statistic_operation_name_fields.length - 1) {jQuery(cell).addClass('text-block-7 stat_cell name_field')}
                        else {jQuery(cell).addClass('text-block-7 stat_cell name_field last_cell')}}
                    else {
                        if (i !== statistic_operation_name_fields.length - 1) {jQuery(cell).addClass('text-block-7 stat_cell name_field last_bottom_cell')}
                         else {jQuery(cell).addClass('text-block-7 stat_cell name_field last_bottom_cell last_cell')}}
                    row_fields_name.appendChild(cell).append(document.createTextNode(statistic_operation_name_fields[i]))}
            }

            // Create and fill rows with orders data
            if ( orders_data.length ) {
                for (var j = 0; j < orders_data.length; j++) {
                    var row_order_data = document.createElement("div");
                    jQuery(row_order_data).addClass('div-block-14 stat_line');
                    table.appendChild(row_order_data);
                    for (var k = 0; k < orders_data[j].length; k++) {
                        var elem_data = orders_data[j][k];
                        var cell_data = document.createElement("div");
                        if ( j !== orders_data.length - 1 ){
                            jQuery(cell_data).addClass('text-block-7 stat_cell');
                        }
                        else {
                            jQuery(cell_data).addClass('text-block-7 stat_cell last_bottom_cell');
                        }
                        if ( k === orders_data[j].length - 1 ) {
                            jQuery(cell_data).addClass('text-block-7 stat_cell name_field last_cell');
                        }
                        row_order_data.appendChild(cell_data).append(document.createTextNode(elem_data));
                    }
                }
            }
        }
    });
    return false;
});