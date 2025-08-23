import { produce }  from 'immer';
const updateDrugsListStore = (state: any, action: any) => {
  const {changedFields,initStore} = action.payload;
    const nextState = produce(state, (draftState: any) => {
      if(initStore){
        draftState.DrugsDetail.drugsListStore=initStore;
      } 
      else{
        draftState.DrugsDetail.drugsListStore.includes(changedFields)?
        draftState.DrugsDetail.drugsListStore =draftState.DrugsDetail.drugsListStore.filter((i: any)=>i!==changedFields):
        draftState.DrugsDetail.drugsListStore=[...draftState.DrugsDetail.drugsListStore,changedFields]
      }
    });
    
    return { ...nextState };
};

export default updateDrugsListStore;
