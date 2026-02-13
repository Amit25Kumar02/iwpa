export const formatImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  // If URL already starts with http/https, return as is (Strapi Cloud)
  if (url.startsWith('http')) return url;
  // If URL starts with /, it's a local Strapi URL, prepend base URL
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};