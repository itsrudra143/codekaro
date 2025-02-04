import { httpRouter } from "convex/server";
import { httpAction } from"./_generated/server";
const http = httpRouter();

http.route({
    path:"/clerk-webhook",
    method:"POST",

    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if(!webhookSecret)
        {
            throw new Error("Missing CLERK_wEBHOOK_SECRET environment variable ");
        }

        
    })

})