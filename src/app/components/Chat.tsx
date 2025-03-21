'use client';

import { useState } from 'react';

import { getCompletion } from '@/app/server-actions/getCompletion';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(' ');

  const onClick = async () => {
    const completions = await getCompletion([
      ...messages,
      {
        role: 'user',
        content: input,
      },
    ]);
    setInput('');
    setMessages(completions.messages);
  };

  return (
    <div className='flex flex-col'>
      {messages.map((message, i) => (
        <div
          key={i}
          className={`mb-5 flex flex-col ${
            message.role === 'user' ? 'items-end' : 'items-start'
          }`}
        >
          <div
            className={`${
              message.role === 'user'
                ? 'mr-2 bg-blue-400 rounded-bl-2xl rounded-tl-2xl rounded-tr-xl'
                : 'ml-2 bg-gray-400 rounded-br-2xl rounded-tr-2xl rounded-tl-xl'
            } py-3 px-4 text-gray-800`}
          >
            {message.content}
          </div>
        </div>
      ))}

      <div className='flex border-t-2 border-t-gray-500 pt-3 mt-3'>
        <Input
          className='flex-grow text-xl'
          placeholder='Question'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onClick();
            }
          }}
        />
        <Button onClick={onClick} className='ml-3 text-base'>
          Send
        </Button>
      </div>
    </div>
  );
}
