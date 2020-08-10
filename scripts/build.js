const StyleDictionaryPackage = require('style-dictionary');
const getConfig = require('../config');

/*********************************************
        CUSTOM TRANSFORMS
***********************************************/

StyleDictionaryPackage.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: function (prop) {
    return prop.group === 'typography';
  },
  transformer: function (prop) {
    return parseFloat(prop.value / 16).toString() + 'rem';
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'size/pxToPt',
  type: 'value',
  matcher: function (prop) {
    return (
      prop.group === 'size' ||
      prop.group === 'typography' ||
      prop.group === 'spacing'
    );
  },
  transformer: function (prop) {
    return prop.value.replace(/px$/, 'pt');
  },
});

StyleDictionaryPackage.registerTransform({
  name: 'size/pxToDp',
  type: 'value',
  matcher: function (prop) {
    return (
      prop.group === 'size' ||
      prop.group === 'typography' ||
      prop.group === 'spacing'
    );
  },
  transformer: function (prop) {
    return prop.value.replace(/px$/, 'dp');
  },
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'styleguide',
  transforms: ['attribute/cti', 'name/cti/kebab', 'size/pxToRem', 'color/css'],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-js',
  transforms: ['name/cti/constant', 'size/pxToRem', 'color/hex'],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-json',
  transforms: [
    'attribute/cti',
    'name/cti/constant',
    'size/pxToRem',
    'color/css',
  ],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-scss',
  transforms: ['name/cti/kebab', 'time/seconds', 'size/pxToRem', 'color/css'],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-ios',
  transforms: ['attribute/cti', 'name/cti/camel', 'size/pxToPt'],
});

StyleDictionaryPackage.registerTransformGroup({
  name: 'tokens-android',
  transforms: ['attribute/cti', 'name/cti/camel', 'size/pxToDp'],
});

/*********************************************
        BUILD SECTION
***********************************************/

console.log('Build Started.......');

['brand1', 'brand2', 'brand3'].map(function (brand) {
  ['web', 'android', 'ios'].map(function (platform) {
    console.log('\n=====================');
    console.log(`\nBuilding [${platform}] [${brand}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(
      getConfig(brand, platform)
    );

    if (platform == 'web') {
      StyleDictionary.buildPlatform('web/js');
      StyleDictionary.buildPlatform('web/json');
      StyleDictionary.buildPlatform('web/scss');
    } else {
      StyleDictionary.buildPlatform(platform);
    }

    StyleDictionary.buildPlatform('styleguide');

    console.log('\nEnding Processing.......');
  });
});

console.log('\n=====================');
console.log('Build Complete! \n Have a nice day :)');
