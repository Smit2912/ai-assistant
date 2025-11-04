"use client";

import CodeDebugging from "@/components/CodeDebugging";
import CodeExplaination from "@/components/CodeExplaination";
import CodeGeneration from "@/components/CodeGeneration";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HistoryPanel from "@/components/HistoryPanel";
import { tabs } from "@/data/tabs";
import { HistoryItem, Tab } from "@/types";
import { Activity, useState } from "react";

export default function Home() {

  const [activeTab, setActiveTab] = useState<Tab["id"]>("explain");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = (type: HistoryItem["type"], input: string, output: string) => {
    const newItem: HistoryItem = {
      id: Date.now(),
      type,
      timestamp: new Date().toLocaleString(),
      input,
      output
    }
    setHistory((prev) => [newItem, ...prev.slice(0, 9)]);
  };
 
  return (
    <>
      <main className="mx-auto px-4 py-8 relative z-10 container">
        <Header/>
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700">
              <div className="flex border-b border-gray-700/50 bg-gray-900/50 p-2">
                {tabs.map((tab) => (
                  <button 
                    key={tab.id} 
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${activeTab === tab.id ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`}
                    onClick={() => setActiveTab(tab.id)}>
                    <span className="text-xl mr-2">{tab.icon}</span>{tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                <Activity mode={activeTab === "explain" ? "visible" : "hidden"}>
                  <CodeExplaination addToHistory={addToHistory}/>
                </Activity>
                <Activity mode={activeTab === "debug" ? "visible" : "hidden"}>
                  <CodeDebugging addToHistory={addToHistory}/>
                </Activity>
                <Activity mode={activeTab === "generate" ? "visible" : "hidden"}>
                  <CodeGeneration addToHistory={addToHistory}/>
                </Activity>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <HistoryPanel history={history}/>
          </div>
        </div>
        <FeatureGrid/>
      </main>
      <Footer/>
    </>
  );
}
