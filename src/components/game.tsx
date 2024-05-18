'use client';

import _ from 'lodash';
import PlayIcon from './ui/play_icon';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cardsSlice, Card } from '@/redux/slices/cards';
const {nextRound: nextRoundAction, restart, tick} = cardsSlice.actions;
import { motion, AnimatePresence } from "framer-motion";
import { Button } from './ui/button';
import { say } from '@/lib/utils';
import { useEffect } from 'react';


export function Game() {  
  const correctCard = useAppSelector(state => state.cards.correct);
  const cards = useAppSelector(state => state.cards.roundCards);
  const allCards = useAppSelector(state => state.cards.cards);
  const round = useAppSelector(state => state.cards.roundNumber);
  const score = useAppSelector(state => state.cards.score);
  const requiredScore = allCards.length * 2;
  const time = useAppSelector(state => state.cards.time / 1000);

  if (allCards.length === 0) {
    return <p>No Cards...</p>
  } else if (cards.length === 0) {
    return <></>
  } else if (score == requiredScore) {
    return <EndRound />
  }

  return (
    <div className='flex flex-col h-screen w-screen overflow-hidden'>
      <div className='flex flex-row'>
        
        <p className='text-left text-4xl px-12 py-4'>{time.toFixed(1)}</p>
        <p className='ml-auto text-right text-4xl px-12 py-4'>{score} / {requiredScore}</p>
      </div>
    
    <div className='flex flex-col-reverse flex-1 mt-4'>      
      {round > 0 && <Timer />}
      <AnimatePresence initial={false}>        
        <motion.div
          key={round}
          initial={{ y: -1000 }}
          exit={{ y: 2000, height: '0px' }}
          animate={{ y: 0  }}
          transition={{ duration: 0.5 }}               
          style={{height: '100%' }}
        >
          <Round roundCards={cards} correctCard={correctCard} />
        </motion.div>
        </AnimatePresence>
    </div>
    </div>

  )
}

function Round({roundCards, correctCard}: {
  roundCards: Array<Card>,
  correctCard: Card,
}) {
  const dispatch = useAppDispatch();

  function handleClick(card: Card) {
    dispatch(nextRoundAction(card === correctCard));
  }

  return (
    <div className='flex flex-col h-full'>
      
      <div className="text-center mb-4 text-4xl font-bold text-[#EF4444] dark:text-[#F87171]">
        {correctCard.text}
        <PlayIcon
          className="w-8 inline mx-2 cursor-pointer"
          onClick={() => say(correctCard.text)}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-8">
        {roundCards.map(card => (
                <div key={card.id} className="flex flex-col items-center space-y-4">
                  <div className="relative rounded-lg overflow-hidden aspect-square bg-[#FFF5F5] dark:bg-[#1F2937]">
                    <img
                      alt="Flashcard Image"
                      className="object-cover w-full h-full"
                      height={300}
                      src={card.image}
                      onClick={() => handleClick(card)}
                      style={{
                        aspectRatio: "300/300",
                        objectFit: "cover",
                      }}
                      width={300}
                    />                    
                  </div>
                </div>
        ))}
      </div>
    </div>
  )  
}

function EndRound() {
  const time = useAppSelector(state => state.cards.time);
  const dispatch = useAppDispatch();

  return (<div className='h-screen w-screen flex flex-col justify-center align-middle'>
    <p className='text-center py-4 text-4xl'>Bravo! You Win. Took {(time / 1000).toFixed(1)} Seconds</p>
    <Button className='w-40 mx-auto'
      onClick={() => dispatch(restart())}>Play Again</Button>
  </div>)
}

function Timer() {
  const dispatch = useAppDispatch();
  useEffect(() => {    
    const clock = setInterval(() => {      
      dispatch(tick(100));
    }, 100);

    return () => clearInterval(clock);
  }, []);

  return (<></>)
}