"use client"

import { languages, samplePrompts } from "@/data/examples"
import { HistoryItem } from "@/types"
import { useState } from "react"

interface CodeGenerationProps {
  addToHistory: (type: HistoryItem["type"], input: string, output: string) => void
}

const CodeGeneration = ({ addToHistory }: CodeGenerationProps) => {

  const [description, setDescription] = useState<string>("")
  const [language, setLanguage] = useState<string>("Javascript")
  const [generatedCode, setGeneratedCode] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const generateCode  = async () => {
    if(!description.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ description, language })
      });
      const data = await response.json();
      console.log("Data: ", data);
      if(response.ok){
        setGeneratedCode(data?.data);
        addToHistory("generate", `${description}\n\nLanguage: ${language}\n\nCode:`, data?.data);
        return;
      }else{
        setGeneratedCode(`Error: ${data?.error}`);
      }
    } catch (error) {
      console.error(error);
      setGeneratedCode("Failed to generate  code. Please try again.");
    } finally{
      setLoading(false);
    }
  }

  const insertSamplePrompt = (prompt: string) => {
    setDescription(prompt);
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"> 
        <h2 className="text-2xl font-bold">Generate Code</h2>
      </div>

      <div className="space-y-4">

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2 font-semibold">Code with Issues</label> 
          <div className="relative">
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-900/70 text-gray-100 backdrop-blur-sm transition-all duration-300" 
            >
              {languages.map((language, index) => (
                <option key={index} value={language} className="bg-gray-800">{language}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2"> 
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2 font-semibold">Describe what you want to generate</label> 
            <div className="text-xs text-gray-500">{description.length} chars</div>
          </div>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900/70 text-white resize-none font-mono text-sm backdrop-blur-sm transition-all duration-300"
              placeholder="Describe what you want to generate"
              rows={5}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="prompts" className="block text-sm font-medium text-gray-300 mb-2 font-semibold">Quick Prompts</label> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {samplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => insertSamplePrompt(prompt)}
                className="px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-100 text-sm rounded-lg transition-colors duration-200 border border-gray-700/50 hover:border-green-500/30"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={generateCode}  
          disabled={loading || !description.trim()} 
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700  text-white font-semibold rounded-lg flex justify-center items-center space-x-2 disabled:cursor-not-allowed shadow-lg transition-all duration-300 cursor-pointer">
          {loading ? (<>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating Code...</span>
          </>) : (
            <>
              <span>⚡</span> 
              <span>Generate Code</span>
            </>
          )}
        </button>
      </div>

      {generatedCode && (
        <div className="mt-6 animate-fade-in">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded"></div>
            <h3 className="text-xl font-semibold">Generated Code</h3> 
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800/70 rounded-t-lg">
              <span className="text-sm font-semibold text-gray-300">{language}</span>
              <button onClick={copyCode} className="px-3 py-1 bg-gray-500/50 hover:bg-gray-600/50 text-gray-100 text-sm rounded-lg transition-colors duration-200 border border-gray-700/50 hover:border-gray-500/30 cursor-pointer">
                Copy
              </button>
            </div>
            <div className="prose prose-invert max-w-none p-6">
              <pre className="text-gray-100 whitespace-pre-wrap leading-relaxed text-sm">{generatedCode}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeGeneration