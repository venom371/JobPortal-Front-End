import dynamic from 'next/dynamic';


export default function AddImages() {
    let test = process.cwd()

    return (
        <div className='home'>
            {test}
        </div>
    )
}