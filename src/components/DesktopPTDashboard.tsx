import { useMemo, useState } from "react";
import {
  DollarSign,
  Calendar,
  Users,
  Award,
  TrendingUp,
  Plus,
  Package,
  Truck,
  Percent,
  Wallet,
  ArrowDownToLine,
  ShieldCheck,
  Pencil,
  Trash2,
  RefreshCcw,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const upcomingSessions = [
  { id: 1, client: "John Davis", time: "6:00 AM", date: "Nov 15", type: "Strength Training", paid: true },
  { id: 2, client: "Sarah Martinez", time: "7:00 AM", date: "Nov 15", type: "HIIT", paid: true },
  { id: 3, client: "Mike Roberts", time: "5:00 PM", date: "Nov 15", type: "Powerlifting", paid: false },
  { id: 4, client: "Emma Wilson", time: "6:00 PM", date: "Nov 16", type: "Strength Training", paid: true },
  { id: 5, client: "Alex Chen", time: "7:00 AM", date: "Nov 16", type: "CrossFit", paid: true }
];

const seedProducts = [
  { id: 1, name: "Performance Tank", category: "Apparel", price: 48, stock: 35, sold: 210, description: "Quick-dry mesh with breathable panels." },
  { id: 2, name: "Adjustable Dumbbells", category: "Equipment", price: 299, stock: 12, sold: 92, description: "2x22kg set with rapid dial adjusters." },
  { id: 3, name: "Pre-workout Energy", category: "Supplements", price: 39, stock: 24, sold: 148, description: "Beta-alanine + electrolytes for HIIT days." },
];

const stats = {
  monthlyRevenue: 12480,
  totalClients: 450,
  sessionsThisMonth: 64,
  rating: 4.9
};

const revenueData = [
  { month: "Jan", revenue: 8400 },
  { month: "Feb", revenue: 9200 },
  { month: "Mar", revenue: 10100 },
  { month: "Apr", revenue: 9800 },
  { month: "May", revenue: 11200 },
  { month: "Jun", revenue: 12480 }
];

const seedPipeline = [
  { id: "ORD-9824", buyer: "Linh Pham", item: "Performance Tank", status: "processing", total: 78, updated: "Today" },
  { id: "ORD-9820", buyer: "Gia Bui", item: "Adjustable Dumbbells", status: "shipping", total: 299, updated: "1h ago" },
  { id: "ORD-9811", buyer: "Bao Tran", item: "Premium Whey", status: "completed", total: 54, updated: "Yesterday" },
];

const walletHistory = [
  { id: "WD-1210", type: "Withdrawal", amount: -750, date: "Aug 12", status: "Completed" },
  { id: "PM-2204", type: "Product Sale", amount: 199, date: "Aug 11", status: "Settled" },
  { id: "PM-2197", type: "Service Booking", amount: 120, date: "Aug 10", status: "Settled" },
];

const promotionRules = [
  { id: 1, name: "Back to Gym -10%", window: "Aug 1 - Aug 15", appliedTo: "Supplements", status: "Active" },
  { id: 2, name: "Combo Save $20", window: "Aug 20 - Aug 31", appliedTo: "Packages", status: "Scheduled" },
];

const registrationOrders = [
  { id: "BOOK-2390", member: "Hà My", plan: "8-week Strength", status: "processing", date: "Aug 14", total: "$420" },
  { id: "BOOK-2381", member: "Anh Tuấn", plan: "Hybrid Coaching", status: "active", date: "Aug 12", total: "$310" },
  { id: "BOOK-2374", member: "Khánh Linh", plan: "Nutrition Reset", status: "cancelled", date: "Aug 10", total: "$180" },
  { id: "BOOK-2369", member: "Minh Châu", plan: "PT Drop-ins", status: "refunded", date: "Aug 09", total: "$96" },
];

export function DesktopPTDashboard() {
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [productList, setProductList] = useState(seedProducts);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [pipelineOrders, setPipelineOrders] = useState(seedPipeline);
  const [newOrderForm, setNewOrderForm] = useState({ buyer: "", item: "", total: "" });
  const [promos, setPromos] = useState(promotionRules);
  const [promoForm, setPromoForm] = useState({ name: "", window: "", appliedTo: "" });
  const [editingPromoId, setEditingPromoId] = useState<number | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState(500);

  const statusTone = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/15 text-green-700";
      case "processing":
        return "bg-yellow-500/15 text-yellow-700";
      case "cancelled":
        return "bg-red-500/15 text-red-700";
      case "refunded":
        return "bg-blue-500/15 text-blue-700";
      case "shipping":
        return "bg-blue-500/15 text-blue-700";
      case "completed":
        return "bg-green-500/15 text-green-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const resetProductForm = () => {
    setProductForm({ name: "", price: "", stock: "", category: "", description: "" });
    setEditingProductId(null);
  };

  const handleSubmitProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.stock) return;
    if (editingProductId) {
        setProductList((prev) =>
          prev.map((product) =>
            product.id === editingProductId
              ? {
                ...product,
                ...productForm,
                price: Number(productForm.price),
                stock: Number(productForm.stock),
              }
            : product
        )
      );
    } else {
        setProductList((prev) => [
          ...prev,
          {
          id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
          name: productForm.name,
          category: productForm.category || "Uncategorized",
          price: Number(productForm.price),
          stock: Number(productForm.stock),
          sold: 0,
          description: productForm.description,
        },
      ]);
    }
    resetProductForm();
  };

  const handleEditProduct = (id: number) => {
    const product = productList.find((p) => p.id === id);
    if (!product) return;
    setEditingProductId(id);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      description: product.description,
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProductList((prev) => prev.filter((product) => product.id !== id));
    if (editingProductId === id) resetProductForm();
  };

  const handleAddOrder = () => {
    if (!newOrderForm.buyer || !newOrderForm.item || !newOrderForm.total) return;
    const nextId = `ORD-${Math.floor(Math.random() * 9000) + 1000}`;
    setPipelineOrders((prev) => [
      { id: nextId, buyer: newOrderForm.buyer, item: newOrderForm.item, status: "processing", total: Number(newOrderForm.total), updated: "Just now" },
      ...prev,
    ]);
    setNewOrderForm({ buyer: "", item: "", total: "" });
  };

  const updateOrderStatus = (id: string, status: string) => {
    setPipelineOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status, updated: "Updated" } : order)));
  };

  const removeOrder = (id: string) => setPipelineOrders((prev) => prev.filter((order) => order.id !== id));

  const handleSubmitPromo = () => {
    if (!promoForm.name || !promoForm.window || !promoForm.appliedTo) return;
    if (editingPromoId) {
      setPromos((prev) =>
        prev.map((promo) => (promo.id === editingPromoId ? { ...promo, ...promoForm, status: promo.status } : promo))
      );
    } else {
      setPromos((prev) => [
        ...prev,
        { id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1, ...promoForm, status: "Scheduled" },
      ]);
    }
    setPromoForm({ name: "", window: "", appliedTo: "" });
    setEditingPromoId(null);
  };

  const handleEditPromo = (id: number) => {
    const promo = promos.find((p) => p.id === id);
    if (!promo) return;
    setEditingPromoId(id);
    setPromoForm({ name: promo.name, window: promo.window, appliedTo: promo.appliedTo });
  };

  const handleDeletePromo = (id: number) => {
    setPromos((prev) => prev.filter((promo) => promo.id !== id));
    if (editingPromoId === id) setEditingPromoId(null);
  };

  const togglePromoStatus = (id: number) => {
    setPromos((prev) =>
      prev.map((promo) =>
        promo.id === id
          ? { ...promo, status: promo.status === "Active" ? "Scheduled" : "Active" }
          : promo
      )
    );
  };

  const totalActiveSkus = productList.length;
  const lowStockCount = useMemo(() => productList.filter((p) => p.stock <= 5).length, [productList]);
  const promoReady = productList.filter((p) => p.stock > 5).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-2">PT Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Marcus Steel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <Badge className="bg-primary/20 text-primary border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm mb-1">Monthly Revenue</div>
            <div className="text-foreground text-2xl">${stats.monthlyRevenue.toLocaleString()}</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <Badge className="bg-primary/20 text-primary border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2%
              </Badge>
            </div>
            <div className="text-muted-foreground text-sm mb-1">Total Clients</div>
            <div className="text-foreground text-2xl">{stats.totalClients}</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-muted-foreground text-sm mb-1">Sessions This Month</div>
            <div className="text-foreground text-2xl">{stats.sessionsThisMonth}</div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-muted-foreground text-sm mb-1">Rating</div>
            <div className="text-foreground text-2xl">{stats.rating}</div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Revenue Chart */}
          <div className="col-span-2 space-y-6">
            <Card className="p-6 border-border bg-card">
              <h2 className="text-foreground mb-6">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="month" stroke="#666666" />
                  <YAxis stroke="#666666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '8px' }}
                  />
                  <Bar dataKey="revenue" fill="#FF6A00" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Sessions Table */}
            <Card className="border-border bg-card">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-foreground">Upcoming Sessions</h2>
                  <Button size="sm" className="bg-primary text-white">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Availability
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Client</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Date & Time</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingSessions.map((session) => (
                    <TableRow key={session.id} className="border-border">
                      <TableCell className="text-foreground">{session.client}</TableCell>
                      <TableCell className="text-muted-foreground">{session.type}</TableCell>
                      <TableCell className="text-muted-foreground">{session.date} at {session.time}</TableCell>
                      <TableCell>
                        <Badge className={session.paid ? "bg-primary/20 text-primary border-0" : "bg-yellow-500/20 text-yellow-600 border-0"}>
                          {session.paid ? "Paid" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Right Column - Packages & Products */}
          <div className="space-y-6">
            <Card className="p-6 border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground">My Packages</h3>
                <Button 
                  onClick={() => setShowAddPackage(!showAddPackage)}
                  size="sm" 
                  variant="ghost"
                  className="text-primary"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {showAddPackage && (
                <div className="mb-4 p-4 border border-border rounded-lg bg-secondary">
                  <h4 className="text-foreground mb-3 text-sm">Create Package</h4>
                  <div className="space-y-3">
                    <Input placeholder="Package name" className="bg-background border-border h-10 text-sm" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="Sessions" className="bg-background border-border h-10 text-sm" />
                      <Input type="number" placeholder="Price" className="bg-background border-border h-10 text-sm" />
                    </div>
                    <Button className="w-full bg-primary text-white h-9 text-sm">Create</Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="p-4 border border-border rounded-lg bg-background">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-foreground text-sm">Single Session</h4>
                      <p className="text-muted-foreground text-xs">60 min training</p>
                    </div>
                    <span className="text-primary text-sm">$80</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-foreground text-sm">Weekly Pack</h4>
                        <Badge className="bg-primary text-white border-0 text-xs h-5">Popular</Badge>
                      </div>
                      <p className="text-muted-foreground text-xs">4 sessions/week</p>
                    </div>
                    <span className="text-primary text-sm">$280</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground">My Products</h3>
                <Badge className="bg-primary/10 text-primary border-0">Live</Badge>
              </div>

              <div className="space-y-3">
                {productList.slice(0, 3).map((product) => (
                  <div key={product.id} className="p-4 border border-border rounded-lg bg-background">
                    <h4 className="text-foreground text-sm mb-1">{product.name}</h4>
                    <p className="text-muted-foreground text-xs mb-3">{product.category}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground mb-1">Price</p>
                        <p className="text-primary">${product.price}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Stock</p>
                        <p className="text-foreground">{product.stock}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Sold</p>
                        <p className="text-foreground">{product.sold}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Seller toolkit to satisfy PT marketplace requirements */}
        <div className="grid grid-cols-3 gap-6 mt-10">
          <Card className="p-6 border-border bg-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">YC-SEL-01 & YC-SEL-02</p>
                <h3 className="text-foreground">Product Publishing</h3>
              </div>
              <Badge className="bg-primary/15 text-primary border-0">Full CRUD</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Product name"
                value={productForm.name}
                onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-background border-border h-10 text-sm"
              />
              <Input
                placeholder="Category"
                value={productForm.category}
                onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value }))}
                className="bg-background border-border h-10 text-sm"
              />
              <Input
                type="number"
                placeholder="Price"
                value={productForm.price}
                onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                className="bg-background border-border h-10 text-sm"
              />
              <Input
                type="number"
                placeholder="Stock"
                value={productForm.stock}
                onChange={(e) => setProductForm((prev) => ({ ...prev, stock: e.target.value }))}
                className="bg-background border-border h-10 text-sm"
              />
              <Textarea
                placeholder="Full description, ingredients, sizing..."
                value={productForm.description}
                onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-background border-border text-sm col-span-2"
              />
              <div className="flex gap-2 col-span-2">
                <Button onClick={handleSubmitProduct} className="bg-primary text-white h-10 w-full">
                  {editingProductId ? "Update product" : "Publish product"}
                </Button>
                {editingProductId && (
                  <Button variant="outline" onClick={resetProductForm} className="h-10">
                    Cancel
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>Active SKUs</span>
                </div>
                <p className="text-foreground text-lg">{totalActiveSkus}</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  <span>Low stock</span>
                </div>
                <p className="text-foreground text-lg">{lowStockCount}</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <Percent className="w-4 h-4" />
                  <span>Promo-ready</span>
                </div>
                <p className="text-foreground text-lg">{promoReady}</p>
              </div>
            </div>

            <div className="space-y-3">
              {productList.map((product) => (
                <div key={product.id} className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-foreground font-medium text-sm">{product.name}</p>
                      <p className="text-muted-foreground text-xs mb-1">{product.category}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{product.description}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className="bg-primary/10 text-primary border-0">${product.price}</Badge>
                      <p className="text-muted-foreground text-xs">Stock: {product.stock}</p>
                      <p className="text-muted-foreground text-xs">Sold: {product.sold}</p>
                      <div className="flex gap-2 justify-end">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => handleEditProduct(product.id)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border bg-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">YC-SEL-03 · YC-SEL-04</p>
                <h3 className="text-foreground">Order & Fulfillment</h3>
              </div>
              <Badge className="bg-primary/15 text-primary border-0">Live pipeline</Badge>
            </div>

            <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
              <p className="text-sm text-foreground">Create manual order</p>
              <div className="grid grid-cols-3 gap-3">
                <Input
                  placeholder="Buyer"
                  value={newOrderForm.buyer}
                  onChange={(e) => setNewOrderForm((prev) => ({ ...prev, buyer: e.target.value }))}
                  className="bg-background border-border h-10 text-sm"
                />
                <Input
                  placeholder="Item"
                  value={newOrderForm.item}
                  onChange={(e) => setNewOrderForm((prev) => ({ ...prev, item: e.target.value }))}
                  className="bg-background border-border h-10 text-sm"
                />
                <Input
                  type="number"
                  placeholder="Total"
                  value={newOrderForm.total}
                  onChange={(e) => setNewOrderForm((prev) => ({ ...prev, total: e.target.value }))}
                  className="bg-background border-border h-10 text-sm"
                />
                <div className="col-span-3 flex gap-2 justify-end">
                  <Button onClick={handleAddOrder} className="bg-primary text-white h-9 text-sm">Add order</Button>
                  <Button variant="ghost" className="h-9 text-muted-foreground" onClick={() => setNewOrderForm({ buyer: "", item: "", total: "" })}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="pipeline">
              <TabsList className="grid grid-cols-2 w-full bg-secondary">
                <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="pipeline" className="space-y-3 pt-3">
                {pipelineOrders.map((order) => (
                  <div key={order.id} className="p-4 rounded-xl border border-border bg-background">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-foreground text-sm">{order.item}</p>
                        <p className="text-muted-foreground text-xs">{order.id} · {order.buyer}</p>
                        <p className="text-muted-foreground text-xs">Updated: {order.updated}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={`${statusTone(order.status)} border-0 capitalize`}>{order.status}</Badge>
                        <p className="text-foreground text-sm">${order.total}</p>
                        <div className="flex gap-2 justify-end">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-yellow-600" onClick={() => updateOrderStatus(order.id, "processing")}>
                            <RefreshCcw className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600" onClick={() => updateOrderStatus(order.id, "shipping")}>
                            <Truck className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={() => updateOrderStatus(order.id, "completed")}>
                            <ShieldCheck className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={() => removeOrder(order.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="shipping" className="space-y-3 pt-3">
                {pipelineOrders
                  .filter((order) => order.status === "shipping" || order.status === "completed")
                  .map((order) => (
                    <div key={order.id} className="p-4 rounded-xl border border-border bg-background">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-foreground text-sm">{order.item}</p>
                          <p className="text-muted-foreground text-xs">{order.id} · {order.buyer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${statusTone(order.status)} border-0 capitalize`}>{order.status}</Badge>
                          <Button size="sm" variant="outline" className="text-primary border-border" onClick={() => updateOrderStatus(order.id, "completed")}>Update</Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6 border-border bg-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">YC-SEL-05 · YC-SEL-06 · YC-SEL-07</p>
                <h3 className="text-foreground">Promos & Wallet</h3>
              </div>
              <Badge className="bg-primary/15 text-primary border-0">Wallet</Badge>
            </div>

            <div className="p-4 rounded-lg border border-border bg-background">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wallet className="w-4 h-4" />
                  <span>Available balance</span>
                </div>
                <Badge className="bg-primary/10 text-primary border-0">${withdrawAmount} ready</Badge>
              </div>
              <p className="text-foreground text-2xl mb-3">$2,640</p>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2 rounded-lg border border-border bg-card">
                  <p className="text-muted-foreground">Total sales</p>
                  <p className="text-foreground text-sm">$12,890</p>
                </div>
                <div className="p-2 rounded-lg border border-border bg-card">
                  <p className="text-muted-foreground">Pending payout</p>
                  <p className="text-foreground text-sm">$540</p>
                </div>
                <div className="p-2 rounded-lg border border-border bg-card">
                  <p className="text-muted-foreground">Refunds</p>
                  <p className="text-foreground text-sm">$120</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="bg-background border-border h-10 text-sm"
                  placeholder="Amount"
                />
                <Button className="bg-primary text-white h-10">
                  <ArrowDownToLine className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Promo name"
                  value={promoForm.name}
                  onChange={(e) => setPromoForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-background border-border h-10 text-sm"
                />
                <Input
                  placeholder="Date window"
                  value={promoForm.window}
                  onChange={(e) => setPromoForm((prev) => ({ ...prev, window: e.target.value }))}
                  className="bg-background border-border h-10 text-sm"
                />
                <Input
                  placeholder="Applies to"
                  value={promoForm.appliedTo}
                  onChange={(e) => setPromoForm((prev) => ({ ...prev, appliedTo: e.target.value }))}
                  className="bg-background border-border h-10 text-sm"
                />
                <div className="col-span-3 flex gap-2 justify-end">
                  <Button onClick={handleSubmitPromo} className="bg-primary text-white h-9 text-sm">
                    {editingPromoId ? "Update promo" : "Create promo rule"}
                  </Button>
                  {editingPromoId && (
                    <Button variant="ghost" className="h-9" onClick={() => { setEditingPromoId(null); setPromoForm({ name: "", window: "", appliedTo: "" }); }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {promos.map((promo) => (
                  <div key={promo.id} className="p-3 rounded-lg border border-border bg-background flex items-center justify-between">
                    <div>
                      <p className="text-foreground text-sm">{promo.name}</p>
                      <p className="text-muted-foreground text-xs">{promo.window} · {promo.appliedTo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary border-0">{promo.status}</Badge>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => handleEditPromo(promo.id)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={() => togglePromoStatus(promo.id)}>
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={() => handleDeletePromo(promo.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-foreground text-sm mb-3">Wallet history</h4>
              <div className="space-y-2 text-sm">
                {walletHistory.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-2 rounded-lg border border-border bg-background">
                    <div>
                      <p className="text-foreground">{entry.type}</p>
                      <p className="text-muted-foreground text-xs">{entry.id} · {entry.date}</p>
                    </div>
                    <Badge className={`border-0 ${entry.amount > 0 ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-700"}`}>
                      {entry.amount > 0 ? `+$${entry.amount}` : `-$${Math.abs(entry.amount)}`}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Client order visibility */}
        <Card className="mt-10 p-6 border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">PT booking commerce</p>
              <h3 className="text-foreground">Client Orders & Sign-ups</h3>
            </div>
            <Badge className="border-0 bg-primary/10 text-primary">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Protected payouts
            </Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Order</TableHead>
                <TableHead className="text-muted-foreground">Member</TableHead>
                <TableHead className="text-muted-foreground">Plan</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrationOrders.map((order) => (
                <TableRow key={order.id} className="border-border">
                  <TableCell className="text-foreground font-medium">{order.id}</TableCell>
                  <TableCell className="text-muted-foreground">{order.member}</TableCell>
                  <TableCell className="text-foreground">{order.plan}</TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell>
                    <Badge className={`${statusTone(order.status)} border-0 capitalize`}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-foreground">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div className="p-4 rounded-xl border border-border bg-background">
              <p className="text-muted-foreground mb-1">Processing</p>
              <p className="text-foreground text-xl">02</p>
              <p className="text-muted-foreground text-xs">Approve or cancel pending slots</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background">
              <p className="text-muted-foreground mb-1">Active Programs</p>
              <p className="text-foreground text-xl">18</p>
              <p className="text-muted-foreground text-xs">Manage check-ins and milestones</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background">
              <p className="text-muted-foreground mb-1">Refund / Cancel</p>
              <p className="text-foreground text-xl">03</p>
              <p className="text-muted-foreground text-xs">Track withdrawals back to clients</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
