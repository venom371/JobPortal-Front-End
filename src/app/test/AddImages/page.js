import dynamic from 'next/dynamic';

const Whyyyyyy = dynamic(() => import('../../../Components/SignUpAddImages'));

export default function AddImages() {
    return (
        <div className='home'>
            <Whyyyyyy />
        </div>
    )
}