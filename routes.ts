import { Router } from "https://deno.land/x/oak/mod.ts";

import { getUserRepos } from "./controllers/githubController.ts";
import { getReleases } from "./controllers/githubController.ts";

const router = new Router();

router
    .get("/", (context) => {
        context.response.status = 200
        context.response.body = { data: "hello world" }
    })

router.get("/api/github/:username", getUserRepos)
router.get("/api/github/:owner/:repo", getReleases)

export default router