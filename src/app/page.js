import dynamic from 'next/dynamic';

const SignUpComponent = dynamic(() => import('../Components/SignUp'));
const SignInComponent = dynamic(() => import('../Components/SignIn'));
const Whyyyyyy = dynamic(() => import('../Components/AddImages'));

export default function Home() {
    return (
        <div className='home'>
            <Whyyyyyy />
        </div>
    );
}
