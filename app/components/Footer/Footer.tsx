"use client"

import { Button } from '@/components/ui/button'
import { GithubIcon, Smile } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='py-4 flex justify-center pb-8'>
        <p className='footer-text text-sm flex items-center gap-1'>
            Made by
            <Smile size={17} />
            <a
                href="https://github.com/1999-sahil"
                target='_blank'
                className='dark:text-green-300 ml-1 text-green-500 font-bold'
            >Sahil Ahmed</a>
        </p>
    </div>
  )
}

export default Footer