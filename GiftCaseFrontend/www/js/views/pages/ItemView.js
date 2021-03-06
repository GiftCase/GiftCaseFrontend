define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");
  var ItemPresenter = require("presenters/ItemPresenter");

  var ItemView = Utils.Page.extend({

    constructorName: "ItemView",

    events: {
        "touchend": "openItem"
    },

    initialize: function(options) {
      var options = options ? options : {};
      this.template = options.template;
      this.model = options.model;
      this.appdata = options.appdata;
      this.handleTouch = options.handleTouch;
      this.targetContactId = options.targetContactId;
    },

    render: function() {
      var json = this.model.toJSON();
      var itemPresenter = new ItemPresenter(this.model, this.appdata);
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

    openItem: function(e) {
      if (this.handleTouch)
      {
        Backbone.history.navigate(
          "oneitemview/" + JSON.stringify(this.model).replace(/\//g,"\\sl").replace(/\?/g,"\\questionmark")+
          "/" + this.targetContactId, 
          {trigger: true});
      }
    }
  });

  return ItemView;

});