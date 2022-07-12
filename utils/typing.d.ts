export type Comment = {
    id:number,
    text:string,
    username:string,
    post_id:number,
    created_at:Date
};

export type Subreddit = {
    id:number,
    topic:string,
    created_at:Date,
};

export type Vote = {
    id:number,
    upvote:boolean,
    username:string,
    post_id:number,
    created_at:Date,
};

export type Post = {
    id:number,
    title:string,
    body:string,
    image:string,
    subreddit_id:number,
    username:string,
    created_at:Date,
    votes:[Vote],
    comments:[Comment]
    subreddit:Subreddit
};


