import { Destination, Post, User } from '.prisma/client'
import Link from 'next/link'

export interface PostAuthor extends Post {
  author: Pick<User, 'firstname' | 'lastname' | 'avatarSmall'>
  destinations: [Destination]
}

const PostComponent: React.FC<{ post: PostAuthor }> = ({ post }) => {
  return (
    <Link href={'/app/post/' + post.id}>
      <div className='card flex flex-col max-h-96 transition-transform transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-110 cursor-pointer'>
        <h3 className='mb-2'>{post.title}</h3>
        <p className='mb-4 truncate'>{post.description}</p>
      </div>
    </Link>
  )
}

export default PostComponent
