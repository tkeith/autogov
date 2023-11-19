"use client";

import React from "react";

interface CodeModalProps {
  code: string;
  onClose: () => void;
  codeIpfsUrl: string;
}

const CodeModal: React.FC<CodeModalProps> = ({
  code,
  onClose,
  codeIpfsUrl,
}) => {
  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 -z-10 bg-gray-500 opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className=" mt-3 w-full text-center sm:mt-0 sm:text-left">
                <div className="mt-2">
                  <pre className="whitespace-pre-wrap rounded bg-black p-2 font-mono text-sm  text-white">
                    {code.trim()}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 pb-3 sm:flex sm:flex-row-reverse sm:px-6">
            {/* Close button */}
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>

            {/* IPFS url button if codeIpfsUrl is not empty */}
            {codeIpfsUrl && (
              <a
                href={codeIpfsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
              >
                View on IPFS
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
