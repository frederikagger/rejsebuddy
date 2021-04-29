import { useState } from 'react'
import Link from 'next/link'
import useUser from '../hooks/useUser'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const [isSolutionOpen, setSolutionOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const [user, setUser] = useUser()

  const logout: () => void = () => {
    document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
    setUser(null)
  }

  return (
    <div className='sticky top-0 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex justify-between items-center border-b-2 py-2 sm:py-0 border-gray-100 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <span className='sr-only'>Workflow</span>
            <Link href='/app'>
              <a>
                <img
                  className='h-8 w-auto sm:h-20'
                  src='/images/logo.png'
                  alt='logo'
                />
              </a>
            </Link>
          </div>
          <div className='-mr-2 -my-2 md:hidden'>
            <button
              type='button'
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
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
            <nav className='hidden md:flex space-x-10'>
              <div className='relative'>
                {/*  <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" --> */}
                <button
                  onClick={() => setSolutionOpen(!isSolutionOpen)}
                  className='text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  aria-expanded='false'
                >
                  <span>Solutions</span>
                  {/*    <!--
              Heroicon name: solid/chevron-down

              Item active: "text-gray-600", Item inactive: "text-gray-400"
            --> */}
                  <svg
                    className='text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>

                {isSolutionOpen && (
                  <div className='absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2'>
                    <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                      <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                        <Link href='/app/posts'>
                          <a className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'>
                            {/*   <!-- Heroicon name: outline/chart-bar --> */}
                            <svg
                              className='flex-shrink-0 h-6 w-6 text-secondary'
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
                                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                              />
                            </svg>
                            <div className='ml-4'>
                              <p className='text-base font-medium text-gray-900'>
                                Rejse opslag
                              </p>
                            </div>
                          </a>
                        </Link>
                        <a
                          href='#'
                          className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                        >
                          {/* <!-- Heroicon name: outline/cursor-click --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                              d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                            />
                          </svg>
                          <div className='ml-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Engagement
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              Speak directly to your customers in a more
                              meaningful way.
                            </p>
                          </div>
                        </a>

                        <a
                          href='#'
                          className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                        >
                          {/*  <!-- Heroicon name: outline/shield-check --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                              d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                            />
                          </svg>
                          <div className='ml-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Security
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              Your customers&#039; data will be safe and secure.
                            </p>
                          </div>
                        </a>
                        <a
                          href='#'
                          className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                        >
                          {/*  <!-- Heroicon name: outline/view-grid --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                              d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                            />
                          </svg>
                          <div className='ml-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Integrations
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              Connect with third-party tools that you&#039;re
                              already using.
                            </p>
                          </div>
                        </a>

                        <a
                          href='#'
                          className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                        >
                          {/*  <!-- Heroicon name: outline/refresh --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                            />
                          </svg>
                          <div className='ml-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Automations
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              Build strategic funnels that will drive your
                              customers to convert
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link href='/app/createPost'>
                <a className='ctabutton'>Opret Rejse</a>
              </Link>

              <div className='relative'>
                {/*  <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" --> */}
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className='text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  aria-expanded='false'
                >
                  <span>Profil</span>
                  {/*  <!--
              Heroicon name: solid/chevron-down

              Item active: "text-gray-600", Item inactive: "text-gray-400"
            --> */}
                  <svg
                    className='text-gray-400 ml-2 h-5 w-5  group-hover:text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                {isMoreOpen && (
                  <div className='absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0'>
                    <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                      <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                        <a
                          href='#'
                          className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                        >
                          {/* <!-- Heroicon name: outline/support --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                              d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
                            />
                          </svg>
                          <div className='ml-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Help Center
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              Get all of your questions answered in our forums
                              or contact support.
                            </p>
                          </div>
                        </a>

                        <a
                          href='#'
                          className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                        >
                          {/*  <!-- Heroicon name: outline/bookmark-alt --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                              d='M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          <div className='ml-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Guides
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              Learn how to maximize our platform to get the most
                              out of it.
                            </p>
                          </div>
                        </a>

                        <a
                          href='#'
                          className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                        >
                          {/* <!-- Heroicon name: outline/calendar --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          <div className='ml-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Events
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              See what meet-ups and other events we might be
                              planning near you.
                            </p>
                          </div>
                        </a>

                        <a
                          href='#'
                          className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                        >
                          {/*  <!-- Heroicon name: outline/shield-check --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                              d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                            />
                          </svg>
                          <div className='ml-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Security
                            </p>
                            <p className='mt-1 text-sm text-gray-500'>
                              Understand how we take your privacy seriously.
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          )}

          <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
            {user ? (
              <button
                onClick={() => logout()}
                className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'
              >
                Log ud
              </button>
            ) : (
              <div>
                <Link href='/login'>
                  <a className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>
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
                    className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
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
                <nav className='grid gap-y-8'>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/*  <!-- Heroicon name: outline/chart-bar --> */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Analytics
                    </span>
                  </a>
                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/*  <!-- Heroicon name: outline/cursor-click --> */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                        d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Engagement
                    </span>
                  </a>

                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/*   <!-- Heroicon name: outline/shield-check --> */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                        d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Security
                    </span>
                  </a>

                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/*  <!-- Heroicon name: outline/view-grid --> */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                        d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Integrations
                    </span>
                  </a>

                  <a
                    href='#'
                    className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                  >
                    {/*   <!-- Heroicon name: outline/refresh --> */}
                    <svg
                      className='flex-shrink-0 h-6 w-6 text-indigo-600'
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
                        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                      />
                    </svg>
                    <span className='ml-3 text-base font-medium text-gray-900'>
                      Automations
                    </span>
                  </a>
                </nav>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              <div>
                {user && (
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileDropdownOpen(false)
                    }}
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
