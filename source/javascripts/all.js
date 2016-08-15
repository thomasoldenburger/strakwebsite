//= require_tree .
//= require jquery

closeDropdown = function() {
  $('#demo li').addClass('close');
  $('#demo li').removeClass('open');
}

openDropdown = function(label) {
  $('#demo li').addClass('open');
  $('#demo li').removeClass('close');
}

showForm = function() {
  $('#demo .fields').show()
  $('#demo .btn').show()  
}

recaptchaCallback = function() {
  window.captchaValidated = true;
};

$(document).ready( function() {
  $('#open-dropdown').click( function(){
    if ($('#demo li').hasClass('close')) {
      openDropdown();
    } else {
      closeDropdown();
    }
  });  
  $('#request-demo').click( function(){
    closeDropdown();
    showForm();
    $('#demo .top a').text('Een demo aanvragen')
  });
  $('#request-app').click( function(){
    closeDropdown();
    showForm();
    $('#demo .top a').text('Een afspraak maken')
  });
  $('#request-contact').click( function(){
    closeDropdown();
    showForm();
    $('#demo .top a').text('Telefonisch contact')
  });

  $('#contact-form').submit(function(event) {

      if ($('input[name=org_name]').val() == "") {
        alert("Vul alstublieft uw organisatie in");
        return event.preventDefault();
      }
      if ($('input[name=contact_name]').val() == "") {
        alert("Vul alstublieft uw contactpersoon in");
        return event.preventDefault();
      }
      if ($('input[name=telephone]').val() == "") {
        alert("Vul alstublieft uw telefoonnummer in");
        return event.preventDefault();
      }
      if ($('input[name=email]').val() == "") {
        alert("Vul alstublieft uw e-mail in");
        return event.preventDefault();
      }
      if (window.captchaValidated != true) {
        alert("Bevestig alstublieft dat u geen robot bent.");
        return event.preventDefault();        
      }

      var formData = {
          'org_name'              : $('input[name=org_name]').val(),
          'contact_name'          : $('input[name=contact_name]').val(),
          'telephone'             : $('input[name=telephone]').val(),
          'email'                 : $('input[name=email]').val(),
          'comment'               : $('input[name=comment]').val(),
      };

      $.ajax({
          type        : 'POST', 
          url         : 'form.php', 
          data        : formData,
          encode      : true
      }).done(function(data) {
        alert(data); 
        $('#contact-form').find("input[type=text], textarea").val("");
      }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Het verzenden is helaas niet gelukt.");
      });

      event.preventDefault();
  });  
}) 