import { Template, IOS_DIMENSIONS, ANDROID_DIMENSIONS, IPAD_DIMENSIONS } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    platform: 'ios',
    deviceFrame: 'iPhone16',
    screenRegion: {
        top: '4.0%',
        left: '4.8%',
        width: '90%',
        height: '91%',
        borderRadius: '9rem'
    },
    defaultDimensions: IOS_DIMENSIONS,
    hasNotch: true
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    platform: 'ios',
    deviceFrame: 'iPhone16Pro',
    screenRegion: {
        top: '3.2%',
        left: '3.0%',
        width: '94%',
        height: '93%',
        borderRadius: '9rem'
    },
    defaultDimensions: IOS_DIMENSIONS,
    hasNotch: true
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    platform: 'ios',
    deviceFrame: 'iPhone16ProMax',
    screenRegion: {
        top: '3.0%',
        left: '3.0%',
        width: '94%',
        height: '94%',
        borderRadius: '9rem'
    },
    defaultDimensions: IOS_DIMENSIONS,
    hasNotch: true
  },
  {
    id: 'ipad-11-inch',
    name: 'iPad 11-inch',
    platform: 'ios',
    deviceFrame: 'iPad11inch',
    screenRegion: {
        top: '20.0%',
        left: '4.0%',
        width: '93%',
        height: '60%',
        borderRadius: '1.5rem'
    },
    defaultDimensions: IPAD_DIMENSIONS,
    hasNotch: false
  },
  {
    id: 'ipad-13-inch',
    name: 'iPad 13-inch',
    platform: 'ios',
    deviceFrame: 'iPad13inch',
    screenRegion: {
        top: '22.0%',
        left: '4.0%',
        width: '92%',
        height: '58%',
        borderRadius: '1.5rem'
    },
    defaultDimensions: IPAD_DIMENSIONS,
    hasNotch: false
  },
  {
    id: 'pixel-9-pro',
    name: 'Pixel 9 Pro',
    platform: 'android',
    deviceFrame: 'Pixel9Pro',
    screenRegion: {
        top: '2.0%',
        left: '1.0%',
        width: '98%',
        height: '96%',
        borderRadius: '10rem'
    },
    defaultDimensions: ANDROID_DIMENSIONS,
    hasNotch: true
  },
];
