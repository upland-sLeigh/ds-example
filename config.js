module.exports = function getConfig(brand, platform) {
  return {
    source: [
      `properties/brands/${brand}/*.json`,
      'properties/globals/**/*.json',
      `properties/platforms/${platform}/*.json`,
    ],
    platforms: {
      'web/js': {
        transformGroup: 'tokens-js',
        buildPath: `dist/web/${brand}/`,
        prefix: 'token',
        files: [
          {
            destination: 'tokens.module.js',
            format: 'javascript/module',
          },
          {
            destination: 'tokens.object.js',
            format: 'javascript/object',
          },
          {
            destination: 'tokens.es6.js',
            format: 'javascript/es6',
          },
        ],
      },
      'web/json': {
        transformGroup: 'tokens-json',
        buildPath: `dist/web/${brand}/`,
        prefix: 'token',
        files: [
          {
            destination: 'tokens.json',
            format: 'json/flat',
          },
        ],
      },
      'web/scss': {
        transformGroup: 'tokens-scss',
        buildPath: `dist/web/${brand}/`,
        prefix: 'token',
        files: [
          {
            destination: 'tokens.scss',
            format: 'scss/variables',
          },
        ],
      },
      styleguide: {
        transformGroup: 'styleguide',
        buildPath: `dist/styleguide/`,
        prefix: 'token',
        files: [
          {
            destination: `${platform}_${brand}.json`,
            format: 'json/flat',
          },
          {
            destination: `${platform}_${brand}.scss`,
            format: 'scss/variables',
          },
        ],
      },
      // there are different possible formats for iOS (JSON, PLIST, etc.) so you will have to agree with the iOS devs which format they prefer
      ios: {
        // I have used custom formats for iOS but keep in mind that Style Dictionary offers some default formats/templates for iOS,
        // so have a look at the documentation before creating custom templates/formats, maybe they already work for you :)
        transformGroup: 'tokens-ios',
        buildPath: `dist/ios/${brand}/`,
        prefix: 'token',
        files: [
          {
            destination: 'tokens-all.plist',
            template: 'ios/plist',
          },
          {
            destination: 'tokens-colors.plist',
            template: 'ios/plist',
            filter: {
              type: 'color',
            },
          },
        ],
      },
      android: {
        // I have used custom formats for Android but keep in mind that Style Dictionary offers some default formats/templates for Android,
        // so have a look at the documentation before creating custom templates/formats, maybe they already work for you :)
        transformGroup: 'tokens-android',
        buildPath: `dist/android/${brand}/`,
        prefix: 'token',
        files: [
          {
            destination: 'tokens-dimes.xml',
            format: 'android/dimens',
            filter: {
              group: 'size',
            },
          },
          {
            destination: 'tokens-colors.xml',
            template: 'android/colors',
            filter: {
              group: 'color',
            },
          },
        ],
      },
    },
  };
};
