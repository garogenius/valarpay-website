"use client";

import React, { useState } from 'react';
import CodeBlock from '@/components/ui/CodeBlock';
import { Box, Code2, Sparkles, TerminalSquare, Hexagon } from 'lucide-react';

export default function DocIntroduction() {
  const [activeTab, setActiveTab] = useState('Curl');

  const snippetData: Record<string, string> = {
    'Curl': `curl -G https://api.protocol.chat/v1/conversations \\
  -H "Authorization: Bearer {token}" \\
  -d limit=10`,
    'JavaScript': `fetch('https://api.protocol.chat/v1/conversations?limit=10', {
  headers: {
    'Authorization': 'Bearer {token}'
  }
}).then(res => res.json());`,
    'Python': `import requests

headers = {
    'Authorization': 'Bearer {token}',
}
params = {
    'limit': '10',
}
response = requests.get('https://api.protocol.chat/v1/conversations', params=params, headers=headers)`,
    'PHP': `$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.protocol.chat/v1/conversations?limit=10");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer {token}'));
$response = curl_exec($ch);
curl_close($ch);`,
    'Ruby': `require 'net/http'
require 'uri'

uri = URI.parse("https://api.protocol.chat/v1/conversations?limit=10")
request = Net::HTTP::Get.new(uri)
request["Authorization"] = "Bearer {token}"
response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end`
  };

  const clientLibraries = [
    { name: 'Ruby', icon: <Hexagon className="text-red-500 w-6 h-6" />, desc: 'A dynamic, open source programming language with a focus on simplicity and productivity' },
    { name: 'Php', icon: <Code2 className="text-blue-500 w-6 h-6" />, desc: 'A dynamic, open source programming language with a focus on simplicity and productivity' },
    { name: 'Nodejs', icon: <Box className="text-green-500 w-6 h-6" />, desc: 'A dynamic, open source programming language with a focus on simplicity and productivity' },
    { name: 'Python', icon: <Sparkles className="text-yellow-500 w-6 h-6" />, desc: 'A dynamic, open source programming language with a focus on simplicity and productivity' },
    { name: 'GO', icon: <TerminalSquare className="text-teal-500 w-6 h-6" />, desc: 'A dynamic, open source programming language with a focus on simplicity and productivity' }
  ];

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header text */}
      <div>
        <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-4">API-DOC Documentation</h1>
        <p className="text-gray-700 text-[14px] md:text-[15px] leading-relaxed mb-4">
          Join the ranks of satisfied developers who have harnessed the power of our API to enhance their applications and drive business growth. Explore our documentation and start revolutionizing payment experiences today.
        </p>
        <p className="text-gray-700 text-[14px] md:text-[15px] leading-relaxed">
          You can use the API-DOC in test mode, which doesn't affect your live data or interact with the banking networks. The API key you use to authenticate the request determines whether the request is live mode or test mode.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-[#F8F4EE] rounded-xl p-6 md:p-8 flex flex-col gap-3">
          <h3 className="font-bold text-gray-900 text-[18px]">Getting started</h3>
          <p className="text-gray-500 text-[14px] leading-relaxed mb-2">
            Embark on your payment processing journey with ease by following these simple steps to get started with our Payment API.
          </p>
          <a href="#" className="text-black font-semibold text-[13px] border-b border-[#FF5E00] w-fit hover:text-[#FF5E00] transition-colors pb-0.5">
            Developer Quick Start Guide
          </a>
        </div>
        
        <div className="bg-[#F8F4EE] rounded-xl p-6 md:p-8 flex flex-col gap-3">
          <h3 className="font-bold text-gray-900 text-[18px]">Not a developer?</h3>
          <p className="text-gray-500 text-[14px] leading-relaxed mb-2">
            Explore our no-code option to get started with API-DOC and do more with our API-DOC account.
          </p>
          <a href="#" className="text-black font-semibold text-[13px] border-b border-[#FF5E00] w-fit hover:text-[#FF5E00] transition-colors pb-0.5">
            No Code Option
          </a>
        </div>
      </div>

      {/* Choose your client */}
      <div>
        <h2 className="text-xl md:text-[22px] font-bold text-gray-900 mb-4">Choose your client</h2>
        <p className="text-gray-700 text-[14px] md:text-[15px] leading-relaxed mb-6">
          Select the client that best suits your development needs from our comprehensive range of options. API-DOC offers clients for JavaScript, Python, and PHP. In the following example, you can see how to install each client.
        </p>
        
        <ol className="list-decimal pl-5 flex flex-col gap-2 text-gray-700 text-[14px] mb-8">
          <li>Select Log in to Dashboard and log in or sign up.</li>
          <li>Select Apps & Credentials.</li>
          <li>New accounts come with a Default Application in the REST API apps section. To create a new project, select Create App.</li>
          <li>Copy the client ID and client secret for your app.</li>
        </ol>

        <CodeBlock 
          code={snippetData[activeTab]} 
          tabs={Object.keys(snippetData)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Client Libraries */}
      <div className="mt-4">
        <h2 className="text-xl md:text-[22px] font-bold text-gray-900 mb-6">Client Libraries</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {clientLibraries.map((lib) => (
            <div key={lib.name} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {lib.icon}
                <span className="font-bold text-gray-900 text-[16px]">{lib.name}</span>
              </div>
              <p className="text-gray-400 text-[13px] leading-relaxed">
                {lib.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
