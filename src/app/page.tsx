import Image from "next/image";
import {Game} from '../components/game';
import StoreProvider from './StoreProvider'
import { getCards } from "./server";
export default async function Home() {
  const cards = await getCards();

  return (
    <StoreProvider cards={cards}>      
      <Game />
    </StoreProvider>
  );
}
