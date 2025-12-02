import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, CreditCard, Package, Shield } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface UserDropdownMenuProps {
  userType: string;
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
  onNavigateProfile?: () => void;
  onNavigateOrders?: () => void;
}

export function UserDropdownMenu({ 
  userType, 
  userName = "John Anderson",
  userEmail = "customer@fitconnect.com",
  onLogout,
  onNavigateProfile,
  onNavigateOrders
}: UserDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing ESC
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [isOpen]);

  const getUserTypeColor = () => {
    switch (userType) {
      case "Customer":
        return "bg-blue-500";
      case "PT":
      case "Trainer":
        return "bg-primary";
      case "Agent":
        return "bg-green-500";
      case "Admin":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUserTypeIcon = () => {
    switch (userType) {
      case "PT":
      case "Trainer":
        return "💪";
      case "Agent":
        return "📦";
      case "Admin":
        return "🛡️";
      default:
        return "👤";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative transition-colors ${isOpen ? 'bg-muted' : ''}`}
      >
        <div className={`w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border-2 ${isOpen ? 'border-primary' : 'border-transparent'} transition-colors`}>
          <User className="w-5 h-5 text-primary" />
        </div>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-80 shadow-xl border-border bg-card rounded-[20px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${getUserTypeColor()} rounded-full flex items-center justify-center text-white text-xl`}>
                {getUserTypeIcon()}
              </div>
              <div className="flex-1">
                <h3 className="text-foreground" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>{userName}</h3>
                <p className="text-muted-foreground text-sm">{userEmail}</p>
              </div>
            </div>
            <div className="mt-3">
              <Badge className={`${getUserTypeColor()} text-white border-0`} style={{ fontFamily: 'Poppins' }}>
                {userType} Account
              </Badge>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {/* Profile */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 rounded-[16px] hover:bg-muted hover:text-primary transition-all"
              onClick={() => {
                onNavigateProfile?.();
                setIsOpen(false);
              }}
            >
              <User className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              <span className="text-foreground" style={{ fontFamily: 'Inter' }}>My Profile</span>
            </Button>

            {/* Orders - Only for Customers */}
            {userType === "Customer" && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 rounded-[16px] hover:bg-muted transition-all"
                onClick={() => {
                  onNavigateOrders?.();
                  setIsOpen(false);
                }}
              >
                <Package className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground" style={{ fontFamily: 'Inter' }}>My Orders</span>
              </Button>
            )}

            {/* Settings */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 rounded-[16px] hover:bg-muted transition-all"
              onClick={() => {
                setIsOpen(false);
                // Navigate to settings
              }}
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground" style={{ fontFamily: 'Inter' }}>Settings</span>
            </Button>

            {/* Payment Methods - Only for Customers */}
            {userType === "Customer" && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 rounded-[16px] hover:bg-muted transition-all"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to payment methods
                }}
              >
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground" style={{ fontFamily: 'Inter' }}>Payment Methods</span>
              </Button>
            )}

            {/* Admin Panel - Only for Admin */}
            {userType === "Admin" && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 rounded-[16px] hover:bg-muted transition-all"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to admin panel
                }}
              >
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground" style={{ fontFamily: 'Inter' }}>Admin Panel</span>
              </Button>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-2"></div>

          {/* Logout */}
          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 rounded-[16px] hover:bg-destructive/10 text-destructive transition-all group"
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Log Out</span>
            </Button>
          </div>

          {/* Footer */}
          <div className="p-3 bg-muted/50 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              FitConnect © 2024 • Version 1.0
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
