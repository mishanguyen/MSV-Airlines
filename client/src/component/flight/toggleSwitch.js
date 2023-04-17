import React from 'react';
import './toggleSwitch.css';

function ToggleSwitch({ checked, onChange, isRoundTrip }) {
    return (
      <div className="toggle">
        <div className="btn-container">
          <label className="switch btn-color-mode-switch">
            <input
              type="checkbox"
              name="color_mode"
              id="color_mode"
              checked={checked} 
              onChange={onChange}
            />
            <label
              htmlFor="color_mode"
              data-on="One Way"
              data-off="Roundtrip"
              className="btn-color-mode-switch-inner"
              onClick={isRoundTrip}
            ></label>
          </label>
        </div>
      </div>
    );
  }

export default ToggleSwitch;
  