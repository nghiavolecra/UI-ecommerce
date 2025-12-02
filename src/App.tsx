import { useState } from "react";
import { Home, Dumbbell, Package, Shield } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { MascotLogo } from "./components/MascotLogo";
import { DesktopHeader } from "./components/DesktopHeader";
import { DesktopCustomerHome } from "./components/DesktopCustomerHome";
import { DesktopPTProfile } from "./components/DesktopPTProfile";
import { BookingFlow } from "./components/BookingFlow";
import { DesktopMarketplace } from "./components/DesktopMarketplace";
import { DesktopProductDetail } from "./components/DesktopProductDetail";
import { DesktopCart } from "./components/DesktopCart";
import { DesktopOrders } from "./components/DesktopOrders";
import { DesktopAbout } from "./components/DesktopAbout";
import { DesktopUserProfile } from "./components/DesktopUserProfile";
import { DesktopQuickBooking } from "./components/DesktopQuickBooking";
import { DesktopPTDashboard } from "./components/DesktopPTDashboard";
import { AgentDashboard } from "./components/AgentDashboard";
import { DesktopAdminDashboard } from "./components/DesktopAdminDashboard";
import { DesktopLogin } from "./components/DesktopLogin";
import { DesktopMyPT } from "./components/DesktopMyPT";
import { DesktopUIKit } from "./components/DesktopUIKit";

type UserType = "customer" | "pt" | "agent" | "admin" | "ui-kit";
type Screen = "home" | "profile" | "booking" | "marketplace" | "product-detail" | "cart" | "orders" | "about" | "user-profile" | "my-pt" | "ui-kit";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showQuickBooking, setShowQuickBooking] = useState(false);
  const [cart, setCart] = useState<Record<number, number>>({});

  // Calculate cart count
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // Add to cart function
  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  // Handle login
  const handleLogin = (type: UserType) => {
    setIsLoggedIn(true);
    setUserType(type);
    setCurrentScreen("home");
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentScreen("home");
    setSelectedTrainerId(null);
    setSelectedProductId(null);
    setShowQuickBooking(false);
    setCart({});
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <DesktopLogin onLogin={handleLogin} />;
  }

  // Customer flow
  if (userType === "customer") {
    const headerProps = {
      userType: "Customer",
      onSwitchUser: () => setUserType(null),
      onNavigateHome: () => setCurrentScreen("home"),
      onNavigateMarketplace: () => setCurrentScreen("marketplace"),
      onNavigateCart: () => setCurrentScreen("cart"),
      onNavigateOrders: () => setCurrentScreen("orders"),
      onNavigateAbout: () => setCurrentScreen("about"),
      onNavigateProfile: () => setCurrentScreen("user-profile"),
      onBookSession: () => setShowQuickBooking(true),
      onNavigateMyPT: () => setCurrentScreen("my-pt"),
      onLogout: handleLogout,
      userName: "John Anderson",
      userEmail: "customer@fitconnect.com",
    };

    if (currentScreen === "my-pt") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopMyPT
            onBack={() => setCurrentScreen("home")}
            onTrainerSelect={(id) => {
              setSelectedTrainerId(id);
              setCurrentScreen("profile");
            }}
            onBookSession={(id) => {
              setSelectedTrainerId(id);
              setCurrentScreen("booking");
            }}
          />
        </div>
      );
    }

    if (currentScreen === "booking") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <BookingFlow
            onBack={() => {
              setCurrentScreen("profile");
            }}
          />
        </div>
      );
    }

    if (currentScreen === "profile" && selectedTrainerId) {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopPTProfile
            onBack={() => {
              setCurrentScreen("home");
              setSelectedTrainerId(null);
            }}
            onBooking={() => setCurrentScreen("booking")}
          />
        </div>
      );
    }

    if (currentScreen === "marketplace") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopMarketplace 
            onBack={() => setCurrentScreen("home")}
            onProductClick={(productId) => {
              setSelectedProductId(productId);
              setCurrentScreen("product-detail");
            }}
            cart={cart}
            onAddToCart={addToCart}
          />
        </div>
      );
    }

    if (currentScreen === "product-detail" && selectedProductId) {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopProductDetail
            productId={selectedProductId}
            onBack={() => setCurrentScreen("marketplace")}
            onAddToCart={() => addToCart(Number(selectedProductId))}
          />
        </div>
      );
    }

    if (currentScreen === "cart") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopCart
            onBack={() => setCurrentScreen("marketplace")}
            onCheckout={() => {
              // Handle checkout
              alert("Checkout functionality coming soon!");
            }}
          />
        </div>
      );
    }

    if (currentScreen === "orders") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopOrders onBack={() => setCurrentScreen("home")} />
        </div>
      );
    }

    if (currentScreen === "about") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopAbout onBack={() => setCurrentScreen("home")} />
        </div>
      );
    }

    if (currentScreen === "user-profile") {
      return (
        <div>
          <DesktopHeader {...headerProps} cartCount={cartCount} />
          <DesktopUserProfile 
            onBack={() => setCurrentScreen("home")} 
            userType="Customer"
            onLogout={handleLogout}
          />
        </div>
      );
    }

    return (
      <div>
        <DesktopHeader {...headerProps} cartCount={cartCount} />
        <DesktopCustomerHome
          onTrainerSelect={(id) => {
            setSelectedTrainerId(id);
            setCurrentScreen("profile");
          }}
          onMarketplaceClick={() => setCurrentScreen("marketplace")}
        />
        <DesktopQuickBooking
          isOpen={showQuickBooking}
          onClose={() => setShowQuickBooking(false)}
          onSelectTrainer={(id) => {
            setSelectedTrainerId(id);
            setCurrentScreen("profile");
          }}
        />
      </div>
    );
  }

  // PT Dashboard
  if (userType === "pt") {
    return (
      <div>
        <DesktopHeader 
          userType="PT" 
          onSwitchUser={() => setUserType(null)}
          onLogout={handleLogout}
          userName="Marcus Steel"
          userEmail="trainer@fitconnect.com"
        />
        <DesktopPTDashboard />
      </div>
    );
  }

  // Agent Dashboard
  if (userType === "agent") {
    return (
      <div>
        <DesktopHeader 
          userType="Agent" 
          onSwitchUser={() => setUserType(null)}
          onLogout={handleLogout}
          userName="Sarah Chen"
          userEmail="agent@fitconnect.com"
        />
        <AgentDashboard />
      </div>
    );
  }

  // Admin Dashboard
  if (userType === "admin") {
    return (
      <div>
        <DesktopHeader 
          userType="Admin" 
          onSwitchUser={() => setUserType(null)}
          onLogout={handleLogout}
          userName="Alex Morgan"
          userEmail="admin@fitconnect.com"
        />
        <DesktopAdminDashboard />
      </div>
    );
  }

  // UI Kit
  if (userType === "ui-kit") {
    return (
      <DesktopUIKit onBack={() => {
        setIsLoggedIn(false);
        setUserType(null);
      }} />
    );
  }

  return null;
}