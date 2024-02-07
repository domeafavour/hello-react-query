import { useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';

function fetchPostAndComments(): Promise<{
  post: {
    id: number;
    title: string;
    body: string;
  };
  comments: {
    id: number;
    body: string;
  }[];
}> {
  console.log('fetching post and comments');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        post: {
          id: 2,
          title: 'I am a post',
          body: 'I am a body',
        },
        comments: [
          {
            id: 1,
            body: 'I am a comment',
          },
          {
            id: 2,
            body: 'I am a comment too',
          },
        ],
      });
    }, 1000);
  });
}

function useQueryPost() {
  return useQuery({
    queryKey: ['postAndComments'],
    queryFn: fetchPostAndComments,
    select: (data) => data.post,
  });
}

function useQueryComments() {
  return useQuery({
    queryKey: ['postAndComments'],
    queryFn: fetchPostAndComments,
    select: (data) => data.comments,
  });
}

function Post() {
  const { data, isLoading, isFetching } = useQueryPost();

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (!data) {
    return <div>node post.</div>;
  }

  return (
    <article>
      <h1
        className={classNames('text-black text-2xl font-serif text-center', {
          'text-gray-500': isFetching,
        })}
      >
        {data.title}
      </h1>
      <p className="text-base font-sans">{data.body}</p>
    </article>
  );
}

function Comments() {
  const { data, isLoading, isFetching } = useQueryComments();

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (!data) {
    return <div>no comments.</div>;
  }

  return (
    <div>
      <h3
        className={classNames('text-black text-lg py-3', {
          'text-gray-500': isFetching,
        })}
      >
        comments
      </h3>
      <ul>
        {data.map((comment) => (
          <li
            key={comment.id}
            className={classNames(
              'text-sm border-b border-slate-200 px-3 py-2 cursor-pointer mb-2'
            )}
          >
            {comment.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function QueryNestedData() {
  const queryClient = useQueryClient();
  return (
    <div className="w-1/2 mx-auto">
      <Post />
      <Comments />
      <button
        type="button"
        className="text-sm bg-blue-400 hover:bg-blue-300 px-3 py-2 mt-3 rounded-md text-white cursor-pointer"
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ['postAndComments'] });
        }}
      >
        reload
      </button>
    </div>
  );
}
