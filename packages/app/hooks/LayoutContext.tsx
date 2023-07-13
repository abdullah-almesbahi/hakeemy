import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { useDimensions } from './use-dimensions';

export const APP_LAYOUT_BREAKPOINTS = {
  SMALL: 420,
  MEDIUM: 580,
  LARGE: 700,
  XLARGE: 1000,
  XXLARGE: 1200
};

export interface AppLayoutProviderProps {
  children?: React.ReactNode;
}

export interface AppLayoutProviderState {
  appOrientation: 'landscape' | 'portrait';
  deviceOrientation: 'landscape' | 'portrait';
  sizename: 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'largest';
}

export const AppLayoutContext = React.createContext<AppLayoutProviderState>(
  getLayoutConsumerState()
);
AppLayoutContext.displayName = 'AppLayoutContext';

export function AppLayoutProvider(props: AppLayoutProviderProps) {
  const dimensions = useDimensions();

  return (
    <AppLayoutContext.Provider value={getLayoutConsumerState(dimensions)}>
      {props.children}
    </AppLayoutContext.Provider>
  );
}

export const AppLayoutConsumer = AppLayoutContext.Consumer;
(AppLayoutConsumer as any).displayName = 'AppLayoutConsumer';

export function getLayoutConsumerState(dimensions?: {
  width: number;
  height: number;
}): AppLayoutProviderState {
  const { width, height } = dimensions || Dimensions.get('window');

  // console.log('object', width);
  //   console.log("object",width)

  const sizename: AppLayoutProviderState['sizename'] =
    width <= APP_LAYOUT_BREAKPOINTS.SMALL
      ? 'small'
      : width <= APP_LAYOUT_BREAKPOINTS.MEDIUM
      ? 'medium'
      : width <= APP_LAYOUT_BREAKPOINTS.LARGE
      ? 'large'
      : width <= APP_LAYOUT_BREAKPOINTS.XLARGE
      ? 'x-large'
      : width <= APP_LAYOUT_BREAKPOINTS.XXLARGE
      ? 'xx-large'
      : 'largest';

  const deviceOrientation = width > height ? 'landscape' : 'portrait';
  const appOrientation =
    deviceOrientation === 'landscape' || sizename >= 'large'
      ? 'landscape'
      : 'portrait';

  return { appOrientation, deviceOrientation, sizename };
}

export function useAppLayout() {
  return useContext(AppLayoutContext);
}
