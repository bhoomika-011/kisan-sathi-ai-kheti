
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, AlertTriangle, CheckCircle, Leaf, Bug, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High";
  treatment: string;
  prevention: string;
  kannadaName: string;
}

const CropDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDiagnosisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image of your crop first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis progress
    const progressSteps = [20, 40, 60, 80, 100];
    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(step);
    }

    // Simulate diagnosis result
    const mockResults = [
      {
        disease: "Late Blight",
        confidence: 94,
        severity: "High" as const,
        treatment: "Apply Metalaxyl + Mancozeb fungicide spray immediately. Spray in evening hours. Repeat after 7 days.",
        prevention: "Ensure proper spacing between plants. Avoid overhead watering. Remove infected leaves.",
        kannadaName: "ತಡವಾದ ಬ್ಲೈಟ್"
      },
      {
        disease: "Aphid Infestation",
        confidence: 89,
        severity: "Medium" as const,
        treatment: "Use Neem oil spray (30ml per liter water). Apply insecticidal soap solution. Remove affected parts.",
        prevention: "Use yellow sticky traps. Encourage beneficial insects like ladybugs. Regular monitoring.",
        kannadaName: "ಚಿಪ್ಪು ಹುಳು"
      }
    ];

    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    setDiagnosisResult(result);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete",
      description: `${result.disease} detected with ${result.confidence}% confidence`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-white/70 backdrop-blur-sm hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-green-600" />
            Crop Disease Diagnosis
          </CardTitle>
          <CardDescription>
            Upload a clear photo of your affected plant leaves for instant AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center transition-colors hover:border-green-400 hover:bg-green-50/50">
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Uploaded crop"
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                />
                <div className="flex gap-2 justify-center">
                  <label htmlFor="image-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </label>
                  <Button
                    onClick={simulateAnalysis}
                    disabled={isAnalyzing}
                    className="agricultural-gradient text-white"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Crop"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="w-16 h-16 text-green-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-green-800">Upload Crop Image</p>
                  <p className="text-sm text-green-600">Take a clear photo of affected leaves</p>
                </div>
                <label htmlFor="image-upload">
                  <Button className="agricultural-gradient text-white cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                </label>
              </div>
            )}
          </div>
          
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="bg-white/70 backdrop-blur-sm animate-fade-in">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600 animate-pulse" />
                <span className="font-medium">Analyzing crop image...</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-sm text-gray-600">
                AI is examining the image for disease patterns and symptoms
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diagnosis Results */}
      {diagnosisResult && !isAnalyzing && (
        <div className="space-y-4 animate-slide-up">
          <Card className="bg-white/70 backdrop-blur-sm hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-red-600" />
                  Diagnosis Results
                </span>
                <Badge className={getSeverityColor(diagnosisResult.severity)}>
                  {diagnosisResult.severity} Severity
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">Disease Identified</h4>
                  <p className="text-lg">{diagnosisResult.disease}</p>
                  <p className="text-sm text-gray-600">Kannada: {diagnosisResult.kannadaName}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{diagnosisResult.confidence}% Confidence</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    Immediate Treatment
                  </h4>
                  <p className="text-sm bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    {diagnosisResult.treatment}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-purple-800">Prevention Tips</h4>
                <p className="text-sm bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
                  {diagnosisResult.prevention}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Analyze Another
                </Button>
                <Button variant="outline" size="sm">
                  Get Expert Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Photography Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Take photos in good natural light</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Focus on affected leaves clearly</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Include both healthy and affected parts</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropDiagnosis;
