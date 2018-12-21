import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './DropDown.css';

const DropDown = ({ onSelect, list, selected }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="DropDown">
      <button
        className="DropDown__toggle-btn"
        disabled={list.length < 1}
        onClick={() => setOpen(!open)}
      >
        {selected || ' '}
      </button>
      <div
        className={`DropDown__dropdown ${
          open ? 'DropDown__dropdown--is-open' : ''
        }`}
      >
        {list.map(({ id, label }) => (
          <button
            key={id}
            className="DropDown__dropdown-btn"
            onClick={() => {
              onSelect(id);
              setOpen(false);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  label: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  selected: PropTypes.string
};

export default DropDown;
