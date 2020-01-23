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
// =====================================================================================================================
// Preloader
$(window).on('load', function () {
    $preloader = $('#preloader');
    $preloader.delay(200).fadeOut('slow');
});
// =====================================================================================================================
// Reset all forms on the page
$(window).on('load', function () {
    var all_forms = document.getElementsByTagName("form");
    for( var i = 0; i < all_forms.length; i++)
    {
       all_forms[i].reset();
    }
});
// =====================================================================================================================
// Page scroll top
function PageScrollTop() {
    jQuery("html").animate({ scrollTop: 0 }, "fast");
}
// =====================================================================================================================
// Click on the corresponding id after reloading the page
$(document).ready(function() {
    if ( window.location.hash ) {
        document.getElementById(window.location.hash.replace('"', '')
            .replace("#", "")).click();
    }
    else{
        document.getElementById('localbitcoins').click();
    }
    // Page scroll top
    PageScrollTop();
});
// =====================================================================================================================
var expanded_sell = false;
function showCheckboxes_sell() {
  var checkboxes_sell = document.getElementById("lb_sellers_black_list");
  if (!expanded_sell) {
    checkboxes_sell.style.display = "block";
    checkboxes_sell.style.position = "absolute";
    checkboxes_sell.style.width = "200px";
    expanded_sell = true;
  } else {
    checkboxes_sell.style.display = "none";
    expanded_sell = false;
  }
}
var expanded_buy = false;
function showCheckboxes_buy() {
  var checkboxes_buy = document.getElementById("lb_buyers_black_list");
  if (!expanded_buy) {
    checkboxes_buy.style.display = "block";
    checkboxes_buy.style.position = "absolute";
    checkboxes_buy.style.width = "200px";
    expanded_buy = true;
  } else {
    checkboxes_buy.style.display = "none";
    expanded_buy = false;
  }
}
// =====================================================================================================================
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
  var regex = /[1-9]|\./;
  // var regex = "^[0-9]*[.][0-9]+$";
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
// =====================================================================================================================
// Tabs opening
function openContent(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tab_pane" and hide them
  tabcontent = document.getElementsByClassName("tab_pane");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tab_title inline-block tab-link" and remove the class "active"
  tablinks = document.getElementsByClassName("tab_title inline-block tab-link");
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
// Clone form
$('.clone_form_button').click(function() {
    var first_form = $('form:first');
    var clone = first_form.clone();
    var main_forms_quantity = document.getElementsByClassName('lb_main_form').length + 1;

    // Add unique id and name to child form
    clone.prop('name', clone.attr('name') + "_" + main_forms_quantity);
    clone.appendTo('.form-block');

    // Add remove button to child form
    var remove_btn_id = "child_form_" + main_forms_quantity;
    $('.div-block-6:last').prepend(`<a id="${remove_btn_id}"  class="remove_form_button">Удалить аккаунт</a>`);

    // // Clear Hmac and secret
    // $('#lb_hmac_key:last').blur();
});
// =====================================================================================================================
// Delete form
$(document).click(function(event) {
    var remove_form_id = $(event.target).attr('id');
    if ( remove_form_id && remove_form_id.includes('child_form_') ) {
       document.getElementById(remove_form_id).closest('form').remove();
    }
});
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
// Only save data from the LocalBitcoins form by Ajax
$('#LB_save_changes').click(function(){
    var LB_save_changes = $('#LB_save_changes');
    var localbitcoins_form = $('#localbitcoins_form');
    $.ajax({ // create an AJAX call...
        // this: localbitcoins_form,
        // data: localbitcoins_form.serialize(),
        data: clearDataForm(localbitcoins_form).replace('LB_start_bot', 'LB_save_changes'), // get and clear the form data
        type: localbitcoins_form.attr('method'), // GET or POST
        success: function () {
            LB_save_changes.prop('value', 'Изменения сохранены!').addClass(' background_teal');
            function return_old_value() {
                LB_save_changes.prop('value', 'Сохранить изменения').removeClass(' background_teal')
            }
            setTimeout(return_old_value, 1500);
        }
    });
    return false;
});
// =====================================================================================================================
// Save data from the LocalBitcoins form by Ajax and start LB bot
$('#LB_bot_btn').click(function(){
    var LB_bot_btn = $('#LB_bot_btn');
    var start_stop_or_save_LB_Bot = $('#start_stop_or_save_LB_Bot');
    var localbitcoins_form = $('#localbitcoins_form');
    LB_bot_btn.prop('value', 'Обрабатывается...').addClass(' background_teal');
    $.ajax({ // create an AJAX call...
        this: localbitcoins_form,
        data: clearDataForm(localbitcoins_form), // get and clear the form data
        type: localbitcoins_form.attr('method'), // GET or POST
        success: function (response) {
            if ( response.is_LB_Bot_running ) {
                is_LB_Bot_running = true;
                LB_bot_btn.prop('name', 'LB_stop_bot')
                    .prop('value', 'Остановить бота')
                    .removeClass(' background_teal')
                    .addClass(' background_red');
                start_stop_or_save_LB_Bot.prop('name', 'LB_stop_bot');
            }
            else {
                is_LB_Bot_running = false;
                LB_bot_btn.prop('name', 'LB_start_bot')
                    .prop('value', 'Запустить бота')
                    .removeClass(' background_teal')
                    .removeClass(' background_red');
                start_stop_or_save_LB_Bot.prop('name', 'LB_start_bot');
            }
        }
    });
    return false;
});
// =====================================================================================================================
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
// // =====================================================================================================================
// (function data_updater() {
//     var LB_bot_btn = $('#LB_bot_btn');
//     var start_stop_or_save_LB_Bot = $('#start_stop_or_save_LB_Bot');
//     $.ajax({url: '/',
//     type: 'GET',
//     success: function(data) {
//         // alert(is_LB_Bot_running);
//         if ( data.is_LB_Bot_running === true ) {
//             // alert('YES');
//             LB_bot_btn.prop('name', 'LB_stop_bot')
//                 .prop('value', 'Остановить бота')
//                 .removeClass(' background_teal')
//                 .addClass(' background_red');
//             start_stop_or_save_LB_Bot.prop('name', 'LB_stop_bot');
//         }
//         if ( data.is_LB_Bot_running === false  ) {
//             // alert('NO');
//             LB_bot_btn.prop('name', 'LB_start_bot')
//                 .prop('value', 'Запустить бота')
//                 .removeClass(' background_teal')
//                 .removeClass(' background_red');
//             start_stop_or_save_LB_Bot.prop('name', 'LB_start_bot');
//         }
//     },
//     complete: function() {
//         // Schedule the next request when the current one's complete
//         setTimeout(data_updater, 1000);
//     }
//     });
// })();

// =====================================================================================================================
(function data_updater() {
    $.ajax({url: '/',
    type: 'GET',
    success: function(response) {
        if ( response.user_ads ) {
            for (var j = 0; j < response.user_ads.length; j++) {
                var id_page_price = response.user_ads[j].ad_id + '_temp_price';
                var resp_temp_price = response.user_ads[j].temp_price;
                var ad_currency = response.user_ads[j].currency;
                var old_price =  $(document.getElementById(id_page_price)).text().split(' ', 1);
                // alert([old_price, resp_temp_price, old_price < resp_temp_price, old_price > resp_temp_price]);
                $(document.getElementById(id_page_price)).text(resp_temp_price + ' ' + ad_currency);
                if ( resp_temp_price < old_price ) {
                    $(document.getElementById(id_page_price)).css('color', 'red');
                }
                if ( resp_temp_price > old_price ) {
                    $(document.getElementById(id_page_price)).css('color', 'blue');
                }
            }
        }
    },
    complete: function() {
        // Schedule the next request when the current one's complete
        setTimeout(data_updater, 1000);
    }
    });
})();