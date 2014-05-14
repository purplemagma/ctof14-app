$(document).ready(function(){
     $.ajax({
        "type" : "GET",
        "url" : "https://jeffb531-service.codenvy.ctof.intuit.com/api/v1/deals",
        "success" : function(response){
          if(response == null || response == undefined || response == "")
          {
              $("#status").text("Error in getting your deals. Please try again later.");
          }
         else {
            var responseJson = response;
            if(responseJson.success == "true" && responseJson.deals != null && responseJson.deals != undefined)
            {
                var deals = responseJson.deals;
                var dealsHtml = "";
                for(var i in deals)
                {
                    dealsHtml = dealsHtml +
                      '<div class="deal" style="margin-bottom: 10px;">' + 
                        '<div class="dealContent">' + deals[i].vendor + "-" + deals[i].offer + '</div>' + 
                        '<div class="buttonDiv">' + 
                          '<a href="' + deals[i].link + '" style="margin-right: 10px; appearance: button;-moz-appearance: button;-webkit-appearance: button;text-decoration: none; font: menu; color: ButtonText;display: inline-block; padding: 2px 8px;">Get Deal</a>' +
                          '<button type="button" style="cursor:pointer;">Post to my friends</button>' +
                        '</div>' +
                       '</div>';
                }
                
                $("#deals").html(dealsHtml);
            }
            else {
              $("#status").text("Error in getting your deals. Please try again later.");
             }
         }  
        },
        "error" : function(jqXHR, textStatus, errorThrown){
          $("#status").text("Error in getting your deals. Please try again later.");
          console.log("Error thrown:" + errorThrown);
        }
      });
});