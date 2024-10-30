export const RELEASE_QUERY = `
    query($owner: String!, $repo: String!) {
        repository(owner: $owner , name: $repo) {
            releases(first: 1) {
                nodes {
                    id
                    name
                    tagName
                    publishedAt
                    url
                    isPrerelease
                    description
                    author {
                        login
                        url
                    }
                }
            }
        }
    }
`