import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingComponent = () => {
  return (
    <div>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
        {/* <img
          src={process.env.PUBLIC_URL + '/preloader.gif'}
          className='loading-img'
          alt='loding'
        /> */}
      </Spinner>
    </div>
  );
};

export default LoadingComponent;
