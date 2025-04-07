"use client"
import Image from "next/image"
import TwitterIcon from '../../icons8-twitter.svg';


export function Card({ prop }: any) {
    return (
        <div className="w-full sm:w-1/3 p-4">
            <div className="bg-white shadow-md rounded-xl p-4 text-center">
                <div className="mb-4">
                    <Image
                        className="rounded-xl mx-auto"
                        src={prop.image}
                        alt="User image"
                        width={200}
                        height={200}
                        unoptimized
                    />
                </div>
                <h1 className="text-lg font-bold mb-2">{prop.name}</h1>
                <div className="flex justify-center items-center gap-2 text-blue-500">
                    {/* <TwitterIcon className="w-4 h-4 text-blue-500" />  */}
                </div>
            </div>
        </div>
    )
}
