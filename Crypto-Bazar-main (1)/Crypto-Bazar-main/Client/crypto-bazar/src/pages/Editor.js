import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Editor = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (response) {
      decodeResponse(response);
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setContent('');

    const url = 'https://crypto-bazar-one.vercel.app/query';
    try {
      const requestBody = { prompt };
      
      const result = await axios.post(url, requestBody, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('Success:', result.data);
      setResponse(result.data);
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || 'An error occurred'
      );
    }
  };

  function decodeResponse(response) {
    if (!response) {
      console.error("Response is undefined or null");
      return;
    }
  
    if (response.response) {
      response = response.response;
    }
  
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        setContent(candidate.content.parts[0].text);
      } else {
        console.log("No content found in the candidate");
      }
    } else {
      console.log("No candidates found in the response");
    }
  }

  return (
    <div className="flex flex-col h-full bg-black text-neon-green p-6 overflow-auto">
      <main className="flex-grow flex flex-col md:flex-row md:space-x-6">
        {/* Prompt Input Component */}
        <div className="md:w-1/3 flex flex-col space-y-4 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-neon-blue">Unlock Insights with AI</h2>
          <p className="text-sm text-neon-pink leading-relaxed">
            Discover how artificial intelligence can help you make informed decisions in the fast-paced world of cryptocurrency. 
            Whether you're curious about market trends, seeking predictions, or looking for educational content, our AI is here to assist. 
            Enter your prompt below to explore the possibilities!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-start">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 h-32 bg-gray-900 border border-neon-green rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-neon-green text-neon-green placeholder-neon-green/50"
              placeholder="Enter your prompt here..."
            />
            <button 
              type="submit"
              className="mt-4 px-6 py-2 bg-green-500 text-black rounded-full hover:bg-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Response Display Component */}
        <div className="flex-grow flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-neon-blue">Response</h2>
          <div className="flex-grow p-4 bg-gray-900 border border-neon-green rounded-lg overflow-hidden flex flex-col">
            <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-gray-900">
              <pre className="whitespace-pre-wrap text-neon-green">
                {error && <p className="text-neon-red text-sm mb-3">{error}</p>}
                {content && typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Editor;
