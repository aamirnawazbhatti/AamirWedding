// During local development, use an empty string so the Vite proxy handles requests and prevents CORS.
// In production, use the absolute server URL.
export const BASE_URL = import.meta.env.DEV ? "" : "http://71.24.35.46:8090";
