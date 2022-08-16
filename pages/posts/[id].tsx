import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { query } from '.keystone/api';
import { Lists } from '.keystone/types';

type Post = {
    id: string;
    title: string;
    content: string;
};

export default function PostPage({ post }: { post: Post }) {
    return (
        <div>
            <main style={{ margin: '3rem' }}>
                <div>
                    <Link href="/">
                        <a>&larr; back home</a>
                    </Link>
                </div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </main>
        </div>
    );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const posts = (await query.Post.findMany({
        query: `id`,
    })) as { id: string }[];

    const paths = posts
        .filter(({ id }) => !!id)
        .map(({ id }) => `/posts/${id}`);

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const post = (await query.Post.findOne({
        where: { id: params!.id as string },
        query: 'id title',
    })) as Post | null;
    if (!post) {
        return { notFound: true };
    }
    return { props: { post } };
}