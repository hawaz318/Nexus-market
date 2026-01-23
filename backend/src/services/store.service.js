const Store = require('../models/store.model');
const slugify = require('slugify');

exports.createStore = async (vendorId, storeData) => {
  // 1. Check if this vendor already has a store
  const existingStore = await Store.findOne({ vendor: vendorId });
  if (existingStore) {
    throw new Error('You already own a store! One vendor per store policy.');
  }

  // 2. Generate a URL slug (e.g., "Nike Store" becomes "nike-store")
  const slug = slugify(storeData.storeName, { lower: true });

  // 3. Create the store
  const newStore = await Store.create({
    ...storeData,
    vendor: vendorId,
    slug
  });

  return newStore;
};