export default function* getHasChangeSection(_: any, { select }: any) {
    const hasChangeSection = yield select((state: any) => state?.daOfClaimAssessmentController?.claimProcessData?.hasChangeSection)
    return hasChangeSection;
}