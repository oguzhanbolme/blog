import { useEffect } from 'react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as sanitizeHtml from 'sanitize-html';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import { Post } from '../../types/Post';
import convertDateToString from '../../utils/convertDateToString';
import TagButton from '../../components/ui/TagButton';

const sanitizeOptions = {
  allowedClasses: {
    '*': ['bg-*', 'text-*', 'font-*', 'm-*', 'p-*', 'mt-*', 'mb-*', 'pt-*', 'pb-*'],
    code: ['language-*', 'lang-*'],
  },
};

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const posts = (await (await fetch(`${process.env.DOMAIN_URL}/api/posts`)).json()) as Post[];
  const paths: any = [];
  posts.forEach((post) => locales.forEach((locale) => paths.push({ params: { id: post.id }, locale })));

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
    revalidate: 3600,
  };
}

export default function PostDetail({ post }: { post: Post }) {
  const { locale } = useRouter();

  useEffect(() => {
    Prism.highlightAll();
  }, [locale]);

  return (
    <main>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>
          {post.title[locale as keyof typeof post.title] || post.title.default}
        </title>
        <meta
          name="title"
          content={post.title[locale as keyof typeof post.title] || post.title.default}
        />
        <meta
          name="description"
          content={post.description[locale as keyof typeof post.description] || post.description.default}
        />
        <meta name="keywords" content="Blog, JavaScript, TypeScript, React, Frontend, HTML, CSS" />
        <meta name="author" content="Oğuzhan Bölme" />
      </Head>

      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          {post.title[locale as keyof typeof post.title] || post.title.default}
        </h1>

        <p className="font-normal text-gray-700 dark:text-gray-400 mb-1">
          {convertDateToString(post.creationDate)}
        </p>

        <div className="flex flex-wrap gap-4">
          {post.tags.map((tag) => <TagButton key={tag.id} tag={tag} />)}
        </div>
      </div>

      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml.default(post.content[locale as keyof typeof post.content] || post.content.default, sanitizeOptions),
        }}
      />
    </main>
  );
}
