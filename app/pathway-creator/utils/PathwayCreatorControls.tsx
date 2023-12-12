import { useEffect, useRef, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr'
import { Panel } from 'reactflow';
import Popup from 'reactjs-popup';
import { MdOutlineEdit, MdOutlineEditOff } from "react-icons/md";
import { BiImport, BiExport } from "react-icons/bi";
import ComboboxSelect from '@/app/components/navigation/sidebar/utils/ComboboxSelect';

const PathwayCreatorControls = ({level, onSave, onRestore, editableFlowCanvas, setEditableFlowCanvas}) => {
  const load_popup_ref = useRef()
  const save_popup_ref = useRef()
  const [templateTitle, setTemplateTitle] = useState('')
  const [templateToLoad, setTemplateToLoad] = useState(null)

  // fetch available template paths
  const fetcher = (url:URL) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, mutate } = useSWR(`/api/templates?level=${level}`, fetcher)

  useEffect(() => {
    if (!isLoading && data.templates){
      const templates = data.templates.map(template => {
        return {...template, reactFlowInstance: JSON.parse(template.reactFlowInstance)}
      })
      setAllTemplatePaths(templates)
      }

  },[data, isLoading])
  
  //for dropdown menu (load template)
  var templates = allTemplatePaths.map(path => (
    {key: path.id, value: path.name}
  ))

  //set reactFlowInstance according to DB version
  function handleLoadTemplate(){
    const path = allTemplatePaths.filter(path => (path.id === templateToLoad.id))
    onRestore(path[0].reactFlowInstance)
    //setTemplateToLoad({})
    load_popup_ref.current.close()
  }

  //save reactFlowInstance to DB - continue here...
  async function handleSaveTemplate(e){
    e.preventDefault()
    const flow_str = onSave()

    //save flow to db
    if (flow_str){
      var url = 'http://localhost:3000/api/templates'
      var submitData = {name:templateTitle, level, flow_str}

      const res = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (!res.ok){console.log("Debug: saving path didn't work - please try again.")}
    }

    setTemplateTitle('')
    mutate()
    save_popup_ref.current.close()
  }

  return (
    <Panel position="top-right">
      <div className='flex flex-col w-12 items-end gap-2'>
        {/* set canvas editable/non-editable button */}
        <button className={`py-2 px-2 text-xl focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
          onClick={() => setEditableFlowCanvas(!editableFlowCanvas)}>
          {editableFlowCanvas ? <MdOutlineEdit/> : <MdOutlineEditOff/>}
        </button>

        {/* get template paths from db */}
        <Popup 
          trigger={
            <button className={`py-2 px-2 text-xl focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}>
              <BiExport />
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
              <BiImport/>
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
      </div>
    </Panel>
  )
}

export default PathwayCreatorControls