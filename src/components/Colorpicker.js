'use strict'

import React, {useState, useContext, useEffect} from 'react'
import reactCSS from 'reactcss'
import { Dialog } from '@material-ui/core';
import { ChromePicker } from 'react-color'
import {ClusteringContext} from './ClusteringContext'

export const Colorpicker = (props) => {
  const {setColors} = useContext(ClusteringContext);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(props.color);
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.hex);
    setColors(props.id, color.hex);
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '20px',
        height: '20px',
        borderRadius: '2px',
        backgroundColor: `${color}`,
      },
      swatch: {
        padding: '2px',
        background: '#ffffff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: '',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <span>
      <span style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </span>
      {displayColorPicker ? <div style={styles.popover}>
        <div style={styles.cover} onClick={handleClose}/>
        <ChromePicker color={color} onChange={handleChange} />
      </div> : null}
    </span>
  );
}

export default Colorpicker