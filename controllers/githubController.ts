import { GitHubService } from "../services/githubService.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import { TEST_QUERY } from "../queries/testQuery.ts";
import { RELEASE_QUERY } from "../queries/releaseQuery.ts";

interface GitHubUser {
    login: string,
    name: string,
    avatar_url: string,
    type: string
}

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

export async function getUserREST(context: RouterContext<"/api/github/users/:username">) {
    try {
        const username = context.params.username

        if (!username) {
            context.response.status = 400
            context.response.body = { error: "Username is required" }
            return
        }

        const data = await githubService.fetchFromGitHubREST<GitHubUser>("/users/" + username)

        if (!data) {
            context.response.status = 404
            context.response.body = { error: "User not found or fetch failed" }
        }

        const userData: GitHubUser = {
            login: data!.login,
            name: data!.name,
            avatar_url: data!.avatar_url,
            type: data!.type
        }

        context.response.status = 200
        context.response.body = userData
    } catch(error) {
        context.response.status = 500
        context.response.body = { error: (error as Error).message }
    }
}