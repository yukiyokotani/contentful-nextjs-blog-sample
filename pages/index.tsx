import Head from 'next/head';
import Link from 'next/link';
import { EntryCollection } from 'contentful';
import { GetStaticProps } from 'next';
import React from 'react';
import { IPostFields } from '../@types/generated/contentful';
import client from '../utils/client';
import Layout from '../components/Layout';
import FormattedDate from '../components/FormattedDate';

interface Props {
  posts: EntryCollection<IPostFields>;
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
      </Head>
      <section>
        <h2>Blog</h2>
        <ul>
          {posts.items.map((item) => (
            <li key={item.sys.id}>
              <Link href={`/blog/${item.sys.id}`}>
                <a>{item.fields.title}</a>
              </Link>
              <br />
              <small>
                <FormattedDate dateString={item.sys.createdAt} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

/**
 * Next.js の SSG のためのコード
 */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await client
    .getEntries<IPostFields>({
      content_type: 'post',
    })
    .then((result) => {
      return result;
    });
  return {
    props: {
      posts,
    },
  };
};
