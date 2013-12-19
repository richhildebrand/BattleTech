define(['Squire', 'AppGlobals'], function(Squire, appGlobals) {
   describe('ViewPort', function() {
      describe('getView', function() {
         'use strict';
         var _viewPort;
         var _mapDetails;

         beforeEach(function(done) {
            var injector = new Squire();

            appGlobals.camera = {
               bounds: { width: 100, height: 100 },
               view: { x: 0, y:0 }
            };

            injector.mock('AppGlobals', appGlobals);

            injector.require(['Map/ViewPort'], function(ViewPort) {
               _mapDetails = {
                  hexSize: {
                     width: 15,
                     height: 15
                  },
                  height: 15,
                  width: 15
               }

               _viewPort = new ViewPort(_mapDetails);
               done();
            });
         });

         afterEach(function() {
            appGlobals.camera = {};
         });

         describe('Given any view coordinates, getView', function() {
            it('should never set first column less than zero.', function() {
               appGlobals.camera.view.x = -1000;
               appGlobals.camera.view.y = 0;

               var view = _viewPort.getView();

               expect(view.firstRow).to.equal(0);
               expect(view.firstColumn).to.equal(0);
            });

            it('should never set first row less than zero.', function() {
               appGlobals.camera.view.x = 0;
               appGlobals.camera.view.y = -1000;

               var view = _viewPort.getView();

               expect(view.firstRow).to.equal(0);
               expect(view.firstColumn).to.equal(0);
            });

            it('should never set last column greater than map width', function() {
               appGlobals.camera.view.x = 10000;
               appGlobals.camera.view.y = 0;

               var view = _viewPort.getView();

               expect(view.lastRow).to.be.below(_mapDetails.height + 1);
               expect(view.lastColumn).to.be.below(_mapDetails.width + 1);
            });

            it('should never set last row greater than map height', function() {
               appGlobals.camera.view.x = 0;
               appGlobals.camera.view.y = 10000;

               var view = _viewPort.getView();

               expect(view.lastRow).to.be.below(_mapDetails.height + 1);
               expect(view.lastColumn).to.be.below(_mapDetails.width + 1);
            });
         });

         describe('Given a non edge view, getView', function() {
            it('should draw an extra top and bottom row.', function() {
               var twoHexesDeep = _mapDetails.hexSize.height * 2;
               appGlobals.camera.view.x = 0;
               appGlobals.camera.view.y = twoHexesDeep;

               var view = _viewPort.getView();

               var hexesThatFitOnScreen = appGlobals.camera.bounds.height /
                                          _mapDetails.hexSize.height;
               var hexesThatFitOnScreenPlusOne = Math.floor(hexesThatFitOnScreen) + 1;

               expect(view.firstRow).to.equal(1);
               expect(view.lastRow).to.equal(hexesThatFitOnScreenPlusOne + view.firstRow);
            });
         });
      });
   });
});