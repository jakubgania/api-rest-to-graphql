export const APP_HOST = Deno.env.get("APP_HOST") || "127.0.0.1";
export const APP_PORT = Deno.env.get("APP_PORT") || 4000;
export const GITHUB_API_REST_ENDPOINT = Deno.env.get("GITHUB_API_REST_ENDPOINT")
export const GITHUB_API_GRAPHQL_ENDPOINT = Deno.env.get("GITHUB_API_GRAPHQL_ENDPOINT")
export const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN")