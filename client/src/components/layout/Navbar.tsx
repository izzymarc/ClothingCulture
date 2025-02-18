import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Lookbook", href: "/lookbook" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="bg-background/95 backdrop-blur sticky top-0 z-50 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-semibold">August Culture</span>
            </Link>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium",
                  location === item.href 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-primary"
                )}>
                  {item.name}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}>
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
