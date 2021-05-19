import { useState } from 'react'
import Link from 'next/link'
import useUser from '../hooks/useUser'
import ProfileItem from './ProfileItem'

const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const [user, setUser] = useUser()

  const logout: () => void = () => {
    document.cookie = 'token=; expires = Thu, 01 Jan 1970 00:00:00 GMT; PATH=/'
    setUser(null)
    setIsProfileOpen(false)
  }

  return (
    <div className='sticky top-0 bg-secondary'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex justify-between items-center py-2 sm:py-3 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <span className='sr-only'>Home</span>
            <Link href='/app'>
              <a>
                <img
                  className='h-8 w-auto sm:h-12'
                  src='/images/world.svg'
                  alt='logo'
                />
              </a>
            </Link>
          </div>
          <div className='-mr-2 -my-2 md:hidden'>
            <button
              type='button'
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 appearance-none'
              aria-expanded='false'
            >
              <span className='sr-only'>Open menu</span>
              {/*  <!-- Heroicon name: outline/menu --> */}
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
          {user && (
            <nav className='hidden md:flex space-x-10 items-center'>
              <Link href='/app/posts'>
                <a className='text-primary text-base font-medium hover:underline'>
                  Find rejse
                </a>
              </Link>
              <Link href='/app/createPost'>
                <a className='ctabutton'>Opret Rejse</a>
              </Link>
            </nav>
          )}
          <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
            {user ? (
              <div>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className='inline-flex items-center text-base font-medium'
                  aria-expanded='false'
                >
                  <img
                    className='ml-3 rounded-full w-8 h-full fill-current text-primary'
                    src={
                      user?.avatarSmall
                        ? process.env.NEXT_PUBLIC_AWS_S3_URL + user.avatarSmall
                        : '/images/user-white.svg'
                    }
                    alt='avatar'
                  />
                  <div className='ml-3 text-primary'>
                    {user?.firstname + ' ' + user?.lastname}
                  </div>
                  <img
                    className={`ml-3 w-4 h-full fill-current text-primary transform-gpu duration-300 ease-out transition-transform ${
                      isProfileOpen ? 'rotate-0' : '-rotate-180'
                    }`}
                    src='/images/chevron-arrow-down.svg'
                    alt='down-chevron icon'
                  />
                </button>
                <div className='relative'>
                  {isProfileOpen && (
                    <div className='absolute z-10 -ml-4 mt-3 transform px-2 w-60 sm:px-0 right-0 lg:left-0'>
                      <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                        <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                          <ProfileItem
                            title='Profile'
                            svgLink='/images/user.svg'
                            link={'/app/profile/' + user.id}
                          />
                          <ProfileItem
                            title='Indstillinger'
                            svgLink='/images/settings.svg'
                            link='/app/settings'
                          />
                          <ProfileItem
                            onClick={logout}
                            svgLink='/images/logout.svg'
                            title='Log ud'
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className='inline-flex gap-x-4 items-center'>
                <Link href='/login'>
                  <a className='whitespace-nowrap text-base font-medium text-primary hover:underline'>
                    Log ind
                  </a>
                </Link>
                <Link href='/signup'>
                  <a className='ctabutton'>Opret bruger</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileDropdownOpen && (
        <div className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex justify-end items-center'>
                <div className='-mr-2'>
                  <button
                    onClick={() =>
                      setIsMobileDropdownOpen(!isMobileDropdownOpen)
                    }
                    type='button'
                    className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                  >
                    <span className='sr-only'>Close menu</span>
                    {/*  <!-- Heroicon name: outline/x --> */}
                    <svg
                      className='h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='mt-6'>
                <nav className='grid gap-y-8'></nav>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              <div>
                {user && (
                  <button
                    onClick={() => logout()}
                    className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                  >
                    Log ud
                  </button>
                )}
                {!user && (
                  <>
                    <Link href='/signup'>
                      <a
                        onClick={() => setIsMobileDropdownOpen(false)}
                        className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                      >
                        Opret bruger
                      </a>
                    </Link>
                    <Link href='/login'>
                      <p
                        onClick={() => setIsMobileDropdownOpen(false)}
                        className='mt-6 text-center text-base font-medium text-gray-500'
                      >
                        Har du allerede en bruger?
                        <a className='text-indigo-600 hover:text-indigo-500'>
                          <span> </span> Log ind
                        </a>
                      </p>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
