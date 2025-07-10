import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, MapPin, Calendar, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface MarketData {
  crop: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  market: string;
  unit: string;
  trend: "up" | "down" | "stable";
  kannadaName: string;
}

interface PriceHistory {
  date: string;
  price: number;
}

const MarketAnalysis = () => {
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [selectedMarket, setSelectedMarket] = useState("bangalore");
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const crops = [
    { value: "tomato", label: "Tomato (ಟೊಮೆಟೊ)", kannadaName: "ಟೊಮೆಟೊ" },
    { value: "onion", label: "Onion (ಈರುಳ್ಳಿ)", kannadaName: "ಈರುಳ್ಳಿ" },
    { value: "potato", label: "Potato (ಆಲೂಗಡ್ಡೆ)", kannadaName: "ಆಲೂಗಡ್ಡೆ" },
    { value: "cabbage", label: "Cabbage (ಎಲೆಕೋಸು)", kannadaName: "ಎಲೆಕೋಸು" },
    { value: "carrot", label: "Carrot (ಕ್ಯಾರೆಟ್)", kannadaName: "ಕ್ಯಾರೆಟ್" },
  ];

  const markets = [
    { value: "bangalore", label: "Bangalore Mandi", kannadaName: "ಬೆಂಗಳೂರು" },
    { value: "mysore", label: "Mysore Mandi", kannadaName: "ಮೈಸೂರು" },
    { value: "hubli", label: "Hubli Mandi", kannadaName: "ಹುಬ್ಳಿ" },
    { value: "belgaum", label: "Belgaum Mandi", kannadaName: "ಬೆಳಗಾವಿ" },
  ];

  const generateMockData = () => {
    const mockData: MarketData[] = [
      {
        crop: "Tomato",
        currentPrice: 45,
        previousPrice: 42,
        change: 7.1,
        market: "Bangalore",
        unit: "per kg",
        trend: "up",
        kannadaName: "ಟೊಮೆಟೊ"
      },
      {
        crop: "Onion",
        currentPrice: 28,
        previousPrice: 30,
        change: -6.7,
        market: "Bangalore",
        unit: "per kg",
        trend: "down",
        kannadaName: "ಈರುಳ್ಳಿ"
      },
      {
        crop: "Potato",
        currentPrice: 22,
        previousPrice: 22,
        change: 0,
        market: "Bangalore",
        unit: "per kg",
        trend: "stable",
        kannadaName: "ಆಲೂಗಡ್ಡೆ"
      },
    ];

    const mockHistory: PriceHistory[] = [
      { date: "Mon", price: 38 },
      { date: "Tue", price: 40 },
      { date: "Wed", price: 42 },
      { date: "Thu", price: 41 },
      { date: "Fri", price: 43 },
      { date: "Sat", price: 45 },
      { date: "Sun", price: 45 },
    ];

    setMarketData(mockData);
    setPriceHistory(mockHistory);
  };

  const fetchMarketData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    generateMockData();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMarketData();
  }, [selectedCrop, selectedMarket]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600 bg-green-50 border-green-200";
    if (change < 0) return "text-red-600 bg-red-50 border-red-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  return (
    <div className="space-y-6">
      {/* Market Selection */}
      <Card className="bg-white/70 backdrop-blur-sm hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Real-Time Market Analysis
          </CardTitle>
          <CardDescription>
            Get live market prices and trends for your crops across Karnataka mandis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Crop</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Market</label>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {markets.map((market) => (
                    <SelectItem key={market.value} value={market.value}>
                      {market.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button
                onClick={fetchMarketData}
                disabled={isLoading}
                className="w-full agricultural-gradient text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Updating...' : 'Refresh Prices'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Prices */}
      <div className="grid md:grid-cols-3 gap-4">
        {marketData.map((data, index) => (
          <Card key={index} className="bg-white/70 backdrop-blur-sm hover-lift animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{data.crop}</h3>
                  <p className="text-sm text-gray-600">{data.kannadaName}</p>
                </div>
                {getTrendIcon(data.trend)}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-800">₹{data.currentPrice}</span>
                  <span className="text-sm text-gray-600">{data.unit}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getTrendColor(data.change)}>
                    {data.change > 0 ? '+' : ''}{data.change}%
                  </Badge>
                  <span className="text-sm text-gray-600">vs yesterday</span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-3 h-3" />
                  {data.market} Mandi
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Chart */}
      <Card className="bg-white/70 backdrop-blur-sm hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            7-Day Price Trend
          </CardTitle>
          <CardDescription>Track price movements to make better selling decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Price']}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  dot={{ fill: '#16a34a', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Market Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">Best Selling Time</h4>
              <p className="text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
                Based on current trends, consider selling your tomatoes this week. 
                Prices are 7% higher than last week and demand is strong.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Nearby Markets</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between items-center bg-green-100 p-2 rounded">
                  <span>Mysore Mandi</span>
                  <span className="font-semibold text-green-700">₹47/kg</span>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                  <span>Hubli Mandi</span>
                  <span className="font-semibold text-green-600">₹44/kg</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Set Price Alert
            </Button>
            <Button variant="outline" size="sm">
              Market Contact Info
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalysis;
