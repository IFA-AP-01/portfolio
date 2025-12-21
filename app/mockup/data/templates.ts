import { Template, IOS_DIMENSIONS, ANDROID_DIMENSIONS } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    platform: 'ios',
    deviceFrame: 'iPhone16',
    screenRegion: {
        top: '3.0%',
        left: '5.2%',
        width: '89.6%',
        height: '94%',
        borderRadius: '3.5rem'
    },
    defaultDimensions: IOS_DIMENSIONS,
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    platform: 'ios',
    deviceFrame: 'iPhone16Pro',
    screenRegion: {
        top: '3.0%',
        left: '3.0%',
        width: '94%',
        height: '94%',
        borderRadius: '3.5rem'
    },
    defaultDimensions: IOS_DIMENSIONS,
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
        borderRadius: '3.5rem'
    },
    defaultDimensions: IOS_DIMENSIONS,
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
        borderRadius: '3.5rem'
    },
    defaultDimensions: ANDROID_DIMENSIONS,
  },
];
