import dynamic from 'next/dynamic';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useState, useRef } from 'react';
import { API, Auth } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import { createPost } from '../graphql/mutations';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
});

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('# Hello there!');
  const currentAuthUser = await Auth.currentAuthenticatedUser();
  const mdEditor = useRef(null);
  const post = { title, content, currentAuthUser };
  const router = useRouter();

  async function createNewPost() {
    if (!title || !content) return;
    const id = uuid();
    post.id = id;
    console.log('Post: ', post);

    try {
      await API.graphql({
        query: createPost,
        variables: { input: post },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
    } catch (err) {
      console.log(err.message);
    }

    router.push(`/posts/${id}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
      <input
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500"
      />
      <MdEditor
        ref={mdEditor}
        value={post.content}
        style={{ height: '32rem' }}
        onChange={(event) => {
          setContent(event.text);
        }}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
      />

      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >
        Create Post
      </button>
    </div>
  );
}

export default withAuthenticator(CreatePost);
