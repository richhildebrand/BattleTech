define(['AppGlobals', 'Units/Mech', 'Turns/Turn'],
function(appGlobals, Mech, turn) {
   'use strict';

   var initUnits = function() {
      appGlobals.units.push(new Mech(2, 2, 'Images/redMech.jpg'));
      appGlobals.units.push(new Mech(0, 3, 'Images/axeMech.jpg'));

      var startingMech = appGlobals.units[0];
      turn.start(startingMech);
   }
   return { initUnits: initUnits };
});