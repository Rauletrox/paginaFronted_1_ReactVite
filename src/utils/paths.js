const baseUrl = import.meta.env.BASE_URL;

export function publicPath(path) {
  return `${baseUrl}${path.replace(/^\/+/, '')}`;
}
