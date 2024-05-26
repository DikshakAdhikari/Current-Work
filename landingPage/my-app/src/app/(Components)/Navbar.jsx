

const Navbar = () => {
  return (
    <div className=' flex justify-between px-28 m-5 items-center'>
        <div className=" font-semibold text-gray-700 font-serif text-lg">
            MANGAL BAZAAR
        </div>
        <div className=' flex gap-3 items-center'>
            <div className=' text-gray-800 text-sm'>Venues</div>
            <div className=' text-gray-800 text-sm'>Vendors</div>
            <div className=' text-gray-800 text-sm'>Blog</div>
        </div>
        <div className=' flex gap-3'>
            <input placeholder='Search Venues or vendors' className= 'outline-none text-sm border-[2px] border-gray-200 text-gray-700 p-2 rounded-2xl'/>
            <button className=' py-2 px-4 text-white bg-orange-500 rounded-md text-sm'>Login</button>
        </div>
    </div>
  )
}

export default Navbar