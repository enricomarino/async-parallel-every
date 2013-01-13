module.exports = parallel_every;

/*
 * parallel_every
 * Test if every item in the array pass 'iterator' async test
 *
 * @param {Array} array array
 * @param {Function} iterator iterator
 * @param {Function} callback callback
 * @api public
 */

function parallel_every(array, iterator, callback) {
  var completed = 0;
  var len = array.length;
  var i;

  function complete(err, result) {
    if (err) {
      callback(err);
      callback = function () {};
      return;
    }
    if (!result) {
      callback(err, false);
      callback = function () {};
      return;
    }
    completed += 1;
    if (completed === len) {
      callback(err, true);
      return;
    }
  }

  for (i = 0; i < len; i += 1) {
    iterator(array[i], complete);
  }
}
