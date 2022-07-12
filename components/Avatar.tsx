import { setDefaultResultOrder } from 'dns'
import { useSession } from 'next-auth/react'
import Image from 'next/image';

interface Props{
  seed:string
}
export default function Avatar({seed}:Props) {
  return (
    <div className='relative w-12 h-12 p-1 bg-gray-100 rounded-full'><Image layout='fill' objectFit='contain' src={`https://avatars.dicebear.com/api/avataaars/${seed || 'placeholder'}.svg`} alt=""/></div>
  )
}
