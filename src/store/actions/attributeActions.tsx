import { IAttribute, IAttributeSet, IProduct } from '../../shared';

export type AttributeActionsType =
  | {
      type: 'SELECT_ATTRIBUTE';
      payload: {
        productId: IProduct['id'];
        meta: { attrId: IAttributeSet['id']; itemId: IAttribute['id'] };
      };
    }
  | {
      type: 'UNSELECT_ATTRIBUTE';
      payload: {
        productId: IProduct['id'];
        attrId: IAttributeSet['id'];
      };
    }
  | { type: 'REMOVE_ALL_ATTRIBUTE_SELECTIONS'; payload: IProduct['id'] };
