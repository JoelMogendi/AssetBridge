"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg rounded-lg border px-4 py-3",
          description: "group-[.toast]:text-gray-500 text-sm",
          actionButton:
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white rounded-md px-3 py-1 text-sm font-medium",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 rounded-md px-3 py-1 text-sm font-medium",
          success: "group-[.toaster]:text-green-600",
          error: "group-[.toaster]:text-red-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }