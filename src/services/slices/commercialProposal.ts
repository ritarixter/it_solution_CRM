import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';

//--------------------------------------------------------------------------------
export interface ICommercialProposalState {
  id: number
  uid: string;
}


interface commercialProposalState {
  draggableElements: ICommercialProposalState[];
}

const initialState: commercialProposalState = {
  draggableElements: [],
};

export const commercialProposalSlice = createSlice({
  name: 'commercialProposal',
  initialState,
  reducers: {
    addCommercialProposal(state, action: PayloadAction<ICommercialProposalState>) {
     state.draggableElements = state.draggableElements.concat(action.payload)
    },

    deleteCommercialProposal(state, action: PayloadAction<string>) {
      state.draggableElements = state.draggableElements.filter(
        (item) => item.uid !== action.payload)
    },


    updateCommercialProposal(
      state,
      action: PayloadAction<{ draggableElement: ICommercialProposalState | any;
        newIndex: number;}>
    ) {
      const oldIndex = state.draggableElements.indexOf(action.payload.draggableElement);
      state.draggableElements = update(
        state.draggableElements, {
          $splice: [
            [oldIndex, 1],
            [action.payload.newIndex, 0, action.payload.draggableElement],
          ],
        }
      );
    },

    clearCommercialProposal(state) {
      state.draggableElements = [{id: 1, uid: uuidv4()}];
    }
  }
});

export const {
  addCommercialProposal,
  deleteCommercialProposal,
  updateCommercialProposal,
  clearCommercialProposal
} = commercialProposalSlice.actions;