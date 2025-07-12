"use client"
import { useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Star, Play, ChevronDown, Search, Zap, TrendingUp, Eye, FileCode, Heart, Users, ArrowUpRight, Blocks } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


const AgentCard = ({ agent, index }: { agent: any; index: number }) => (
  <div key={index} className="group relative">
    <div className="clip-card px-3 py-2 bg-[#181818] hover:bg-[#be123c] transition-colors duration-200 relative z-10">
      <Link href={`/agent/${agent.name.toLowerCase().replace(/\s+/g, "-")}`}>
        <Card className="bg-transparent border-0 min-h-64 transition-all duration-200 cursor-pointer overflow-hidden relative group">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-sm">{agent.logo}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{agent.name}</h4>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 p-1 h-auto">
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Description */}
            <p className="text-white text-sm mb-4 opacity-90 line-clamp-3 h-[50px] overflow-hidden">
              {agent.description.length > 80 ? `${agent.description.substring(0, 80)}...` : agent.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <span className="text-white font-medium">{agent.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-white text-sm opacity-80">({agent.reviews.toLocaleString()} Reviews)</span>
            </div>

            {/* Tags and Price */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {agent.tags.map((tag: any, tagIndex: any) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className="text-xs text-white border-[1px] border-[#be123c] bg-[#0e0e0e] hover:bg-[#be123c]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {agent.price && <span className="text-white font-bold text-lg">{agent.price}</span>}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  </div>
)

const examples = [
  {
      name: "Jotform",
      description:
        "Jotform AI Agents revolutionize customer service by providing intelligent, automated support across multiple channels. These AI-powered assistants handle inquiries, collect data, and streamline customer interactions with customizable templates and scalable conversational interfaces.",
      creator: "Jotform Inc",
      rating: 4.3,
      reviews: 2236,
      tags: ["Paid", "AI Agent Builders"],
      price: "$20/mon",
      alternative: "PrivateAI",
      logo: "J",
    },
    {
      name: "Phala Network",
      description: "Secure, trustless AI computing without compromise.",
      creator: "Phala Team",
      rating: 4.3,
      reviews: 2236,
      tags: ["Paid", "AI Agent Builders"],
      logo: "P",
    },
    {
      name: "AgentOps",
      description: "Unleash reliable AI agents with comprehensive testing and optimization...",
      creator: "AgentOps Team",
      rating: 4.3,
      reviews: 2236,
      tags: ["Paid", "AI Agent Builders", "+12"],
      price: "$20/mon",
      logo: "A",
    }
]

const agents = [
  {
    name: "FLUX.1 Kontext",
    slug: "flux-1-kontext",
    visibility: "public",
    fullName: "black-forest-labs / flux-kontext-max",
    description:
      "A powerful text-based image editing model that achieves maximum performance and improved typography generation for transforming images through natural language prompts.",
    longDescription:
      "FLUX.1 Kontext is a state-of-the-art image editing model that allows you to edit images using text prompts. It's the best in class for text-guided image editing and offers superior results compared to other models.",
    rating: 4.8,
    reviews: 15420,
    runs: "2.1M",
    price: "$0.05",
    priceUnit: "per prompt",
    tags: ["Image Editing", "Text-to-Image", "AI"],
    creator: "Black Forest Labs",
    creatorHandle: "black-forest-labs",
    color: "from-orange-500 to-red-500",
    featured: true
  },
  // Add other agents here...
]

export default function AgentDetailPage({ params }: { params: { slug: string } }) {
  const agent = agents.find((a) => a.slug === params.slug)

  if (!agent) {
    notFound()
  }

  const [activeTab, setActiveTab] = useState("playground")
  const [showBuildLog, setShowBuildLog] = useState(false)

  return (
    <div className="relative min-h-screen bg-black text-white">

      {/* Agent Header */}
      <div className="border-b-8 border-[#101010] p-2 bg-[#181818]">
        <div className="container mx-auto px-8 py-4 m-4 clip-shadow">
          <div className="flex">
            <div className="flex flex-col">
              {/* Avatar, Name, Tags */}
              <div className="flex flex-row items-center space-x-4 pb-4">
                {/* Agent Avatar */}
                <div className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-xl font-bold">{agent.name.charAt(0)}</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">{agent.fullName}</h1>
                    <Badge className="bg-[#be123c]/20 text-amber-400 border-[#be123c]/30">{agent.visibility}</Badge>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-3">
                    {agent.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-gray-800 text-gray-300 border-gray-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mt-1 max-w-8/12">{agent.description}</p>
          </div>
            {/* Buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                <Star className="w-4 h-4 mr-2" />
                Star
              </Button>
              <Button className="bg-[#be123c] hover:bg-[#ae022c] text-white">
                <Play className="w-4 h-4 mr-2" />
                Run with an API
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between mt-4">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Play className="w-4 h-4" />
                <span>{agent.runs} runs</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>{agent.reviews.toLocaleString()} stars</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{agent.visibility}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Price: <span className="text-lg font-bold text-white">{agent.price}</span> {agent.priceUnit}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b border-[#be123c] mb-8">
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab("playground")}
              className={`relative py-2 pl-3 pr-4 clip-card2 flex flex-row gap-2 items-center font-medium transition-all duration-300 ${
                activeTab === "playground"
                  ? "text-white bg-[#be123c]"
                  : "text-gray-400 bg-transparent hover:text-white hover:bg-gray-800"
              }`}
            >
              <Blocks className="w-4 h-4" /> <span className="min-h-4 grid place-items-center">Playground</span>
            </button>
            <button
              onClick={() => setActiveTab("readme")}
              className={`relative py-2 pl-3 pr-4 clip-card2 flex flex-row gap-2 items-center font-medium transition-all duration-300 ${
                activeTab === "readme"
                  ? "text-white bg-[#be123c]"
                  : "text-gray-400 bg-transparent hover:text-white hover:bg-gray-800"
              }`}
            >
              <FileCode className="w-4 h-4" /> <span className="min-h-4 grid place-items-center">README</span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "playground" && (
          <div className="p-8 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Prompt Section */}
              <div className="space-y-6 bg-[#181818] p-6 rounded-lg">
                <div>
                  <h2 className="text-xl font-bold mb-4">Prompt</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="prompt" className="text-sm font-medium text-gray-300">
                        Enter your prompt
                      </Label>
                      <Textarea
                        id="prompt"
                        placeholder="Describe what you want to build..."
                        className="mt-2 bg-black border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
                      />
                      <p className="text-xs text-gray-400 mt-2">Cost: ~$0.05 per execution</p>
                    </div>

                    <Button className="w-full bg-[#be123c] hover:bg-[#ae022c] text-white py-3">Execute Prompt</Button>

                    {/* Template Prompts */}
                    <div className="mt-6">
                      <Label className="text-sm font-medium text-gray-300 mb-3 block">Template Prompts</Label>
                      <div className="space-y-2">
                        <div className="bg-transparent border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-750 transition-colors">
                          <code className="text-sm text-[#ae022c]">
                            Deploy [token name] with [token symbol] as the symbol, [initial amount] initial amount for
                            the token launch
                          </code>
                        </div>
                        <div className="bg-transparent border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-750 transition-colors">
                          <code className="text-sm text-[#ae022c]">
                            Create a smart contract for [contract type] with [parameters] and deploy to [network]
                          </code>
                        </div>
                        <div className="bg-transparent border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-750 transition-colors">
                          <code className="text-sm text-[#ae022c]">
                            Build a DeFi protocol for [use case] with [token mechanics] and [governance structure]
                          </code>
                        </div>
                        <div className="bg-transparent border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-750 transition-colors">
                          <code className="text-sm text-[#ae022c]">
                            Generate NFT collection with [collection size] items, [metadata structure], and [rarity
                            distribution]
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>

              {/* Output Section */}
              <div className="space-y-6 lg:pl-8 bg-[#181818] p-6 rounded-lg">
                <div>
                  <h2 className="text-xl font-bold mb-4">Output</h2>

                  {/* Prompt Output */}
                  <div className="mb-6">
                    <Label htmlFor="prompt" className="text-sm font-medium text-gray-300">
                        Output will be shown here
                      </Label>
                      <Textarea
                        id="prompt"
                        placeholder="Wait for the execution for any output to showcase..."
                        disabled
                        className="mt-2 bg-black border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
                      />
                  </div>

                  <div className="flex items-center justify-between my-4">
                      <div className="text-sm text-gray-400">Execution time: 2.3 seconds</div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                          Copy Output
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                          Share
                        </Button>
                      </div>
                    </div>

                  {/* Build Log Section */}
                  <div>
                    <div className="flex items-center justify-between my-3">
                      <h3 className="text-lg font-medium text-gray-300">Build Log</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowBuildLog(!showBuildLog)}
                        className="border-gray-600 text-gray-300 hover:bg-[#be123c] bg-transparent"
                      >
                        {showBuildLog ? "Hide" : "Show"} Log
                      </Button>
                    </div>
                    
                      {/* className={`relative py-2 pl-3 pr-4 clip-card2 flex flex-row gap-2 items-center font-medium transition-all duration-300 ${
                activeTab === "readme"
                  ? "text-white bg-[#be123c]"
                  : "text-gray-400 bg-transparent hover:text-white hover:bg-gray-800"
              }`} */}
                      <div className={`bg-black border border-gray-700 rounded-lg ${showBuildLog ? "block" : "hidden"}`}>
                        <Textarea
                          readOnly
                          value={`[2024-01-15 10:30:15] Starting execution...
[2024-01-15 10:30:16] Parsing prompt parameters...
[2024-01-15 10:30:17] Initializing smart contract template...
[2024-01-15 10:30:18] Compiling contract code...
[2024-01-15 10:30:20] Running security checks...
[2024-01-15 10:30:22] Deploying to testnet...
[2024-01-15 10:30:25] Contract deployed successfully!
[2024-01-15 10:30:25] Contract address: 0x742d35Cc6634C0532925a3b8D404d3aABB8c7c1
[2024-01-15 10:30:26] Execution completed.`}
                          className="bg-transparent border-0 text-[#fff] font-mono text-xs min-h-[200px] resize-none focus:ring-0"
                        />
                      </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "readme" && (
          <div className="p-8 rounded-lg">
            <div>
              <Card className="bg-[#181818] border-[#be123c]">
                <CardContent className="p-6 prose prose-invert max-w-none text-white">
                  <h3 className="text-xl font-bold mb-4">{agent.name} - Text-Based Image Editing</h3>
                  <p className="text-gray-300 mb-6">{agent.longDescription}</p>

                  <h4 className="text-lg font-semibold mb-3">Available Models</h4>
                  <ul className="text-gray-300 space-y-2 mb-6">
                    <li>
                      <strong>FLUX.1 [schnell]:</strong> Ultra-fast image generation with low commercial license
                      commercial use available through Hugging Face.
                    </li>
                    <li>
                      <strong>FLUX.1 [dev]:</strong> State-of-the-art performance with high-quality outputs, great
                      prompt following, and superior aesthetic results compared to other models.
                    </li>
                    <li>
                      <strong>FLUX.1 [pro]:</strong> Premium model with maximum performance and improved typography
                      generation.
                    </li>
                  </ul>

                  <h4 className="text-lg font-semibold mb-3">What You Can Do</h4>
                  <ul className="text-gray-300 space-y-2 mb-6">
                    <li>
                      <strong>Style Transfer:</strong> Convert photos to different art styles (watercolor, oil painting,
                      sketching, etc.)
                    </li>
                    <li>
                      <strong>Object/Scene Changes:</strong> Modify backgrounds, add/remove objects, change colors
                    </li>
                    <li>
                      <strong>Background Swapping:</strong> Change environments while preserving subjects
                    </li>
                    <li>
                      <strong>Character Consistency:</strong> Maintain identity across scene edits
                    </li>
                  </ul>

                  <h4 className="text-lg font-semibold mb-3">Prompting Best Practices</h4>
                  <ul className="text-gray-300 space-y-2 mb-6">
                    <li>
                      <strong>Be Specific:</strong> Use clear, detailed language with exact colors and descriptions
                    </li>
                    <li>
                      <strong>Avoid vague terms like "make it better"</strong>
                    </li>
                    <li>
                      <strong>Name subjects directly:</strong> "the woman with short black hair" vs "she"
                    </li>
                    <li>
                      <strong>Preserve intentionally:</strong> Specify what should stay the same when making the scene
                      "more festive"
                    </li>
                  </ul>

                  <h4 className="text-lg font-semibold mb-3">Commercial Use</h4>
                  <p className="text-gray-300 mb-6">
                    When using FLUX.1 Kontext on Replicate, you're free to use outputs commercially in apps, marketing,
                    or any business context.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">Example Applications</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>
                      <strong>E-commerce:</strong> Product photography enhancement
                    </li>
                    <li>
                      <strong>Marketing:</strong> Creative campaign visuals
                    </li>
                    <li>
                      <strong>Social Media:</strong> Content creation and enhancement
                    </li>
                    <li>
                      <strong>Professional Services:</strong> Client presentation materials
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            {/* Use Cases Section */}
                <div>
                  <h3 className="text-lg font-bold mt-6 mb-2">Use Cases</h3>
                  <div className="bg-[#181818] border border-[#be123c] rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">AI & Machine Learning</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">Decentralized Cloud Computing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">Privacy-Preserving Smart Contracts</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">Web3 & DeFi Infrastructure</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">Gaming & Metaverse</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">AI & Edge Computing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">Data Privacy & Security</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">Confidential DApps & Governance</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">Healthcare & Biomedicine</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#be123c] rounded-full"></div>
                        <span className="text-sm text-gray-300">Supply Chain & Enterprise Solutions</span>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        )}
      </div>

      {/* Internals Section */}
      <div className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="p-8 rounded-lg">
          {/* Examples Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Examples</h2>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                View more examples →
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examples.map((agent: any, index: number) => (
                AgentCard({ agent, index: index + 1 })
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
