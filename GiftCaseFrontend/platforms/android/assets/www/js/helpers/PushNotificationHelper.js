var app = {
  
  initialize: function(){
  },

  configure: function(callback, caller, messageCallback){
    app.callback = callback;
    app.callerobject = caller;
    app.messageCallback = messageCallback;
  },

  setDeviceId: function(deviceId){
    app.deviceId = deviceId;
  },

  successHandler: function(result) {
  	//alert("Success result " + JSON.stringify(result));
    //alert('Callback Success! Result = '+ result);
    if (app.deviceId)
    {
      $("#messages").html($("#messages").html() + " push notification receive id" + app.deviceId);
      app.callback(app.deviceId, app.callerobject);
      app.notificationSent = true;
    }
  },

  errorHandler: function(error) {
      //alert(error);
  },

  onNotificationGCM: function(e) {
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
              //alert('registration id = ' + e.regid);
              
              if (!app.notificationSent)
              {
                $("#messages").html($("#messages").html() + " push notification receive id" + e.regid);
                app.callback(e.regid, app.callerobject);
              }
            }
        break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
          app.messageCallback('success', e.message, e.msgcnt, app.callerobject);
        break;

        case 'error':
          //alert('GCM error = '+e.msg);
          app.messageCallback('error', e.message, 0, app.callerobject);
        break;

        default:
          //alert('An unknown GCM event has occurred');
          break;
    }
  }
};

app.initialize();

define(function(require) {

  var StorageHelper = require("helpers/StorageHelper");

	var PushNotificationHelper = {      

		init: function(options)
		{
      var self = this;
			this.pushNotification = window.plugins.pushNotification;
      app.configure(options.callback, options.caller, options.messageCallback);

			StorageHelper.read("GCMID", function (success, data){
		        if (success)
		        {
		        	//alert("GCMID read success");
		        	if (data !== "")
		        	{
			        	//alert("options.appdata.user.DeviceId" + data);
			        	app.setDeviceId(data);
			        }
              $("#messages").html($("#messages").html() + " read push notification id from db" + app.deviceId);
              self.pushNotification.register(app.successHandler, app.errorHandler, {"senderID":"652975071728","ecb":"app.onNotificationGCM"});
		        }
		        else
		        {
		        	//alert("GCMID not read");
              $("#messages").html($("#messages").html() + " register new id" + app.deviceId);
              self.pushNotification.register(app.successHandler, app.errorHandler, {"senderID":"652975071728","ecb":"app.onNotificationGCM"});      
		        }
		    });
      //alert('register for push notifications');
      //options.callback("322", options.caller);
		},

		deinit: function(){
			this.pushNotification.unregister(function(){
  				//alert("push notifications unregistered");
  			},
  			function(){
  				//alert("push notifications not unregistered");
  			});
  		}
  	};

	return PushNotificationHelper;
});