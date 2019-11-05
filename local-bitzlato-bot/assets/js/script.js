// Page scroll top
function PageScrollTop() {
    jQuery("html").animate({ scrollTop: 0 }, "fast");
}



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




// Delete form
$(document).click(function(event) {
    var remove_form_id = $(event.target).attr('id');
    if ( remove_form_id && remove_form_id.includes('child_form_') ) {
       document.getElementById(remove_form_id).closest('form').remove();
    }
});
