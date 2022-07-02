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