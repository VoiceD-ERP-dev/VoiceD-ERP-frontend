import React from 'react'
import { Rings } from 'react-loader-spinner'

function RingLoader() {
  return (
    <Rings
  visible={true}
  height="128"
  width="128"
  color="#a855f7"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  )
}

export default RingLoader
