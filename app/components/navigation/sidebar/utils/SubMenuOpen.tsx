import ComboboxSelect from './ComboboxSelect'
import useSWR from 'swr'
import { useState } from 'react'

export default function SubMenuOpen({setCurrentPath, setPathOpen}) {

  var paths = []
  const fetcher = (url:URL) => fetch(url).then((res) => res.json());
  const { data, isLoading, error } = useSWR('/api/paths', fetcher)
  if (error) return <div className='text-white'>An error occured.</div>
  if (!data) return <div className='text-white'>Loading ...</div>

  if (data){
      paths = data["paths"].map(item =>(
        {key: item.id, value: `${item.leistungsgruppe}-${item.name}`}
  ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPathOpen(true)
  }
  
  return (
    <>
      <form className="flex flex-col bg-white mt-2 rounded-md p-1" onSubmit={e => handleSubmit(e)}>
        <div className='w-full'>
          <ComboboxSelect 
            items={paths}
            setSelectedItem={setCurrentPath}
          />
        </div>
        <button className=" bg-gray-400 rounded-md hover:bg-gray-300 mt-2">Open</button>

      </form>
    </>
  )
}

