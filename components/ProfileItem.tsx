import Link from 'next/link'

const ProfileItem: React.FC<{
  link?: string
  onClick?: () => void
  title: string
  svgLink: string
}> = ({ link, title, svgLink, onClick }) => {
  return link ? (
    <Link href={link}>
      <a className='-m-3 p-3 flex flex-row items-center rounded-lg hover:bg-gray-50'>
        <img className='w-6 h-full' src={svgLink} alt='user icon' />
        <div className='ml-4'>
          <p className='text-base font-medium text-gray-900'>{title}</p>
        </div>
      </a>
    </Link>
  ) : (
    <button
      onClick={() => onClick()}
      className='-m-3 p-3 flex flex-row items-center rounded-lg hover:bg-gray-50'
    >
      <img className='w-6 h-full' src={svgLink} alt='user icon' />
      <div className='ml-4'>
        <p className='text-base font-medium text-gray-900'>{title}</p>
      </div>
    </button>
  )
}

export default ProfileItem
