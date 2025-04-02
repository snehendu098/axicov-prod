"use client"

import { useState } from "react"
import { Shield, Key, Clock, Copy, CheckCircle } from "lucide-react"

interface SecurityCardProps {
  publicKey: string
  privateKey: string
  createdOn: string
}

export function SecurityCard({ publicKey, privateKey, createdOn }: SecurityCardProps) {
  const [copiedPublic, setCopiedPublic] = useState(false)
  const [copiedPrivate, setCopiedPrivate] = useState(false)

  const copyToClipboard = (text: string, type: "public" | "private") => {
    navigator.clipboard.writeText(text)
    if (type === "public") {
      setCopiedPublic(true)
      setTimeout(() => setCopiedPublic(false), 2000)
    } else {
      setCopiedPrivate(true)
      setTimeout(() => setCopiedPrivate(false), 2000)
    }
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden hover:border-rose-500/30 transition-all duration-300">
      <div className="p-5 border-b border-[#2a2a2a] flex justify-between items-center">
        <div className="flex items-center">
          <Shield size={18} className="text-rose-400 mr-2" />
          <h2 className="text-lg font-medium">Agent Security</h2>
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
          Secured
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center group">
          <div className="flex items-center">
            <Key size={16} className="text-gray-500 mr-3 group-hover:text-rose-400 transition-colors duration-300" />
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Public Key
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-mono bg-[#252525] px-3 py-1.5 rounded-lg mr-2 border border-[#2a2a2a]">
              {publicKey}
            </span>
            <button
              onClick={() => copyToClipboard(publicKey, "public")}
              className="p-1.5 rounded-md bg-[#252525] hover:bg-[#2a2a2a] transition-colors"
            >
              {copiedPublic ? (
                <CheckCircle size={16} className="text-rose-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center group">
          <div className="flex items-center">
            <Key size={16} className="text-gray-500 mr-3 group-hover:text-rose-400 transition-colors duration-300" />
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Private Key
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-mono bg-[#252525] px-3 py-1.5 rounded-lg mr-2 border border-[#2a2a2a]">
              {privateKey}
            </span>
            <button
              onClick={() => copyToClipboard(privateKey, "private")}
              className="p-1.5 rounded-md bg-[#252525] hover:bg-[#2a2a2a] transition-colors"
            >
              {copiedPrivate ? (
                <CheckCircle size={16} className="text-rose-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center group">
          <div className="flex items-center">
            <Clock size={16} className="text-gray-500 mr-3 group-hover:text-rose-400 transition-colors duration-300" />
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Created on
            </div>
          </div>
          <div className="text-sm bg-[#252525] px-3 py-1.5 rounded-lg border border-[#2a2a2a]">{createdOn}</div>
        </div>
      </div>
    </div>
  )
}

