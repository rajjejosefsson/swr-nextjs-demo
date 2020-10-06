import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

const base_url = "https://api.spacexdata.com/v4";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR(`${base_url}/launches`, fetcher);

  if (!data && !error) {
    return "loading..";
  }

  return (
    <div>
      <Head>
        <title>Let's get to the moon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Launches</h1>
        <div className={styles.container}>
          {data.map((item) => (
            <div key={item.id} className={styles.flightCard}>
              <h2>{item.name}</h2>
              <img className={styles.patchImage} src={item.links.patch.small} />
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
