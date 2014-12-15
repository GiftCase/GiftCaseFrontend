define(function(require) {

  var Backbone = require("backbone");
  var ItemCollection = require("collections/ItemCollection");
  var ItemView = require("views/pages/ItemView");
  var Utils = require("utils");

  var ItemsView = Utils.Page.extend({

    constructorName: "ItemsView",

    initialize: function(options) {
      this.template = Utils.templates.itemsList;
      this.appdata = options.appdata;
      this.collection = new ItemCollection();
      this.listenTo(this.collection, "showItems", this.render);
      this.collection.setTargetContact(options.targetContact);
      this.collection.getItems();
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
        this.collection.each(function(item){
          var itemView = new ItemView({
            model: item,
            template: Utils.templates.itemSuggestedView,
            appdata: this.appdata,
            handleTouch: true
          });
          self.$el.find('#suggestedgiftslist').append(itemView.render().el);
        }, this);
        this.$el.find('#errorContactsList').hide();
      }

      return this;
    }
  });

  return ItemsView;

});