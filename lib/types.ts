import { links } from "./data";

const extraLinks = [
  { name: "Others", hash: "" },
] as const;

const allLinks = [...links, ...extraLinks] as const;

export type SectionName = (typeof allLinks)[number]["name"];

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
  showNotch: boolean;
  textTranslateX: number;
  textTranslateY: number;
  deviceTranslateX: number;
  deviceTranslateY: number;
  deviceRotate: number;
  deviceScale: number;
  dimensions?: Dimensions;
}

export const IOS_DIMENSIONS: Dimensions = { width: 1242, height: 2688 };
export const ANDROID_DIMENSIONS: Dimensions = { width: 1080, height: 1920 };
export const TABLET_DIMENSIONS: Dimensions = { width: 2064, height: 2752 };
export const ANDROID_LANDSCAPE_DIMENSIONS: Dimensions = { width: 1920, height: 1080 };