
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, FileText, DollarSign, Calendar, MapPin, Users, Droplets, Tractor, Coins } from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  kannadaName: string;
  category: string;
  subsidy: string;
  eligibility: string[];
  deadline: string;
  department: string;
  description: string;
  applicationLink: string;
  documents: string[];
}

const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [schemes] = useState<Scheme[]>([
    {
      id: "1",
      name: "Pradhan Mantri Kisan Samman Nidhi",
      kannadaName: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
      category: "financial",
      subsidy: "₹6,000 per year",
      eligibility: ["Small & marginal farmers", "Land holding up to 2 hectares", "Valid Aadhaar card"],
      deadline: "Ongoing",
      department: "Ministry of Agriculture",
      description: "Direct income support to farmer families for procurement of inputs related to agriculture and allied activities.",
      applicationLink: "https://pmkisan.gov.in",
      documents: ["Aadhaar Card", "Land Records", "Bank Passbook"]
    },
    {
      id: "2",
      name: "Micro Irrigation Scheme",
      kannadaName: "ಸೂಕ್ಷ್ಮ ನೀರಾವರಿ ಯೋಜನೆ",
      category: "irrigation",
      subsidy: "Up to 55% subsidy",
      eligibility: ["All categories of farmers", "Minimum 0.2 hectare land", "Water source availability"],
      deadline: "March 31, 2024",
      department: "Dept. of Horticulture",
      description: "Subsidy for drip and sprinkler irrigation systems to improve water use efficiency.",
      applicationLink: "https://pmksy.gov.in",
      documents: ["Land Documents", "Water Source Certificate", "Bank Details"]
    },
    {
      id: "3",
      name: "Kisan Credit Card Scheme",
      kannadaName: "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಯೋಜನೆ",
      category: "credit",
      subsidy: "4% interest rate",
      eligibility: ["All farmers", "Valid land documents", "Clean credit history"],
      deadline: "Ongoing",
      department: "Banking Division",
      description: "Provide credit support for crop production, post-harvest expenses, and asset maintenance.",
      applicationLink: "https://pmkisan.gov.in/KCC.aspx",
      documents: ["Land Records", "Identity Proof", "Address Proof"]
    },
    {
      id: "4",
      name: "Custom Hiring Centers",
      kannadaName: "ಕಸ್ಟಮ್ ಹೈರಿಂಗ್ ಸೆಂಟರ್‌ಗಳು",
      category: "equipment",
      subsidy: "Up to 80% subsidy",
      eligibility: ["Farmer Producer Organizations", "Self Help Groups", "Cooperative Societies"],
      deadline: "December 15, 2024",
      department: "Dept. of Agriculture",
      description: "Establish custom hiring centers for agricultural machinery and equipment.",
      applicationLink: "https://agrimachinery.nic.in",
      documents: ["Registration Certificate", "Project Proposal", "Land Lease Agreement"]
    },
    {
      id: "5",
      name: "Soil Health Card Scheme",
      kannadaName: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ",
      category: "soil",
      subsidy: "Free soil testing",
      eligibility: ["All farmers", "Farm land ownership", "Active cultivation"],
      deadline: "Ongoing",
      department: "Dept. of Agriculture",
      description: "Free soil testing and nutrient recommendations for sustainable farming.",
      applicationLink: "https://soilhealth.dac.gov.in",
      documents: ["Land Records", "Farmer ID", "Contact Details"]
    }
  ]);

  const categories = [
    { value: "all", label: "All Schemes", icon: FileText },
    { value: "financial", label: "Financial Support", icon: DollarSign },
    { value: "irrigation", label: "Irrigation", icon: Droplets },
    { value: "equipment", label: "Equipment", icon: Tractor },
    { value: "credit", label: "Credit & Loans", icon: Coins },
    { value: "soil", label: "Soil Health", icon: MapPin }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.kannadaName.includes(searchTerm) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    const Icon = categoryData?.icon || FileText;
    return <Icon className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      financial: "bg-green-100 text-green-800 border-green-200",
      irrigation: "bg-blue-100 text-blue-800 border-blue-200",
      equipment: "bg-purple-100 text-purple-800 border-purple-200",
      credit: "bg-orange-100 text-orange-800 border-orange-200",
      soil: "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="bg-white/70 backdrop-blur-sm hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Government Agricultural Schemes
          </CardTitle>
          <CardDescription>
            Discover and apply for government subsidies and schemes available for farmers in Karnataka
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Schemes</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.length === 0 ? (
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No schemes found matching your criteria.</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filter options.</p>
            </CardContent>
          </Card>
        ) : (
          filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="bg-white/70 backdrop-blur-sm hover-lift animate-fade-in">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{scheme.name}</CardTitle>
                    <p className="text-sm text-gray-600">{scheme.kannadaName}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(scheme.category)}>
                        {getCategoryIcon(scheme.category)}
                        <span className="ml-1">{scheme.category}</span>
                      </Badge>
                      <Badge variant="outline" className="text-green-700 bg-green-50">
                        {scheme.subsidy}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{scheme.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      Eligibility Criteria
                    </h4>
                    <ul className="text-sm space-y-1">
                      {scheme.eligibility.map((criteria, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      Required Documents
                    </h4>
                    <ul className="text-sm space-y-1">
                      {scheme.documents.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {scheme.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{scheme.department}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="agricultural-gradient text-white"
                    onClick={() => window.open(scheme.applicationLink, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover-lift">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">₹50L+</p>
            <p className="text-sm text-green-600">Total Subsidies</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover-lift">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-800">1.2M+</p>
            <p className="text-sm text-blue-600">Beneficiaries</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover-lift">
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-800">150+</p>
            <p className="text-sm text-purple-600">Active Schemes</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover-lift">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-800">24/7</p>
            <p className="text-sm text-orange-600">Support</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
