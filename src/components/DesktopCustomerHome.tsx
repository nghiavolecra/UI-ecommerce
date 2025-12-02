import { useMemo, useState } from "react";
import { MapPin, Star, Filter, ChevronRight, Dumbbell, TrendingUp, Briefcase, Building2, Compass } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type ListingType = "pt" | "business";

const trainers = [
  {
    id: 1,
    name: "Marcus Steel",
    specialty: "Strength Training",
    location: "New York, NY",
    rating: 4.9,
    reviews: 234,
    price: 80,
    image: "https://images.unsplash.com/photo-1643142313816-0d9c86c49f91?w=400",
    verified: true,
    type: "pt" as ListingType,
    serviceType: "1:1 Coaching",
    popularity: 98,
    createdAt: "2024-07-01",
  },
  {
    id: 2,
    name: "Sarah Power",
    specialty: "CrossFit",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 187,
    price: 75,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    verified: true,
    type: "pt" as ListingType,
    serviceType: "CrossFit", 
    popularity: 91,
    createdAt: "2024-06-15",
  },
  {
    id: 3,
    name: "Jake Thunder",
    specialty: "HIIT & Cardio",
    location: "Chicago, IL",
    rating: 4.7,
    reviews: 156,
    price: 65,
    image: "https://images.unsplash.com/photo-1567598508481-65985588e295?w=400",
    verified: true,
    type: "pt" as ListingType,
    serviceType: "Cardio",
    popularity: 86,
    createdAt: "2024-05-20",
  },
  {
    id: 4,
    name: "Nina Flex",
    specialty: "Yoga & Mobility",
    location: "Miami, FL",
    rating: 4.9,
    reviews: 298,
    price: 70,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    verified: true,
    type: "pt" as ListingType,
    serviceType: "Yoga",
    popularity: 94,
    createdAt: "2024-07-12",
  },
  {
    id: 5,
    name: "Alex Storm",
    specialty: "Boxing",
    location: "Boston, MA",
    rating: 4.8,
    reviews: 142,
    price: 85,
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400",
    verified: true,
    type: "pt" as ListingType,
    serviceType: "Boxing",
    popularity: 88,
    createdAt: "2024-07-22",
  },
  {
    id: 6,
    name: "Lisa Champion",
    specialty: "Nutrition",
    location: "Seattle, WA",
    rating: 4.9,
    reviews: 201,
    price: 90,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400",
    verified: true,
    type: "pt" as ListingType,
    serviceType: "Nutrition",
    popularity: 89,
    createdAt: "2024-08-01",
  }
];

const businesses = [
  {
    id: 101,
    name: "FitGear Agents",
    specialty: "Equipment & Apparel",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 320,
    price: 45,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
    verified: true,
    type: "business" as ListingType,
    serviceType: "Retail",
    popularity: 95,
    createdAt: "2024-07-18",
  },
  {
    id: 102,
    name: "ProFuel Labs",
    specialty: "Supplements",
    location: "Chicago, IL",
    rating: 4.7,
    reviews: 214,
    price: 35,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400",
    verified: true,
    type: "business" as ListingType,
    serviceType: "Supplements",
    popularity: 90,
    createdAt: "2024-06-28",
  },
  {
    id: 103,
    name: "UrbanMotion Studios",
    specialty: "Classes & Events",
    location: "New York, NY",
    rating: 4.9,
    reviews: 402,
    price: 60,
    image: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400",
    verified: true,
    type: "business" as ListingType,
    serviceType: "Group Training",
    popularity: 97,
    createdAt: "2024-08-05",
  }
];

const categories = ["All", "Strength", "CrossFit", "HIIT", "Yoga", "Boxing", "Nutrition", "Equipment", "Supplements", "Retail"];

const featuredProducts = [
  {
    id: 1,
    name: "Premium Whey Protein",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1709976142774-ce1ef41a8378?w=300",
    rating: 4.8
  },
  {
    id: 2,
    name: "Adjustable Dumbbells",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1652492041264-efba848755d6?w=300",
    rating: 4.9
  },
  {
    id: 3,
    name: "Performance Tank Top",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1558151507-c1aa3d917dbb?w=300",
    rating: 4.7
  }
];

interface DesktopCustomerHomeProps {
  onTrainerSelect: (trainerId: number) => void;
  onMarketplaceClick: () => void;
}

export function DesktopCustomerHome({ onTrainerSelect, onMarketplaceClick }: DesktopCustomerHomeProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewTab, setViewTab] = useState<"all" | "trainers" | "businesses">("all");
  const [sortBy, setSortBy] = useState("rating");
  const [filters, setFilters] = useState({
    location: "all",
    price: "all",
    rating: "all",
    serviceType: "all",
  });

  const combinedListings = useMemo(() => {
    const allListings = [...trainers, ...businesses];

    const filtered = allListings.filter((listing) => {
      if (viewTab === "trainers" && listing.type !== "pt") return false;
      if (viewTab === "businesses" && listing.type !== "business") return false;

      const matchesCategory = selectedCategory === "All" || listing.specialty.includes(selectedCategory) || listing.serviceType?.includes(selectedCategory);
      const matchesLocation = filters.location === "all" || listing.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesRating = filters.rating === "all" || listing.rating >= Number(filters.rating);
      const matchesService = filters.serviceType === "all" || listing.serviceType === filters.serviceType;
      const matchesPrice = filters.price === "all" || (filters.price === "under50" ? listing.price <= 50 : listing.price > 50);

      return matchesCategory && matchesLocation && matchesRating && matchesService && matchesPrice;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popularity":
          return b.popularity - a.popularity;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
  }, [filters.location, filters.price, filters.rating, filters.serviceType, selectedCategory, sortBy, viewTab]);

  const handleListingClick = (listingType: ListingType, listingId: number) => {
    if (listingType === "pt") {
      onTrainerSelect(listingId);
    } else {
      onMarketplaceClick();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-foreground mb-4 text-5xl">
                Transform Your <span className="text-primary">Fitness Journey</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Connect with elite personal trainers and access premium gym equipment. Start your transformation today.
              </p>
              <div className="flex gap-4">
                <Button className="bg-primary text-white h-12 px-8" onClick={() => setViewTab("trainers")}>
                  <Dumbbell className="w-5 h-5 mr-2" />
                  Find a Trainer
                </Button>
                <Button variant="outline" className="h-12 px-8 border-border" onClick={() => setViewTab("businesses")}>
                  Shop Products
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-primary text-3xl">450+</div>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Active Trainers</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-primary text-3xl">12K+</div>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Happy Clients</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-primary text-3xl">4.9</div>
                    <Star className="w-5 h-5 fill-primary text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">Average Rating</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1643142313816-0d9c86c49f91?w=600"
                alt="Fitness trainer"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters and Categories */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant={viewTab === "all" ? "default" : "outline"}
                className="rounded-full border-border"
                onClick={() => setViewTab("all")}
              >
                <Compass className="w-4 h-4 mr-2" />
                All Listings
              </Button>
              <Button
                variant={viewTab === "trainers" ? "default" : "outline"}
                className="rounded-full border-border"
                onClick={() => setViewTab("trainers")}
              >
                <Dumbbell className="w-4 h-4 mr-2" />
                Personal Trainers
              </Button>
              <Button
                variant={viewTab === "businesses" ? "default" : "outline"}
                className="rounded-full border-border"
                onClick={() => setViewTab("businesses")}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Businesses
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="newest">Newest Services</SelectItem>
                  <SelectItem value="type">PT vs Business</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="border-border">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`w-full ${selectedCategory === category ? "bg-primary text-white" : "border-border"}`}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.serviceType} onValueChange={(value) => setFilters(prev => ({ ...prev, serviceType: value }))}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="1:1 Coaching">1:1 Coaching</SelectItem>
                <SelectItem value="CrossFit">CrossFit</SelectItem>
                <SelectItem value="Cardio">Cardio</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Boxing">Boxing</SelectItem>
                <SelectItem value="Nutrition">Nutrition</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Supplements">Supplements</SelectItem>
                <SelectItem value="Group Training">Group Training</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.price} onValueChange={(value) => setFilters(prev => ({ ...prev, price: value }))}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under50">Under $50</SelectItem>
                <SelectItem value="over50">Over $50</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.rating} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5 & up</SelectItem>
                <SelectItem value="4.8">4.8 & up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {combinedListings.map((listing) => (
            <Card
              key={`${listing.type}-${listing.id}`}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-border bg-card group"
              onClick={() => handleListingClick(listing.type, listing.id)}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {listing.verified && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-foreground">{listing.name}</h3>
                  <Badge variant="outline" className="border-border">
                    {listing.type === "pt" ? "PT" : "Business"}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{listing.specialty}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-foreground text-sm">{listing.rating}</span>
                    <span className="text-muted-foreground text-sm">({listing.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{listing.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Briefcase className="w-4 h-4" />
                      <span>{listing.serviceType}</span>
                    </div>
                    <div>
                      <span className="text-primary text-lg">${listing.price}</span>
                      <span className="text-muted-foreground text-sm">/service</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleListingClick(listing.type, listing.id);
                    }}
                  >
                    {listing.type === "pt" ? "Book Now" : "View Catalog"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Featured Products */}
        <div className="border-t border-border pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-foreground">Featured Products</h2>
            <Button variant="ghost" onClick={onMarketplaceClick} className="text-primary">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-border bg-card group"
                onClick={onMarketplaceClick}
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-foreground mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-foreground text-sm">{product.rating}</span>
                    </div>
                    <span className="text-primary">${product.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
