// /components/utils/loading-spinner.jsx

import React from 'react';
import styles from './loading-spinner.module.css'; // Import the CSS module

const Loader = ({ bgColor, textColor, message, width, height, strokeWidth }) => {
  return (
    <>
      <div className="flex justify-center mt-10 mx-auto">
        <div className={styles.loader}></div> {/* Use the class from the module */}
      </div>
      <div className="flex justify-center mx-auto">
        <h3 className={`${textColor} font-semibold text-l`}>{message}</h3>
      </div>
    </>
  );
};

export default Loader;
