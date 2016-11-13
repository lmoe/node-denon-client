module.exports = {
  volumeTransform: function volumeTransform(volume) {
    const digits = (volume).toString(10)
        .split('')
        .map(Number);

      let transformed = '';

      transformed += digits[0] + '';
      transformed += digits[1] + '';

      if (digits.length > 2) {
        transformed += '.';

        for(let i = 2; i < digits.length; i++) {
          transformed += digits[i] + '';
        }
      }

      return parseFloat(transformed);
  }
}