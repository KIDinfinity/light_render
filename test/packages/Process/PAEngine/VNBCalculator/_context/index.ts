import { createContext } from 'react';

export interface INavigatorContext {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const NavigatorContext = createContext<INavigatorContext>({});
