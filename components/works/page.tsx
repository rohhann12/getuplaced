// Import the video from your assets folder
// import video from '../../output.mp4'

export function Works() {
    return (
        <div className="flex flex-col items-center justify-center p-8 w-full">
            <div className="max-w-7xl w-full text-center mb-8">
                <h1 className="text-3xl font-bold mb-6">How this Works?</h1>
                
                {/* Video container with responsive sizing */}
                <div className="w-full aspect-video mb-8">
                    <video 
                        className="w-full h-full object-cover rounded-lg shadow-lg" 
                        controls
                        autoPlay
                        muted
                        loop
                    >
                        <source src={""} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    )
}