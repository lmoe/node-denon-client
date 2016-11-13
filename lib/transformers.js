module.exports = {
  volumeToHumanTransform: function volumeToHumanTransform(volume) {
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
  },

  volumeToAvrTransform: function volumeToAvrTransform(volume) {
    // Case: 1.5
    // 22.5
    // 22
    // 1

    function createDigitArray(volume) {
      return (volume).toString(10)
      .replace('.', '')
      .replace(',', '')
        .split('')
        .map(Number);
    }

    console.log(volume.toString())

    const matcher = [
      {
        match: (volume) => {
          const regex = /(?:(^\d\.\d)$)/;

          if (volume.toString().match(regex)) {
            const digits = createDigitArray(volume);
            console.log("a")
            console.log(digits)
            let result = `0${digits[0]}${digits[1]}`;
            return result;
          }

          return false;
        }, // 1.5
      },
      {
        match: (volume) => {
          const regex = /(?:(^\d$))/; // 1

          if (volume.toString().match(regex)) {
            const digits = createDigitArray(volume);
            console.log("B")
            let result = `0${digits[0]}`;
            return result;
          }

          return false;
        }
      },
      {
        match: (volume) => {
          const regex = /(?:(^\d\d$))/; // 22

          if (volume.toString().match(regex)) {
            const digits = createDigitArray(volume);

            let result = `${digits[0]}${digits[1]}0`;
            return result;
          }

          return false;
        }
      },
      {
        match: (volume) => {
          const regex = /(?:(^\d\d\.\d$))/; // 22.5

          if (volume.toString().match(regex)) {
            const digits = createDigitArray(volume);

            let result = `${digits[0]}${digits[1]}${digits[2]}`;
            return result;
          }

          return false;
        }
      }
    ]

    let formattedVolume;
    matcher.forEach((match) => {
      let volumeMatch = match.match(volume);

      if (volumeMatch) {
        formattedVolume = volumeMatch;
      }
    });

    if (!formattedVolume) {
      formattedVolume = volume;
    }

    console.log("Setting volume to");
    console.log(formattedVolume);

    return formattedVolume;
  }
}