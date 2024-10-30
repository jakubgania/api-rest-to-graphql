export const TEST_QUERY = `
    query($username: String!) {
        user(login: $username) {
            id
            login
            avatarUrl
            url
            bio
            twitterUsername
            websiteUrl
            followers {
                totalCount
            }
            following {
                totalCount
            }
        }
    }
`