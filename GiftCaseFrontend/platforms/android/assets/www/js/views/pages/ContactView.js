define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var ContactView = Utils.Page.extend({

    constructorName: "ContactView",

    tagName: 'li',

    className: "table-view-cell media",

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
      $(this.el).html(this.template(this.model.toJSON()));
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