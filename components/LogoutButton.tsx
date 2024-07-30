import { Button, Avatar } from "@nextui-org/react";
import { useSession, signOut } from 'next-auth/react';



const LogoutButton = ({ }) => {

    const { data, status } = useSession();

    return (
        <div className="flex items-center space-x-3">
            <Avatar
                src={data?.user?.image || "https://i.pravatar.cc/150?u=user"}
                alt="User"
                size="lg"
                className="rounded-full"
            />
            <Button
                variant='faded'
                onClick={() => signOut()}
                className="text-white"
            >
                Logout
            </Button>
        </div>
    );
};

export default LogoutButton;
