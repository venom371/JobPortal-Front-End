import dynamic from 'next/dynamic';

const SignUpComponent = dynamic(() => import('../../../Components/SignIn'));

export default function SignIn() {
    return (
        <div className='home'>
            <SignUpComponent />
        </div>
    )
}