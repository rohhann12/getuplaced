import { Card } from './card'

export const data = [
    {
        id: 1,
        image: '../../aefa',
        name:"rohan",
        xusername: 'www.google.com',
    },
    {
        id: 2,
        image: '../../sefae',
        xusername: '../../',
    },
    {
        id: 3,
        image: '../../adadw',
        xusername: '../../adawd',
    },
]

export function Testimonial({ data }: { data: any[] }) {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-row'>
                {data.map((e) => (
                    <Card key={e.id} prop={e} />
                ))}
            </div>
        </div>
    )
}
