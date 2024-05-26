
import React from 'react'
import { bridalWearData } from './Data'
import BridalWear from './BridalWear'

const ShowCategoryInfo = ({titleIndex}) => {
  return (
    <div>
          {
            titleIndex === 2 ?
            <BridalWear />
            :
            <div>Nothing to display</div>
          }
    </div>
  )
}

export default ShowCategoryInfo