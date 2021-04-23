// SPA -- dados carregados quando usuário acessa a aplicação (requisições são executadas no JS do browser)
// useEffect(() => {
//   fetch('http://localhost:3333/episodes')
//     .then(response => response.json())
//     .then(data => console.log(data))
// }, []);


// SSR  -- dados serão renderizados toda vez que a home for acessada
// export async function getServerSideProps(){
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data,
//     }
//   }

// SSG

import {GetServerSideProps, GetStaticProps} from 'next';
import { type } from 'node:os';
import { api } from '../services/api';

type Episode = {
  episodes: Array<{ 
    id: string;
    title: string;
    member: string;
    //...
  }>
}

type HomeProps = {
  episodes: Episode[]
}

export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>

  )
}


export const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get('episodes?', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}