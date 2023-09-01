"use client"

import { GeistProvider } from "@geist-ui/core"

interface IAppProvidersProps {
  children?: React.ReactNode
}

export const AppProviders = ({children}: IAppProvidersProps) => {
  return(
    <GeistProvider>
      {children}
    </GeistProvider>
  )
}