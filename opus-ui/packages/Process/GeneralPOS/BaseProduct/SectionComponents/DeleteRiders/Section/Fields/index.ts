import Name, { localFieldConfig as NameConfig } from './Name';

import ProductCode, { localFieldConfig as ProductCodeConfig } from './ProductCode';
import ProductCodeAdd, { localFieldConfig as ProductCodeAddConfig } from './ProductCodeAdd';

export const localFieldConfigs = [NameConfig, ProductCodeConfig, ProductCodeAddConfig];

export default { Name, ProductCode, ProductCodeAdd };
