export const REGEX = {
  SIMPLIFY_URL_HTTP_PREFIX: /^http(s)?:\/\//gi,
  SIMPLIFY_URL_WWW_PREFIX: /^www\./gi,
  SIMPLIFY_URL_SUFFIX:
    /\.(com|net|org|io|gov|edu|mil|int|eu|asia|cat|coop|aero|arpa|biz|info|mobi|name|post|pro|tel|travel|jobs|museum|xxx)[\/]?$/gi,
  SIMPLIFY_URL:
    /^((http(s)?:\/\/)?(www\.)?)|(\.(com|net|org|io|gov|edu|mil|int|eu|asia|cat|coop|aero|arpa|biz|info|mobi|name|post|pro|tel|travel|jobs|museum|xxx)[\/]?)/gi,
  SLICE_FIRST_SLASH: /^\//,
};
