var baseUrl = "https://jeffb531-service.codenvy.ctof.intuit.com/api";

var getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function() {
  $.ajax({
      url:baseUrl+"/v1/orders/order/"+getParameterByName("orderId"),
      contentType:"application/json; charset=utf-8",
      dataType: 'json',
      type: 'GET'
    }).done(function(data) {
      $('#custInfo').text(data.customerName+" e-mail: "+data.customerEMail);
      $('#custAddress').text(data.customerAddress);
      $('#customerText').text(data.customerText);
    });
    
    if (getParameterByName("status") === "ordered") {
      $("#orderButtons").css("display","inline");
    }
  
  $('#confirm').click(function() {
    var sendSmsData = {
            "recepientPhoneNumber" :  "+1" + $("#customerText").val(),
            "messageContent" : "order received"
         };
    $.ajax({
      url:baseUrl+"/v1/blabber",
      contentType:"application/json; charset=utf-8",
      dataType: 'json',
      type: 'POST',
      data: sendSmsData
    }).done(function(data) {
    }).fail(function( jqXHR, textStatus, errorThrown) {
    });
  });
});
