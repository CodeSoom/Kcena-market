import React, { createContext, useState, useRef } from 'react';

import ConfirmDialog from '../components/presentational/ConfirmDialog';

const ConfirmationContext = createContext({});

const ConfirmationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmForm, setConfirmForm] = useState({
    title: '',
    content: '',
  });

  const { title, content } = confirmForm;

  const resolver = useRef();

  const handleShowDialog = () => {
    setIsOpen(true);
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  const handleOk = () => {
    resolver.current(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolver.current(false);
    setIsOpen(false);
  };

  const value = {
    showConfirmation: handleShowDialog,
    setConfirmForm,
  };

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
      <ConfirmDialog
        isOpen={isOpen}
        title={title}
        content={content}
        onConfirm={handleOk}
        onCancel={handleCancel}
      />
    </ConfirmationContext.Provider>
  );
};

const { Consumer: ConfirmationConsumer } = ConfirmationContext;

export { ConfirmationProvider, ConfirmationConsumer };

export default ConfirmationContext;
