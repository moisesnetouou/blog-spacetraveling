/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { GetStaticProps } from 'next';
import { Head } from 'next/document';
import { FiCalendar } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';
// import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }: any) {
  return (
    <>
      {/* <Head>
        <title>Home</title>
      </Head> */}

      <Header />

      <main className={styles.container}>
        <div className={styles.boxPostContainer}>
          {posts.map(post => (
            <div>
              <h1>{post.title}</h1>
              <p>{post.subtitle}</p>

              <div className={styles.detailsPost}>
                <div>
                  <FiCalendar fontSize={20} />
                  <p>{post.updatedAt}</p>
                </div>

                <div>
                  <FiCalendar fontSize={20} />
                  <p>{post.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <a href="www">Carregar mais posts</a>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      slug: post.uid,
      // @ts-ignore
      title: post.data.title,
      // @ts-ignore
      subtitle: post.data.subtitle,
      // @ts-ignore
      author: post.data.author,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };
  });

  console.log(JSON.stringify(postsResponse, null, 2));

  // TODO
  return {
    props: {
      posts,
    },
  };
};
