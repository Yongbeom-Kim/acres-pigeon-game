import type { NextPage } from 'next'
import GameComponent from '../components/game/game_component/react_game_component'

export async function getStaticProps() {
  return {
    props: {}
  }
}

const Home: NextPage = () => {
  return (
    <GameComponent />
  )
}

export default Home
