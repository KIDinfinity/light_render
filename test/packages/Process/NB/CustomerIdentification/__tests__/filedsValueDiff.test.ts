import filedsValueDiff from 'process/NB/CustomerIdentification/Utils/filedsValueDiff';

describe('packages/Process/NB/CustomerIdentification/Utils/filedsValueDiff.ts', () => {
  test('diff date time', () => {
    const fieldConfig = {
      fieldType: 'Date',
      field: 'dateOfBirth',
    };
    const originalData = {
      dateOfBirth: '1987-02-24T16:00:00.000+0000',
    };
    const newData = {
      dateOfBirth: '1987-02-24T16:00:00.000+0800',
    };

    const result = filedsValueDiff({
      fieldConfig,
      originalData,
      newData,
    });
    expect(result).toBeTruthy();
  });

  test('diff text value', () => {
    const fieldConfig = {
      fieldType: 'Text',
      field: 'name',
    };
    const originalData = {
      name: 'Apple',
    };
    const newData = {
      name: 'Orange',
    };

    const result = filedsValueDiff({
      fieldConfig,
      originalData,
      newData,
    });
    expect(result).not.toBeTruthy();
  });
});
