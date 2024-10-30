import { 
    GITHUB_API_GRAPHQL_ENDPOINT,
    GITHUB_API_REST_ENDPOINT,
    GITHUB_TOKEN
} from "../config.ts";

export class GitHubService {
    async fetchFromGitHub<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
        if (!GITHUB_API_GRAPHQL_ENDPOINT) {
            throw new Error("GitHub API URL is not defined.")
        }

        if (!GITHUB_TOKEN) {
            throw new Error("GitHub token is not defined.")
        }
        
        try {
            const response = await fetch(GITHUB_API_GRAPHQL_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GITHUB_TOKEN}`
                },
                body: JSON.stringify({ query, variables })
            });
    
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.statusText}`)
            }
    
            const data = await response.json()
            return data as T
        } catch(error) {
            console.error("Error fetching data from GitHub:", error);
            return null
        }
    }

    async fetchFromGitHubREST<T>(path: string): Promise<T | null> {
        if (!GITHUB_TOKEN) {
            throw new Error("GitHub token is not defined")
        }

        if (!GITHUB_API_REST_ENDPOINT) {
            throw new Error("GitHub REST API Endpoint is not defined")
        }

        const endpoint = GITHUB_API_REST_ENDPOINT + path

        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GITHUB_TOKEN}`
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.statusText}`)
            }

            const data = await response.json()
            return data as T
        } catch(error) {
            console.error("Error fetching data from GitHub:", error);
            return null
        }
    }
}