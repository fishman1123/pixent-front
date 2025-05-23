import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imageUploadIcon from '../../assets/upload.svg';
import printerIcon from '../../assets/printer.svg';
import { SummaryChart } from '../result/SummaryChart';

export const PrintReportTemplate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(location.state);
  const [isMobile, setIsMobile] = useState(false);

  // Browser detection and redirection
  useEffect(() => {
    const copyToClipboard = async (val) => {
      try {
        await navigator.clipboard.writeText(val);
        alert(
          'URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.'
        );
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    };

    const redirectToExternalBrowser = () => {
      const targetUrl = window.location.href;
      copyToClipboard(targetUrl);

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = "x-web-search://?";
      } else {
        window.location.href = `intent://${targetUrl.replace(
          /https?:\/\//i,
          ""
        )}#Intent;scheme=http;package=com.android.chrome;end`;
      }
    };

    const userAgent = navigator.userAgent.toLowerCase();
    if (/kakaotalk/i.test(userAgent)) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(
        window.location.href
      )}`;
    } else if (/line/i.test(userAgent)) {
      const targetUrl = window.location.href;
      window.location.href = targetUrl.includes("?")
        ? `${targetUrl}&openExternalBrowser=1`
        : `${targetUrl}?openExternalBrowser=1`;
    } else if (
      /inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone.*whale|android.*whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i.test(
        userAgent
      )
    ) {
      redirectToExternalBrowser();
    }
  }, []);

  // Attempt to get data from sessionStorage if not provided via location.state
  useEffect(() => {
    if (!reportData) {
      try {
        // Listen for the custom event from the opener page
        const handleReportDataReady = () => {
          const storedData = sessionStorage.getItem('reportData');
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setReportData(parsedData);
            
            // Clear the data from sessionStorage after retrieving it
            sessionStorage.removeItem('reportData');
          }
        };

        // Check if data already exists
        const storedData = sessionStorage.getItem('reportData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setReportData(parsedData);
          
          // Clear the data from sessionStorage after retrieving it
          sessionStorage.removeItem('reportData');
        }

        // Add event listener for data that might be set later
        window.addEventListener('reportDataReady', handleReportDataReady);
        
        return () => {
          window.removeEventListener('reportDataReady', handleReportDataReady);
        };
      } catch (error) {
        console.error("Error retrieving report data:", error);
      }
    }
  }, [reportData]);

  useEffect(() => {
    // More comprehensive check for mobile devices
    const checkMobile = () => {
      // Check screen size
      const width = window.innerWidth;
      const isMobileSize = width < 768;

      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );

      // Only set mobile warning if not already handled by browser detection
      if ((isMobileSize || isMobileDevice) && 
          !(/kakaotalk|line|inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone.*whale|android.*whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill|SamsungBrowser\/[^1]/i.test(userAgent))) {
        setIsMobile(true);
      }
    };

    // Check on initial load
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add print style to adjust page margins
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    style.innerHTML = `
      @page {
        margin: 0mm;
        size: 210mm 148mm landscape;
      }
      @media print {
        body, html {
          margin: 0;
          padding: 0;
        }
      }
    `;
    // Append to head
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Redirect to home if no data after 3 seconds
  useEffect(() => {
    let timer;
    if (!reportData) {
      timer = setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [reportData, navigate]);

  if (!reportData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report data...</p>
        </div>
      </div>
    );
  }

  // Show warning on mobile devices
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white">
        <div className="bg-white p-6 mb-4 max-w-md">
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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full max-w-none text-center print:p-0 bg-white">
      <div className="p-4 rounded-lg print:hidden text-left w-full max-w-lg">
      <h1 className="text-[40px] text-center font-semibold mb-2">ATTENTION</h1>
      <div className="flex justify-center">
      <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold mb-1">프린트 주의사항</h2>
        <div className="flex flex-col items-start text-sm mb-4">
          <p>
            1.버튼 혹은 브라우저 프린트 키 버튼을 눌러 프린터 하시길 바람니다.
          </p>
          <p>2.PC에서만 해당 페이지 접근을 하시길 바람니다.</p>
          <p>3.프린트 용지는 A5 가로기준 프린팅용 용지를 사용해주세요.</p>
    
        </div>
      </div>
        
        </div>
        

        <button
          className="w-full md:w-auto px-6 py-3 text-black border border-black hover:bg-black hover:text-white transition-colors font-bold text-lg flex items-center justify-center mx-auto"
          onClick={() => window.print()}
        >
          <img src={printerIcon} alt="Print" className="w-5 h-5 mr-2" />
          보고서 프린트하기 (A5 Landscape)
        </button>
      </div>

      <div className="w-[210mm] aspect-[210/148] max-w-[100vw] mx-auto bg-white py-[4mm] px-[8mm] box-border font-sans shadow-lg border border-gray-200 overflow-hidden scale-[0.95] print:scale-100 print:w-[210mm] print:h-[148mm] print:overflow-hidden print:shadow-none print:m-0 print:py-[4mm] print:px-[8mm] print:border-none">
        {/* Report Header */}
        <div className="flex justify-between px-[2mm] text-center mb-[2mm] print:mb-[2mm]">
          {/* Image Analysis Report */}
          <div className="w-[48%]">
            <div className="border-t border-black relative mt-[1mm] print:mt-[1mm]"></div>
            <div className="uppercase tracking-wider font-bold text-[min(2vw,12pt)] print:text-[12pt]">
              Image Analysis Report
            </div>
            <div className="border-t border-black relative"></div>
          </div>
          {/* Scent Analysis Report */}
          <div className="w-[48%]">
            <div className="border-t border-black relative mt-[1mm] print:mt-[1mm]"></div>
            <div className="uppercase tracking-wider font-bold text-[min(2vw,12pt)] print:text-[12pt]">
              Scent Analysis Report
            </div>
            <div className="border-t border-black relative"></div>
          </div>
        </div>

        <div className="flex h-[140mm] overflow-hidden">
          {/* Two Column Layout */}
          <div className="flex gap-[16mm] print:gap-[16mm] w-full">
            {/* Left Column - Customer Profile and Image Analysis */}
            {/* number 1 */}
            <div className="flex-1 flex flex-col">
              <div className="mb-[1mm] print:mb-[1mm]">
                <div className="flex mb-[2mm] max-h-[180px] overflow-hidden print:mb-[2mm]">
                  <div className="flex flex-col mr-[5mm] print:mr-[5mm]">
                    <div className="font-bold text-[min(1.8vw,11pt)] print:text-[11pt]">Customer Profile</div>
                    <div className="border border-black w-[32mm] h-[40mm]  overflow-hidden print:w-[32mm] print:h-[40mm] ">
                    {reportData.userImageUrl ? (
                      <img
                        src={reportData.userImageUrl}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img src={imageUploadIcon} alt="No Image" className="w-[30px] h-[30px]" />
                      </div>
                    )}
                  </div>
                  </div>
                  
                  <div className="flex-1 flex flex-wrap print:flex-wrap">
                    <div className="mb-[1mm] mr-[10mm] mt-[8mm] min-w-[40mm] print:mb-[1mm] print:mr-[10mm] print:mt-[8mm] print:min-w-[40mm]">
                      <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] print:text-[11pt]">
                        Name
                      </div>
                      <div className="flex pl-[6px] text-[min(1.5vw,10pt)] print:text-[10pt] print:pl-[6px]">
                        {reportData.userName || '—'}
                      </div>
                    </div>
                    <div className="mb-[1mm] mr-[10mm] min-w-[40mm] print:mb-[1mm] print:mr-[10mm] print:min-w-[40mm]">
                      <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] print:text-[11pt]">
                        Gender
                      </div>
                      <div className="flex pl-[6px] text-[min(1.5vw,10pt)] print:text-[10pt] print:pl-[6px]">
                        {reportData.gender || '—'}
                      </div>
                    </div>
                    <div className="mb-[2mm] mr-[10mm] min-w-[40mm] print:mb-[2mm] print:mr-[10mm] print:min-w-[40mm]">
                      <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] print:text-[11pt]">
                        Keyword(s)
                      </div>
                      <div className="flex pl-[6px] text-[min(1.5vw,10pt)] print:text-[10pt] print:pl-[6px]">
                      {reportData.keyword || '—'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Analysis Section */}
              <div className="mb-[1mm]">
                <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] mb-[2mm] print:text-[11pt] print:mb-[1mm]">
                  Image Analysis
                </div>
                <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] mb-[1mm] print:text-[11pt] print:mb-[1mm]">
                  Facial Feature
                </div>
                <div className="h-[16mm] text-[clamp(0.5rem,1.2vw,8pt)] leading-[1.1] text-left overflow-hidden text-ellipsis print:text-[8pt] print:h-[16mm]">
                  {reportData?.appearance?.facialFeature
                    ? (() => {
                        const sentences =
                          reportData.appearance.facialFeature.match(/[^.!?]+[.!?]+/g) || [];
                        const textLength =
                          sentences.length >= 3
                            ? sentences.slice(0, 3).join('').length
                            : reportData.appearance.facialFeature.length;

                        // Dynamically adjust font size based on content length
                        const fontSize =
                          textLength > 400
                            ? 'text-[clamp(0.4rem,0.9vw,6pt)]'
                            : textLength > 250
                              ? 'text-[clamp(0.45rem,1vw,7pt)]'
                              : 'text-[clamp(0.5rem,1.2vw,8pt)]';

                        return (
                          <div className={`${fontSize} leading-[1.1]`}>
                            {sentences.length >= 3
                              ? sentences.slice(0, 3).join('')
                              : reportData.appearance.facialFeature}
                          </div>
                        );
                      })()
                    : '—'}
                </div>
              </div>
              {/* number 2 */}
              <div className="mb-[1mm]">
                <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] mb-[1mm] print:text-[11pt] print:mb-[1mm]">
                  Style
                </div>
                <div className="h-[16mm] text-[clamp(0.5rem,1.2vw,8pt)] leading-[1.1] text-left overflow-hidden text-ellipsis print:text-[8pt] print:h-[16mm]">
                  {reportData?.appearance?.style
                    ? (() => {
                        const sentences = reportData.appearance.style.match(/[^.!?]+[.!?]+/g) || [];
                        const textLength =
                          sentences.length >= 3
                            ? sentences.slice(0, 3).join('').length
                            : reportData.appearance.style.length;

                        // Dynamically adjust font size based on content length
                        const fontSize =
                          textLength > 400
                            ? 'text-[clamp(0.4rem,0.9vw,6pt)]'
                            : textLength > 250
                              ? 'text-[clamp(0.45rem,1vw,7pt)]'
                              : 'text-[clamp(0.5rem,1.2vw,8pt)]';

                        return (
                          <div className={`${fontSize} leading-[1.1]`}>
                            {sentences.length >= 3
                              ? sentences.slice(0, 3).join('')
                              : reportData.appearance.style}
                          </div>
                        );
                      })()
                    : '—'}
                </div>
              </div>
              {/* number 1 and 2 need to have even ratio in print version */}

              <div className="mb-[1mm]">
                <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] mb-[1mm] print:text-[11pt] print:mb-[1mm]">
                  Vibe
                </div>
                <div className="h-[16mm] text-[clamp(0.5rem,1.2vw,8pt)] leading-[1.1] text-left overflow-hidden text-ellipsis print:text-[8pt] print:h-[16mm]">
                  {reportData?.appearance?.vibe
                    ? (() => {
                        const sentences = reportData.appearance.vibe.match(/[^.!?]+[.!?]+/g) || [];
                        const textLength =
                          sentences.length >= 3
                            ? sentences.slice(0, 3).join('').length
                            : reportData.appearance.vibe.length;

                        // Dynamically adjust font size based on content length
                        const fontSize =
                          textLength > 400
                            ? 'text-[clamp(0.4rem,0.9vw,6pt)]'
                            : textLength > 250
                              ? 'text-[clamp(0.45rem,1vw,7pt)]'
                              : 'text-[clamp(0.5rem,1.2vw,8pt)]';

                        return (
                          <div className={`${fontSize} leading-[1.1]`}>
                            {sentences.length >= 3
                              ? sentences.slice(0, 3).join('')
                              : reportData.appearance.vibe}
                          </div>
                        );
                      })()
                    : '—'}
                </div>
              </div>
            </div>

            {/* Right Column - Scent Analysis */}
            <div className="flex-1">
              <div>
                {/* Scent Profile Chart */}
                <div className="w-full flex justify-center items-center mb-[4mm] print:mb-[4mm]">
                  <div className="w-[55mm] h-[45mm] scale-[1] origin-center mt-[2mm] print:scale-[1] print:mt-[2mm]">
                    <SummaryChart
                      inputCitrus={reportData?.citrus || 0}
                      inputFloral={reportData?.floral || 0}
                      inputWoody={reportData?.woody || 0}
                      inputMusk={reportData?.musk || 0}
                      inputFresh={reportData?.fruity || 0}
                      inputSpicy={reportData?.spicy || 0}
                    />
                  </div>
                </div>
                <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] mb-[2mm] print:text-[11pt] print:mb-[1mm]">
                  Scent Analysis
                </div>

                <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] mb-[1mm] print:text-[11pt] print:mb-[1mm]">
                  Top Note
                </div>
                <div className="h-[16mm] text-[clamp(0.5rem,1.2vw,8pt)] leading-[1.1] text-left overflow-hidden text-ellipsis print:text-[8pt] print:h-[16mm]">
                  {(() => {
                    const combinedText = `${reportData?.mainNoteDesc || ''} ${reportData?.mainNoteAnalysis || ''}`;
                    if (!combinedText.trim()) return '—';

                    const sentences = combinedText.match(/[^.!?]+[.!?]+/g) || [];
                    const textLength =
                      sentences.length >= 3
                        ? sentences.slice(0, 3).join('').length
                        : combinedText.length;

                    // Dynamically adjust font size based on content length
                    const fontSize =
                      textLength > 400
                        ? 'text-[clamp(0.4rem,0.9vw,6pt)]'
                        : textLength > 250
                          ? 'text-[clamp(0.45rem,1vw,7pt)]'
                          : 'text-[clamp(0.5rem,1.2vw,8pt)]';

                    return (
                      <div className={`${fontSize} leading-[1.1]`}>
                        {sentences.length >= 3 ? sentences.slice(0, 3).join('') : combinedText}
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="mb-[1mm]">
                <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] mb-[1mm] print:text-[11pt] print:mb-[1mm]">
                  Middle Note
                </div>
                <div className="h-[16mm] text-[clamp(0.5rem,1.2vw,8pt)] leading-[1.1] text-left overflow-hidden text-ellipsis print:text-[8pt] print:h-[16mm]">
                  {(() => {
                    const combinedText = `${reportData?.middleNoteDesc || ''} ${reportData?.middleNoteAnalysis || ''}`;
                    if (!combinedText.trim()) return '—';

                    const sentences = combinedText.match(/[^.!?]+[.!?]+/g) || [];
                    const textLength =
                      sentences.length >= 3
                        ? sentences.slice(0, 3).join('').length
                        : combinedText.length;

                    // Dynamically adjust font size based on content length
                    const fontSize =
                      textLength > 400
                        ? 'text-[clamp(0.4rem,0.9vw,6pt)]'
                        : textLength > 250
                          ? 'text-[clamp(0.45rem,1vw,7pt)]'
                          : 'text-[clamp(0.5rem,1.2vw,8pt)]';

                    return (
                      <div className={`${fontSize} leading-[1.1]`}>
                        {sentences.length >= 3 ? sentences.slice(0, 3).join('') : combinedText}
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="mb-[1mm]">
                <div className="flex uppercase font-bold tracking-wider text-[min(1.8vw,11pt)] mb-[1mm] print:text-[11pt] print:mb-[1mm]">
                  Base Note
                </div>
                <div className="h-[16mm] text-[clamp(0.5rem,1.2vw,8pt)] leading-[1.1] text-left overflow-hidden text-ellipsis print:text-[8pt] print:h-[16mm]">
                  {(() => {
                    const combinedText = `${reportData?.baseNoteDesc || ''} ${reportData?.baseNoteAnalysis || ''}`;
                    if (!combinedText.trim()) return '—';

                    const sentences = combinedText.match(/[^.!?]+[.!?]+/g) || [];
                    const textLength =
                      sentences.length >= 3
                        ? sentences.slice(0, 3).join('').length
                        : combinedText.length;

                    // Dynamically adjust font size based on content length
                    const fontSize =
                      textLength > 400
                        ? 'text-[clamp(0.4rem,0.9vw,6pt)]'
                        : textLength > 250
                          ? 'text-[clamp(0.45rem,1vw,7pt)]'
                          : 'text-[clamp(0.5rem,1.2vw,8pt)]';

                    return (
                      <div className={`${fontSize} leading-[1.1]`}>
                        {sentences.length >= 3 ? sentences.slice(0, 3).join('') : combinedText}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
