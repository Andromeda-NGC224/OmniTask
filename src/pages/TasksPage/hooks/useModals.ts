import { useState, useCallback } from 'react';
import type { ModalType } from '../types';

export const useModals = () => {
  const [openModal, setOpenModal] = useState<ModalType | null>(null);

  const isOpen = useCallback(
    (modal: ModalType) => openModal === modal,
    [openModal],
  );

  const open = useCallback((modal: ModalType) => {
    setOpenModal(modal);
  }, []);

  const close = useCallback(() => {
    setOpenModal(null);
  }, []);

  return {
    isOpen,
    open,
    close,
  };
};
