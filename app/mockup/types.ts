export interface Dimensions {
  width: number;
  height: number;
}

export type Platform = 'ios' | 'android';

export interface Template {
  id: string;
  name: string;
  platform: Platform;
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
  titleFontFamily: string;
  subtitleFontFamily: string;
  titleTextAlign: 'left' | 'center' | 'right';
  subtitleTextAlign: 'left' | 'center' | 'right';
  titleFontSize: number;
  titleFontWeight: string;
  titleFontStyle: string;
  titleTextDecoration: string;
  titleLetterSpacing: number;
  titleLineHeight: number;
  titleTextShadow: boolean;
  subtitleFontSize: number;
  subtitleFontWeight: string;
  subtitleFontStyle: string;
  subtitleTextDecoration: string;
  subtitleLetterSpacing: number;
  subtitleLineHeight: number;
  subtitleTextShadow: boolean;
  titleColor: string;
  subtitleColor: string;
  backgroundColor: string;
  backgroundType: 'solid' | 'gradient';
  gradientColorFrom: string;
  gradientColorTo: string;
  gradientAngle: number;
  backgroundImage?: string;
  screenshotImage?: string; // data url or path
  templateId: string;
  layout: 'text-top' | 'text-bottom' | 'phone-left' | 'phone-right';
  showNotch: boolean;
}

export const IOS_DIMENSIONS: Dimensions = { width: 1242, height: 2688 };
export const ANDROID_DIMENSIONS: Dimensions = { width: 1080, height: 1920 };
