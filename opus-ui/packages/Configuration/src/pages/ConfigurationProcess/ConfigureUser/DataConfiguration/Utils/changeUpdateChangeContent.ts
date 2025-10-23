import lodash from 'lodash';

export default ({ data, key, newValue }: any) => {
  return lodash.map(data, (item) => {
    if (item.data['#operation'] === 'update') {
      return {
        ...item,
        data: {
          ...item.data,
          change_content:
            lodash.findIndex(
              item.data.change_content,
              (changeContentItem: any) => changeContentItem.fieldName === key
            ) > -1
              ? lodash.map(item.data.change_content, (changeContentItem: any) =>
                  changeContentItem.fieldName === key
                    ? { newValue, fieldName: key }
                    : changeContentItem
                )
              : [
                  ...item.data.change_content,
                  {
                    newValue,
                    fieldName: key,
                  },
                ],
        },
      };
    }
    return item;
  });
};
