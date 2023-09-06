/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import Image from 'next/image';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const imageData = await fetch(
    new URL('/public/og.png', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img alt="librelinks og" src={imageData} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
