'use client';

import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';

export default function RestaurantPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleScan = (decodedText: string) => {
    try {
        console.log(decodedText)
        const path = decodedText.replace("http://", "")
      const [,,restaurantId, tableId] = path.split('/');
      if (restaurantId && tableId) {
        router.push(`/restaurant/${restaurantId}/${tableId}/greet`);
      } else {
        setError('Invalid QR');
      }
    } catch {
      setError('Invalid QR');
    }
  };

//   const handleError = (err: Error) => {
//     setError('Error scanning QR code');
//     console.error(err);
//   };

  return (
    <main className='flex flex-col gap-4 items-center justify-center min-h-screen p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Scan Table QR Code</h1>
      <div className='w-full max-w-md'>
        <Scanner onScan={(result) => handleScan(result[0].rawValue)} />
      </div>
      {error && (
        <p className='bg-primary/20 text-primary font-semibold rounded-full px-4 py-2 mt-2'>{error}</p>
      )}
    </main>
  );
}
