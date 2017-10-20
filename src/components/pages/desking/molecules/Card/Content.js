'use strict';
import React from 'react';
import PropTypes from 'prop-types';

const Content = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
};
export default Content;
