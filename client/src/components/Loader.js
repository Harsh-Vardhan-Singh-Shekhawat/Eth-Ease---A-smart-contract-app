import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='animate-spin rounded-full w-32 border-b-2 border-red-700 h-32'></div>
    </div>
  )
}

export default Loader
