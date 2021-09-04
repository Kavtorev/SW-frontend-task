import { IAttribute, IAttributeSet, IProduct } from '../../shared';
import { ActionTypes } from '../actions';

interface IAttributeMeta {
  attrId: IAttributeSet['id'];
  itemId: IAttribute['id'];
}

type InitialAtrributeStateType = {
  mappedAttributeSelections: {
    [productId: IProduct['id']]: Array<IAttributeMeta>;
  };
};

const initialAtrributeState: InitialAtrributeStateType = {
  mappedAttributeSelections: {},
};

export const attributeReducer = (
  state: InitialAtrributeStateType = initialAtrributeState,
  action: ActionTypes
) => {
  switch (action.type) {
    case 'SELECT_ATTRIBUTE':
      const { productId, meta } = action.payload;

      if (!state.mappedAttributeSelections[productId]) {
        return {
          ...state,
          mappedAttributeSelections: {
            ...state.mappedAttributeSelections,
            [productId]: [{ attrId: meta.attrId, itemId: meta.itemId }],
          },
        };
      }

      return {
        ...state,
        mappedAttributeSelections: {
          ...state.mappedAttributeSelections,
          [productId]: [
            ...state.mappedAttributeSelections[productId],
            { attrId: meta.attrId, itemId: meta.itemId },
          ],
        },
      };

    case 'UNSELECT_ATTRIBUTE': {
      const { attrId, productId } = action.payload;
      return {
        ...state,
        mappedAttributeSelections: {
          ...state.mappedAttributeSelections,
          [productId]: state.mappedAttributeSelections[productId].filter(
            (attr) => attr.attrId !== attrId
          ),
        },
      };
    }

    default:
      return state;
  }
};
