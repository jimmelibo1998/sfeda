export const arrayDiff = (a, b) => {
  var ret = [],
    merged = [];

  merged = a.concat(b);

  for (var i = 0; i < merged.length; i++) {
    // When the element is contained ONLY
    //   one time then the search from
    //   left returns the same value as
    //   the search from the right.
    if (merged.indexOf(merged[i]) === merged.lastIndexOf(merged[i])) {
      // ... in that case the element
      // is pushed to the result array.
      ret.push(merged[i]);
    }
  }

  return ret;
};
