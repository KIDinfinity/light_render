import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';

// 当一个user有多个数据时，后端按companyCode将user拆成了多条数据
// 因此需要在这里做两次转换，获取数据时先合并为以user为单位的数据（就是每个user只有一个数据，companyCode是数组）
// submit的时候再展开为以user+companyCode为单位的数据。
// 另外，后端要求companyId保持一致性，也就是说即便做了复杂操作，比方说先删后增，前端也要保持后端给的companyCode和companyId的对应关系，不能生成新的随机数。（但如果是完全新增的companyCode，则前端可以自己生成id）
// 只有在修改user时需要调用该方法，userGroup和role不需要。但即便调用了，也不会有实际影响，在公共方法内也不需要判断for user only。

export default {
  toFE: function (rows) {
    if (!rows?.length) return [];
    return rows.map((row) => {
      const companyCodeSections =
        row.subSection?.filter((item) => item?.sectionCode === 'section_user_company') || [];
      const companyIdMap = {};
      return {
        ...row,
        data: {
          ...row?.data,
          companyCode: companyCodeSections
            .map((item) => {
              const code = item?.data?.company_code;
              if (code !== void 0 && item?.data?.id) {
                companyIdMap[code] = item?.data?.id;
              }
              return code;
            })
            .filter((item) => item),
          companyIdMap,
        },
        subSection:
          row.subSection?.filter((item) => item?.sectionCode !== 'section_user_company') || [],
      };
    });
  },
  toBE: function (rows) {
    if (!rows?.length) return [];
    return rows.map((row) => {
      const companyCode = formUtils.queryValue(row?.data?.companyCode) || [];
      const companyIdMap = row?.data?.companyIdMap || {};

      return {
        ...row,
        data: lodash.omit(row?.data || {}, ['companyCode', 'companyIdMap']),
        subSection: (row?.subSection || [])
          .concat(
            companyCode.map((code) => {
              if (
                !code ||
                row?.subSection?.find(
                  (item) =>
                    item?.sectionCode === 'section_user_company' && item?.data?.company_code == code
                )
              ) {
                return null;
              }
              return {
                sectionCode: 'section_user_company',
                sectionName: 'User Company',
                data: {
                  company_code: code,
                  id: companyIdMap[code] || uuidv4(),
                },
                subSection: null,
                operation: null,
              };
            })
          )
          .filter((item) => item),
      };
    });
  },
};
