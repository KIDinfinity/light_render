import lodash from 'lodash';

/**
 *
 * @param relationTreatments
 * @param treatmentId
 * @returns
 */
export const filterRelationTreatment = (relationTreatments?: any[], treatmentId?: string) => {
  if (lodash.isEmpty(relationTreatments)) return;
  return lodash
    .chain(relationTreatments)
    .filter((relationTreatment: any) =>
      treatmentId && lodash.isString(treatmentId)
        ? relationTreatment.treatmentId === treatmentId
        : true
    )
    .reduce((arr: any, item: any) => {
      return [
        ...arr,
        ...lodash
          .chain(item.treatmentInfos)
          .map((el: any) => ({
            ...el,
            contrastDate: el.treatmentType === 'IP' ? el.dateOfAdmission : el.dateOfConsultation,
          }))
          .orderBy(['followUp', 'contrastDate'], ['asc', 'desc'])
          .value(),
      ];
    }, [])
    .value();
};
