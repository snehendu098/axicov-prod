import {
  Search,
  ChevronRight,
  Play,
  Users,
  Zap,
  TrendingUp,
  Heart,
  ExternalLink,
  ArrowUpRight,
  Star,
} from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/ui/aurora"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown } from "lucide-react"
import { ThirdwebConnectButton } from "@/components/thirdweb/index"

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

export default function Component() {
  const featuredAgent = {
    name: "GPT-4 Vision Pro",
    description:
      "Advanced multimodal AI that can understand and generate both text and images with unprecedented accuracy",
    image: "/placeholder.svg?height=200&width=400",
    creator: "OpenAI",
    runs: "2.1M",
    tags: ["Vision", "Text", "Multimodal"],
  }

  const agents = [
    {
      name: "Jotform",
      description:
        "Jotform AI Agents revolutionize customer service by providing intelligent, automated support across multiple channels. These AI-powered assistants handle inquiries, collect data, and streamline customer interactions with customizable templates and scalable conversational interfaces.",
      creator: "Jotform Inc",
      rating: 4.3,
      reviews: 2236,
      tags: ["Paid", "AI Agent Builders"],
      price: "$20/mon",
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
    },
    {
      name: "Dify",
      description: "Build powerful AI agents and workflows in minutes",
      creator: "Dify Team",
      rating: 4.3,
      reviews: 2236,
      tags: ["Paid", "Content Creation", "+12"],
      price: "$20/mon",
      logo: "D",
    },
    {
      name: "Cowal",
      description: "Ship reliable AI agents faster with comprehensive simulation",
      creator: "Cowal Inc",
      rating: 4.3,
      reviews: 2236,
      tags: ["Paid", "AI Agent Builders", "+4"],
      logo: "C",
    },
    {
      name: "Neets.ai",
      description: "Build powerful AI agents and workflows in minutes",
      creator: "Neets Team",
      rating: 4.3,
      reviews: 2236,
      tags: ["Free + Paid", "Content Creation", "+13"],
      price: "$30/mon",
      logo: "N",
    },
    {
      name: "Potpie AI",
      description: "Build custom AI agents that understand your entire codebase",
      creator: "Potpie Team",
      rating: 4.3,
      reviews: 2236,
      tags: ["Paid", "Coding", "+12"],
      price: "$20/mon",
      logo: "P",
    },
    {
      name: "Jasper AI",
      description: "AI-powered marketing that transforms how teams create and execute content",
      creator: "Jasper Inc",
      rating: 4.3,
      reviews: 2236,
      tags: ["Free + Paid", "Marketing"],
      price: "$10000/mon",
      logo: "J",
    },
    {
      name: "PrivateAI",
      description: "Secure AI-powered privacy protection for sensitive data",
      creator: "PrivateAI Team",
      rating: 4.3,
      reviews: 2236,
      tags: ["Paid", "AI Agent Builders", "+13"],
      price: "$30/mon",
      logo: "P",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white">
      <header className="grid place-items-center bg-transparent sticky h-0 top-2 z-60 w-full">
        <div className="container mx-auto bg-white/5 backdrop-blur-lg rounded-2xl border-0 inset-shadow-sm inset-shadow-white/50 shadow-lg shadow-black/50 px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with Navigation Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-3 hover:bg-[#be123c] hover:text-white px-3 py-2 h-auto">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-black rounded-sm"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div>
                      <div className="text-xl font-bold text-left">Axicov</div>
                      <div className="text-xs text-gray-400 text-left">Marketplace</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-[#181818] border-[#281818]">
                <DropdownMenuItem className="text-white hover:bg-gray-800 cursor-pointer">
                  <TrendingUp className="w-4 h-4 mr-3" />
                  <div>
                    <div className="font-medium">Marketplace</div>
                    <div className="text-xs text-gray-400">Browse AI agents</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                  <Link href="/dashboard" className="flex items-center">
                    <Zap className="w-4 h-4 mr-3" />
                    <div>
                      <div className="font-medium">Dashboard</div>
                      <div className="text-xs text-gray-400">Manage your agents</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                  <Heart className="w-4 h-4 mr-3" />
                  <div>
                    <div className="font-medium">Collections</div>
                    <div className="text-xs text-gray-400">Saved agents</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                  <Users className="w-4 h-4 mr-3" />
                  <div>
                    <div className="font-medium">Community</div>
                    <div className="text-xs text-gray-400">Connect with others</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-100 w-4 h-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 pr-16 bg-[#181818]/5 border-[#be123c] text-white placeholder-gray-100 focus:border-gray-500"
                />
              </div>
            </div>

            {/* Account/Wallet Box */}
            <div className="ml-8">
              <ThirdwebConnectButton/>
            </div>
          </div>
        </div>
      </header>
      <div className="min-h-[10vh]">
        <Aurora
            colorStops={["#be123c", "#9f1239", "#fda4af"]}
            speed={1}
            amplitude= {1}
            blend={0.8}
          />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Section 
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-[#be123c]/50 to-pink-500/50 border-white/50 overflow-hidden p-8">
            <CardContent className="p-0">
              <div className="flex">
                <div className="flex-1 p-5">
                  <div className="mb-4">
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-3">Featured</Badge>
                    <h2 className="text-3xl font-bold text-white mb-2">{featuredAgent.name}</h2>
                    <p className="text-gray-300 text-lg mb-4">{featuredAgent.description}</p>
                  </div>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">by {featuredAgent.creator}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">{featuredAgent.runs} runs</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button className="bg-white text-black hover:bg-gray-200">
                      Try it out
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <div className="flex gap-2">
                      {featuredAgent.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-80 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 opacity-80"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        */}

        {/* Search and Filters Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  className="pl-10 border-gray-400 bg-[#181818] text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Select>
                <SelectTrigger className="w-32 bg-[#181818] border-[#581818] text-white">
                  <SelectValue placeholder="Ratings"/>
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-gray-700 text-white">
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32 bg-[#181818] border-gray-700 text-white">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-gray-700 text-white">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-36 bg-[#181818] border-gray-700 text-white">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-gray-700 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ai-builders">AI Agent Builders</SelectItem>
                  <SelectItem value="content">Content Creation</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-32 bg-[#181818] border-gray-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-gray-700 text-white">
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">AI Agents Listed</h3>
          <p className="text-gray-400">Browse AI Agents by category</p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <AgentCard key={index} agent={agent} index={index} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
            Load more models
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}