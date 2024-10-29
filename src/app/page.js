import dynamic from 'next/dynamic';

import SignInComponent from "../Components/SignIn";

export default function Home() {
    return (
        <div className='home'>
            <SignInComponent />
        </div>
    );
}
