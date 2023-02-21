import { PureLightTheme } from './schemes/PureLightTheme';
// import { GreyGooseTheme } from './schemes/_GreyGooseTheme';
// import { PurpleFlowTheme } from './schemes/_PurpleFlowTheme';

const themeMap = {
  PureLightTheme,
  // GreyGooseTheme,
  // PurpleFlowTheme
};

export function themeCreator(theme) {
  return themeMap[theme];
}
