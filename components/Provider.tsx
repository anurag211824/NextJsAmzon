/* eslint-disable @typescript-eslint/ban-ts-comment */
// components/Provider.js
//@ts-nocheck
'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from "../redux/store.ts"

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}
