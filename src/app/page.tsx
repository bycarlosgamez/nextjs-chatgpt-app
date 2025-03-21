import Chat from '@/app/components/Chat';
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className='p-5'>
      <h1 className='text-4xl font-bold'>Welcome To GPT Chat</h1>
      {!session?.user?.name ? (
        <div>You need to log in to use this chat.</div>
      ) : (
        <>
          <Separator className='my-5' />
          <Chat />
        </>
      )}
    </main>
  );
}
