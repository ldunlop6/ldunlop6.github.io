//monkeypatches for IE follow

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}




// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());




(function() {
  $(document).ready(function() {

      firstDigit = null;

      $( "#zip_field" ).keyup(function(e) {
        var age_band, balance, contrib;
        age_band = $("#age_band_select").val();
        var url = "https://fcaittoolbox.com/spring/zipRecord/lookup";
        var len = $(this).val().length;

        if (len == 5 && $('#local').is(':checked')) {

        if ($.isNumeric($("#zip_field").val()) === true) {
          $.ajax({
            type: "POST",
            url: url,
            async: true,
            //jsonpCallback: '',
            contentType: "application/json",
            dataType: 'jsonp',
            data: $("form.tool_input").serialize(),
            success: function(data) {
              var keys;
              console.log(data);
              keys = Object.keys(data.result);
              $("h4.avg_contribution_rate").text(Math.round(data.result.contribpercent.toFixed(2) * 100) + "%");
              $($("h4.avg_account_balance").text(data.result.balance)).currency({
                decimals: 0
              });
            },
            complete: function(){
              $('#local').attr('checked','checked');
            },
            error: function(e) {
              console.log(e.message);
            }
          });
        }
          
        }
    });


    var url;
    $('input#zip_field').val("ZIP Code");
    $("input#zip_field").click(function() {
      $(this).val("").unbind("click");
    });
    $("form.tool_input").submit(function(e) {
      e.preventDefault();
      false;
    });
    $("div#about_the_data").hide();
    $("a#about_data_link").click(function(e) {
      $("div#about_the_data").show();
      return e.preventDefault();
    });
    $("#find_more, #about_data_link").click(function(e) {
      $("html, body").animate({
        scrollTop: 0
      }, 1000);
      $("div#about_the_data").show();
      return e.preventDefault();
    });
    $("input#popover_close").click(function(e) {
      e.preventDefault();
      return $("div#about_the_data").hide();
    });
    url = "https://fcaittoolbox.com/spring/zipRecord/lookup";
    return $("#age_band_select, #national, #local, form.tool_input").change(function() {
      var age_band, balance, contrib;
      
      //if ($('#local:checked').val() === "local") {
        if($('#national').is(':checked')) {
          //console.log('local checked')
        age_band = $("#age_band_select").val();
        switch (age_band) {
          case "0":
            contrib = 0.0820;
            balance = 87900;
            break;
          case "2":
            contrib = 0.0619;
            balance = 9100;
            break;
          case "3":
            contrib = 0.0709;
            balance = 37100;
            break;
          case "4":
            contrib = 0.0797;
            balance = 86600;
            break;
          case "5":
            contrib = 0.0972;
            balance = 144200;
            break;
          case "6":
            contrib = 0.1090;
            balance = 156700;
            break;
          case "7":
            contrib = 0.1224;
            balance = 146700;
            break;
        }
        $("h4.avg_contribution_rate").text(Math.round(contrib.toFixed(2) * 100) + "%");
        return $($("h4.avg_account_balance").text(balance)).currency({
          decimals: 0
        });
      //} else if ($('#national:checked').val() === "national") {
        } else if ($('#local').is(':checked')) {
          //console.log('Local checked');
        /*
        if ($("#zip_field").val() === "") {
          //$("#zip_field").val('12345');
        }
        */

       
            if ($.isNumeric($("#zip_field").val()) === true) {
var url = "https://fcaittoolbox.com/spring/zipRecord/lookup";
          $.ajax({
            type: "POST",
            url: url,
            async: true,
            //jsonpCallback: '',
            contentType: "application/json",
            dataType: 'jsonp',
            data: $("form.tool_input").serialize(),
            success: function(data) {
              var keys;
              console.log(data);
              keys = Object.keys(data.result);
              $("h4.avg_contribution_rate").text(Math.round(data.result.contribpercent.toFixed(2) * 100) + "%");
              $($("h4.avg_account_balance").text(data.result.balance)).currency({
                decimals: 0
              });
            },
            complete: function(){
              $('#local').attr('checked','checked');
            },
            error: function(e) {
              console.log(e.message);
            }
          });
          return false;
        }
      }
    });
  });





}).call(this);
