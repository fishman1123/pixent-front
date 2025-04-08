import React, { useState, useEffect } from "react";
import { useGetResults } from "../../hooks/useGetResult.jsx";
import { useDeleteResult } from "../../hooks/useDeleteResult";
import { useGetRequestList } from "../../hooks/useGetRequestList";
import { usePostUsageLimit } from "../../hooks/usePostUsageLimit";
import { useGetReportByUuid } from "../../hooks/useGetReportByUuid";
import PrimeModal from "../PrimeModal.jsx";
import { LoadingData } from "../pages/LoadingData.jsx";

export const Admin = () => {
  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  // Admin result states
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [showRowModal, setShowRowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [tempSize, setTempSize] = useState(size);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // User management states
  const [userPage, setUserPage] = useState(0);
  const [userSize, setUserSize] = useState(10);
  const [tempUserSize, setTempUserSize] = useState(userSize);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [isUserSearchActive, setIsUserSearchActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  
  // Tab state to switch between admin views
  const [activeTab, setActiveTab] = useState('results');

  // Fetch result data
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useGetResults(page, size);
  
  // Fetch user data
  const { 
    data: userData, 
    isLoading: isUserLoading, 
    isError: isUserError, 
    error: userError 
  } = useGetRequestList(userPage, userSize);

  const { mutate: deleteResult } = useDeleteResult();
  const {
    mutate: postUsageLimit,
    isLoading: isApproving,
    isError: isApproveError,
    error: approveError,
    isSuccess,
  } = usePostUsageLimit();

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      // Check screen size
      const width = window.innerWidth;
      const isMobileSize = width < 768;

      // Check user agent for mobile devices
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );

      setIsMobile(isMobileSize || isMobileDevice);
    };

    // Check on initial load
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close the main notification modal on Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        closeModal();
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
        closeRowModal();
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

  // Apply admin-page class to body element
  useEffect(() => {
    document.body.classList.add('bg-gray-50', 'overflow-x-hidden', 'w-full', 'max-w-full', 'p-0', 'm-0');
    
    return () => {
      document.body.classList.remove('bg-gray-50', 'overflow-x-hidden', 'w-full', 'max-w-full', 'p-0', 'm-0');
    };
  }, []);

  // Show mobile warning
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white">
        <div className="bg-white p-6 mb-4 max-w-md shadow-md border border-gray-200 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 mb-4">
              <img src="/warning.png" alt="Warning" className="h-20 w-40" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-2">PC에서 접근 바랍니다.</h3>
              <div className="text-sm text-gray-600 mb-4">
                <p>
                  해당 페이지는 관리자용 페이지입니다.
                </p>
                <p className="mt-2">
                  모바일 기기에서는 사용하실 수 없습니다.
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-black rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => window.location.href = '/'}
                >
                  메인으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || isUserLoading) {
    return (
      <div className="w-full max-w-full mx-auto p-0">
        <LoadingData />
      </div>
    );
  }

  // Handle error state
  if (isError || isUserError) {
    return (
      <div className="w-full max-w-full mx-auto p-0">
        <div className="text-center mt-10">Error: {(error || userError)?.message}</div>
      </div>
    );
  }

  const { content, totalPages, number } = data || { content: [], totalPages: 0, number: 0 };
  const { content: userContent = [], totalPages: userTotalPages, number: userNumber } = userData || { content: [], totalPages: 0, number: 0 };

  // Filter user content based on search query
  const filteredUserContent = userSearchQuery
    ? userContent.filter((user) =>
        user.name.toLowerCase().includes(userSearchQuery.toLowerCase())
      )
    : userContent;

  // Results tab functions
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
        item.userName.toLowerCase().includes(searchQuery.toLowerCase())
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
          
          // Reset copy state after 4 seconds so users can copy again
          setTimeout(() => {
            setCopySuccess(false);
          }, 4000);
        })
        .catch(() => {
          setCopySuccess(false);
        });
    }
  };

  // User management tab functions
  const handleUserPrev = () => {
    if (userPage > 0) {
      setUserPage((prev) => prev - 1);
    }
  };

  const handleUserNext = () => {
    if (userPage < userTotalPages - 1) {
      setUserPage((prev) => prev + 1);
    }
  };

  const handleUserSearchChange = (e) => {
    setUserSearchQuery(e.target.value);
  };

  const handleUserRowClick = (user) => {
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

  const handleUserSizeChange = (e) => {
    setTempUserSize(e.target.value);
  };

  const handleUserSizeSubmit = (e) => {
    if (e.key === "Enter") {
      const newSize = parseInt(tempUserSize, 10);
      if (!isNaN(newSize) && newSize > 0) {
        setUserSize(newSize);
        setUserPage(0); // Reset to first page when changing size
      } else {
        setTempUserSize(userSize); // Reset input if invalid
      }
    }
  };

  // Function to navigate to print report template
  const handleViewReport = (uuid) => {
    // Check if report data is available
    const fetchAndRedirect = async () => {
      try {
        // Use AxiosInstance to fetch the report data to ensure proper headers and error handling
        const { default: AxiosInstance } = await import('../../api/axiosInstance');
        const response = await AxiosInstance.get(`/api/result/${uuid}`);
        
        const reportData = response.data;
        
        // Create a new window and pass the data to /print route
        const printWindow = window.open('/print', '_blank');
        
        // We need to transfer the data to the new window's sessionStorage
        printWindow.addEventListener('load', () => {
          // Store the data in the new window's sessionStorage
          printWindow.sessionStorage.setItem('reportData', JSON.stringify(reportData));
          
          // Dispatch a custom event to notify the print page that data is ready
          printWindow.dispatchEvent(new Event('reportDataReady'));
        });
        
      } catch (error) {
        console.error("Failed to fetch report data:", error);
        setModalMessage(`Failed to load report data: ${error.message || 'Unknown error'}`);
        setShowModal(true);
      }
    };
    
    fetchAndRedirect();
  };

  // Function to redirect to report viewer
  const handleRedirectToReport = (uuid) => {
    window.open(`/report/${uuid}`, '_blank');
  };

  return (
    <div className="w-full max-w-full mx-auto p-0">
      {/* Custom Admin Header */}
      <div className="bg-black text-white py-4 mb-8">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-xl font-bold">Pixent Admin</div>
          </div>
          <div>
            <button 
              className="font-medium text-white border border-white px-2 py-1 hover:bg-gray-800 rounded"
              onClick={() => window.location.href = '/'}
            >
              메인으로
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-md my-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">관리자페이지입니다.</h1>

          {/* Password field */}
          <div className="mb-8 flex items-center justify-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
              </div>
              <input
                type="text"
                value={displayedPassword}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                disabled={isPasswordSet}
                placeholder="Password"
              />
            </div>
            {!isPasswordSet && (
              <button
                onClick={handlePasswordSubmit}
                className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded"
              >
                승인
              </button>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
              <li className="mr-2">
                <button 
                  onClick={() => setActiveTab('results')}
                  className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                    activeTab === 'results'
                      ? 'text-black border-black active'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                  </svg>
                  결과 관리
                </button>
              </li>
              <li className="mr-2">
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                    activeTab === 'users'
                      ? 'text-black border-black active'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                  사용자 관리
                </button>
              </li>
            </ul>
          </div>

          {/* Results Tab Content */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onClick={handleSearchClick}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                    placeholder="검색 is Good"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex items-center mt-2 sm:mt-0 space-x-2">
                  <button
                    onClick={handlePrev}
                    disabled={page === 0}
                    className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center">
                    <label htmlFor="bottom-page-size" className="mr-2 text-sm font-medium text-gray-900">Page size:</label>
                    <div className="flex">
                      <input
                        id="bottom-page-size"
                        type="number"
                        value={tempSize}
                        onChange={handleSizeChange}
                        onKeyDown={handleSizeSubmit}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-16"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleNext}
                    disabled={page >= totalPages - 1}
                    className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="relative overflow-x-auto overflow-y-auto max-h-[500px] shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">ID</th>
                      <th scope="col" className="px-6 py-3">고객명</th>
                      <th scope="col" className="px-6 py-3">보고서관련 상호작용입니다 많관부</th>
                      <th scope="col" className="px-6 py-3">삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContent.length > 0 ? (
                      filteredContent.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => handleRowClick(item)}
                          className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="px-6 py-4">{item.id}</td>
                          <td className="px-6 py-4">{item.userName}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewReport(item.uuid);
                                }}
                                className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded"
                              >
                                보고서 인쇄하기
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRedirectToReport(item.uuid);
                                }}
                                className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded"
                              >
                                보고서 보기
                              </button>
                            </div>
                          </td>
                          <td
                            className="px-6 py-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.uuid);
                            }}
                          >
                            <button className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded">
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white border-b">
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Results Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={page === 0}
                  className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center">
                  <label htmlFor="bottom-page-size" className="mr-2 text-sm font-medium text-gray-900">Page size:</label>
                  <div className="flex">
                    <input
                      id="bottom-page-size"
                      type="number"
                      value={tempSize}
                      onChange={handleSizeChange}
                      onKeyDown={handleSizeSubmit}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-16"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={page >= totalPages - 1}
                  className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>

              <div className="text-sm text-gray-500 text-center mt-2">
                Page: {number + 1} of {totalPages}
              </div>
            </div>
          )}

          {/* Users Tab Content */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={handleUserSearchChange}
                    placeholder="Search by username"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex items-center mt-2 sm:mt-0 space-x-2">
                  <button
                    onClick={handleUserPrev}
                    disabled={userPage === 0}
                    className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center">
                    <label htmlFor="bottom-user-page-size" className="mr-2 text-sm font-medium text-gray-900">Items per page:</label>
                    <div className="flex">
                      <input
                        id="bottom-user-page-size"
                        type="number"
                        value={tempUserSize}
                        onChange={handleUserSizeChange}
                        onKeyDown={handleUserSizeSubmit}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-20"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleUserNext}
                    disabled={userPage >= userTotalPages - 1}
                    className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* User Table */}
              <div className="relative overflow-x-auto overflow-y-auto max-h-[500px] shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Username</th>
                      <th scope="col" className="px-6 py-3">Provider</th>
                      <th scope="col" className="px-6 py-3">Usage</th>
                      <th scope="col" className="px-6 py-3">Request Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUserContent.length > 0 ? (
                      filteredUserContent.map((user) => (
                        <tr
                          key={user.userId || user.id}
                          onClick={() => handleUserRowClick(user)}
                          className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="px-6 py-4">{user.name}</td>
                          <td className="px-6 py-4">{user.provider}</td>
                          <td className="px-6 py-4">{user.usageLimit}</td>
                          <td className="px-6 py-4">{user.requestedLimit}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="bg-white border-b">
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Users Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={handleUserPrev}
                  disabled={userPage === 0}
                  className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center">
                  <label htmlFor="bottom-user-page-size" className="mr-2 text-sm font-medium text-gray-900">Items per page:</label>
                  <div className="flex">
                    <input
                      id="bottom-user-page-size"
                      type="number"
                      value={tempUserSize}
                      onChange={handleUserSizeChange}
                      onKeyDown={handleUserSizeSubmit}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-20"
                    />
                  </div>
                </div>

                <button
                  onClick={handleUserNext}
                  disabled={userPage >= userTotalPages - 1}
                  className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>

              <div className="text-sm text-gray-500 text-center mt-2">
                Page: {userNumber + 1} of {userTotalPages}
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {showModal && (
          <PrimeModal
            isOpen={showModal}
            title="Notification"
            onClose={closeModal}
          >
            <p>{modalMessage}</p>
          </PrimeModal>
        )}

        {showRowModal && selectedItem && (
          <PrimeModal
            isOpen={showRowModal}
            title="Share Report"
            onClose={closeRowModal}
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Share this report link:
              </p>
              <div className="flex items-center border border-gray-200">
                <input 
                  type="text" 
                  value={`https://www.pixent.co.kr/report/${selectedItem.uuid}`} 
                  readOnly
                  className="flex-1 min-w-0 text-gray-500 text-sm focus:ring-blue-500 outline-none border-none p-2.5"
                />
                <button
                  onClick={handleCopy}
                  className="relative text-gray-500 border-l p-2 px-4 h-full flex items-center justify-center space-x-2 hover:bg-gray-100"
                >
                  {copySuccess ? (
                    <>
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
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path>
                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path>
                      </svg>
                      <span className="text-sm">Copy URL</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex text-gray-400 text-[12px] mb-4">
                TMI: 주소복사는 4초 텀이 있습니다.
              </div>
            </div>
          </PrimeModal>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <PrimeModal
            isOpen={showUserModal}
            title="User Details"
            onClose={closeUserModal}
          >
            <div className="p-6">
              <div className="p-4 mb-4 text-sm text-gray-800 rounded-lg bg-gray-50">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">Username:</span>
                  <span>{selectedUser.name}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">Provider:</span>
                  <span>{selectedUser.provider}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">Usage:</span>
                  <span>{selectedUser.usageLimit}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Requested Limit:</span>
                  <span>{selectedUser.requestedLimit}</span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="font-medium text-black border border-black px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isApproving ? "승인 중..." : "승인하기"}
                </button>
              </div>

              {isApproveError && (
                <div className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50">
                  <span>Error: {approveError.message}</span>
                </div>
              )}
              
              {isSuccess && (
                <div className="p-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50">
                  <span>승인이 완료되었습니다!</span>
                </div>
              )}
            </div>
          </PrimeModal>
        )}
      </div>
    </div>
  );
};
