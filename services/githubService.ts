import { GITHUB_API_URL, GITHUB_TOKEN } from "../config.ts";

export class GitHubService {
    async fetchFromGitHub<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
        if (!GITHUB_API_URL) {
            throw new Error("GitHub API URL is not defined.")
        }

        if (!GITHUB_TOKEN) {
            throw new Error("GitHub token is not defined.")
        }
        
        try {
            const response = await fetch(GITHUB_API_URL, {
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
}