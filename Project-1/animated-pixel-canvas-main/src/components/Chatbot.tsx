
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, ChevronRight, User, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'bot';
  text: string;
}

interface ChatbotProps {
  className?: string;
}

const ChatbotMessage = ({ message }: { message: Message }) => {
  return (
    <div className={cn(
      "flex items-start mb-4",
      message.type === 'user' ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-3",
        message.type === 'user' 
          ? "bg-primary text-primary-foreground rounded-br-none" 
          : "bg-muted text-foreground rounded-bl-none"
      )}>
        <div className="flex items-start gap-2">
          {message.type === 'bot' && (
            <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0" />
          )}
          <p className="text-sm">{message.text}</p>
          {message.type === 'user' && (
            <User className="w-4 h-4 mt-1 flex-shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
};

const Chatbot = ({ className }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: "Hello! I'm Uday's virtual assistant. Ask me anything about Uday's experience, projects, or skills!"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses: Record<string, string> = {
    'hi': "Hello! What would you like to know about Uday?",
    'hello': "Hi there! How can I help you learn about Uday?",
    'who is uday': "Uday is a skilled software engineer and Electronics & Communication engineer with expertise in IoT and Embedded Systems.",
    'what are uday\'s skills': "Uday's key skills include IoT, Embedded Systems, Cybersecurity, STM32 programming, RPLIDAR, ROS2, and smart autonomous systems.",
    'experience': "Uday has experience in embedded systems development, IoT projects, and working with technologies like STM32, RPLIDAR, and ROS2.",
    'contact': "You can reach Uday via email at udaykumar102004@gmail.com or through LinkedIn.",
    'education': "Uday completed his B.Tech in Electronics and Communication Engineering from MVGR College of Engineering (2020-2024), Intermediate studies from Apex Junior College (2018-2020), and schooling from Fort City School.",
    'projects': "Uday has worked on several projects including embedded systems, IoT applications, and smart autonomous systems. Check out the Projects section for more details!",
    'email': "Uday's email is udaykumar102004@gmail.com",
    'github': "Check out Uday's GitHub at github.com/yourusername",
    'linkedin': "Connect with Uday on LinkedIn at linkedin.com/in/yourusername",
    'about': "Uday is a passionate electronics and communication engineer who loves building efficient, embedded systems with a focus on IoT and Cybersecurity.",
    'certificates': "Uday has certificates in various technical domains related to electronics, embedded systems, and IoT.",
    'school': "Uday attended Fort City School for his primary and secondary education from 2014 to 2018.",
    'college': "Uday studied at MVGR College of Engineering in Vizianagaram, Andhra Pradesh, pursuing B.Tech in Electronics and Communication Engineering from 2020 to 2024.",
    'technologies': "Uday works with technologies including STM32 microcontrollers, RPLIDAR, ROS2, IoT platforms, and various cybersecurity tools.",
    'interests': "Uday is interested in embedded systems, IoT, cybersecurity, and smart autonomous systems.",
    'location': "Please contact Uday directly for his current location information.",
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user' as const, text: message };
    setMessages(prev => [...prev, userMessage]);
    
    // Generate bot response
    setTimeout(() => {
      const lowerCaseMessage = message.toLowerCase();
      let botResponse = "I'm not sure about that. Would you like to know about Uday's projects, skills, or education?";
      
      // Check for keyword matches
      for (const [key, response] of Object.entries(botResponses)) {
        if (lowerCaseMessage.includes(key.toLowerCase())) {
          botResponse = response;
          break;
        }
      }
      
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 600);
    
    setMessage('');
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-[100]", className)}>
      {/* Chat button with pulse effect */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 relative"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
      </Button>
      
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-24 right-6 w-[350px] max-w-[90vw] bg-background border border-border rounded-lg shadow-xl",
            )}
          >
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-medium">Chat with Uday's Bot</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)} 
                className="h-6 w-6 p-0 hover:bg-primary-foreground/20" 
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-[350px] overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <ChatbotMessage key={index} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t border-border p-4 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Uday..."
                className="flex-1 bg-muted px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Message input"
              />
              <Button onClick={handleSend} size="sm" className="flex-shrink-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
