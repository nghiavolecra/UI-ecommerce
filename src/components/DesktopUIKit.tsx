import { MascotIcon } from "./MascotIcon";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { useState } from "react";

interface DesktopUIKitProps {
  onBack: () => void;
}

const brandColors = [
  { name: "Primary Orange", value: "#FF6A00", var: "--primary", usage: "10% - CTAs, highlights, energy (Nike-inspired)", percentage: "10%" },
  { name: "Pure White", value: "#FFFFFF", var: "--background", usage: "80% - Main background, cards, clean space", percentage: "80%" },
  { name: "Deep Black", value: "#0D0D0D", var: "--foreground", usage: "10% - Text, headers, bold elements", percentage: "10%" },
  { name: "Soft Gray", value: "#F5F5F5", var: "--secondary", usage: "Background sections, subtle fills" },
  { name: "Border Gray", value: "#E5E5E5", var: "--border", usage: "Dividers, card borders, separators" },
];

const typography = [
  { family: "Montserrat", usage: "Titles, headers, hero sections - Bold & Athletic", weights: ["600", "700", "800"], primary: true },
  { family: "Poppins", usage: "Buttons, stats, numbers, CTAs - Dynamic", weights: ["500", "600", "700"], primary: true },
  { family: "Inter", usage: "Body text, UI elements, paragraphs - Clean", weights: ["400", "500", "600"] },
];

export function DesktopUIKit({ onBack }: DesktopUIKitProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={onBack} variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-center">
              <h1 className="text-foreground" style={{ fontFamily: 'Montserrat', fontWeight: 800 }}>FitConnect UI Kit</h1>
              <p className="text-muted-foreground text-sm">Nike Training Club Inspired • 80/10/10 Layout</p>
            </div>

            <div className="w-[120px]"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Brand Mascot Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Brand Mascot</h2>
            <p className="text-muted-foreground">Athletic tiger mascot symbolizing power, strength, and dynamic motion</p>
          </div>

          <Card className="p-8 border-border bg-card">
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-muted rounded-[20px] p-8 mb-4 flex items-center justify-center">
                  <MascotIcon className="w-16 h-16" />
                </div>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Small (64px)</p>
                <p className="text-xs text-muted-foreground">Navigation, Icons</p>
              </div>

              <div className="text-center">
                <div className="bg-muted rounded-[20px] p-8 mb-4 flex items-center justify-center">
                  <MascotIcon className="w-24 h-24" />
                </div>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Medium (96px)</p>
                <p className="text-xs text-muted-foreground">Headers, Cards</p>
              </div>

              <div className="text-center">
                <div className="bg-muted rounded-[20px] p-8 mb-4 flex items-center justify-center">
                  <MascotIcon className="w-32 h-32" />
                </div>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Large (128px)</p>
                <p className="text-xs text-muted-foreground">Hero Sections</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-[20px] p-8 mb-4 flex items-center justify-center border-2 border-primary/20">
                  <MascotIcon className="w-32 h-32" />
                </div>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Featured</p>
                <p className="text-xs text-muted-foreground">Special Placement</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-[16px] border border-primary/20">
              <p className="text-sm text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Mascot Philosophy</p>
              <p className="text-xs text-muted-foreground">
                The tiger represents <span className="text-primary font-semibold">power, strength, and athletic energy</span>. Use it to convey motion, determination, and the spirit of fitness excellence.
              </p>
            </div>
          </Card>
        </section>

        {/* Color Palette Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Color Palette - 80/10/10 System</h2>
            <p className="text-muted-foreground">80% White base • 10% Black text • 10% Orange energy</p>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {brandColors.map((color) => (
              <Card key={color.name} className="overflow-hidden border-border bg-card">
                <div 
                  className="h-40 relative group cursor-pointer"
                  style={{ backgroundColor: color.value }}
                  onClick={() => copyToClipboard(color.value)}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    {copiedColor === color.value ? (
                      <Check className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <Copy className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-foreground text-sm" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>{color.name}</h3>
                    {color.percentage && (
                      <span className="text-xs text-primary" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{color.percentage}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs mb-2 font-mono">{color.value}</p>
                  <p className="text-muted-foreground text-xs">CSS: {color.var}</p>
                  <p className="text-muted-foreground text-xs mt-2">{color.usage}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Typography System</h2>
            <p className="text-muted-foreground">Bold, athletic fonts inspired by Nike Training Club & Adidas Running</p>
          </div>

          <div className="space-y-6">
            {typography.map((font) => (
              <Card key={font.family} className={`p-6 border-border ${font.primary ? 'border-primary/30 bg-primary/5' : 'bg-card'}`}>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-foreground" style={{ fontFamily: font.family, fontWeight: 700 }}>{font.family}</h3>
                      {font.primary && <Badge className="bg-primary text-white text-xs">Primary</Badge>}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{font.usage}</p>
                    <div className="flex gap-2">
                      {font.weights.map((weight) => (
                        <Badge key={weight} variant="outline" className="border-border" style={{ fontFamily: 'Poppins' }}>
                          {weight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 space-y-3">
                    <div style={{ fontFamily: font.family, fontWeight: 800 }} className="text-4xl text-foreground">
                      The Quick Brown Fox
                    </div>
                    <div style={{ fontFamily: font.family, fontWeight: 600 }} className="text-2xl text-foreground">
                      The Quick Brown Fox Jumps Over
                    </div>
                    <div style={{ fontFamily: font.family, fontWeight: 400 }} className="text-base text-muted-foreground">
                      The quick brown fox jumps over the lazy dog. 0123456789
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Component Styles Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Component Styles</h2>
            <p className="text-muted-foreground">Card-based UI with smooth shadows and rounded corners (16-20px)</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Buttons */}
            <Card className="p-6 border-border bg-card">
              <h3 className="text-foreground mb-4">Buttons</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <Button className="bg-primary text-white">Primary Button</Button>
                  <code className="text-xs text-muted-foreground">bg-primary text-white</code>
                </div>
                <div className="flex gap-3 items-center">
                  <Button variant="outline">Outline Button</Button>
                  <code className="text-xs text-muted-foreground">variant="outline"</code>
                </div>
                <div className="flex gap-3 items-center">
                  <Button variant="ghost">Ghost Button</Button>
                  <code className="text-xs text-muted-foreground">variant="ghost"</code>
                </div>
                <div className="flex gap-3 items-center">
                  <Button size="sm" className="bg-primary text-white">Small Button</Button>
                  <code className="text-xs text-muted-foreground">size="sm"</code>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-6 border-border bg-card">
              <h3 className="text-foreground mb-4">Badges</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <Badge className="bg-primary text-white border-0">Primary Badge</Badge>
                  <code className="text-xs text-muted-foreground">bg-primary text-white</code>
                </div>
                <div className="flex gap-3 items-center">
                  <Badge variant="outline">Outline Badge</Badge>
                  <code className="text-xs text-muted-foreground">variant="outline"</code>
                </div>
                <div className="flex gap-3 items-center">
                  <Badge className="bg-destructive text-white border-0">Alert Badge</Badge>
                  <code className="text-xs text-muted-foreground">bg-destructive</code>
                </div>
                <div className="flex gap-3 items-center">
                  <Badge className="bg-green-500 text-white border-0">Success Badge</Badge>
                  <code className="text-xs text-muted-foreground">bg-green-500</code>
                </div>
              </div>
            </Card>

            {/* Cards */}
            <Card className="p-6 border-border bg-card">
              <h3 className="text-foreground mb-4">Cards</h3>
              <div className="space-y-3">
                <Card className="p-4 border-border bg-card">
                  <p className="text-sm text-foreground">Default Card</p>
                  <code className="text-xs text-muted-foreground block mt-2">border-radius: 20px</code>
                </Card>
                <Card className="p-4 border-primary bg-primary/5 border-2">
                  <p className="text-sm text-foreground">Highlighted Card</p>
                  <code className="text-xs text-muted-foreground block mt-2">border-primary border-2</code>
                </Card>
                <Card className="p-4 border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
                  <p className="text-sm text-foreground">Interactive Card</p>
                  <code className="text-xs text-muted-foreground block mt-2">hover:shadow-lg</code>
                </Card>
              </div>
            </Card>

            {/* Inputs */}
            <Card className="p-6 border-border bg-card">
              <h3 className="text-foreground mb-4">Form Inputs</h3>
              <div className="space-y-3">
                <div>
                  <Input placeholder="Default Input" className="bg-background border-border" />
                  <code className="text-xs text-muted-foreground block mt-1">bg-background border-border</code>
                </div>
                <div>
                  <Input placeholder="Focused Input" className="bg-background border-primary" />
                  <code className="text-xs text-muted-foreground block mt-1">border-primary (focus state)</code>
                </div>
                <div>
                  <Input placeholder="Disabled Input" disabled className="bg-muted" />
                  <code className="text-xs text-muted-foreground block mt-1">disabled bg-muted</code>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Design Guidelines */}
        <section>
          <div className="mb-6">
            <h2 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Design Guidelines</h2>
            <p className="text-muted-foreground">Nike Training Club inspired • Energetic, strong, athletic tone</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6 border-border bg-card">
              <div className="w-12 h-12 bg-primary rounded-full mb-4 flex items-center justify-center text-white" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                1
              </div>
              <h3 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>80/10/10 Layout</h3>
              <p className="text-muted-foreground text-sm mb-3">80% white space, 10% black text, 10% orange accents for clean, energetic design</p>
              <code className="text-xs text-primary" style={{ fontFamily: 'Poppins' }}>Nike Training Club inspired</code>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="w-12 h-12 bg-primary rounded-full mb-4 flex items-center justify-center text-white" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                2
              </div>
              <h3 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Border Radius</h3>
              <p className="text-muted-foreground text-sm mb-3">Cards use 16-20px radius for modern, athletic appearance with smooth transitions</p>
              <code className="text-xs text-primary" style={{ fontFamily: 'Poppins' }}>border-radius: 16-20px</code>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="w-12 h-12 bg-primary rounded-full mb-4 flex items-center justify-center text-white" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
                3
              </div>
              <h3 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Motion-Friendly</h3>
              <p className="text-muted-foreground text-sm mb-3">Smooth shadows, soft elevation, and dynamic transitions for athletic energy</p>
              <code className="text-xs text-primary" style={{ fontFamily: 'Poppins' }}>transition-all hover:shadow-lg</code>
            </Card>
          </div>
        </section>

        {/* Design Inspiration */}
        <section>
          <div className="mb-6">
            <h2 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Design Inspiration</h2>
            <p className="text-muted-foreground">Visual identity inspired by leading fitness brands</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 border-border bg-card">
              <div className="mb-4">
                <Badge className="bg-primary text-white mb-3">Nike Training Club</Badge>
                <h3 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Bold, Energetic Typography</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Heavy use of Montserrat for impactful headers</li>
                <li>• Clear visual hierarchy with bold weights (700-800)</li>
                <li>• Orange accents for CTAs and energy</li>
                <li>• Clean white backgrounds with strategic negative space</li>
              </ul>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="mb-4">
                <Badge className="bg-primary text-white mb-3">Adidas Running</Badge>
                <h3 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Athletic, Motion-Friendly</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Card-based layouts with smooth shadows</li>
                <li>• Dynamic transitions and hover states</li>
                <li>• Strong contrast between text and background</li>
                <li>• Poppins for stats and numerical data</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Quick Reference */}
        <section>
          <div className="mb-6">
            <h2 className="text-foreground mb-2" style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Quick Reference</h2>
            <p className="text-muted-foreground">Essential values for developers and designers</p>
          </div>

          <Card className="p-6 border-border bg-card">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <h3 className="text-foreground text-sm mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Colors</h3>
                <div className="space-y-1 text-xs text-muted-foreground font-mono">
                  <div>White: #FFFFFF (80%)</div>
                  <div>Black: #0D0D0D (10%)</div>
                  <div>Orange: #FF6A00 (10%)</div>
                  <div>Gray BG: #F5F5F5</div>
                  <div>Border: #E5E5E5</div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground text-sm mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Border Radius</h3>
                <div className="space-y-1 text-xs text-muted-foreground font-mono">
                  <div>Cards: 16-20px</div>
                  <div>Buttons: 8px</div>
                  <div>Badges: 6px</div>
                  <div>Inputs: 8px</div>
                  <div>Avatar: 50%</div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground text-sm mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Typography</h3>
                <div className="space-y-1 text-xs text-muted-foreground font-mono">
                  <div>Montserrat: Titles</div>
                  <div>Poppins: Buttons</div>
                  <div>Inter: Body</div>
                  <div>Base: 16px</div>
                  <div>Scale: 1.25 ratio</div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground text-sm mb-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Font Weights</h3>
                <div className="space-y-1 text-xs text-muted-foreground font-mono">
                  <div>Regular: 400</div>
                  <div>Medium: 500</div>
                  <div>Semibold: 600</div>
                  <div>Bold: 700</div>
                  <div>Extrabold: 800</div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
