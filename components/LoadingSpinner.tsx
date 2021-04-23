import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className='container mx-auto'>
      <img
        className='animate-spin mt-10 h-10 w-10 mx-auto'
        src='/images/loader.svg'
        alt='loader'
      />
    </div>
  )
}

export default LoadingSpinner
