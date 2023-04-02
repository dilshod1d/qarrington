// utils/slugify.js
const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric, non-whitespace, and non-hyphen characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

export default slugify;
