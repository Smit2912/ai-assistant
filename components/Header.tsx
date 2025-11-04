const Header = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4 gap-2">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-2xl">🤖</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">CodeCraft AI</h1>
      </div>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        Your intelligent coding companion. Explain , debug, and generate code with AI-powered assistance.
      </p>
    </div>
  )
}

export default Header