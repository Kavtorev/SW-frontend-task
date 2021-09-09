import { IProduct, IAttributeMeta } from './interfaces';

// attributes should be strictly ordered

// generates a composed id like: <product_id>_<attribute1_id>_<item1_id>_<attribute2_id>_<item2_id>...
// in order to uniquely identify a product and its selected attributes in a cart
// + to enable stackable behavior in case a user changes his preferences

// an order of <attribute_id> is dependent on an order of attributes inside the 'attribute' property of a IProduct object.
export const generateComposedId = (
  product: IProduct,
  selection: Array<IAttributeMeta>
) => {
  let composedId = product.id;
  // checking if a product has any attributes to prevent
  // unnecessary iteration
  if (product.attributes.length) {
    for (let orderedAttribute of product.attributes) {
      const foundUnorderedAttribute = selection.find(
        (pair) => pair.attrId === orderedAttribute.id
      );

      if (foundUnorderedAttribute) {
        const { attrId, itemId } = foundUnorderedAttribute;
        composedId += `_${attrId}_${itemId}`;
      }
    }
  }

  return composedId.replaceAll(' ', '-');
};
