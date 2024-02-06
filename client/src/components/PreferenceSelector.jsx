import React from 'react';
import '../App.css'; 

const PreferenceSelector = ({ preferences, onSelectPreference }) => {
    return (
        <div className="preferenceSelector">
        <h2>Choose Some Stuff They Might Like</h2>
        <ul>
        {preferences.map((preference) => (
            <li key={preference} className="listItem" onClick={() => onSelectPreference(preference)}>
            {preference}
            </li>
        ))}
        </ul>
    </div>
    );
};

export default PreferenceSelector;
