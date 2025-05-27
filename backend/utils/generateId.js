// Generate next unique ID
function generateUniqueId(items) {
  const ids = items.map(item => item.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

module.exports = { generateUniqueId };