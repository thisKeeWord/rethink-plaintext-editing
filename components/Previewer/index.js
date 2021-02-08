import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import path from 'path'

import css from './style.module.css';

function Previewer({ file, text }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(text.length > 0 ? text : await file.text());
    })();
  }, [file, text]);

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object,
  text: PropTypes.string
};

export default Previewer