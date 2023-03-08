import Head from 'next/head';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getAllPostsData } from '../lib/posts';
import { format } from 'date-fns';

function Home({ posts }) {
  return (
    <Container>
      <Head>
        <title>My Blog</title>
      </Head>
      <Row>
        <Col>
          <h1>My Blog</h1>
        </Col>
      </Row>
      <Row>
        {posts.map((post) => (
          <Col key={post.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {format(new Date(post.date), 'MMM dd, yyyy')}
                </Card.Subtitle>
                <Card.Text>{post.description}</Card.Text>
                <Link href={`/posts/${post.id}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllPostsData();
  return {
    props: {
      posts,
    },
  };
}

export default Home;
