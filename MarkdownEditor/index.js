import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import PropTypes from 'prop-types';
import Previewer from '../components/Previewer'

import css from './style.css';

function MarkdownEditor({ file, write }) {
  const [value, setValue] = useState('');
  const [preview, setPreview] = useState(true)

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


  const handleClick = () => {
    setPreview(!preview)
  }


  return (
    <div>
      {preview ? (
          <Previewer file={file} text={value} />
      ) : (
          <TextareaAutosize
            value={value}
            onChange={handleChange}
            className={css.editor}
          />
      )}
      <button onClick={handleClick}>{preview ? "Edit" : "Preview"}</button>
    </div>
  )
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
