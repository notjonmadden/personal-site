import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import gravatar from "gravatar";
import btoa from "btoa";

interface Props {
  avatarData: string;
}

const Section: React.FC<{ text: string; href: string }> = ({ href, text }) => (
  <Link href={href}>
    <a data-text={text}>
      <span>{text}</span>
      <style jsx>{`
        a {
          font-size: 2rem;
          letter-spacing: 0.1rem;

          display: flex;
          justify-content: center;
        }

        span {
          visibility: hidden;
        }

        a:hover > span {
          visibility: visible;
          opacity: 0;
          transform: scale(150%);
          transition: opacity 0.4s linear, transform 0.2s linear;
        }

        a::after {
          position: absolute;
          content: attr(data-text);
        }
      `}</style>
    </a>
  </Link>
);

const Home: NextPage<Props> = ({ avatarData }) => (
  <div id="page">
    <Head>
      <title>Jon Madden</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <img src={avatarData} />
      <h1>Hi, I'm Jon. I build apps.</h1>
      <ul>
        <li>
          <Section href="me" text="About Me" />
        </li>
        <li>
          <Section href="work" text="My Work" />
        </li>
        <li>
          <Section href="tech" text="Skills & Tech" />
        </li>
      </ul>
    </main>
    <Style />
  </div>
);

function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => (binary += String.fromCharCode(b)));

  return btoa(binary);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const avatarUrl = gravatar.url("notjonmadden@gmail.com", { s: 256 }, "https");
  const response = await fetch(avatarUrl, {});
  const blob = await response.arrayBuffer();
  const avatarData = "data:image/jpeg;base64," + arrayBufferToBase64(blob);

  return {
    props: { avatarData },
    unstable_revalidate: 1,
  };
};

export default Home;

const Style = () => (
  <style jsx>{`
    #page {
      padding: 0 10%;
    }

    main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    img {
      border-radius: 100%;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li:not(:last-child) {
      margin-bottom: 2rem;
    }
  `}</style>
);
