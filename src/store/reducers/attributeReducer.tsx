import { IProduct, IAttributeMeta } from '../../shared';
import { AttributeActionsType } from '../actions';

type InitialAtrributeStateType = {
  // product that is about to happen in a shopping cart...
  localProductAttributeSelections: {
    [productId: IProduct['id']]: Array<IAttributeMeta>;
  };

  // composed product id like: <product_id>_<attribute1_id>_<item1_id>_<attribute2_id>_<item2_id>...
  cartProductAttributeSelections: {
    [composedId: string]: Array<IAttributeMeta>;
  };
};

const initialAtrributeState: InitialAtrributeStateType = {
  localProductAttributeSelections: {},
  cartProductAttributeSelections: {},
};

export const attributeReducer = (
  state: InitialAtrributeStateType = initialAtrributeState,
  action: AttributeActionsType
) => {
  switch (action.type) {
    case 'SELECT_LOCAL': {
      const { productId, meta } = action.payload;

      if (!state.localProductAttributeSelections[productId]) {
        return {
          ...state,
          localProductAttributeSelections: {
            ...state.localProductAttributeSelections,
            [productId]: [{ attrId: meta.attrId, itemId: meta.itemId }],
          },
        };
      }

      return {
        ...state,
        localProductAttributeSelections: {
          ...state.localProductAttributeSelections,
          [productId]: [
            ...state.localProductAttributeSelections[productId],
            { attrId: meta.attrId, itemId: meta.itemId },
          ],
        },
      };
    }

    case 'UNSELECT_LOCAL': {
      const { attrId, productId } = action.payload;
      return {
        ...state,
        localProductAttributeSelections: {
          ...state.localProductAttributeSelections,
          [productId]: state.localProductAttributeSelections[productId].filter(
            (attr) => attr.attrId !== attrId
          ),
        },
      };
    }

    case 'SET_SELECTED_ATTRIBUTES': {
      const { composedId, selectedAttributes } = action.payload;
      return {
        ...state,
        cartProductAttributeSelections: {
          ...state.cartProductAttributeSelections,
          [composedId]: selectedAttributes,
        },
      };
    }

    case 'REMOVE_ALL_ATTRIBUTE_SELECTIONS': {
      const composedId = action.payload;
      if (state.cartProductAttributeSelections[composedId]) {
        const shallowCopiedState = { ...state };
        delete shallowCopiedState.cartProductAttributeSelections[composedId];
        return shallowCopiedState;
      }
      return state;
    }

    default:
      return state;
  }
};
