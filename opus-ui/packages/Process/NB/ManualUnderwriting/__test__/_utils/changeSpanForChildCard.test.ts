import changeSpanForChildCard from 'process/NB/ManualUnderwriting/utils/changeSpanForChildCard';

describe('test changeSpanForChildCard', () => {
  test('change Span ', () => {
    const fieldConfig = {
      field: 'b',
      fieldType: 'Dropdown',
      'field-props': {
        'x-layout': {
          xs: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 8,
          },
          sm: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 8,
          },
          md: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 8,
          },
          lg: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 8,
          },
          xl: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 8,
          },
          xxl: {
            span: 4,
            offset: 0,
            pull: 0,
            order: 8,
          },
        },
        layouts: [
          {
            layout: {
              xs: {
                span: 4,
                offset: 0,
                pull: 0,
                order: 8,
              },
              sm: {
                span: 4,
                offset: 0,
                pull: 0,
                order: 8,
              },
              md: {
                span: 4,
                offset: 0,
                pull: 0,
                order: 8,
              },
              lg: {
                span: 4,
                offset: 0,
                pull: 0,
                order: 8,
              },
              xl: {
                span: 4,
                offset: 0,
                pull: 0,
                order: 8,
              },
              xxl: {
                span: 4,
                offset: 0,
                pull: 0,
                order: 8,
              },
            },
          },
        ],
        label: {
          dictTypeCode: 'Label_BIZ_Claim',
          dictCode: 'b',
        },
        'x-dict': {
          dictTypeCode: 'gender',
        },
        visible: 'Y',
      },
    };
    const result = changeSpanForChildCard({
      fieldConfig,
    });
    expect(result).toEqual({
      field: 'b',
      fieldType: 'Dropdown',
      'field-props': {
        'x-layout': {
          xs: {
            span: 6,
            offset: 0,
            pull: 0,
            order: 8,
          },
          sm: {
            span: 6,
            offset: 0,
            pull: 0,
            order: 8,
          },
          md: {
            span: 6,
            offset: 0,
            pull: 0,
            order: 8,
          },
          lg: {
            span: 6,
            offset: 0,
            pull: 0,
            order: 8,
          },
          xl: {
            span: 6,
            offset: 0,
            pull: 0,
            order: 8,
          },
          xxl: {
            span: 6,
            offset: 0,
            pull: 0,
            order: 8,
          },
        },
        layouts: [
          {
            layout: {
              xs: {
                span: 6,
                offset: 0,
                pull: 0,
                order: 8,
              },
              sm: {
                span: 6,
                offset: 0,
                pull: 0,
                order: 8,
              },
              md: {
                span: 6,
                offset: 0,
                pull: 0,
                order: 8,
              },
              lg: {
                span: 6,
                offset: 0,
                pull: 0,
                order: 8,
              },
              xl: {
                span: 6,
                offset: 0,
                pull: 0,
                order: 8,
              },
              xxl: {
                span: 6,
                offset: 0,
                pull: 0,
                order: 8,
              },
            },
          },
        ],
        label: {
          dictTypeCode: 'Label_BIZ_Claim',
          dictCode: 'b',
        },
        'x-dict': {
          dictTypeCode: 'gender',
        },
        visible: 'Y',
      },
    });
  });
});
