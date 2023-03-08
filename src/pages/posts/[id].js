import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import { format } from 'date-fns';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';


hljs.registerLanguage('javascript', javascript);

export default function Post({ post }) {
  const contentHtml = unified()
    .use(remarkParse)
    .use(remarkHtml, {
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) {}
        }

        return ''; // use external default escaping
      },
    })
    .processSync(post.content)
    .toString();

    return (
      <>
      <Head>
        <title>{post.title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/highlight.js@10.7.2/styles/default.min.css"
        />
      </Head>
      <header className="py-3 bg-light border-bottom">
        <Container>
          <h1>{post.title}</h1>
          <p className="lead">
            <FaCalendarAlt className="me-2" />
            {format(new Date(post.date), 'MMMM dd, yyyy')}
            <span className="ms-4">
              <FaUser className="me-2" />
              {post.author}
            </span>
          </p>
        </Container>
      </header>
      <main className="py-3">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </Col>
          </Row>
        </Container>
      </main>
      <footer className="py-3 bg-light border-top">
        <Container>
          <p className="mb-0 text-muted">Author: {post.author}</p>
        </Container>
      </footer>
    </>
    );
  }


export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      post: {
        ...postData,
        date: postData.date.toISOString(),
      },
    },
  };
}
