import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash';

export interface Card {
  id: number,
  text: string;
  image: string;
  playCount: number;
}

export interface CardsState {
  cards: Array<Card>,
  correct: Card,
  misleading: Array<Card>,
  roundCards: Array<Card>,
  previousRoundCards: Array<Card>,
  roundNumber: number,
  score: number,
  time: number,
}

const initialState: CardsState = {
  cards: [],
  correct: { id: 0, text: "", image: "", playCount: 0 },
  misleading: [],
  roundCards: [],
  previousRoundCards: [],
  roundNumber: 0,  
  score: 0,
  time: 0,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    initCards: (state, action: PayloadAction<Array<Card>>) => {
      state.cards = action.payload;
      state.correct = state.cards[0];
      state.correct.playCount += 1;
      state.misleading = state.cards.slice(1, 4);
      state.roundCards = [...state.misleading, state.correct]
    },
    nextRound: (state, action: PayloadAction<boolean>) => {
      state.roundNumber += 1;
      if (!action.payload) {
        return;
      }

      // correct - select another card
      const minPlayTimes = Math.min(...state.cards.map(c => c.playCount));
      const candidates = state.cards.filter(c => c.playCount === minPlayTimes);
      
      state.score += 1;
      state.correct = _.sample(candidates)!
      state.correct.playCount += 1;
      state.misleading = _.sampleSize(state.cards.filter(n => n != state.correct), 3)
      state.roundCards = _.shuffle([...state.misleading, state.correct])      
    },

    restart: (state) => {
      state.score = 0;
      state.roundNumber = 0;
    },

    tick: (state, action: PayloadAction<number>) => {
      state.time += action.payload;
    }
  },
})

export default cardsSlice.reducer