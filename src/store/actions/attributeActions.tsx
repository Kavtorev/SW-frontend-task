import {
  IAttribute,
  IAttributeSet,
  IProduct,
  IAttributeMeta,
} from '../../shared';

export type AttributeActionsType =
  | { type: 'REMOVE_ALL_ATTRIBUTE_SELECTIONS'; payload: string }
  | {
      type: 'SELECT_LOCAL';
      payload: {
        productId: IProduct['id'];
        meta: { attrId: IAttributeSet['id']; itemId: IAttribute['id'] };
      };
    }
  | {
      type: 'UNSELECT_LOCAL';
      payload: { productId: IProduct['id']; attrId: IAttributeSet['id'] };
    }
  | {
      type: 'SET_SELECTED_ATTRIBUTES';
      payload: {
        composedId: string;
        selectedAttributes: Array<IAttributeMeta>;
      };
    };
