import claimHkAmlGetUrlControllerService from '@/services/claimHkAmlGetUrlControllerService';

export default function* fcrmNameScreening(_: any, { call }: any) {
    const response = yield call( claimHkAmlGetUrlControllerService.getUrl);
    if (response && response?.success && response?.resultData) {
        return response?.resultData
    }
    return '';
}