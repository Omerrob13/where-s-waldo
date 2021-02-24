import React from 'react';

const Figures = props => {
  if (props.isGreyHead) {
    return (
      <div>
        <p className={props.class}>You have found Grey Head</p>
      </div>
    );
  } else if (props.isWaldo) {
    return (
      <div>
        <p className={props.class}>You have found Waldo</p>
      </div>
    );
  }
};

export default Figures;
