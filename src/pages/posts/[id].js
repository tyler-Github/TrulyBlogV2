import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import { format } from 'date-fns';
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

export default function Post({ post }) {
  const contentHtml = unified().use(remarkParse).use(remarkHtml).processSync(post.content).toString();
  return (
    <Container>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="my-4">{post.title}</h1>
          <p>{format(new Date(post.date), 'MMMM dd, yyyy')}</p>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </Col>
      </Row>
    </Container>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      post: {
        ...postData,
        date: postData.date.toISOString()
      }
    }
  };
}
