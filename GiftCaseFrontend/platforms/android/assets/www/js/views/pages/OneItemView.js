define(function(require) {

  var Utils = require("utils");
  var ItemModel = require("models/ItemModel");
  var ItemPresenter = require("presenters/ItemPresenter");

  var OneItemView = Utils.Page.extend({

    constructorName: "OneItemView",

    events: {
        "touchend #sendGiftButton": "sendGift"
    },

    initializeJSON: function(oneitem, appdata, targetContactId) {

      this.template = Utils.templates.oneItem;
      oneitem = oneitem.replace(/\\sl/g,"/").replace(/\\questionmark/g,"?");
      var result = $.parseJSON(oneitem);
      this.model = new ItemModel();
      this.model.customSetItem(appdata, result);
      this.appdata = appdata;
      this.targetContactId = targetContactId;
    },

    initializeModel : function(appdata, model)
    {
      this.template = Utils.templates.oneItemGift;
      this.model = model;
      this.appdata = appdata;
    },

    render: function() {

      var self = this;
      //console.log(this.appdata);
      var itemPresenter = new ItemPresenter(this.model, this.appdata);
      var json = this.model.toJSON();
      json = itemPresenter.BuildJSON(json);

      var $newEl = $(this.template(json));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      return this;
    },

    sendGift: function(){
      Backbone.history.navigate(
          "sendgiftview/" + JSON.stringify(this.model).replace(/\//g,"\\sl").replace(/\?/g,"\\questionmark") + 
          "/" + this.targetContactId, 
          {trigger: true});
    }
  });

  return OneItemView;
});