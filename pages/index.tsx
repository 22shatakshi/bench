import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <main className={styles.main}>
      <h1 className={styles.mytitle}>BENCH</h1>
      <text className={styles.mydesc}>
        Bench is a social networking platform designed  <br />
        for sports enthusiasts to connect with each other. <br />
        We aim to find matches by taking various factors into account,<br />
        including sports type, user availability, and skill level.
      </text>
      </main>
    </div>
  )
}

export default Home