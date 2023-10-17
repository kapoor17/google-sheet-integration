import React from "react";
import {google} from 'googleapis'
import Link from "next/link";

export async function getServerSideProps({}) {

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1',
  });

  const posts = response.data.values?.flat();
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
}

type Props = {
  posts: []
}

const Home: React.FC<Props> = ({posts}) => {
  return (
    <article>
      <h1>Posts</h1>
      <ul>
        {posts?.map((v, i) => (
          <li key={v}>
            <Link href={`posts/${i + 2}`}>
              <span>{v}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Home;