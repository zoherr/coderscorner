import React, { useEffect } from 'react';
import { style } from '@/app/styles/style'
import { preLoaderAnim } from './page';

const PreLoader: React.FC = () => {
  useEffect( () => {
    preLoaderAnim()
  }, []   )

  return (
    <div className={style.preloader}>
      <div className={style.textsContainer}>
        <span>Developer,</span>
        <span>Curator,</span>
        <span>Vibe.</span>
      </div>
    </div>
  );
};

export default PreLoader;
