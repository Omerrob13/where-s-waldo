import React from 'react';
const Target = props => {
  const {
    xCoor,
    yCoor,
    targetClassName,
    isFigureCorrect,
    waldoBtn,
    greyHeadBtn,
  } = props;

  function inputsClick(e) {
    isFigureCorrect(e.target.value);
  }
  const targetBox = () => {
    return (
      <div
        className={targetClassName}
        style={{ position: 'absolute', left: xCoor, top: yCoor }}
      >
        <input
          type="button"
          value="waldo"
          style={{ position: 'absolute', left: 0, top: 50 }}
          onClick={inputsClick}
          className={waldoBtn}
        />
        <input
          type="button"
          value="grey head"
          style={{ position: 'absolute', left: 0, top: 85 }}
          onClick={inputsClick}
          className={greyHeadBtn}
        />
      </div>
    );
  };
  return <div className="target-box-container">{targetBox()}</div>;
};

export default Target;
