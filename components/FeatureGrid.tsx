import { features } from "@/data/features"

const FeatureGrid = () => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <div key={index} className="bg-gray-800/40 backdrop-blur-lg p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 group transition-all duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">{feature.icon}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div> 
      ))}
    </div>
  )
}

export default FeatureGrid