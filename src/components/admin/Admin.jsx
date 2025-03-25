import React, { useState, useEffect } from "react";
import { useGetResults } from "../../hooks/useGetResult.jsx";
import { useDeleteResult } from "../../hooks/useDeleteResult";
import PrimeModal from "../PrimeModal.jsx";
import { LoadingData } from "../pages/LoadingData.jsx";

export const Admin = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  // State for row-click modal
  const [showRowModal, setShowRowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const { data, isLoading, isError, error } = useGetResults(page, size);
  const { mutate: deleteResult } = useDeleteResult();
  const [tempSize, setTempSize] = useState(size);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Close the main notification modal on Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        closeModal(); // calls setShowModal(false)
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  // Close the row-click (share/copy) modal on Enter
  useEffect(() => {
    const handleRowKeyDown = (e) => {
      if (e.key === "Enter") {
        closeRowModal(); // calls setShowRowModal(false)
      }
    };

    if (showRowModal) {
      window.addEventListener("keydown", handleRowKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleRowKeyDown);
    };
  }, [showRowModal]);

  useEffect(() => {
    const storedPass = sessionStorage.getItem("admin_pass");
    if (storedPass === "nadr1106") {
      setIsPasswordSet(true);
      setPassword("nadr1106");
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingData />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return <div className="text-center mt-10">Error: {error.message}</div>;
  }

  const { content, totalPages, number } = data;

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

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      if (filteredContent.length === 0) {
        setIsSearchActive(false); // Reset to default if no results
        setSearchQuery("");
      }
    }
  };

  const filteredContent = isSearchActive
    ? content.filter((item) =>
        item.userName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : content;

  const handleSizeChange = (e) => {
    setTempSize(e.target.value);
  };

  const handleSizeSubmit = (e) => {
    if (e.key === "Enter") {
      const newSize = parseInt(tempSize, 10);
      if (!isNaN(newSize) && newSize > 0) {
        setSize(newSize);
        setPage(0);
      } else {
        setTempSize(size); // Reset input if invalid
      }
    }
  };

  const handleDelete = (uuid) => {
    if (!isPasswordSet) {
      setModalMessage("password is wrong bitch");
      setShowModal(true);
      return;
    }

    deleteResult(uuid, {
      onSuccess: () => {
        setModalMessage("Item deleted successfully!");
        setShowModal(true);
      },
      onError: (err) => {
        setModalMessage("Failed to delete item: " + err.message);
        setShowModal(true);
      },
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePasswordSubmit = () => {
    if (password === "nadr1106") {
      sessionStorage.setItem("admin_pass", "nadr1106");
      setIsPasswordSet(true);
    } else {
      setModalMessage("password is wrong bitch");
      setShowModal(true);
    }
  };

  const displayedPassword = isPasswordSet ? "********" : password;

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setShowRowModal(true);
    setCopySuccess(false); // reset copy state each time a new row is clicked
  };

  const closeRowModal = () => {
    setShowRowModal(false);
    setSelectedItem(null);
    setCopySuccess(false);
  };

  const handleCopy = () => {
    if (selectedItem) {
      const url = `https://www.pixent.co.kr/report/${selectedItem.uuid}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopySuccess(true);
        })
        .catch(() => {
          setCopySuccess(false);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full text-center px-4">
      <div className="mt-12 w-full">
        <h1 className="text-2xl font-bold mb-4">관리자페이지입니다.</h1>

        {/* Password field */}
        <div className="mb-4 flex items-center justify-center space-x-2">
          <input
            type="text"
            value={displayedPassword}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1"
            disabled={isPasswordSet}
          />
          {!isPasswordSet && (
            <button
              onClick={handlePasswordSubmit}
              className="text-black px-3 py-1 border border-black hover:bg-black hover:text-white transition"
            >
              승인
            </button>
          )}
        </div>

        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onClick={handleSearchClick} // Activate search when clicked
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit} // Reset if nothing found on Enter
            placeholder="검색 is Good"
            className="border px-2 py-1 w-64 text-center"
          />
        </div>

        {/* Table */}
        <div className="max-h-[400px] overflow-auto overflow-x-auto">
          <table className="mx-auto border-collapse w-full sm:w-3/4 mb-4 min-w-[320px]">
            <thead>
              <tr>
                <th className="border px-2 py-2">ID</th>
                <th className="border px-4 py-2">고객명</th>
                <th className="border px-4 py-2">향료코드</th>
                <th className="border px-4 py-2">삭제</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    className="cursor-pointer"
                  >
                    <td className="border px-2 py-2">{item.id}</td>
                    <td className="border px-4 py-2">{item.userName}</td>
                    <td className="border px-4 py-2">{item.perfumeName}</td>
                    <td
                      className="border px-4 py-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className={`px-3 py-1 rounded transition ${
                          isPasswordSet
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                        onClick={() => handleDelete(item.uuid)}
                        disabled={!isPasswordSet}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border px-4 py-2 text-center text-gray-500"
                  >
                    ? 뭐하세요?
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap justify-center items-center space-x-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="px-4 py-2 border border-black disabled:opacity-50"
          >
            이전
          </button>

          <div className="flex items-center space-x-2">
            <span>페이지당 갯수:</span>
            <input
              type="number"
              value={tempSize}
              onChange={handleSizeChange}
              onKeyDown={handleSizeSubmit}
              className="border px-2 py-1 w-20 text-center"
            />
          </div>

          <button
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 border border-black disabled:opacity-50"
          >
            다음
          </button>
        </div>

        <div className="mt-2">
          페이지: {number + 1} 중 {totalPages}
        </div>
      </div>

      <div>
        <div>Implement on here</div>
      </div>

      {/* Main Notification Modal */}
      <PrimeModal isOpen={showModal} title="Notification" onClose={closeModal}>
        <div className="max-h-[500px] overflow-y-auto">
          <p>{modalMessage}</p>
        </div>
      </PrimeModal>

      {/* Row-click Modal */}
      {selectedItem && (
        <PrimeModal
          isOpen={showRowModal}
          title="Share / Copy"
          onClose={closeRowModal}
        >
          <div className="max-h-[500px] overflow-x-auto overflow-y-auto space-y-4 scrollbar-hide">
            <div className="flex justify-center">
              <div className="w-full max-w-[16rem] relative">
                <div className="flex items-center">
                  <label htmlFor="copy-url-input" className="sr-only">
                    Copy URL
                  </label>
                  <input
                    id="copy-url-input"
                    type="text"
                    className="flex-grow text-gray-500 text-sm focus:ring-blue-500 p-2.5 outline-none border-none"
                    value={`https://www.pixent.co.kr/report/${selectedItem.uuid}`}
                    disabled
                    readOnly
                  />
                  <button
                    onClick={handleCopy}
                    data-tooltip-target="tooltip-copy-url-button"
                    className="text-gray-500 hover:bg-gray-100 rounded-lg p-2 inline-flex items-center justify-center"
                  >
                    <span
                      id="default-icon"
                      className={copySuccess ? "hidden" : ""}
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                    <span
                      id="success-icon"
                      className={copySuccess ? "" : "hidden"}
                    >
                      <svg
                        className="w-4 h-4 text-black"
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917L5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const url = `https://www.pixent.co.kr/report/${selectedItem.uuid}`;
                      const text = `Share analysis report created by Pixent!`;
                      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        text,
                      )}&url=${encodeURIComponent(url)}`;
                      window.open(twitterUrl, "_blank");
                    }}
                    className="text-blue-500 hover:bg-blue-100 rounded-lg p-2 inline-flex items-center justify-center "
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.4 4.4 0 0 0 1.93-2.43 8.93 8.93 0 0 1-2.82 1.1 4.48 4.48 0 0 0-7.62 4.08A12.72 12.72 0 0 1 3.11 4.7a4.44 4.44 0 0 0-.61 2.26 4.47 4.47 0 0 0 2 3.72 4.43 4.43 0 0 1-2-.56v.06a4.48 4.48 0 0 0 3.57 4.38 4.48 4.48 0 0 1-2 .07 4.47 4.47 0 0 0 4.18 3.1A8.96 8.96 0 0 1 2 20.54a12.64 12.64 0 0 0 6.8 2 12.63 12.63 0 0 0 12.74-12.74c0-.2 0-.39-.01-.58A9.14 9.14 0 0 0 24 4.56a8.92 8.92 0 0 1-2.54.7z" />
                    </svg>
                  </button>
                  <div
                    id="tooltip-copy-url-button"
                    role="tooltip"
                    className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
                  >
                    <span
                      id="default-tooltip-message"
                      className={copySuccess ? "hidden" : ""}
                    >
                      Copy to clipboard
                    </span>
                    <span
                      id="success-tooltip-message"
                      className={copySuccess ? "" : "hidden"}
                    >
                      Copied!
                    </span>
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PrimeModal>
      )}
    </div>
  );
};
