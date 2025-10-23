import lodash from 'lodash';
import { schema, normalize, denormalize } from 'normalizr';
import { formUtils } from 'basic/components/Form';

const claimEntity = {
  bpoFormDataList: {},
  claimApplicationDocList: {},
  bpoDocumentDataList: {},
  bpoBatchDataVO: {},
};

class Normalize {
  schema = {
    createFormDataSchema: () => {
      const formData = new schema.Entity('bpoFormDataList', {}, { idAttribute: 'documentId' });
      const bpoDocumentDataList = new schema.Entity(
        'bpoDocumentDataList',
        {
          bpoFormDataList: [formData],
        },
        { idAttribute: 'parentClaimNo' }
      );

      const bpoBatchDataVO = new schema.Entity(
        'bpoBatchDataVO',
        {
          bpoDocumentDataList: [bpoDocumentDataList],
        },
        { idAttribute: 'batchNo' }
      );

      const claimApplicationDocList = new schema.Entity(
        'claimApplicationDocList',
        {},
        { idAttribute: 'applicationNo' }
      );

      return {
        bpoBatchDataVO,
        claimApplicationDocList: [claimApplicationDocList],
      };
    },
  };

  // normalize claim form datas
  createFormData = (formDatas: any, parentClaimNo: string) => {
    const formDataSchemaData = this.schema.createFormDataSchema();
    if (!lodash.get(formDatas, 'bpoBatchDataVO.bpoDocumentDataList[0].parentClaimNo')) {
      lodash.set(formDatas, 'bpoBatchDataVO.bpoDocumentDataList[0].parentClaimNo', parentClaimNo);
    }
    const datas = normalize(formDatas, formDataSchemaData);
    const { entities, result } = datas;

    return {
      claimDatas: result,
      claimEntities: {
        ...claimEntity,
        ...entities,
      },
    };
  };

  // 反扁平化
  denormalizeFormData = (claimDatas: any, claimEntities: any) => {
    if (!claimDatas || !claimEntities) return {};
    const formDataSchemaData = this.schema.createFormDataSchema();
    return denormalize(claimDatas, formDataSchemaData, claimEntities);
  };

  // 反扁平化+ 清除格式
  getDenormalizeClaimData = ({ claimDatas, claimEntities }: any) => {
    const denormalizedData = this.denormalizeFormData(claimDatas, claimEntities);
    return formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  };
}

export const { createFormData, denormalizeFormData, getDenormalizeClaimData } = new Normalize();
