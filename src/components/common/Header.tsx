'use client'

import Link from 'next/link'
import React, { useContext } from 'react'
import Spinner from './Spinner'
import { LoadingContext } from '@/context/LoadingContext'

interface HeaderProps {
  title?: string
}

export const Header: React.FC<HeaderProps> = ({ title = 'Podcaster' }) => {
  const { loading } = useContext(LoadingContext)
  return (
    <div className="flex flex-row items-center justify-between border-b-2 p-5">
      <Link href="/" className="no-underline text-teal-500 font-semibold">
        {title}
      </Link>

      {loading && <Spinner aria-live="polite" />}
    </div>
  )
}

export default Header
