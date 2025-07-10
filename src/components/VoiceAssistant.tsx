
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, User, Bot, Languages, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  language: "en" | "kn";
}

interface VoiceAssistantProps {
  isListening: boolean;
  onToggleListening: () => void;
}

const VoiceAssistant = ({ isListening, onToggleListening }: VoiceAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "ನಮಸ್ಕಾರ! I'm your AI farming assistant. You can ask me about crop diseases, market prices, or government schemes in Kannada or English.",
      timestamp: new Date(),
      language: "en"
    }
  ]);
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "kn">("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const sampleQueries = [
    {
      english: "What is the current price of tomatoes?",
      kannada: "ಟೊಮೆಟೊ ಬೆಲೆ ಎಷ್ಟು?",
      category: "market"
    },
    {
      english: "My crop has yellow spots on leaves",
      kannada: "ನನ್ನ ಬೆಳೆಯ ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ಚುಕ್ಕೆಗಳಿವೆ",
      category: "diagnosis"
    },
    {
      english: "Tell me about drip irrigation subsidy",
      kannada: "ಡ್ರಿಪ್ ಇರಿಗೇಷನ್ ಸಬ್ಸಿಡಿ ಬಗ್ಗೆ ಹೇಳಿ",
      category: "schemes"
    }
  ];

  const simulateVoiceResponse = (query: string) => {
    const responses = {
      market: {
        en: "Based on current market data, tomato prices in Bangalore mandi are ₹45 per kg, up 7% from yesterday. This is a good time to sell as demand is high.",
        kn: "ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯ ಪ್ರಕಾರ, ಬೆಂಗಳೂರು ಮಂಡಿಯಲ್ಲಿ ಟೊಮೆಟೊ ಬೆಲೆ ಕಿಲೋಗೆ ₹45. ಇದು ಮಾರಾಟಕ್ಕೆ ಉತ್ತಮ ಸಮಯ."
      },
      diagnosis: {
        en: "Yellow spots on leaves could indicate early blight or bacterial spot. Please take a clear photo and upload it for accurate diagnosis and treatment recommendations.",
        kn: "ಎಲೆಗಳ ಮೇಲಿನ ಹಳದಿ ಚುಕ್ಕೆಗಳು ಅರ್ಲಿ ಬ್ಲೈಟ್ ಅಥವಾ ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಸ್ಪಾಟ್ ಅನ್ನು ಸೂಚಿಸಬಹುದು. ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆದು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
      },
      schemes: {
        en: "The Micro Irrigation Scheme offers up to 55% subsidy for drip irrigation systems. You need land documents and water source certificate to apply.",
        kn: "ಮೈಕ್ರೋ ಇರಿಗೇಷನ್ ಯೋಜನೆ ಡ್ರಿಪ್ ಇರಿಗೇಷನ್ ವ್ಯವಸ್ಥೆಗೆ 55% ವರೆಗೆ ಸಬ್ಸಿಡಿ ನೀಡುತ್ತದೆ. ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಭೂಮಿ ದಾಖಲೆಗಳು ಮತ್ತು ನೀರಿನ ಮೂಲ ಪ್ರಮಾಣಪತ್ರ ಅಗತ್ಯ."
      }
    };

    let responseType: keyof typeof responses = "market";
    if (query.toLowerCase().includes("price") || query.includes("ಬೆಲೆ")) {
      responseType = "market";
    } else if (query.toLowerCase().includes("spot") || query.toLowerCase().includes("disease") || query.includes("ಚುಕ್ಕೆ")) {
      responseType = "diagnosis";
    } else if (query.toLowerCase().includes("subsidy") || query.toLowerCase().includes("scheme") || query.includes("ಸಬ್ಸಿಡಿ")) {
      responseType = "schemes";
    }

    return responses[responseType][currentLanguage];
  };

  const handleSampleQuery = (query: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: query,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate processing time
    setTimeout(() => {
      const response = simulateVoiceResponse(query);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
        language: currentLanguage
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    toast({
      title: "Voice Query Processed",
      description: "AI is analyzing your question...",
    });
  };

  const handlePlayAudio = (text: string) => {
    setIsPlaying(true);
    // Simulate text-to-speech
    setTimeout(() => {
      setIsPlaying(false);
      toast({
        title: "Audio Playback",
        description: "Response played in your selected language",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Voice Controls */}
      <Card className="bg-white/70 backdrop-blur-sm hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-green-600" />
            Voice Assistant
          </CardTitle>
          <CardDescription>
            Speak your farming questions in Kannada or English for instant AI-powered answers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onToggleListening}
                size="lg"
                variant={isListening ? "destructive" : "default"}
                className={`${!isListening ? 'agricultural-gradient text-white' : ''} transition-all duration-200`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Speaking
                  </>
                )}
              </Button>
              
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-gray-600" />
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value as "en" | "kn")}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="en">English</option>
                  <option value="kn">ಕನ್ನಡ</option>
                </select>
              </div>
            </div>
            
            {isListening && (
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-4 bg-red-500 rounded animate-pulse"></div>
                  <div className="w-2 h-6 bg-red-500 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-3 bg-red-500 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-red-600 font-medium">Listening...</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sample Queries */}
      <Card className="bg-white/70 backdrop-blur-sm hover-lift">
        <CardHeader>
          <CardTitle className="text-lg">Try These Voice Commands</CardTitle>
          <CardDescription>Click to test or say these phrases aloud</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleQueries.map((query, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {currentLanguage === "en" ? query.english : query.kannada}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {query.category}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSampleQuery(currentLanguage === "en" ? query.english : query.kannada)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Try
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversation History */}
      <Card className="bg-white/70 backdrop-blur-sm hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Conversation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80 w-full">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user" 
                        ? "bg-green-100" 
                        : "bg-blue-100"
                    }`}>
                      {message.type === "user" ? (
                        <User className="w-4 h-4 text-green-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    
                    <div className={`space-y-2 ${message.type === "user" ? "text-right" : ""}`}>
                      <div className={`p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-green-100 text-green-900"
                          : "bg-blue-50 text-blue-900"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        {message.type === "assistant" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-2 h-6 px-2"
                            onClick={() => handlePlayAudio(message.content)}
                            disabled={isPlaying}
                          >
                            {isPlaying ? (
                              <VolumeX className="w-3 h-3" />
                            ) : (
                              <Volume2 className="w-3 h-3" />
                            )}
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Voice Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover-lift">
          <CardContent className="p-6 text-center">
            <Mic className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-800 mb-2">Voice Input</h3>
            <p className="text-sm text-green-600">Speak naturally in Kannada or English</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover-lift">
          <CardContent className="p-6 text-center">
            <Languages className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-800 mb-2">Multi-Language</h3>
            <p className="text-sm text-blue-600">Seamless translation between languages</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover-lift">
          <CardContent className="p-6 text-center">
            <Volume2 className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-purple-800 mb-2">Audio Response</h3>
            <p className="text-sm text-purple-600">Clear voice answers in your language</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceAssistant;
