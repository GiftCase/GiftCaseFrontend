define(function(require) {

  var Utils = require("utils");

  var GiftBoxView = Utils.Page.extend({

    constructorName: "GiftBoxView",

    initialize: function() {
      this.template = Utils.templates.giftBoxView;
    },

    render: function() {

      this.$el.html(this.template());

      return this;
    }
  });

  return GiftBoxView;
});