"use client";

import React from 'react';
import CodeBlock from '@/components/ui/CodeBlock';

interface HeaderParam {
  name: string;
  type: string;
  description: string;
}

interface EndpointReferenceProps {
  title: string;
  description: string;
  headers?: HeaderParam[];
  bodyParamsJSON?: string;
  curlRequest: string;
  sampleResponse: string;
  method?: string;
  path?: string;
}

export default function EndpointReference({
  title,
  description,
  headers,
  bodyParamsJSON,
  curlRequest,
  sampleResponse,
  method = 'POST',
  path = '/api/v1/endpoint'
}: EndpointReferenceProps) {
  
  return (
    <div className="w-full flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Title & Desc */}
      <div className="mb-2">
        <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500 text-[14px] md:text-[15px]">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Left Column: Headers & Body Params */}
        <div className="flex flex-col gap-10">
          
          {/* Headers */}
          {headers && headers.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[18px] font-bold text-gray-900">Headers</h2>
              
              <div className="flex flex-col gap-4">
                {headers.map((h, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 border-b border-gray-100 pb-4">
                    <div className="w-32 flex flex-col">
                      <span className="font-semibold text-gray-900 text-[14px]">{h.name}</span>
                      <span className="text-gray-400 text-[12px]">{h.type}</span>
                    </div>
                    <div className="flex-1 text-gray-500 text-[13px] bg-gray-50 rounded px-2 py-1 inline-block w-fit">
                      {h.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Body Parameters */}
          {bodyParamsJSON && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[18px] font-bold text-gray-900">Body Parameters</h2>
              <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-100 text-[13px] text-gray-800 font-mono overflow-x-auto">
                <pre><code>{bodyParamsJSON}</code></pre>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Code Snippets */}
        <div className="flex flex-col gap-10">
          
          {/* cURL Request */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[18px] font-bold text-gray-900">cURL Request</h2>
            <CodeBlock 
              code={curlRequest} 
              titleRight="cURL"
              method={method}
              path={path}
            />
          </div>

          {/* Sample Response */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[18px] font-bold text-gray-900">Sample Response</h2>
            <CodeBlock 
              code={sampleResponse} 
              titleRight="200 OK"
              language="Sample Response"
            />
          </div>

        </div>

      </div>

    </div>
  );
}
