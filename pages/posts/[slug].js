import styles from '../../styles/slug.module.css'
import {GraphQLClient, gql} from 'graphql-request';
import { useEffect, useState } from 'react';
import { printIntrospectionSchema } from 'graphql';

const graphcms = new GraphQLClient('https://api-sa-east-1.graphcms.com/v2/cl5dbsxg202y801uh6zud91xd/master');

const QUERY = gql`
    query Post($slug: String!){
        post(where: {slug: $slug}){
            id,
            title,
            slug,
            date_publish
            author{
                id,
                name,
                avatar{
                    url
                }
            }
            content{
                html
            }
            coverPhoto{
                id,
                url
            }
        }
    }
`;

const SLUGLIST = gql`
    {
        posts{
            slug
        }
    }

`;
export async function getStaticPaths(){
    const {posts} = await graphcms.request(SLUGLIST);
    return{
        paths: posts.map((post) => ({
            params: {slug: post.slug}
        })),
        fallback: false
    }
}
export async function getStaticProps({params}){
    const slug = params.slug;
    const data = await graphcms.request(QUERY, {slug});
    const post = data.post;
    return {
        props: {
        post,
        },
        revalidate: 10,
    };
}

export default function BlogPost({post}){
    return(
        <main className={styles.blog}>
            <img src={post.coverPhoto.url} className={styles.cover} alt="" />
            <div className={styles.authdetails}>
                <h2 className={styles.title}>{post.title}</h2>
                <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content.html}} ></div>
                <img src={post.author.avatar.url} alt="" />
                <div className={styles.authtext}>
                    <h6>By {post.author.name}</h6>
                    <h6 className={styles.date}>{post.date_publish}</h6>
                </div>
            </div>
        </main>
    )
}