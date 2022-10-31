import React from 'react'

import { Guard, GuardMode } from "@authing/react-ui-components"

import "@authing/react-ui-components/lib/index.min.css"

export default function TestGuard () {
  const appId = "6336769084256bd80d06144e"

  const onLogin = (userInfo: any) => {
    console.log(userInfo)
  }

  return <Guard appId={appId} onLogin={onLogin} visible={true} config={{
    mode: GuardMode.Modal
  }} />
}
