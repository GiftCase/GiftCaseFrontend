define(function(require) {

  var Backbone = require("backbone");
  var GiftCollection = require("collections/GiftCollection");
  var GiftView = require("views/pages/GiftView");
  var Utils = require("utils");
  var _ = require("underscore");

  var GiftCollectionView = Utils.Page.extend({

    constructorName: "GiftCollectionView",

    initialize: function(options) {
      var options = options ? options : {};
      this.appdata = options.appdata;
      this.template = Utils.templates.giftCollectionList;
      this.collection = new GiftCollection();
      this.collection.setType(options.CollectionType);
      switch (options.CollectionType)
      {
        case "Outbox": this.listenTo(this.collection, "showOutbox", this.render);break;
        case "Inbox": this.listenTo(this.collection, "showInbox", this.render);break;
      }  
      this.collection.setUserId(options.UserId);
      this.collection.setListStart(options.Start);
      this.collection.setListEnd(options.End);
      this.collection.getGifts();
    },

    render: function() {

      var self = this;

      var $newEl = $(this.template());

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());
      if (this.collection.errorMessage !== '')
      {
        this.$el.find('#errorContactsList').html(this.collection.errorMessage);
        this.$el.find('#errorContactsList').show();
      }
      else
      {
        this.collection.each(function(gift){
          var giftView = new GiftView(
            {
              model: gift,
              type: this.collection.type,
              appdata: this.appdata
            });
          self.$el.find('#giftsCollectionHolder').append(giftView.render().el);
        }, this);
        this.$el.find('#errorContactsList').hide();
      }

      return this;
    }
  });

  return GiftCollectionView;

});