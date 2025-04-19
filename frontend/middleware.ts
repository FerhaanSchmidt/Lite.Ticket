import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Example: Log the incoming request
  console.log(`Incoming request for: ${request.nextUrl.pathname}`);

  // You can implement your logic here to handle authentication, proxy, etc.

  // Example: Allow requests through to the next middleware/handler
  return NextResponse.next();
}

// Export configuration for matcher
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
