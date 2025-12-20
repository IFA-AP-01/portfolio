export interface Dimensions {
  width: number;
  height: number;
}

export type Platform = 'ios' | 'android';

export interface Template {
  id: string;
  name: string;
  platform: Platform;
  layout: 'text-top' | 'text-bottom' | 'text-overlay' | 'phone-left' | 'phone-right' | 'text-left' | 'text-right';
  deviceFrame: string; // path to svg
  screenRegion: {
    top: string;
    left: string;
    width: string;
    height: string;
    borderRadius: string;
  };
  defaultDimensions: Dimensions;
}

export interface ScreenshotData {
  title: string;
  subtitle: string;
  fontFamily: string;
  titleColor: string;
  subtitleColor: string;
  backgroundColor: string;
  backgroundImage?: string;
  screenshotImage?: string; // data url or path
  templateId: string;
}

export const IOS_DIMENSIONS: Dimensions = { width: 1242, height: 2688 };
export const ANDROID_DIMENSIONS: Dimensions = { width: 1080, height: 1920 };
