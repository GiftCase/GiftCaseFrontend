define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var ContactView = Utils.Page.extend({

    constructorName: "ContactView",

    events: {
        "touchend": "openContact"
    },

    customSetModel : function(contactPar)
    {
      this.model = contactPar;
    },

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.contact;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    render: function() {
      var $newEl = $(this.template(this.model.toJSON()));

      if (this.$el[0].tagName !== $newEl[0].tagName || 
          this.$el[0].className !== $newEl[0].className || 
          this.$el[0].id !== $newEl[0].id) {
        this.setElement($newEl);
      }

      this.$el.html($newEl.html());

      return this;
    },

    openContact: function(e) {
        Backbone.history.navigate(
          "onecontactview/" + JSON.stringify(this.model).replace(/\//g,"\\sl"), 
          {trigger: true});
    }
  });

  return ContactView;

});