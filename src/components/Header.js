import React from 'react';

const Header = props => {
  return (
    <div className={props.headerContainerClass}>
      <h1 className={'title'}>Where's Waldo?</h1>
      <h2 className={'sub-title'}>
        Find Waldo and save your name in the record books!
      </h2>
    </div>
  );
};

export default Header;
