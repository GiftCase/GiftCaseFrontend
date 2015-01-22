define(function(require) {

	var Utils = require("utils");

	var StorageHelper = {

		saveTofileDummy: function(key, value, handleFileSave){
			//handleFileSave(true);
			handleFileSave(true);
		},

		saveTofile: function(key, value, handleFileSave){

			alert("write");
			window.applicationPreferences.set(key, value, function() {
		        handleFileSave(true);
		    }, function(error) {
		        handleFileSave(false);
			});
	      /*sharedpreferences.getSharedPreferences("com.dsd2014.GiftCase", "MODE_PRIVATE", function(){
	        sharedpreferences.putString(key, value, function(){
		        handleFileSave(true);
			    }, function()
			    {
			        handleFileSave(false);
			    });
	        
	      }, function() 
	      {
	      	handleFileSave(false);
	      });*/
	    },

	    read: function(key, handleFileRead){
	    	alert("read");
	    	window.applicationPreferences.get(key, function(value) {
			        handleFileRead(true, data);
			    }, function(error) {
			        handleFileRead(false);
			});
	      /*sharedpreferences.getSharedPreferences("com.dsd2014.GiftCase", "MODE_PRIVATE", function(){
	        sharedpreferences.getString(key, function(data){
		        handleFileRead(true, data);
		      }, function(){
		        handleFileRead(false);
		      });
	      }, function() {
	        handleFileRead(false);
	      });*/
	    },

	    readDummy: function(key, handleFileRead){
	    	//handleFileRead(true, "");
	    	handleFileRead(false, "");
	    	//handleFileRead(true, "10204523203015435");
	    }
  	};

	return StorageHelper;
});