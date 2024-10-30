import { GitHubService } from "../services/githubService.ts";
import { TEST_QUERY } from "../queries/testQuery.ts";
import { RELEASE_QUERY } from "../queries/releaseQuery.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

const githubService = new GitHubService();

export async function getUserRepos(context: RouterContext<"/api/github/:username">) {
    try {
        const username = context.params.username

        if (!username) {
            context.response.status = 400
            context.response.body = { error: "Username is required" }
            return;
        }

        const data = await githubService.fetchFromGitHub<Record<string, unknown>>(TEST_QUERY, { username });
        context.response.status = 200
        context.response.body = JSON.stringify(data, null, 2)
    } catch(error) {
        context.response.status = 500
        context.response.body = { error: (error as Error).message }
    }
}

export async function getReleases(context: RouterContext<"/api/github/:owner/:repo">) {
    try {
        const owner = context.params.owner
        const repo = context.params.repo

        if (!owner) {
            context.response.status = 400
            context.response.body = { error: "Owner is required" }
            return;
        }

        if (!repo) {
            context.response.status = 400
            context.response.body = { error: "Repo is required" }
            return;
        }

        const data = await githubService.fetchFromGitHub<Record<string, unknown>>(RELEASE_QUERY, { owner, repo });
        context.response.status = 200
        context.response.body = data
    } catch(error) {
        context.response.status = 500
        context.response.body = { error: (error as Error).message }
    }
}