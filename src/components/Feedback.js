import React, { useState, useEffect } from 'react';
import Figures from './Figures';
import ErrorMessage from './ErrorMessage';

const Feedback = props => {
  const { isWaldo, clickCount, isGreyHead, figureFound } = props;

  const [hiddenClass, setHiddenClass] = useState('hidden');

  useEffect(() => {
    debugger;
    if (!figureFound && clickCount > 0) {
      setHiddenClass('error-messege');
      setTimeout(function () {
        setHiddenClass('hidden');
      }, 3000);
    }

    if (figureFound) {
      setHiddenClass('found');
      setTimeout(function () {
        setHiddenClass('hidden');
      }, 3000);
    }
  }, [props.clickCount]);

  // useEffect(() => {
  //   setTimeout(function () {
  //     setHiddenClass('hidden');
  //   }, 3000);
  // }, [hiddenClass]);

  if (figureFound === null) return null;
  let RenderFeedback = figureFound ? Figures : ErrorMessage;
  return (
    <RenderFeedback
      class={hiddenClass}
      isGreyHead={isGreyHead}
      isWaldo={isWaldo}
    />
  );
};

export default Feedback;
