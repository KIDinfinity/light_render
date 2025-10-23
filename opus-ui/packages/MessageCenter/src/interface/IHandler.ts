import type { LifeCircle, PurposeCode } from '../constants';

export default interface IHandler {
  lifeCircle: LifeCircle;

  purposeCode: PurposeCode;

  uuid: string;

  func: Function;
}
