import React, { useState, useEffect } from "react";
import { useGetRequestList } from "../../hooks/useGetRequestList";
import { usePostUsageLimit } from "../../hooks/usePostUsageLimit";
import PrimeModal from "../PrimeModal.jsx";
import { LoadingData } from "../pages/LoadingData.jsx"; // Reuse the existing PrimeModal

export const AdminUsers = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const { data, isLoading, isError, error } = useGetRequestList(page, size);
  const {
    mutate: postUsageLimit,
    isLoading: isApproving,
    isError: isApproveError,
    error: approveError,
    isSuccess,
  } = usePostUsageLimit();

  // Log response data
  useEffect(() => {
    if (data) {
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <LoadingData />
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching data:", error);
    return <div className="text-center mt-10">Error: {error.message}</div>;
  }

  const { content = [], totalPages, number } = data;

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleApprove = () => {
    if (!selectedUser) return;

    postUsageLimit(selectedUser.userId, {
      onSuccess: () => {
        setTimeout(() => {
          closeUserModal();
          window.location.reload();
        }, 1000); // Auto-close after success
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full text-center px-4">
      <div className="mt-12 w-full">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        {/* Search Bar */}
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username"
            className="border px-2 py-1 w-64 text-center"
          />
        </div>

        {/* User Table */}
        <div className="max-h-[400px] overflow-auto overflow-x-auto">
          <table className="mx-auto border-collapse w-full sm:w-3/4 mb-4 min-w-[320px]">
            <thead>
              <tr>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-2 py-2">Provider</th>
                <th className="border px-4 py-2">Usage</th>
                <th className="border px-4 py-2">Request Amount</th>
              </tr>
            </thead>
            <tbody>
              {content.length > 0 ? (
                content.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleRowClick(user)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-2 py-2">{user.provider}</td>
                    <td className="border px-4 py-2">{user.usageLimit}</td>
                    <td className="border px-4 py-2">{user.requestedLimit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border px-4 py-2 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center space-x-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 border border-black disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <span>Items per page:</span>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10) || 10)}
              className="border px-2 py-1 w-20 text-center"
            />
          </div>

          <button
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 border border-black disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="mt-2">
          Page: {number + 1} of {totalPages}
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <PrimeModal
          isOpen={showUserModal}
          title="User Details"
          onClose={closeUserModal}
        >
          <div className="max-h-[500px] overflow-y-auto space-y-4">
            <p>
              <strong>Username:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Provider:</strong> {selectedUser.provider}
            </p>
            <p>
              <strong>Usage:</strong> {selectedUser.usageLimit}
            </p>
            <p>
              <strong>Requested Limit:</strong> {selectedUser.requestedLimit}
            </p>

            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={handleApprove}
                className={`noanimationbutton px-4 py-2 transition ${
                  isApproving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
                disabled={isApproving}
              >
                {isApproving ? "승인 중..." : "승인하기"}
              </button>
            </div>

            {isApproveError && (
              <p className="text-red-500">Error: {approveError.message}</p>
            )}
            {isSuccess && (
              <p className="text-green-500">승인이 완료되었습니다!</p>
            )}
          </div>
        </PrimeModal>
      )}
    </div>
  );
};
