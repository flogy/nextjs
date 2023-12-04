import Downshift from 'downshift'

const ComboboxSelect = ({items, setSelectedItem}) => {

  return (
    <>
      <Downshift
        onChange={(selection) => console.log('you selected: ', selection)}
        itemToString={(item) => (item ? item.value : '')}
      >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (

        <div className='pt-1'>
          <label className='text-md'>Search Database:</label>
          <div className='flex'>
            <input className='flex flex-grow border h-8 p-1' {...getInputProps()} />
            <button className='flex flex-grow w-2 justify-center border bg-gray-100'{...getToggleButtonProps()} aria-label={'toggle menu'}>&#8595;</button>
          </div>
          <ul {...getMenuProps()} className='max-h-96 overflow-y-scroll list-none bg-white relative'>
            {isOpen ? 
              items.filter((item) => !inputValue || item.value.includes(inputValue)).map((item, index) => (
                    <li key={item.key} className='p-1'
                      {...getItemProps({
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {item.value}
                    </li>
                  ))
            : null}
          </ul>
        </div>

      )}
    </Downshift>
    </>
  )
}

export default ComboboxSelect