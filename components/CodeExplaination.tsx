"use client"

import { sampleCode } from "@/data/examples"
import { HistoryItem } from "@/types"
import { useState } from "react"

interface CodeExplainationProps {
  addToHistory: (type: HistoryItem["type"], input: string, output: string) => void
}

const CodeExplaination = ({ addToHistory }: CodeExplainationProps) => {

  const [code, setCode] = useState<string>("")
  const [explanation, setExplanation] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false) 

  const explainCode = async () => {
    if(!code.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      console.log("Data: ", data);
      if(response.ok){
        setExplanation(data?.data);
        addToHistory("explain", code, data?.data);
        return;
      }else{
        setExplanation(`Error: ${data?.error}`);
      }
    } catch (error) {
      console.error(error);
      setExplanation("Failed to explain code. Please try again.");
    } finally{
      setLoading(false);
    }
  }

  const insertSample = () => {
    setCode(sampleCode);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"> 
        <h2 className="text-2xl font-bold">Explain Code</h2>
        <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg transition-colors duration-200 text-sm" onClick={insertSample}>Try Sample</button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-2 font-semibold">Paste your code</label> 
          <div className="relative">
            <textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900/70 text-white resize-none font-mono text-sm backdrop-blur-sm transition-all duration-300"
              placeholder="Paste your code here"
              rows={12}
            />
            <div className="absolute top-3 right-3 text-xs text-gray-500">{code.length} chars</div>
          </div>
        </div>

        <button 
          onClick={explainCode} 
          disabled={loading || !code.trim()} 
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700  text-white font-semibold rounded-lg flex justify-center items-center space-x-2 disabled:cursor-not-allowed shadow-lg transition-all duration-300 cursor-pointer">
          {loading ? (<>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Analyzing Code...</span>
          </>) : (
            <>
              <span>🔍</span>
              <span>Explain Code</span>
            </>
          )}
        </button>
      </div>

      {explanation && (
        <div className="mt-6 animate-fade-in">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded"></div>
            <h3 className="text-xl font-semibold">Explanation</h3>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded">
            <div className="prose prose-invert max-w-none">
              <pre className="text-gray-100 whitespace-pre-wrap leading-relaxed text-sm">{explanation}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeExplaination