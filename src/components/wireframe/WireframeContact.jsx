import React from 'react';
import { WBox, WText, WHeading, WLabel, WBtn } from './WireframeShell';

export default function WireframeContact({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div className="px-12 pt-12 pb-8 bg-white border-b border-gray-100">
        <WLabel className="mb-3" />
        <WHeading size="xl" width="55%" className="mb-2" />
        <WHeading size="xl" width="35%" className="mb-4 bg-yellow-300/60" />
        <WText lines={2} className="max-w-sm" />
      </div>

      {/* Form + Info */}
      <div className="px-12 py-12 bg-white">
        <div className="grid grid-cols-5 gap-10">
          {/* Form col */}
          <div className="col-span-3 space-y-5">
            <div className="grid grid-cols-2 gap-5">
              {['Full Name', 'Email'].map((f) => (
                <div key={f}>
                  <div className="h-2 w-16 bg-gray-300 rounded mb-2" />
                  <div className="h-10 bg-gray-100 border border-gray-300 rounded" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
              {['Company', 'Interest'].map((f) => (
                <div key={f}>
                  <div className="h-2 w-16 bg-gray-300 rounded mb-2" />
                  <div className="h-10 bg-gray-100 border border-gray-300 rounded" />
                </div>
              ))}
            </div>
            <div>
              <div className="h-2 w-16 bg-gray-300 rounded mb-2" />
              <div className="h-28 bg-gray-100 border border-gray-300 rounded" />
            </div>
            <WBtn primary label="Send Message →" />
          </div>

          {/* Info col */}
          <div className="col-span-2">
            <div className="bg-gray-50 border border-gray-200 rounded p-7 space-y-6">
              <div>
                <div className="h-4 w-28 bg-gray-400 rounded mb-3" />
                <WText lines={2} />
              </div>
              <div className="space-y-4">
                {['Office Address', 'Email'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full border border-gray-300 flex-shrink-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-yellow-400/60 rounded-sm" />
                    </div>
                    <div>
                      <div className="h-3 w-16 bg-gray-400 rounded mb-1" />
                      <div className="h-2 w-28 bg-gray-300 rounded" />
                      <div className="h-2 w-20 bg-gray-300 rounded mt-1" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-5">
                <WText lines={2} />
                <div className="h-2 w-20 bg-gray-300 rounded mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}