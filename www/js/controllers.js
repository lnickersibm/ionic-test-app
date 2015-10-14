angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope) {
    $scope.results = [];
    $scope.myVars = {myUrl:"none", myMethod:"none"}

    $scope.methods = ["GET","PUT","POST","DELETE","HEAD"];

    $scope.urls = [
      "http://jsonplaceholder.typicode.com/posts",
      "http://jsonplaceholder.typicode.com/posts/1",
      "http://jsonplaceholder.typicode.com/posts/2",
      "http://jsonplaceholder.typicode.com/posts/3",
      "http://jsonplaceholder.typicode.com/posts/4"];

    $scope.sendRequest = function() {

      var success = function(response) {
        console.log("javascript-MFPRequest From index.js = Success: " + JSON.stringify(response));
        //add the result to the top of the array
        $scope.$apply(function(){
          $scope.results.unshift(
            "SUCCESS CALLLBACK RESPONSE: \n" + response.responseText
          );
          $scope.results.unshift(
            "SUCCESS CALLLBACK HEADERS: \n" + JSON.stringify(response.headers)
          );
        });

      };

      var failure = function(response) {

        console.error("javascript-MFPRequest From index.js = Failure: " + JSON.stringify(response));
        //add the result to the top of the array
        $scope.$apply(function(){$scope.results.unshift(
          "FAILURE CALLBACK RESPONSE ErrorDescription: \n" + response.errorDescription);
        });
      };

      // TRY THE CLIENT
      window.BMSClient.initialize("http://jsonplaceholder.typicode.com", "2c482506-b58f-41c1-a0bc-a40aa6c4accf");

      var route = window.BMSClient.getBluemixAppRoute(function(route) {
        console.error("javascript-BMSClient From index.js = ROUTE: " + route)
        //add the result to the top of the array
        $scope.$apply(function(){$scope.results.unshift("BMSClient.getBluemixAppRoute(): " + route);});
      });

      var guid = window.BMSClient.getBluemixAppGUID(function(guid) {
        console.error("javascript-BMSClient From index.js = BMSClient.getBluemixAppGUID(): " + guid)
        //add the result to the top of the array
        $scope.$apply(function(){$scope.results.unshift("BMSClient.getBluemixAppGUID(): " + guid);});
      });

      // TRY THE GET  REQUEST
      var method = window.MFPRequest.GET;
      var url = "http://jsonplaceholder.typicode.com/posts/1";

      alert("URL: " + $scope.myVars.myUrl );
      alert("METHOD: " + $scope.myVars.myMethod );
      //alert("BODY: " + $scope.myVars.body);

      var myrequest = new window.MFPRequest($scope.myVars.myUrl, $scope.myVars.myMethod);

       myrequest.setQueryParameters({
        parm1: "value1",
        parm2: "value2"
      });

      var reqHeaders = {"Accept" : "*/*", "Larry-Header" : "larry header EMPTY BODY"};
      myrequest.setHeaders(reqHeaders);

      $scope.$apply(function($scope){
        $scope.results.unshift("Req method: " + $scope.myVars.myMethod, "Req Url: " + $scope.myVars.myUrl,
          "Req Headers: " + JSON.stringify(reqHeaders));
      });

      //GET
      if (!$scope.myVars.body || $scope.myVars.body.length == 0)
      {
        alert("EMPTY BODY");
        myrequest.send(success, failure);
      }
      else if (typeof body != Object)
      {
        var reqHeaders = {"Accept" : "*/*", "Content-Type":"application/text","Larry-Header" : "larry header TEXT"};
        myrequest.setHeaders(reqHeaders);

        if( $scope.myVars.method != "GET"){
          myrequest.setQueryParameters({});
        }
        alert("BODY: " + $scope.myVars.body);
        myrequest.send($scope.myVars.body, success, failure);
      }
      else if (typeof body == Object){
        var reqHeaders = {"Accept" : "*/*", "Content-Type":"application/json","Larry-Header" : "larry header JSON"};

      }


    };// end new request

    $scope.dosth = function() {
      console.log('YO!');
    };

  })

  .controller('LoggerCtrl', function($scope) {
    $scope.results = [];

    $scope.myVars = {
      sequenceNumber: 1,
      isCapture: true,
      myRoute: {"route": "http://mfptestbedapp.stage1.mybluemix.net", "guid":"5cf325a3-d325-4fb2-b4ca-1d8e46831c86"},
      myLogLevel: {name:"DEBUG", value:300},
      myFilter: "{\"logger1\":500,\"logger2\":300}"
    };

    $scope.logLevels = [
      {name:"INFO" , value:500},
      {name:"DEBUG", value:300},
      {name:"WARN",  value:200},
      {name:"ERROR", value:100},
      {name:"FATAL", value:50}
    ];

    $scope.routes = [
      {"route": "http://mfptestbedapp.stage1.mybluemix.net", "guid":"5cf325a3-d325-4fb2-b4ca-1d8e46831c86"},
      {"route": "http://s1-imf-dev-hackdayapp-larry.stage1.mybluemix.net?subzone=dev", "guid":"85e0e3f3-882b-46d6-b5e5-645ca05f80a4"},
    ];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.sendLogs = function() {

      var success = function(response) {
        alert("SUCCESS CALLBACK!!!");
        console.log("Success Callback Received: " + JSON.stringify(response));
        //add the result to the top of the array
        $scope.$apply(function(){
          $scope.results.unshift(
            "SUCCESS CALLLBACK RESPONSE: \n" + JSON.stringify(response)
          );
        });

      };

      // DEFINE  FAILURE AN SUCCESS CALLBACKS
      var failure = function(response) {
        alert("FAILURE CALLBACK!!!");
        console.error("Failure Callback Received: " + JSON.stringify(response));
        //add the result to the top of the array
        $scope.$apply(function(){$scope.results.unshift(
          "FAILURE CALLBACK RESPONSE: \n"  + JSON.stringify(response));
        });
      };

      // INTIALIZE THE CLEINT USING ROUTE AND GUID
      window.BMSClient.initialize($scope.myVars.myRoute.route, $scope.myVars.myRoute.guid);

      // CREATE LOGGERS
      var logger1 = MFPLogger.getInstance("logger1");
      var logger2 = MFPLogger.getInstance("logger2");


      // SET CAPTURE
      window.MFPLogger.setCapture($scope.myVars.isCapture);

      //var guid = window.BMSClient.getBluemixAppGUID(function(guid) {
      //  console.error("javascript-BMSClient From index.js = BMSClient.getBluemixAppGUID(): " + guid)
      //  //add the result to the top of the array
      //  $scope.$apply(function(){$scope.results.unshift("BMSClient.getBluemixAppGUID(): " + guid);});
      //});
      // WRITE LOG MESSAGES
      logger1.info ("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER1: info info info");
      logger1.debug("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER1: debug debug debug");
      logger1.warn ("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER1: warn warn warn");
      logger1.error("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER1: error error error");
      logger1.fatal("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER1: fatal fatal fatal");

      logger2.info ("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER2: info info info");
      logger2.debug("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER2: debug debug debug");
      logger2.warn ("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER2: warn warn warn");
      logger2.error("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER2: error error error");
      logger2.fatal("SEQ: "+ $scope.myVars.sequenceNumber +" LOGGER2: fatal fatal fatal");



      if ( !$scope.myVars.myFilter || $scope.myVars.myFilter.length == 0){
        $scope.myVars.myFilter = "{}"
      }

      //alert("Log Filters: " + $scope.myVars.myFilter);

      try {
        var theFilter = JSON.parse($scope.myVars.myFilter);

        window.MFPLogger.setFilters(theFilter);

        alert("Sending with Filters: " + JSON.stringify(theFilter, null, 2));
        console.log("Sending with Filters: " + JSON.stringify(theFilter, null, 2));

        // SEND THE LOG
        window.MFPLogger.send(success, failure);
        //increment the sequencenumber
        $scope.myVars.sequenceNumber++
      }
      catch (err){
        alert("ERROR PARSING FILTER: JSON INVALID: " + $scope.myVars.myFilter + "\n " + err);
      }
      //alert("URL: " + $scope.myVars.myUrl );
      //alert("METHOD: " + $scope.myVars.myMethod );
      //alert("BODY: " + $scope.myVars.body);

      //$scope.$apply(function($scope){
      //  $scope.results.unshift("Req method: " + $scope.myVars.myMethod, "Req Url: " + $scope.myVars.myUrl,
      //    "Req Headers: " + JSON.stringify(reqHeaders));
      //});



    };// end send Logs
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.dosth = function() {
      console.log('YO!');
    };

  });

 /*
  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
*/
