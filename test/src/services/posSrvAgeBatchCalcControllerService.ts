import request from '@/utils/request';

type CalcAgeItem = {
  age?: number;
  clientId: string;
  dob: string;
  role?: string;
};

export async function batchCalcAge(params?: CalcAgeItem[], option?: any): Promise<any> {
  return request('/api/srv/age/batchCalcAge', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  batchCalcAge,
};
