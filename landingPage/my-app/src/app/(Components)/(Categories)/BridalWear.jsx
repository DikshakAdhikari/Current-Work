import React from 'react'
import { bridalWearData } from './Data'

const BridalWear = () => {
  return (
    <div>
        {
            bridalWearData.map((val)=> (
                <div>
                    {val.title}
                </div>
            ))
        }
    </div>
  )
}

export default BridalWear