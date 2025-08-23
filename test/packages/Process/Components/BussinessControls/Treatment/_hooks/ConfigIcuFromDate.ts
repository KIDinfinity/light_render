import { Validator } from 'basic/components/Form';

interface IProps {
  form?: any;
}

export default ({ form }: IProps) => {
  const dateOfDischargeValue = form.getFieldValue('dateOfDischarge');
  const dateOfAdmissionValue = form.getFieldValue('dateOfAdmission');

  return {
    Rules: {
      fromIcuDateEarlierDischargeDate: Validator.fromIcuDateEarlierDischargeDate(
        dateOfDischargeValue
      ),
      fromIcuDateLaterAdmissionDate: Validator.fromIcuDateLaterAdmissionDate(dateOfAdmissionValue),
    },
    extraConfig: {},
  };
};
