export const formatImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};