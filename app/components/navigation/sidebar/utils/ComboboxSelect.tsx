import Downshift from 'downshift'

const ComboboxSelect = ({items, label, setSelectedItem}) => {

  return (
    <>
      <Downshift
        onChange={(selection) => setSelectedItem(selection)}
        itemToString={(item) => (item ? item.value : '')}
      >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (

        <div className='pt-1'>
          <label className='text-md'>{label}</label>
          <div className='flex'>
            <input className='flex flex-grow border h-8 p-1' {...getInputProps()} required/>
            <button className='flex grow-0 w-12 justify-center border bg-gray-100'{...getToggleButtonProps()} aria-label={'toggle menu'}>&#8595;</button>
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