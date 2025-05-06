// https://youtu.be/
import React from 'react'

function page() {
  return (

        <div className="rounded-2xl p-6 flex items-center justify-center">
          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/tZu5bALtHwk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          >
        </iframe>
        </div>
  )
}

export default page