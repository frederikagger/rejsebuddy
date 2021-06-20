const LoadingSpinner: React.FC = () => {
  return (
    <div className='absolute left-1/2 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2'>
      <img
        className='animate-spin h-10 w-10'
        src='/images/loader.svg'
        alt='loader'
      />
    </div>
  )
}

export default LoadingSpinner
