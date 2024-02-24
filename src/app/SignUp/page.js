import dynamic from 'next/dynamic';

const SignUpComponent = dynamic(() => import('../Components/SignUp'));

export default function SignUp() {
    return (
        <div className='home'>
            <SignUpComponent />
        </div>
    )
}