import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GameComponent from '../components/game_component'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <GameComponent />
  )
}

export default Home
