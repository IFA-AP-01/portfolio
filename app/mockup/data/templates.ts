import { Template, IOS_DIMENSIONS, ANDROID_DIMENSIONS } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'ios-text-top',
    name: 'iPhone 16 - Text Top',
    platform: 'ios',
    layout: 'text-top',
    deviceFrame: '/frame/iPhone16.svg',
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
    id: 'ios-text-bottom',
    name: 'iPhone 16 - Text Bottom',
    platform: 'ios',
    layout: 'text-bottom',
    deviceFrame: '/frame/iPhone16.svg',
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
    id: 'ios-phone-left',
    name: 'iPhone 16 - Phone Left',
    platform: 'ios',
    layout: 'phone-left',
    deviceFrame: '/frame/iPhone16.svg',
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
    id: 'ios-phone-right',
    name: 'iPhone 16 - Phone Right',
    platform: 'ios',
    layout: 'phone-right',
    deviceFrame: '/frame/iPhone16.svg',
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
    id: 'ios-pro-text-top',
    name: 'iPhone 16 Pro - Text Top',
    platform: 'ios',
    layout: 'text-top',
    deviceFrame: '/frame/iPhone16Pro.svg',
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
    id: 'ios-phone-pro-right',
    name: 'iPhone 16 Pro - Phone Right',
    platform: 'ios',
    layout: 'phone-right',
    deviceFrame: '/frame/iPhone16Pro.svg',
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
    id: 'ios-pro-text-bottom',
    name: 'iPhone 16 Pro - Text Bottom',
    platform: 'ios',
    layout: 'text-bottom',
    deviceFrame: '/frame/iPhone16Pro.svg',
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
    id: 'ios-pro-phone-left',
    name: 'iPhone 16 Pro - Phone Left',
    platform: 'ios',
    layout: 'phone-left',
    deviceFrame: '/frame/iPhone16Pro.svg',
    screenRegion: {
        top: '3.0%',
        left: '3.0%',
        width: '94%',
        height: '94%',
        borderRadius: '3.5rem'
    },
    defaultDimensions: IOS_DIMENSIONS,
  },
];
