import React, { useState, useEffect } from 'react';

import { App } from 'components';

export default () => {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(true);
  }, []);

  return <>{hasWindow && <App />}</>;
};
