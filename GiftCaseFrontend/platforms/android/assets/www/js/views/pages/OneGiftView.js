define(function(require) {

  var Utils = require("utils");
  var GiftModel = require("models/GiftModel");
  var ContactView = require("views/pages/ContactView");
  var OneItemView = require("views/pages/OneItemView");
  var GiftPresenter = require("presenters/GiftPresenter");
    var URLHelper = require("helpers/URLHelper");

  var OneGiftView = Utils.Page.extend({

    constructorName: "OneGiftView",

    events: {
        "touchend #downloadButton": "downloadGift"
    },

    customInitialize: function(typePar, onegift, appdata){
      onegift = onegift.replace(/\\sl/g,"/").replace(/\\questionmark/g,"?");
      var result = $.parseJSON(onegift);
      this.appdata = appdata;
      this.model = new GiftModel({
        appdata: this.appdata
      });
      console.log(this.model);
      this.model.customSetGift(result);
      this.type = typePar;
      if (this.type === "Inbox")
      {
        this.template = Utils.templates.oneInboxGift;
      }
      else
      {
        this.template = Utils.templates.oneOutboxGift;
      }
    },

    render: function() {
      var self = this;

      var giftPresenter = new GiftPresenter(this.type, this.model);
      var json = this.model.toJSON();
      json = giftPresenter.BuildJSON(json);
      
      var $newEl = $(this.template(json));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());

      var personView = new ContactView();
      var itemView = new OneItemView();
      itemView.initializeModel(this.appdata, this.model.get('Item'));

      if (this.type === "Inbox")
      {
        personView.customSetModel(this.model.get('UserWhoGaveTheGift'));
        this.$el.find('#oneInboxGiftContactPlaceholder').append(personView.render().el);
        this.$el.find('#oneInboxGiftItemPlaceholder').append(itemView.render().el);
      }
      else
      {
        personView.customSetModel(this.model.get('UserWhoReceivedTheGift'));
        this.$el.find('#oneOutboxGiftContactPlaceholder').append(personView.render().el);
        this.$el.find('#oneOutboxGiftItemPlaceholder').append(itemView.render().el);
      }

      return this;
    },

    downloadGift: function()
    {
      var self = this;
      $.get(URLHelper.downloadGift(this.model.get('Item').get('Id'), this.appdata.user.Id), 
        function(data) {
          if (data === false)
          {
            $('#downloadgiftresult').html("An error has occured during downloading of gift");
          }
          $('#downloadgiftresult').html("The process of dowloading the gift has successfully started");
        }, 'json').error(
          function() {
          $('#downloadgiftresult').html("An error has occured during downloading of gift");
      });
    }
  });

  return OneGiftView;
});