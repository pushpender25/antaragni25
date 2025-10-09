'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
// --- NEW: Import ReactMarkdown to render MDX content ---
import ReactMarkdown from 'react-markdown';

// --- ICONS ---
const FlameIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 text-yellow-400 ${className}`} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 4 8.5 4 14.5C4 19.5 7.58172 22 12 22C16.4183 22 20 19.5 20 14.5C20 8.5 12 2 12 2Z" />
    </svg>
);

const CloseIcon = ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = ({ className = "" }: { className?: string }) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const AntLogo = ({ className = "" }: { className?: string }) => (
	<img
		src="/antaragni.jpeg"
		alt="Antaragni Logo"
        className={`w-full h-full rounded-full cursor-pointer text-yellow-400 ${className}`}
	/>
);


// --- TYPES ---
type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot' | 'system';
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const socket = useRef<WebSocket | null>(null);
    const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // --- UPDATE: WebSocket connection logic with robust retry and cleanup ---
    useEffect(() => {
        if (isOpen) {
            console.log("HI")
            let retryCount = 0;
            const maxRetries = 5;

            const connect = () => {
                // Prevent multiple connections
                if (socket.current && socket.current.readyState === WebSocket.OPEN) return;

                const ws = new WebSocket("wss://festival-chatbot-app.happydesert-716305a8.centralindia.azurecontainerapps.io/chat");
                socket.current = ws;
                console.log(socket.current)
                ws.onopen = () => {
                    retryCount = 0; // Reset retry count on successful connection
                    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
                    setMessages([{ id: Date.now(), text: "Connected to the Oracle... The flame awaits your query.", sender: 'system' }]);
                    console.log(messages)
                };

                ws.onmessage = (event) => {
                    setIsTyping(false);
                    setMessages(prev => [...prev, { id: Date.now(), text: event.data, sender: 'bot' }]);
                };

                ws.onclose = () => {
                    handleReconnect();
                };
                
                ws.onerror = () => {
                    handleReconnect();
                };
            };

            const handleReconnect = () => {
                // Don't retry if the socket was closed intentionally by the user closing the chat
                if (!socket.current) return; 

                if (retryCount < maxRetries) {
                    retryCount++;
                    const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 2s, 4s, 8s...
                    setMessages(prev => {
                        // Avoid spamming the chat with retry messages
                        if (prev[prev.length - 1]?.text.includes('Retrying')) return prev;
                        return [...prev, { id: Date.now(), text: `Connection lost. Retrying in ${delay / 1000}s...`, sender: 'system' }];
                    });
                    retryTimeoutRef.current = setTimeout(connect, delay);
                } else {
                    setMessages(prev => [...prev, { id: Date.now(), text: 'Failed to connect to the Oracle. Please try again by reopening the chat.', sender: 'system' }]);
                }
            };

            connect(); // Initial connection attempt

            return () => {
                // Cleanup: prevent retries and gracefully close the connection
                if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
                if (socket.current) {
                    socket.current.onclose = null; // Prevent onclose from triggering reconnect during cleanup
                    socket.current.onerror = null;
                    socket.current.close();
                    socket.current = null;
                }
            };
        }
    }, [isOpen]);


    // --- Animation Logic ---
    useEffect(() => {
        gsap.set(chatWindowRef.current, { 
            opacity: 0, scale: 0.9, y: 20, visibility: 'hidden', pointerEvents: 'none' 
        });
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.to(chatWindowRef.current, {
                opacity: 1, scale: 1, y: 0, visibility: 'visible', pointerEvents: 'auto',
                duration: 0.3, ease: 'power3.out'
            });
        } else {
            gsap.to(chatWindowRef.current, {
                opacity: 0, scale: 0.9, y: 20, duration: 0.3, ease: 'power3.in',
                onComplete: () => {
                    gsap.set(chatWindowRef.current, { 
                        visibility: 'hidden', pointerEvents: 'none' 
                    });
                }
            });
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleToggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = () => {
        if (inputValue.trim() === '' || !socket.current || socket.current.readyState !== WebSocket.OPEN) return;

        const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        
        socket.current.send(inputValue);

        setInputValue('');
        setIsTyping(true);
    };
    
    return (
        <>
            <button
                onClick={handleToggleChat}
                className="fixed bottom-6 right-6 z-[9990] w-16 h-16 bg-black/50 border border-yellow-400/30 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                aria-label="Open Chat"
            >
                <AntLogo className="drop-shadow-[0_0_8px_rgba(255,165,0,0.9)]" />
            </button>

            <div 
                ref={chatWindowRef}
                data-lenis-prevent
                className="fixed z-[9999] w-[95vw] max-w-sm h-[70vh] md:h-[60vh] bg-black/60 backdrop-blur-xl border border-yellow-400/20 rounded-2xl shadow-2xl flex flex-col bottom-24 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:-translate-x-0"
            >
                <header className="flex items-center justify-between p-4 border-b border-yellow-400/10 flex-shrink-0">
                    <h3 className="text-lg font-bold text-yellow-300">Kanreki's Oracle</h3>
                    <button onClick={handleToggleChat} className="text-gray-400 hover:text-white">
                        <CloseIcon />
                    </button>
                </header>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex w-full ${
                            msg.sender === 'user' ? 'justify-end' 
                            : msg.sender === 'bot' ? 'justify-start' 
                            : 'justify-center'
                        }`}>
                            <div className={`max-w-[80%] p-3 rounded-xl text-sm prose prose-sm prose-invert ${
                                msg.sender === 'user' ? 'bg-purple-600/30 text-white' 
                                : msg.sender === 'bot' ? 'bg-yellow-400/10 text-gray-200'
                                : 'text-gray-400 text-xs italic'
                            }`}>
                                <ReactMarkdown
                                  components={{
                                    a: ({node, ...props}) => <a className="text-yellow-300 underline hover:text-yellow-200" {...props} />,
                                    ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1" {...props} />,
                                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                                  }}
                                >
                                  {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] p-3 rounded-xl bg-yellow-400/10 text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <span className="h-2 w-2 bg-yellow-300 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-yellow-300 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-yellow-300 rounded-full animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-yellow-400/10 flex-shrink-0">
                    <div className="flex items-center bg-black/30 rounded-lg">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask the flame..."
                            className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
                            disabled={isTyping || !socket.current || socket.current.readyState !== WebSocket.OPEN}
                        />
                        <button onClick={handleSendMessage} disabled={isTyping || !socket.current || socket.current.readyState !== WebSocket.OPEN} className="p-3 text-yellow-300 disabled:text-gray-600 hover:text-yellow-200 transition-colors">
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

