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
  hasNotch: boolean;
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
export const IPAD_DIMENSIONS: Dimensions = { width: 2064, height: 2752 };
export const ANDROID_TABLET_DIMENSIONS: Dimensions = { width: 3840, height: 2160 };

export type ElementType = 'rect' | 'ellipse' | 'diamond' | 'text' | 'connector' | 'triangle' | 'parallelogram' | 'cylinder' | 'document';

export interface DiagramElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  text: string;
  fill: string;
  stroke: number;
  strokeColor: string;
  textColor: string;
  fontSize: number;
  fontWeight: string;
  // For connectors
  fromId?: string;
  toId?: string;
  points?: { x: number; y: number }[];
  flipX?: boolean;
  flipY?: boolean;
  connectorType?: ConnectorType;
}

export type ConnectorType = 'straight' | 'elbow' | 'curve';

export interface DiagramEditorState {
  elements: DiagramElement[];
  selectedIds: string[];
  activeTool: ElementType | 'select' | 'hand';
  activeConnectorType: ConnectorType;
  zoom: number;
  pan: { x: number; y: number };
}

export interface SavedDiagram {
  id: string;
  name: string;
  lastModified: number;
  data: DiagramEditorState;
}