import dynamic from 'next/dynamic';

const Whyyyyyy = dynamic(() => import('../../../Components/AddImages'));

export default function AddImages() {
    return (
        <div className='home'>
            <Whyyyyyy />
        </div>
    )
}