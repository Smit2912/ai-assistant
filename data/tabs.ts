import { Tab } from "@/types";

export const tabs: Tab[] = [
    {
        id: "explain",
        label: "Explain Code",
        icon: "🔍",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: "debug",
        label: "Debug Code",
        icon: "🐛",
        gradient: "from-red-500 to-orange-500"
    },{
        id: "generate",
        label: "Generate Code",
        icon: "⚡",
        gradient: "from-green-500 to-blue-500"
    },
]