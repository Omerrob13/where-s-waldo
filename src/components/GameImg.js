import React from 'react';
import waldo from '../images/waldo-dino.jpg';

const Image = props => {
  return (
    <div>
      <img
        onClick={props.onImgClick}
        className={props.imgClass}
        src={waldo}
        alt="Waldo"
      />
    </div>
  );
};

export default Image;
