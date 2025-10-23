import useGetFacultativeOptionFieldVisible from './useGetFacultativeOptionFieldVisible';
import useGetCompanyCode from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCompanyCode';

interface IParams {
  productCode: string;
}

export default ({ productCode }: IParams) => {
  const facultativeOptionVisible = useGetFacultativeOptionFieldVisible({ productCode });
  const companyCode = useGetCompanyCode();

  return facultativeOptionVisible && companyCode === '3';
};
