import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border border-gray-800'></div>
      
    </div>
  )
}

export default Loader;
