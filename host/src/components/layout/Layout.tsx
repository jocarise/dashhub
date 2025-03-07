import Head from 'next/head';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Dash Hub</title>
        <meta name='description' content='Multi business dashboard' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='is-flex'>
        <nav className='navbar_container is-flex is-flex-direction-column is-justify-content-space-between ml-5 mr-5 is-hidden-touch'>
          <div className='is-flex is-flex-direction-column'>
            <div>
              <figure className='image is-square mt-5 mb-1'>
                <img src='https://bulma.io/assets/brand/Bulma%20Icon.svg' />
              </figure>
              <span className='is-size-6 has-text-weight-medium'>Bulma</span>
            </div>
            <span className='mdi mdi-github mdi-36px'></span>
          </div>
          <div>
            <span className='mdi mdi-github mdi-48px'></span>
          </div>
        </nav>
        {children}
      </main>
    </>
  );
}
