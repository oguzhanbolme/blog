import { useEffect, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import * as sanitizeHtml from 'sanitize-html';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import { Post } from '../../types/Post';
import convertDateToString from '../../utils/convertDateToString';
import TagButton from '../../components/ui/TagButton';

const sanitizeOptions = {
  allowedAttributes: {
    '*': ['class', 'scope'],
  },
};

export async function getStaticPaths() {
  const posts = (await (await fetch(`${process.env.DOMAIN_URL}/api/posts`)).json().catch(() => [])) as Post[];
  const paths: any = [];
  posts.forEach((post) => paths.push({ params: { id: post.id } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id as string;
  const post = await (await fetch(`${process.env.DOMAIN_URL}/api/posts/${id}`)).json();

  return {
    props: {
      post,
    },
    revalidate: 10800,
  };
}

export default function PostDetail({ post }: { post: Post }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
    if (render) Prism.highlightAll();
  }, [render]);

  return (
    <main>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>
          {post.title}
        </title>
        <meta name="title" content={post.title} />
        <meta name="description" content={post.description} />
        <meta name="keywords" content="Blog, JavaScript, TypeScript, React, Frontend, HTML, CSS" />
        <meta name="author" content="Oğuzhan Bölme" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://blog-oguzhanbolme.vercel.app/posts/${post.id}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content="/android-chrome-512x512.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://blog-oguzhanbolme.vercel.app/posts/${post.id}`} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.description} />
        <meta property="twitter:image" content="/android-chrome-512x512.png" />
      </Head>

      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          {post.title}
        </h1>

        <p className="font-normal text-gray-700 dark:text-gray-400 mb-1">
          {convertDateToString(post.creationDate)}
        </p>

        <div className="flex flex-wrap gap-4">
          {post.tags.map((tag) => <TagButton key={tag.id} tag={tag} />)}
        </div>
      </div>

      {render && (
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml.default(post.content, sanitizeOptions),
          }}
        />
      )}
    </main>
  );
}
