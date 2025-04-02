"use client"

interface AxicovAvatarProps {
  size?: "small" | "medium" | "large"
}

export function AxicovAvatar({ size = "medium" }: AxicovAvatarProps) {
  // Determine dimensions based on size prop
  const getDimensions = () => {
    switch (size) {
      case "small":
        return {
          width: 24,
          height: 24,
          fontSize: 12,
        }
      case "large":
        return {
          width: 80,
          height: 80,
          fontSize: 40,
        }
      case "medium":
      default:
        return {
          width: 40,
          height: 40,
          fontSize: 20,
        }
    }
  }

  const { width, height, fontSize } = getDimensions()

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-rose-500"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <span className="font-bold text-white" style={{ fontSize: `${fontSize}px` }}>
        A
      </span>
    </div>
  )
}

