import { FC } from 'react';
import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { AcmeLogo } from './ui/AcmeLogo';

const Login: FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <AcmeLogo />
            <Button
                onClick={() => signIn('google')}
                color="primary"
                variant='solid'
            >
                Sign In
            </Button>
        </div>
    );
};

export default Login;
