import { Post, User } from '.prisma/client'

export interface PostAuthor extends Post {
  author: Pick<User, 'firstname' | 'lastname'>
}

const PostComponent: React.FC<{ post: PostAuthor }> = ({ post }) => {
  return (
    <div
      onClick={() => console.log('click')}
      className='card flex flex-col max-h-96 cursor-pointer'
    >
      <h2 className='mb-2'>{post.title}</h2>
      <h4 className='mb-4'>{post.description}</h4>
      <div className='flex flex-row justify-between'>
        <p className='text-xs font-semibold'>
          {post.author.firstname + ' ' + post.author.lastname}
        </p>
        <p className='text-xs font-semibold'>
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

export default PostComponent
