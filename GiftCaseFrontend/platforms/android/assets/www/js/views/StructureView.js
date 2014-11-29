define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",

    id: "main",

    events: {
      "touchend #nav1": "contacts",
      "touchend #nav2": "eventsview",
      "touchend #nav3": "contacts"
    },

    initialize: function(options) {
      // load the precompiled template
      this.template = Utils.templates.structure;
      //this.on("inTheDOM", this.rendered);
      // bind the back event to the goBack function
      //document.getElementById("back").addEventListener("back", this.goBack(), false);
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      // cache a reference to the content element
      this.contentElement = this.$el.find('#content')[0];
      return this;
    },

    // rendered: function(e) {
    // },

    // generic go-back function
    goBack: function() {
      //window.history.back();
    },

    setActiveTabBarElement: function(elementId) {
      // here we assume that at any time at least one tab bar element is active
      if (document.getElementsByClassName("active")[0] != undefined)
      {
        document.getElementsByClassName("active")[0].classList.remove("active");
      }
      document.getElementById(elementId).classList.add("active");
    },

    eventsview: function(event) {
      Backbone.history.navigate("eventsview", {
        trigger: true
      });
    },

    contacts: function(event) {
      Backbone.history.navigate("contacts", {
        trigger: true
      });
    }
  });

  return StructureView;

});