export const processCategories = (name) => {
  const categories = name.match(/#[\w]+/g) || [];
  return categories.map((name) => ({
    where: { name },
    create: { name },
  }));
};
