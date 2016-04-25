/**
* Button Control - Adds wripple effect
*/

/* start-amd-strip-block */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
/* end-amd-strip-block */

  $.fn.button = function() {

    'use strict';

    // Settings and Options
    var pluginName = 'button';

    // Plugin Constructor
    function Button(element) {
      this.element = $(element);
      this.init();
    }

    // Plugin Methods
    Button.prototype = {
      init: function() {
        var self = this;

        this.isTouch = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isSafari = $('html').is('.is-safari');
        this.isFirefox = $('html').is('.is-firefox');

        if (this.element.hasClass('no-ripple')) {
          return;
        }

        if (this.element.hasClass('btn-menu') && !this.element.hasClass('btn-icon') && !this.element.hasClass('btn-actions')) {
          var ddIcon = this.element.children('.icon').filter(function() {
            return $(this).find('use').attr('xlink:href') === '#icon-dropdown';
          });
          if (!ddIcon.length) {
            ddIcon = $('<svg class="icon icon-dropdown" focusable="false" aria-hidden="true" role="presentation"><use xlink:href="#icon-dropdown"></use></svg>');
            this.element.append(ddIcon);
          }
          if (!ddIcon.hasClass('icon-dropdown')) {
            ddIcon.addClass('icon-dropdown');
          }
        }

        if (this.element.hasClass('icon-favorite')) {
          this.element.on('click.button', function() {
            var use = $(this).find('use');

            if (use.attr('xlink:href') === '#icon-star-outlined') {
              use.attr('xlink:href', '#icon-star-filled');
            } else {
              use.attr('xlink:href', '#icon-star-outlined');
            }

          });
        }

        if (!this.element.parent().is('.field') && this.element.hasClass('btn-actions') && !this.element.data('tooltip')) {
          this.element.attr('title', Locale.translate('More')).tooltip({
            content: Locale.translate('More')
          });
        }

        this.element.hideFocus();

        this.element
        .on('touchstart.button click.button', function (e) {

          if ((self.element.attr('disabled')) || self.element.is('.is-disabled') || (!self.isTouch && e.which !== 1) ||
              ($('.ripple-effect', this).length) || (self.isTouch && e.type !== 'touchstart')) {
            return;
          }

          var element = $(this),
            btnOffset = element.offset(),
            xPos = e.pageX - btnOffset.left,
            yPos = e.pageY - btnOffset.top,
            ripple = $('<svg class="ripple-effect" focusable="false" aria-hidden="true" role="presentation"><circle r="0" class="ripple-circle"></circle></svg>');


          if (self.isTouch) {
            // Make sure the user is using only one finger and then get the touch position relative to the ripple wrapper
            e = e.originalEvent;
            if (e && e.touches && e.touches.length === 1) {
              xPos = e.touches[0].pageX - btnOffset.left;
              yPos = e.touches[0].pageY - btnOffset.top;
            }
          }

          $('svg.ripple-effect', element).remove();
          ripple.css({'left':xPos, 'top':yPos});
          element.prepend(ripple);

          // Start the JS Animation Loop if IE9
          // Or Safari/Firefox has bug with combination like: animation, overflow, position, border-radius etc.)
          if (!$.fn.cssPropSupport('animation') || self.isSafari || self.isFirefox) {
            ripple.removeClass('is-animation');
            self.animateWithJS(ripple);
          } else {
            var elem = $('svg.ripple-effect', element);
            elem.attr('class', elem.attr('class') + ' is-animation');
          }

          setTimeout(function() {
            ripple.remove();
          }, 1000);

        });
      },

      // Browsers that don't support CSS-based animation can still show the animation
      animateWithJS: function(el) {
        var scale = 200,
        xPos = (parseFloat(el.css('left')) - (scale / 2)) + 'px',
        yPos = (parseFloat(el.css('top'))  - (scale / 2)) + 'px';

        el.css({ opacity: 0.4 })
        .animate({
          opacity: 0,
          left: xPos,
          top: yPos,
          width: scale,
          height: scale
        }, 1000);
      },

      destroy: function() {
        this.element.off('touchstart.button touchend.button touchcancel.button mousedown.button mouseup.button mouseleave.button focusout.button');

        var moreTooltip = this.element.data('tooltip');
        if (this.element.hasClass('btn-actions') && moreTooltip) {
          moreTooltip.destroy();
        }

        $.removeData(this.element[0], pluginName);
      }
    };

    // Initialize the plugin (Once)
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        instance = $.data(this, pluginName, new Button(this));
      }
    });
  };

/* start-amd-strip-block */
}));
/* end-amd-strip-block */
