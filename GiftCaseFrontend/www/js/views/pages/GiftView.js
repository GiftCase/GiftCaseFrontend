define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var ItemView = require("views/pages/ItemView");
  var EventContactView = require("views/pages/EventContactView");
  var GiftPresenter = require("presenters/GiftPresenter");

  var GiftView = Utils.Page.extend({

    constructorName: "GiftView",

    events: {
      "touchend": "openGift"
    },

    initialize: function(options) {
      var options = options ? options : {};
      this.model = options.model;
      this.type = options.type;
      this.appdata = options.appdata;
      this.template = Utils.templates.giftView;
    },

    render: function() {
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

      var template;
      if (this.type == "Inbox") {template = Utils.templates.itemInboxView;}
      else if (this.type == "Outbox") {template = Utils.templates.itemOutboxView;}
      
      var itemView = new ItemView({
        model: this.model.get('Item'),
        template: template,
        appdata: this.appdata,
        handleTouch : false,
        targetContactId: ""
      });
      this.$el.find('#giftHolder').append(itemView.render().el);
      
      var userInformation;
      switch(this.type)
      {
        case "Inbox": userInformation = this.model.get('UserWhoGaveTheGift'); break;
        case "Outbox": userInformation = this.model.get('UserWhoReceivedTheGift'); break;
      }

      var personView = new EventContactView();
      personView.customSetModel(userInformation);
      this.$el.find('#contactHolder').append(personView.render().el);

      return this;
    },

    openGift: function()
    {
      Backbone.history.navigate(
          "onegiftview/" + JSON.stringify(this.model).replace(/\//g,"\\sl").replace(/\?/g,"\\questionmark") + "/" + this.type, 
          {trigger: true});
    }
  });

  return GiftView;
});