import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">
              Skill<span className="text-primary">Bridge</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Carreras
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sobre nosotros
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Iniciar sesión
            </Button>
            <Button variant="neon" size="sm">
              Comenzar gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Carreras
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sobre nosotros
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="justify-start">
                  Iniciar sesión
                </Button>
                <Button variant="neon" size="sm">
                  Comenzar gratis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
