define(function(require) {

  var Utils = require("utils");
  var ItemModel = require("models/ItemModel");
  var URLHelper = require("helpers/URLHelper");

  var BuyGiftView = Utils.Page.extend({

    constructorName: "BuyGiftView",

    events: {
        "touchend #acceptButton": "sendGift",
        "touchend #paypalOption": "showPaypalForm",
        "touchend #creditcardOption" : "showCreditCard"
    },

    initialize: function() {
      this.template = Utils.templates.buygiftview;
    },

    customInitialize: function(appdata, oneitem, targetContactId){
      oneitem = oneitem.replace(/\\sl/g,"/").replace(/\\questionmark/g,"?");
      var result = $.parseJSON(oneitem);
      this.appdata = appdata;
      this.item = new ItemModel();
      this.item.customSetItem(result);
      this.targetContactId = targetContactId;
    },

    render: function() {
      this.$el.html(this.template(this.item.toJSON()));
      return this;
    },

    showPaypalForm: function(){
      this.paymentType = "paypal";
      $('#accountinformationholder').html(Utils.templates.paypalInformation());
    },

    showCreditCard: function(){
      this.paymentType = "card";
      $('#accountinformationholder').html(Utils.templates.creditCardInformation());
    },

    sendGift: function(){
      if (this.validateInput())
      {
        $.get(URLHelper.sendGift(this.item.get('Id'), this.item.get('Store'), this.appdata.user.get('Id'), this.targetContactId), 
            function(data) {
              console.log(data);
              if (data.Id === "" || data.Id === undefined)
              {
                $("#giftSendingResult").text("An error has occured during the sending of the present");
              }
              $("#giftSendingResult").text("The present has successfully been sent to the target contact");
            }, 'json').error(
              function() {
              $("#giftSendingResult").text("An error has occured during the sending of the present");
        });
        $("acceptButton").attr("disabled", true);
      }
    },

    validateInput: function(){
      var success = true;
      if (this.paymentType === "card"){
        if ($("#creditcardnumber").val() === undefined || $("#creditcardnumber").val() === null ||
          $("#creditcardnumber").val() === "")
        {
          success = false;
          $("#creditcardnumbergroup").removeClass("has-success");
          $("#creditcardnumbergroup").addClass("has-error");
        }
        else
        {
          $("#creditcardnumbergroup").removeClass("has-error");
          $("#creditcardnumbergroup").addClass("has-success");
        }

        if ($("#creditcardyear").val() === undefined || $("#creditcardyear").val() === null ||
          $("#creditcardyear").val() === "")
        {
          success = false;
          $("#creditcardyeargroup").removeClass("has-success");
          $("#creditcardyeargroup").addClass("has-error");
        }
        else
        {
          $("#creditcardyeargroup").removeClass("has-error");
          $("#creditcardyeargroup").addClass("has-success");
        }

        if ($("#creditcardmonth").val() === undefined || $("#creditcardmonth").val() === null ||
          $("#creditcardmonth").val() === "")
        {
          success = false;
          $("#creditcardmonthgroup").removeClass("has-success");
          $("#creditcardmonthgroup").addClass("has-error");
        }
        else
        {
          $("#creditcardmonthgroup").removeClass("has-error");
          $("#creditcardmonthgroup").addClass("has-success");
        }

        if ($("#validationcode").val() === undefined || $("#validationcode").val() === null ||
          $("#validationcode").val() === "")
        {
          success = false;
          $("#validationcodegroup").removeClass("has-success");
          $("#validationcodegroup").addClass("has-error");
        }
        else
        {
          $("#validationcodegroup").removeClass("has-error");
          $("#validationcodegroup").addClass("has-success");
        }        
      }
      else{
        if ($("#paypalpassword").val() === undefined || $("#paypalpassword").val() === null ||
          $("#paypalpassword").val() === "")
        {
          success = false;
          $("#paypalpasswordgroup").removeClass("has-success");
          $("#paypalpasswordgroup").addClass("has-error");
        }
        else
        {
          $("#paypalpasswordgroup").removeClass("has-error");
          $("#paypalpasswordgroup").addClass("has-success");
        } 
        if ($("#paypalnumber").val() === undefined || $("#paypalnumber").val() === null ||
          $("#paypalnumber").val() === "")
        {
          success = false;
          $("#paypalnumbergroup").removeClass("has-success");
          $("#paypalnumbergroup").addClass("has-error");
        }
        else
        {
          $("#paypalnumbergroup").removeClass("has-error");
          $("#paypalnumbergroup").addClass("has-success");
        } 
      }

      return success;
    }    
  });

  return BuyGiftView;
});