
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, TrendingUp, FileText, Mic, MicOff, Upload, Leaf, DollarSign, Building2, Globe } from "lucide-react";
import CropDiagnosis from "@/components/CropDiagnosis";
import MarketAnalysis from "@/components/MarketAnalysis";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import VoiceAssistant from "@/components/VoiceAssistant";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("diagnosis");
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Assistant Activated",
        description: "You can now speak your query in Kannada or English",
      });
    } else {
      toast({
        title: "Voice Assistant Deactivated",
        description: "Voice recording stopped",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">Project Kisan</h1>
                <p className="text-sm text-green-600">Your AI Agricultural Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <Globe className="w-3 h-3 mr-1" />
                Kannada | English
              </Badge>
              <Button
                onClick={handleVoiceToggle}
                variant={isListening ? "destructive" : "default"}
                size="sm"
                className="agricultural-gradient text-white hover:opacity-90"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            ನಮಸ್ಕಾರ! Welcome to Your Digital Farming Assistant
          </h2>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Get instant crop diagnosis, real-time market prices, and government scheme information - all in your language.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift animate-scale-in bg-white/70 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">98%</p>
              <p className="text-sm text-green-600">Diagnosis Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift animate-scale-in bg-white/70 backdrop-blur-sm" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-800">₹45/kg</p>
              <p className="text-sm text-blue-600">Tomato Price</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift animate-scale-in bg-white/70 backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4 text-center">
              <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-800">150+</p>
              <p className="text-sm text-purple-600">Govt Schemes</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift animate-scale-in bg-white/70 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-800">₹5L+</p>
              <p className="text-sm text-orange-600">Subsidy Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="diagnosis" className="flex flex-col gap-1 py-3">
              <Camera className="w-5 h-5" />
              <span className="text-xs">Diagnosis</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex flex-col gap-1 py-3">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Market</span>
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex flex-col gap-1 py-3">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Schemes</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex flex-col gap-1 py-3">
              <Mic className="w-5 h-5" />
              <span className="text-xs">Voice</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diagnosis" className="animate-slide-up">
            <CropDiagnosis />
          </TabsContent>

          <TabsContent value="market" className="animate-slide-up">
            <MarketAnalysis />
          </TabsContent>

          <TabsContent value="schemes" className="animate-slide-up">
            <GovernmentSchemes />
          </TabsContent>

          <TabsContent value="voice" className="animate-slide-up">
            <VoiceAssistant isListening={isListening} onToggleListening={handleVoiceToggle} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
