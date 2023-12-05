import { useRef, useState } from 'react';
import useSWR from 'swr';
import { Panel } from 'reactflow';
import Popup from 'reactjs-popup';
import { MdOutlineEdit, MdOutlineEditOff } from "react-icons/md";
import { BsDatabaseDown, BsDatabaseAdd } from "react-icons/bs";
import ComboboxSelect from '@/app/components/navigation/sidebar/utils/ComboboxSelect';

const PathwayCreatorControls = ({level, onSaveTemplate, onRestoreTemplate, editableCanvas, handleEditableCanvasClick, onSave, onRestore, printNodes}) => {
  const load_popup_ref = useRef()
  const save_popup_ref = useRef()
  const [templateTitle, setTemplateTitle] = useState('')
  const [templateToLoad, setTemplateToLoad] = useState('')



  // fetch available paths
  var templates = []
  const fetcher = (url:URL) => fetch(url).then((res) => res.json());
  const { data, isLoading, error } = useSWR(`/api/templates?level=${level}`, fetcher)
  if (error) return <div className='text-white'>An error occured.</div>
  if (!data) return <div className='text-white'>Loading ...</div>
  if (data){
    console.log(data)
      templates = data["templates"].map(item =>(
        {key: item.id, value: `${item.name}`}
  ))
  }

  function handleLoadTemplate(){
    console.log('loading template')
    console.log(templateToLoad)
    //onRestoreTemplate(template_id)
  }

  function handleSaveTemplate(e){
    e.preventDefault()
    //onSaveTemplate(name: templateTitle, level:level)
    setTemplateTitle('')
    save_popup_ref.current.close()
    console.log('saving the template')
  }


  return (
    <Panel position="top-right">
      <div className='flex flex-col w-12 items-end gap-2'>
        {/* set canvas editable/non-editable button */}
        <button className={`py-2 px-2 text-xl focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
          onClick={handleEditableCanvasClick}>
          {editableCanvas ? <MdOutlineEdit/> : <MdOutlineEditOff/>}
        </button>

        {/* get template paths from db */}
        <Popup 
          trigger={
            <button className={`py-2 px-2 text-xl focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}>
              <BsDatabaseDown />
            </button>
          } 
          position={'left center'}
          closeOnDocumentClick
          ref={load_popup_ref}
          >
            <div className="w-96 h-min-20 bg-gray-100 rounded-md flex flex-col p-1">
              <ComboboxSelect 
                items={templates}
                label={'Select Path from Templates:'}
                setSelectedItem={setTemplateToLoad}
              />
              <span className="flex gap-2">
                <button type="button" onClick={handleLoadTemplate} className="flex-1 bg-gray-400 rounded-md hover:bg-gray-300 mt-2">Load</button>
                <button type="button" onClick={() => load_popup_ref.current.close()} className="flex-1 bg-gray-400 rounded-md mt-2">Cancel</button>
              </span>
            </div>
        </Popup>


        {/* save current path as template to DB */}
        <Popup 
          trigger={
            <button className={`py-2 px-2 text-xl focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}>
              <BsDatabaseAdd/>
            </button>
          } 
          position={'left center'}
          closeOnDocumentClick
          ref={save_popup_ref}
          >
            <div className="w-96 h-min-20 bg-gray-100 rounded-md flex flex-col p-1">
              <form onSubmit={handleSaveTemplate} className='flex flex-col'>
                <label htmlFor="saveTemplate">Save Template as:</label>
                <input
                  className='border h-8 p-1' 
                  id="saveTemplate"
                  type="text"
                  required
                  value = {templateTitle}
                  onChange={(e) => setTemplateTitle(e.target.value)}
                />
                <span className="flex gap-2">
                  <button type="submit" className="flex-1 bg-gray-400 rounded-md hover:bg-gray-300 mt-2">Save</button>
                  <button type="button" onClick={() => save_popup_ref.current.close()} className="flex-1 bg-gray-400 rounded-md mt-2">Cancel</button>
                </span>
              </form>
            </div>
        </Popup>




        <button className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={onSave}>save</button>
        <button className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={onRestore}>restore</button>
        <button className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={printNodes}>current node array</button>
      </div>
    </Panel>
  )
}

export default PathwayCreatorControls