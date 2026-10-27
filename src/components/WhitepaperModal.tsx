import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  X,
  ShieldCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Copy,
  Layers,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_PAGES = 12;

const SECTIONS = [
  { page: 1, title: 'Cover', label: '1 · Cover' },
  { page: 2, title: 'At a Glance', label: '2 · Overview' },
  { page: 3, title: 'Meet Dodo', label: '3 · Meet Dodo' },
  { page: 4, title: 'Token Info', label: '4 · Verified Info' },
  { page: 5, title: 'Tokenomics', label: '5 · Tokenomics' },
  { page: 6, title: 'Launch & Liquidity', label: '6 · PumpSwap' },
  { page: 7, title: 'Community', label: '7 · Community' },
  { page: 8, title: '1% Pet Charity', label: '8 · Pet Charity' },
  { page: 9, title: 'Our Pledges', label: '9 · Pledges' },
  { page: 10, title: '5-Phase Roadmap', label: '10 · Roadmap' },
  { page: 11, title: 'Security & Risks', label: '11 · Security Scan' },
  { page: 12, title: 'Official Links', label: '12 · Channels' },
];

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose }) => {
  const pdfUrl = '/assets/aistudio/CuteDoDo-Whitepaper-v1.2-1_f0065eee.pdf';
  const contractAddress = '2e5bKRHpAixvgE6zUdTf7rigxCq662zq7xvN8Dympump';

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'single' | 'scroll'>('scroll');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedCA, setCopiedCA] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape & Arrow keys for pagination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (viewMode === 'single') {
          setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES));
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (viewMode === 'single') {
          setCurrentPage((prev) => Math.max(prev - 1, 1));
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, viewMode]);

  const handleCopyCA = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedCA(true);
    sounds.coin();
    setTimeout(() => setCopiedCA(false), 2000);
  };

  const jumpToPage = (pageNum: number) => {
    setCurrentPage(pageNum);
    sounds.pop();

    if (viewMode === 'scroll') {
      const pageEl = document.getElementById(`wp-page-${pageNum}`);
      if (pageEl && scrollContainerRef.current) {
        pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-1.5 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sounds.pop();
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="CuteDoDo Official Whitepaper v1.2"
    >
      <div className="relative w-full max-w-5xl bg-[#FFF9F0] border-3 border-[#49200B] rounded-2xl sm:rounded-3xl shadow-[6px_8px_0px_#49200B] flex flex-col h-[94vh] max-h-[96vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-3 sm:px-6 py-2.5 sm:py-3.5 bg-[#FFD36A] border-b-2 border-[#49200B] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border-2 border-[#49200B] flex items-center justify-center shadow-[1.5px_1.5px_0px_#49200B] shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9F00]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-sm sm:text-lg font-black font-heading text-[#49200B] tracking-tight">
                  CuteDoDo Whitepaper
                </h2>
                <span className="text-[10px] sm:text-xs font-bold font-mono bg-white px-2 py-0.5 rounded-md border border-[#49200B]/30 text-[#49200B]">
                  v1.2
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold bg-[#C6EAD7] text-emerald-950 px-2 py-0.5 rounded-md border border-[#49200B]/30">
                  <CheckCircle className="w-3 h-3 text-emerald-700" /> PumpSwap Graduated
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#79513B] font-semibold hidden xs:block">
                October 2026 · 12 Pages · Verified On-Chain & Disclosed
              </p>
            </div>
          </div>

          {/* Action buttons & Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleCopyCA}
              className="cartoon-btn px-2 sm:px-2.5 py-1.5 bg-white hover:bg-[#F7D9C7] text-[11px] sm:text-xs font-bold font-heading text-[#49200B] rounded-xl border-2 border-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] flex items-center gap-1 transition-all"
              title="Copy Contract Address"
            >
              <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#49200B]" />
              <span className="hidden md:inline">{copiedCA ? 'Copied!' : 'Copy CA'}</span>
            </button>

            <a
              href={pdfUrl}
              download="CuteDoDo-Whitepaper-v1.2.pdf"
              onClick={() => sounds.pop()}
              className="cartoon-btn px-2 sm:px-3 py-1.5 bg-white hover:bg-[#F7D9C7] text-[11px] sm:text-xs font-bold font-heading text-[#49200B] rounded-xl border-2 border-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] flex items-center gap-1.5 transition-all"
              title="Download original PDF file"
            >
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#49200B]" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.pop()}
              className="cartoon-btn px-2 sm:px-3 py-1.5 bg-[#FF9F00] hover:bg-[#ffaa1a] text-[11px] sm:text-xs font-bold font-heading text-[#49200B] rounded-xl border-2 border-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] flex items-center gap-1.5 transition-all"
              title="Open full PDF directly in browser"
            >
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#49200B]" />
              <span className="hidden sm:inline">Direct PDF</span>
            </a>

            <button
              onClick={() => {
                sounds.pop();
                onClose();
              }}
              className="cartoon-btn p-1 sm:p-1.5 bg-white hover:bg-rose-100 text-[#49200B] rounded-xl border-2 border-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] transition-colors"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#49200B]" />
            </button>
          </div>
        </div>

        {/* Reader Toolbar: View Mode, Zoom, Pagination */}
        <div className="bg-[#FFF3E8] border-b-2 border-[#49200B] px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#49200B] shrink-0">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#49200B]/30 shadow-[1px_1px_0px_#49200B]">
            <button
              onClick={() => {
                sounds.pop();
                setViewMode('scroll');
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-md font-bold font-heading text-[11px] sm:text-xs flex items-center gap-1 transition-all ${
                viewMode === 'scroll'
                  ? 'bg-[#FFD36A] text-[#49200B] shadow-inner'
                  : 'text-[#79513B] hover:text-[#49200B]'
              }`}
              title="Scroll through all pages continuously"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Scroll View</span>
            </button>
            <button
              onClick={() => {
                sounds.pop();
                setViewMode('single');
              }}
              className={`px-2 sm:px-2.5 py-1 rounded-md font-bold font-heading text-[11px] sm:text-xs flex items-center gap-1 transition-all ${
                viewMode === 'single'
                  ? 'bg-[#FFD36A] text-[#49200B] shadow-inner'
                  : 'text-[#79513B] hover:text-[#49200B]'
              }`}
              title="Flip through pages one by one"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Single Page</span>
            </button>
          </div>

          {/* Quick Page Navigator in Single Page Mode */}
          {viewMode === 'single' ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sounds.pop();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                disabled={currentPage <= 1}
                className="cartoon-btn p-1 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FFD36A] rounded-lg border border-[#49200B] text-[#49200B]"
                title="Previous page (Left arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1 font-bold font-mono text-[11px] sm:text-xs bg-white px-2.5 py-1 rounded-lg border border-[#49200B]/30">
                <span>Page</span>
                <span className="text-[#FF9F00]">{currentPage}</span>
                <span>/ {TOTAL_PAGES}</span>
              </div>
              <button
                onClick={() => {
                  sounds.pop();
                  setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1));
                }}
                disabled={currentPage >= TOTAL_PAGES}
                className="cartoon-btn p-1 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FFD36A] rounded-lg border border-[#49200B] text-[#49200B]"
                title="Next page (Right arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-[11px] sm:text-xs font-semibold text-[#79513B] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9F00]" />
              <span>Reading all 12 pages · High Resolution</span>
            </div>
          )}

          {/* Zoom controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                sounds.pop();
                setZoomLevel((z) => Math.max(75, z - 15));
              }}
              disabled={zoomLevel <= 75}
              className="p-1 bg-white hover:bg-[#F7D9C7] disabled:opacity-40 rounded-lg border border-[#49200B]/30 text-[#49200B]"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] font-bold text-[#49200B] w-9 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => {
                sounds.pop();
                setZoomLevel((z) => Math.min(150, z + 15));
              }}
              disabled={zoomLevel >= 150}
              className="p-1 bg-white hover:bg-[#F7D9C7] disabled:opacity-40 rounded-lg border border-[#49200B]/30 text-[#49200B]"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sounds.pop();
                setZoomLevel(100);
              }}
              className="text-[10px] font-bold font-heading bg-white hover:bg-[#F7D9C7] px-1.5 py-1 rounded-lg border border-[#49200B]/30 text-[#49200B]"
              title="Reset zoom to 100%"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Quick Chapter Pill Strip */}
        <div className="bg-[#FFF9F0] border-b border-[#49200B]/20 px-3 sm:px-5 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
          <span className="text-[10px] uppercase font-bold text-[#79513B] tracking-wider shrink-0 mr-1">
            Jump to:
          </span>
          {SECTIONS.map((sec) => (
            <button
              key={sec.page}
              onClick={() => jumpToPage(sec.page)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 transition-all border ${
                currentPage === sec.page
                  ? 'bg-[#FF9F00] text-white border-[#49200B] shadow-[1px_1px_0px_#49200B]'
                  : 'bg-white hover:bg-[#FFD36A]/50 text-[#79513B] border-[#49200B]/20'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Main Document Body: Native, safe, zero-block canvas/image stream */}
        <div
          ref={scrollContainerRef}
          className="flex-1 bg-[#23272e] p-3 sm:p-6 overflow-y-auto overflow-x-auto select-none"
        >
          {viewMode === 'scroll' ? (
            /* Continuous Multi-Page Scroll Mode */
            <div
              className="flex flex-col items-center gap-6 mx-auto transition-all duration-200"
              style={{ width: `${zoomLevel}%`, maxWidth: zoomLevel <= 100 ? '820px' : '1100px' }}
            >
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => (
                <div
                  key={pageNum}
                  id={`wp-page-${pageNum}`}
                  className="w-full bg-white rounded-lg shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_8px_10px_-6px_rgba(0,0,0,0.5)] overflow-hidden border border-neutral-700/60 relative group"
                >
                  {/* Page header badge inside reader */}
                  <div className="bg-[#1f2229] px-3 py-1 flex items-center justify-between text-[11px] text-neutral-300 font-mono border-b border-neutral-700">
                    <span className="font-bold text-[#FFD36A]">CuteDoDo Whitepaper v1.2</span>
                    <span className="bg-neutral-800 px-2 py-0.5 rounded text-[10px]">
                      Page {pageNum} of {TOTAL_PAGES} · {SECTIONS[pageNum - 1]?.title}
                    </span>
                  </div>

                  {/* Rendered crisp high-res page image */}
                  <div className="relative bg-white flex justify-center">
                    <img
                      src={`/whitepaper/page-${String(pageNum).padStart(2, '0')}.png`}
                      alt={`CuteDoDo Whitepaper v1.2 - Page ${pageNum}: ${SECTIONS[pageNum - 1]?.title}`}
                      className="w-full h-auto block select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Single Page Flip View */
            <div
              className="flex flex-col items-center justify-center mx-auto transition-all duration-200 min-h-full"
              style={{ width: `${zoomLevel}%`, maxWidth: zoomLevel <= 100 ? '820px' : '1100px' }}
            >
              <div className="w-full bg-white rounded-xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] overflow-hidden border border-neutral-700 relative">
                <div className="bg-[#1f2229] px-4 py-2 flex items-center justify-between text-xs text-neutral-300 font-mono border-b border-neutral-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#FFD36A]">CuteDoDo $DODO</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-white font-semibold">{SECTIONS[currentPage - 1]?.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-neutral-800 px-2 py-0.5 rounded text-[11px] text-neutral-300">
                      Page {currentPage} of {TOTAL_PAGES}
                    </span>
                  </div>
                </div>

                <div className="relative bg-white flex justify-center">
                  <img
                    src={`/whitepaper/page-${String(currentPage).padStart(2, '0')}.png`}
                    alt={`CuteDoDo Whitepaper v1.2 - Page ${currentPage}`}
                    className="w-full h-auto block select-none"
                  />
                </div>
              </div>

              {/* Next/Prev Floating Quick Buttons on Single View */}
              <div className="flex items-center justify-between w-full mt-4 max-w-sm gap-3">
                <button
                  onClick={() => {
                    sounds.pop();
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                  disabled={currentPage <= 1}
                  className="flex-1 py-2 px-3 bg-white hover:bg-[#FFD36A] disabled:opacity-40 disabled:cursor-not-allowed font-heading font-bold text-xs text-[#49200B] rounded-xl border-2 border-[#49200B] shadow-[2px_2px_0px_#49200B] flex items-center justify-center gap-1.5 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={() => {
                    sounds.pop();
                    setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1));
                  }}
                  disabled={currentPage >= TOTAL_PAGES}
                  className="flex-1 py-2 px-3 bg-[#FF9F00] hover:bg-[#ffaa1a] disabled:opacity-40 disabled:cursor-not-allowed font-heading font-bold text-xs text-[#49200B] rounded-xl border-2 border-[#49200B] shadow-[2px_2px_0px_#49200B] flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer / Verification & Trust Status */}
        <div className="bg-[#FFF9F0] border-t-2 border-[#49200B] px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#49200B] shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-[11px] sm:text-xs">
              Official Whitepaper Document · 12 Pages · 1,000,000,000 $DODO Capped · 100/100 TokenSniffer
            </span>
          </div>
          
          <div className="flex items-center gap-3 ml-auto text-[11px]">
            <a
              href="https://x.com/CuteDODO_018"
              target="_blank"
              rel="noreferrer"
              className="text-[#79513B] hover:text-[#49200B] hover:underline"
            >
              @CuteDODO_018
            </a>
            <span className="text-[#49200B]/30">|</span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#FF9F00] hover:underline font-heading flex items-center gap-1"
            >
              <span>Download PDF Document</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
