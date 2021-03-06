define(['AppGlobals'],
function(appGlobals) {
   var calculateMaxRightScroll = function(amountToMove) {
      var view = appGlobals.camera.view;
      var bounds = appGlobals.camera.bounds;

      var mapDetails = appGlobals.map.getDetails();
      var hexWidth = mapDetails.hexSize.width;
      var numberOfHexes = mapDetails.width;

      var maxScrollablePoint = _calculateMaxScrollBound(hexWidth,
                                                        numberOfHexes,
                                                        bounds.width)

      var extraPaddingForSomeReasonIdoNotKnow = hexWidth / 3;
      maxScrollablePoint += extraPaddingForSomeReasonIdoNotKnow;
      return _adjustMaxDestinationIfInvalid(amountToMove,
                                            view.x,
                                            maxScrollablePoint);
   }

   var calculateMaxBottomScroll = function(amountToMove) {
      var view = appGlobals.camera.view;
      var bounds = appGlobals.camera.bounds;

      var mapDetails = appGlobals.map.getDetails();
      var hexHeight = mapDetails.hexSize.height;
      var numberOfHexes = mapDetails.height;

      var maxScrollablePoint = _calculateMaxScrollBound(hexHeight,
                                                        numberOfHexes,
                                                        bounds.height)

      var extraPaddingForOddColumns = hexHeight / 2;
      maxScrollablePoint += extraPaddingForOddColumns;

      return _adjustMaxDestinationIfInvalid(amountToMove,
                                            view.y,
                                            maxScrollablePoint);
   }

   var _calculateMaxScrollBound = function(hexSize, numberOfHexes, bounds) {
      var numberOfHexesOnScreenHeight = bounds / hexSize;
      return (numberOfHexes - numberOfHexesOnScreenHeight) * hexSize;
   }

   var _adjustMaxDestinationIfInvalid = function(movement, currentLocation, maxBound) {
      var destination = currentLocation + movement;
      var destinationOutOfBounds = destination > maxBound;
      if (destinationOutOfBounds) {
         movement = maxBound - currentLocation;
      }

      return movement;
   }

   var adjustMinDestinationIfInvalid = function(movement, currentLocation, minBound) {
      var destination = currentLocation + movement;
      var destinationOutOfBounds = destination < minBound;
      if (destinationOutOfBounds) {
         movement = minBound - currentLocation;
      }

      return movement;
   }

   return {
      calculateMaxRightScroll: calculateMaxRightScroll,
      calculateMaxBottomScroll: calculateMaxBottomScroll,
      adjustMinDestinationIfInvalid: adjustMinDestinationIfInvalid,

      _calculateMaxScrollBound: _calculateMaxScrollBound,
      _adjustMaxDestinationIfInvalid: _adjustMaxDestinationIfInvalid
   }
});