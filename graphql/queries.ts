import { gql } from "@apollo/client";

export const GET_SUBRDDIT_BY_TOPIC = gql`
    query MyQuery(
        $topic:String!
    ){
        getSubredditListByTopic(topic: $topic) {
            id,
            created_at,
            topic,
        }
    }
`;

export const GET_POST_LIST = gql`
    query MyQuery{
        getPostList {
            id
            body
            title
            image
            created_at
            username
            subreddit_id
            subreddit {
                id
                topic
                created_at
            }
            votes {
                id
                post_id
                upvote
                username
                created_at
            }
            comments {
                id
                post_id
                text
                username
                created_at
            }
        }
    }
`;