import dynamic from 'next/dynamic';

const SignInComponent = dynamic(() => import('./Components/SignIn'));

export default function Home() {
    let a = "hello mihir";
  return (
    <div className='home'>
        <SignInComponent/>
    </div>
  );
}
