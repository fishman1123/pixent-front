// src/components/ConfirmationModal.jsx

import React from 'react';
import { PortalModal } from './PortalModal';

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
        <PortalModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}

            showConfirmButtons
            onConfirm={onConfirm}
            confirmText="구매하러 가기"
            cancelText="보고서 확인하기"
            onCancel={onClose}
        >
            <div className="flex ml-2 text-gray-600 text-lg">
                <p>{message}</p>
            </div>
            {children && <div className="mt-4">{children}</div>}
        </PortalModal>
    );
};
