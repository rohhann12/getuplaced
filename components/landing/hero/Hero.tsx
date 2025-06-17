import React from 'react'
import { BorderBeam } from "@/components/magicui/border-beam";

export default function Hero2() {
  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen w-full bg-black'>
        <div className='text-white '>
            <h1>Cold Emailing made <span className='text-green-400'>Easy</span></h1>
        </div>
        <div className=''>
              <BorderBeam />
              <iframe width="" height=""
                    src="https://www.youtube.com/embed/tZu5bALtHwk"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                >
                </iframe>
        </div>
    </div>
    </>
  )
}

// export default Hero