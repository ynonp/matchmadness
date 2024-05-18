'use client'
import { useRef } from 'react'

import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../redux/store'
import { Card } from '../redux/slices/cards';
import {cardsSlice} from '../redux/slices/cards';
const { initCards } = cardsSlice.actions;

export default function StoreProvider({
  cards,
  children
}: {
  children: React.ReactNode,
  cards: Array<Card>
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current.dispatch(initCards(cards))    
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}