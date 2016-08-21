(function(){

  'use strict';

  var input = document.getElementById('js-input'),
      execute = document.getElementById('js-execute'),
      digest = document.getElementById('js-digest');

  execute.addEventListener('click', function() {
    Promise
      .resolve(input.value)
      .then(function(text) {
        var buffer = new TextEncoder('utf-8').encode(text);

        return (crypto.subtle || crypto.webkitSubtle).digest('SHA-256', buffer);
      })
      .then(function(digested) {
        digest.innerHTML = convertToHex(digested).join('');
      })
      .catch(function(err) {
        console.error(err);
      });
  }, false);

  function convertToHex(buffer) {
    var results = [],
        view = new DataView(buffer),
        i, len, value, hexValue;

    for (i = 0, len = view.byteLength; i < len; i += 4) {
      value = view.getUint32(i).toString(16);
      hexValue = ('00000000' + value).slice(-8);

      results.push(hexValue);
    }

    return results;
  }

}());
