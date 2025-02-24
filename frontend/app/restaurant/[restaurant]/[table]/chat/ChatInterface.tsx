'use client'

import React, { useEffect, useState } from 'react'
import { FaArrowUp, FaKeyboard, FaX } from 'react-icons/fa6'
import { FaMicrophone } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUtensils, FaMapMarkerAlt, FaClock, FaQuestion } from 'react-icons/fa'

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionError) => void;
    start(): void;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly length: number;
    [index: number]: SpeechRecognitionAlternative;
  }


  interface SpeechRecognitionError extends Event {
    error: string;
  }
}

type Message = {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

type QuickTip = {
  icon: React.ReactNode
  text: string
}

const quickTips: QuickTip[] = [
  { icon: <FaUtensils />, text: "What's on the menu today?" },
  { icon: <FaMapMarkerAlt />, text: "What's your location?" },
  { icon: <FaClock />, text: "What are your opening hours?" },
  { icon: <FaQuestion />, text: "Do you offer vegetarian options?" },
]

export default function ChatInterface() {
  const [isRecording, setIsRecording] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
  ])

  const [input, setInput] = useState('')

  useEffect(() => {
    if (input.trim())
      setToggle(true)
  }, [input])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, newMessage])
    setInput('')
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.style.height = '2.5rem'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function record() {
    if (!isRecording) {
      setIsRecording(true)
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)()
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput(prev => prev + (prev.length > 0 ? ' ' : '') + transcript)
        setIsRecording(false)
      }

      recognition.onerror = () => {
        setIsRecording(false)
      }

      recognition.start()
    }
  }

  return (
    messages.length > 0 ? (
      <div className='flex flex-col w-full max-w-3xl pb-4 h-[calc(100vh-70px)]'>
        <div className='flex-1 overflow-y-auto p-4 space-y-6'>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: message.role === 'user' ? 20 : -20
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.pre
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[80%] py-3 px-6 font-sans font-medium ${message.role === 'user'
                    ? 'dark:bg-primary/10 bg-primary-dark/10 text-primary-dark rounded-l-3xl rounded-t-3xl rounded-br-md dark:text-primary ml-4'
                    : ''} ${message.role === 'assistant' ? 'prose dark:prose-invert prose-sm max-w-none' : ''}`}
                >
                  {message.role === 'assistant' ? (
                    <ReactMarkdown components={{
                      h1: ({ children }) => <span className="font-bold text-2xl">{children}</span>,
                      h2: ({ children }) => <span className="font-semibold text-xl">{children}</span>,
                      h3: ({ children }) => <span className="font-medium text-lg">{children}</span>,
                    }}>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </motion.pre>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className='p-4 mb-2'>
          <div className='flex gap-2 mb-4 flex-wrap'>

          </div>
          <motion.div
            initial={false}
            animate={{
              height: "auto",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`flex gap-4 dark:bg-white/5 bg-black/5 rounded-3xl p-3 ${isRecording ? 'border border-primary-dark' : ''}`}
          >
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                const textarea = e.target
                textarea.style.height = 'auto'
                textarea.style.height = `${Math.min(textarea.scrollHeight, 96)}px`
              }}
              onKeyDown={handleKeyDown}
              placeholder='How may i help you?'
              className='flex-1 focus:ring-transparent bg-transparent p-2 outline-none font-medium resize-none min-h-[2.5rem] overflow-y-auto focus:outline-none transition-[height] duration-200 ease-in-out'
              rows={1}
            />
            <motion.div className='flex justify-end items-end gap-2'>
              <motion.button
                onClick={() => record()}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                animate={isRecording ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1 } } : {}}
                className='p-2 px-3 w-fit h-fit dark:bg-primary/10 bg-primary-dark/10 text-primary-dark dark:text-primary rounded-full aspect-square'
              >
                <FaMicrophone />
              </motion.button>
              <motion.button
                onClick={handleSend}
                disabled={!input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='p-2 px-3 w-fit h-fit dark:bg-primary bg-primary-dark text-background dark:text-background-dark rounded-full aspect-square disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FaArrowUp />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    ) : (
      <div className='flex w-[calc(100vw-80px)] flex-col gap-6 md:gap-3 items-center justify-center max-w-3xl pb-4 h-[calc(100vh-70px)]'>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center justify-center md:justify-start gap-3 mb-2 w-full px-4">
          <h1 className='text-xl md:text-3xl font-semibold text-foreground md:text-left text-center dark:text-foreground-dark'>Are you hungry?</h1>
        </motion.div>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`${toggle ? "block" : "max-md:hidden"} mb-2 flex flex-col items-center justify-center gap-4 w-full`}>
          <motion.div
            layout
            initial={false}
            animate={{
              height: "auto",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`flex gap-4 w-full dark:bg-white/5 opacity-100 bg-black/5 rounded-3xl p-3 ${isRecording ? 'border border-primary-dark' : ''}`}
          >
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                const textarea = e.target
                textarea.style.height = 'auto'
                textarea.style.height = `${Math.min(textarea.scrollHeight, 96)}px`
              }}
              onKeyDown={handleKeyDown}
              placeholder="Let's order something."
              className='flex-1 focus:ring-transparent bg-transparent p-2 outline-none font-medium resize-none min-h-[6rem] overflow-y-auto focus:outline-none transition-[height] duration-200 ease-in-out'
              rows={1}
            />
            <motion.div className='flex justify-end items-end gap-2'>
              <motion.button
                onClick={() => record()}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                animate={isRecording ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1 } } : {}}
                className='p-2 px-3 w-fit h-fit dark:bg-primary/10 bg-primary-dark/10 text-primary-dark dark:text-primary rounded-full aspect-square'
              >
                <FaMicrophone />
              </motion.button>
              <motion.button
                onClick={handleSend}
                type='submit'
                disabled={!input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='p-2 px-3 w-fit h-fit dark:bg-primary bg-primary-dark text-background dark:text-background-dark rounded-full aspect-square disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FaArrowUp />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
        {!toggle && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='md:hidden flex flex-col gap-8 items-center justify-center'
          >
            <motion.button
              layout
              onClick={() => record()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isRecording ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1 } } : {}}
              className='p-5 px-8 w-fit h-fit dark:bg-primary/10 text-4xl bg-primary-dark/10 text-primary-dark dark:text-primary rounded-full aspect-square'
            >
              <FaMicrophone />
            </motion.button>
          </motion.div>
        )}
        <div className='relative w-full px-4'>
          <div className='flex gap-2 w-full overflow-x-auto pb-2' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {quickTips.map((tip, index) => (
              <motion.button
                key={index}
                onClick={() => setInput(tip.text)}
                whileHover={{ opacity: 0.9 }}
                initial={{ opacity: 0.7 }}
                whileTap={{ scale: 0.95 }}
                className='flex-shrink-0 flex hover:bg-foreground/5 dark:hover:bg-foreground-dark/5 items-center gap-2 px-4 py-2 rounded-full text-foreground dark:text-foreground-dark border border-foreground/50 dark:border-foreground-dark/50 text-sm font-medium'
              >
                {tip.icon}
                <span>{tip.text}</span>
              </motion.button>
            ))}
          </div>
          <div className='pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background dark:from-background-dark to-transparent' />
        </div>
        {toggle ? <motion.button
          onClick={() => setToggle(!toggle)}
          whileHover={{ opacity: 0.9 }}
          initial={{ opacity: 0.7 }}
          whileTap={{ scale: 0.95 }}
          className='md:hidden flex aspect-square w-fit h-fit text-md justify-center bg-red-500/5 items-center gap-2 px-3 py-1 rounded-full text-red-500 dark:text-red-500 border border-transparent font-medium'
        >
          <FaX className='text-red-500' />
        </motion.button> : <motion.button
          onClick={() => setToggle(!toggle)}
          whileHover={{ opacity: 0.9 }}
          initial={{ opacity: 0.7 }}
          whileTap={{ scale: 0.95 }}
          className='flex-shrink-0 md:hidden flex aspect-square text-xl bg-foreground/5 dark:bg-foreground-dark/5 items-center gap-2 px-3 py-1 rounded-full text-foreground dark:text-foreground-dark border border-foreground/50 dark:border-foreground-dark/50 font-medium'
        >
          <FaKeyboard />
        </motion.button>}
      </div>
    )

  )
}
