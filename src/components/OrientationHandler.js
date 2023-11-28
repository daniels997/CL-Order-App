import React, { useEffect, useState } from 'react';

const OrientationHandler = () => {
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
    };

    handleOrientationChange(); // Check the initial orientation

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <div>
      {isPortrait ? (
        <p>The device is in portrait mode.</p>
      ) : (
        <p>The device is in landscape mode.</p>
      )}
    </div>
  );
};

export default OrientationHandler;
