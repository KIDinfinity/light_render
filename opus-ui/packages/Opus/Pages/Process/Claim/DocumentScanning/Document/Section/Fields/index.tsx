import Document, { localFieldConfig as DocumentConfig } from './Document';
import DocumentTypeName, { localFieldConfig as DocumentTypeNameConfig } from './DocumentTypeName';
import ExchangeDate, { localFieldConfig as ExchangeDateConfig } from './ExchangeDate';

export const localFieldConfigs = [DocumentConfig, DocumentTypeNameConfig, ExchangeDateConfig];

export default {
  Document,
  DocumentTypeName,
  ExchangeDate,
};
