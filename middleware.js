export { default } from "next-auth/middleware"

// protected routes: user would need to be signed in to access this routes. 
export const config = { matcher: ["/admin", "/analytics", "/customize", "/settings", "/onboard"] }


