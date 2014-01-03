(function() {
  'use strict';

  var SlotMachine = function() {

    this.prizes = ['a cup of Coffee', 'a cup of Tea', 'a shot of Espresso'];
    this.$slotMachine = $('.slotmachine');
    this.$lever = $('.lever');
    this.$reel = $('.reel');
    this.$result = $('.result');
    this.reelOriginalHeight = 2250;

    this.pullLever();

  };

  SlotMachine.prototype.getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  SlotMachine.prototype.spin = function() {
    var selected = [];

    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 100; i++) {
        selected[j] = this.getRandom(0,2);
      }
    }

    console.log(selected);
    this.animateSpin(selected);
    return selected;
  };

  SlotMachine.prototype.animateSpin = function(result) {

    var _this = this;

    var $reel1 = $('.reel', '.window1');
    var $reel2 = $('.reel', '.window2');
    var $reel3 = $('.reel', '.window3');

    var reelPixels = [];

    var reelEndPoint = [];

    var resetTranslate = {
      '-webkit-transform' : 'translateY(0px)',
      '-moz-transform' : 'translateY(0px)',
      'transform' : 'translateY(0px)'
    };

    // Reset the reels position
    $reel1.css(resetTranslate);
    $reel2.css(resetTranslate);
    $reel3.css(resetTranslate);

    // Reset the reels height
    $reel1.height(this.reelOriginalHeight);
    $reel2.height(this.reelOriginalHeight);
    $reel3.height(this.reelOriginalHeight);

    // Get the extra pixels
    for (var i = 0; i < result.length; i++) {
      if( result[i] === 0 ) {
        reelPixels[i] = 150;
      }
      else if( result[i] === 1 ) {
        reelPixels[i] = 300;
      }
      else if( result[i] === 2 ) {
        reelPixels[i] = 450;
      }
    }

    for (var j = 0; j < result.length; j++) {
      reelEndPoint[j] = this.reelOriginalHeight + reelPixels[j];
    }

    $reel1.height(reelEndPoint[0]);
    $reel2.height(reelEndPoint[1]);
    $reel3.height(reelEndPoint[2]);

    move('.window1 .reel')
      .ease('in-out')
      .y(-reelEndPoint[0]+150)
      .end(function() {
        _this.$lever.removeClass('lever--pull');
        move('.window2 .reel')
          .ease('in-out')
          .y(-reelEndPoint[1]+150)
          .end(function() {
            move('.window3 .reel')
            .ease('in-out')
            .y(-reelEndPoint[2]+150)
            .end(function() {
              _this.checkResult(result);
            });
          });
      });
  };

  SlotMachine.prototype.checkResult = function(result) {
    var verifyResult = _.uniq(result);

    if( verifyResult.length === 1 ) {
      this.$result.text('You won ' + this.prizes[verifyResult[0]] + '!');
    }
    else {
      this.$result.text('Try again!');
    }
  };

  SlotMachine.prototype.pullLever = function() {
    var _this = this;
    this.$lever.on('click', function() {
      event.preventDefault();
      _this.spin();
      $(this).addClass('lever--pull');
    });
  };

  var slot1 = new SlotMachine();
})();
