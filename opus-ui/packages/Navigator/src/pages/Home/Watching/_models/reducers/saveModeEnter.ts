import { Active } from '../machines/modeButtonService';

export default (state: any, action: any) => {
  const {
    payload: { enterActive },
  } = action;

  return {
    ...state,
    enterActive: enterActive === Active.Active,
  };
};
