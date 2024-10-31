import { Middleware } from "https://deno.land/x/oak/mod.ts";

// ANSI color codes
const RESET = "\x1b[0m"; // Reset to default color
const BLUE = "\x1b[34m"; // Blue color

const loggerMiddleware: Middleware = async (context, next) => {
    const now = new Date();
  
    const formattedDate = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Use 24-hour format
    }).replace(",", ""); // Remove comma for cleaner output

    console.log(`[${BLUE}${formattedDate}${RESET}] Received ${context.request.method} request for ${context.request.url.pathname}`);
    await next()
}

export default loggerMiddleware;