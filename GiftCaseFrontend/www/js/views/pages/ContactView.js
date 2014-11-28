define(function(require) {

  var Backbone = require("backbone");
  var ContactModel = require("models/ContactModel");
  var Utils = require("utils");

  var ContactView = Utils.Page.extend({

    constructorName: "ContactView",

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

    id: "contactview",
    className: "i-g page",

    events: {
          "touchend": "openContact"
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