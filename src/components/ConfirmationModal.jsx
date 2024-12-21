// src/components/ConfirmationModal.jsx

import React from 'react';
import { Modal } from './Modal';

export const ConfirmationModal = ({
                                      isOpen,
                                      onClose,
                                      onConfirm,
                                      title,
                                      message,
                                      children,
                                  }) => {
    if (!isOpen) return null;

    return (
        <Modal
            title={title}
            onClose={onClose}
            showConfirmButtons={true}
            onConfirm={onConfirm}
            confirmText="구매하러 가기"
            cancelText="보고서 확인하기"
            onCancel={onClose}
        >
            <div className='flex ml-2 text-gray-600 text-lg'>
                <p>{message}</p>
            </div>
            {children && <div className="mt-4">{children}</div>}
        </Modal>
    );
};
