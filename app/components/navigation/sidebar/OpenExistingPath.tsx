import React from 'react'
import { useState } from 'react';
import SearchableDropdown from './SearchableDropdown';

const OpenExistingPath = ({pathList, currentPath, setCurrentPath}) => {
  const [value, setValue] = useState("Select option...");

  return (
      <div className="flex flex-col bg-white mt-2 rounded-md p-1">
        <SearchableDropdown
          options={pathList}
          label="name"
          id="uuid"
          selectedVal={currentPath.name}
          // handleChange={(uuid) => console.log(uuid, pathList, pathList.filter((path) => path.uuid === uuid)[0])}
          handleChange={(uuid) => setCurrentPath(pathList.filter((path) => path.uuid === uuid)[0])}
        />
      </div>
    );
}

export default OpenExistingPath