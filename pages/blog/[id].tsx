/* eslint-disable react/no-danger */
import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Entry } from 'contentful';
import sanitizeHtml from 'sanitize-html';
import marked from 'marked';
import { ParsedUrlQuery } from 'querystring';
import Layout from '../../components/Layout';
import FormattedDate from '../../components/FormattedDate';
import client from '../../utils/client';
import { IPostFields } from '../../@types/generated/contentful';
import highlightCode, { languages } from '../../utils/highlightCode';

interface Props {
  post: Entry<IPostFields>;
}

const Post: React.FC<Props> = ({ post }) => {
  const codeLang = languages.map((language) => {
    return `language-${language}`;
  });

  const contentHtml = sanitizeHtml(marked(post.fields.content ?? ''), {
    allowedClasses: {
      code: codeLang,
    },
  });

  useEffect(() => {
    highlightCode();
  }, []);

  return (
    <Layout title={post.fields.title}>
      <article>
        <h1>{post.fields.title}</h1>
        <div>
          {'カテゴリー: '}
          {post.fields.category?.map((item) => (
            <span className="category">{item.fields.name}</span>
          ))}
        </div>
        <div>
          <FormattedDate dateString={post.sys.createdAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
};

export default Post;

/**
 * Next.js の SSG のためのコード
 */
interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.getEntries<IPostFields>().then((result) => {
    return result;
  });
  const paths = posts.items.map((item) => `/blog/${item.sys.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const id = context.params?.id || '';
  const post = await client.getEntry<IPostFields>(id).then((result) => {
    return result;
  });
  return {
    props: {
      post,
    },
  };
};
