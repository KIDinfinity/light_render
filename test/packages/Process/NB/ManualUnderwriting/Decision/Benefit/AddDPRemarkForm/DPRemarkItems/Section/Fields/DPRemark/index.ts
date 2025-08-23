import ReasonCode, { fieldConfig as ReasonCodeConfig } from './ReasonCode';
import ShortDescription, { fieldConfig as ShortDescriptionConfig } from './ShortDescription';
import LongDescription, { fieldConfig as longDescriptionConfig } from './LongDescription';
import Uwdecisionreason, { fieldConfig as uwdecisionreasonConfig } from './Uwdecisionreason';

export const localFieldConfigs = [
  ReasonCodeConfig,
  ShortDescriptionConfig,
  longDescriptionConfig,
  uwdecisionreasonConfig,
];

export default {
  ReasonCode,
  ShortDescription,
  LongDescription,
  Uwdecisionreason,
};
