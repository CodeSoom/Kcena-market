import React from 'react';

export default function Logout({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
      >
        Log out
      </button>
    </div>
  );
}
