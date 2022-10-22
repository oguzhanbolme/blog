import Head from 'next/head';
import { Post } from '../types/Post';
import { Tag } from '../types/Tag';
import Search from '../components/page/index/Search';
import PostList from '../components/page/index/postList';
import TagList from '../components/page/index/tagList';

export default function Home({ tags, posts }: { tags: Tag[]; posts: Post[] }) {
  return (
    <main className="flex flex-col gap-6">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Oğuzhan Bölme Blog</title>
        <meta name="title" content="Oğuzhan Bölme Blog" />
        <meta name="description" content="Oğuzhan Bölme Blog" />
        <meta name="keywords" content="Blog, JavaScript, TypeScript, React, Frontend, HTML, CSS" />
        <meta name="author" content="Oğuzhan Bölme" />
      </Head>

      <Search />

      <TagList tags={tags} />

      <PostList posts={posts} />
    </main>
  );
}

export async function getStaticProps() {
  const tags = await (await fetch(`${process.env.DOMAIN_URL}/api/tags`)).json();
  const posts = await (await fetch(`${process.env.DOMAIN_URL}/api/posts?fields=creationDate,description,title,tags`)).json();

  return {
    props: {
      tags,
      posts,
    },
    revalidate: 3600,
  };
}
