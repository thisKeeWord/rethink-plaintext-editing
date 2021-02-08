import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';

import css from './style.css';


const PlaintextEditor = ({ file, write }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      if (file) {
        setValue(await file.text());
      }
    })()
  }, [file]);

  const handleChange = (event) => {
    setValue(event.target.value);

    write(new File(
      [
        event.target.value
      ],
      file.name,
      {
        type: file.type,
        lastModified: Date.now()
      }
    ))
  }

  return (
    <div className={css.editor}>
      <TextareaAutosize
        value={value}
        onChange={handleChange}
        className={css.editor}
      />
    </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;