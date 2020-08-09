import React from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

export function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      data-testid="nextArrow"
      type="button"
      className={className}
      onClick={onClick}
    >
      <FaChevronRight
        color="#000"
        size="3.5rem"
      />
    </button>
  );
}

export function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      data-testid="prevArrow"
      type="button"
      className={className}
      onClick={onClick}
    >
      <FaChevronLeft
        color="#000"
        size="3.5rem"
      />
    </button>
  );
}
