import { Router } from "https://deno.land/x/oak/mod.ts";

import { getUserRepos } from "./controllers/githubController.ts";
import { getReleases } from "./controllers/githubController.ts";

import { getUserREST } from "./controllers/githubController.ts";

const router = new Router();

router
    .get("/api/github/users/:username", getUserREST)
    .get("/api/github/:username", getUserRepos)
    .get("/api/github/:owner/:repo", getReleases)

export default router