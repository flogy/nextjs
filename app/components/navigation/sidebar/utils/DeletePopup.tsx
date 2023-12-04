import React, { useState } from 'react';
import Popup from 'reactjs-popup';

const DeletePopup = () => {
  const [openModal, setOpenModal] = useState(true);
  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={() => setOpenModal(false)}>
        <div className="">
          <a className="" onClick={() => setOpenModal(false)}>
            &times;
          </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
          ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
          doloribus. Odit, aut.
        </div>
      </Popup>
    </div>
  );
};

export default DeletePopup