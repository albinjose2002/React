import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Plus,
  Search,
  Filter,
  Pencil,
  ChevronRight,
  Save,
  Eye,
  Upload,
  Trash2,
  Settings,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Modern SaaS palette (Option B)
const colors = {
  gradientMain: "bg-gradient-to-r from-purple-600 to-cyan-500",
  textGradient:
    "bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent",
  pageBg: "bg-gradient-to-br from-purple-50 via-cyan-50 to-blue-50",
  chart: ["#7c3aed", "#06b6d4", "#3b82f6", "#a855f7", "#22d3ee", "#60a5fa"],
};

// Minimal UI primitives
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-medium transition shadow-sm hover:shadow-md active:scale-[.98] ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Card = ({ className = "", children }) => (
  <div
    className={`rounded-2xl shadow-sm border border-gray-100 bg-white/85 backdrop-blur ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ title, subtitle, icon: Icon, actions }) => (
  <div className="flex items-center gap-3 p-4 border-b border-gray-100">
    {Icon && <Icon className="w-5 h-5 text-purple-600" />}
    <div className="flex-1">
      <div className="font-semibold text-gray-900">{title}</div>
      {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
    </div>
    {actions}
  </div>
);
const CardContent = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
const Input = (props) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/40`}
  />
);
const Textarea = (props) => (
  <textarea
    {...props}
    className={`w-full min-h-[180px] rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/40`}
  />
);
const Badge = ({ children, color }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
      color || "bg-gray-100 text-gray-700"
    }`}
  >
    {children}
  </span>
);
const Chip = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm transition ${
      active
        ? `${colors.gradientMain} text-white`
        : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
    }`}
  >
    {children}
  </button>
);

// Demo content
const demoPosts = [
  {
    id: 1,
    title: "Port Expansion Announcement",
    status: "Published",
    author: "Sijo Joseph",
    updated: "11 Nov 2025",
    tags: ["News", "Logistics"],
    cover:
      "https://images.unsplash.com/photo-1586521995568-39ab49c89a03?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Sustainability Initiatives 2026",
    status: "Draft",
    author: "Pushpa Rao",
    updated: "10 Nov 2025",
    tags: ["Sustainability", "Corporate"],
    cover:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "New Customer Portal Walkthrough",
    status: "Scheduled",
    author: "Binbish",
    updated: "08 Nov 2025",
    tags: ["Guide", "Portal"],
    cover:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
];

// Charts demo data
const trafficData = [
  { month: "Jan", visits: 32000, leads: 180 },
  { month: "Feb", visits: 36000, leads: 210 },
  { month: "Mar", visits: 41000, leads: 240 },
  { month: "Apr", visits: 39000, leads: 230 },
  { month: "May", visits: 47000, leads: 300 },
  { month: "Jun", visits: 52000, leads: 340 },
];
const typeDist = [
  { name: "News", value: 42 },
  { name: "Pages", value: 28 },
  { name: "Gallery", value: 18 },
  { name: "Videos", value: 12 },
];
const deptContent = [
  { dept: "Ports", published: 18, drafts: 4 },
  { dept: "Shipping", published: 14, drafts: 6 },
  { dept: "Free Zones", published: 10, drafts: 3 },
  { dept: "Logistics", published: 12, drafts: 2 },
  { dept: "Oman Post", published: 9, drafts: 5 },
];

const kpis = [
  { label: "Total Articles", value: 128, delta: "+8 this week" },
  { label: "Drafts", value: 17, delta: "-2 vs last week" },
  { label: "Scheduled", value: 9, delta: "+3 upcoming" },
  { label: "Media Items", value: 642, delta: "+31 added" },
];

const tabDefs = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "content", label: "Content", icon: FileText },
  { key: "editor", label: "Editor", icon: Pencil },
  { key: "media", label: "Media Library", icon: ImageIcon },
];

// Activity demo data
const activityLog = [
  {
    id: 1,
    actor: "Sijo Joseph",
    action: "Published article",
    target: "Port Expansion Announcement",
    time: "2h ago",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 2,
    actor: "Pushpa Rao",
    action: "Saved draft",
    target: "Sustainability Initiatives 2026",
    time: "5h ago",
    icon: <Save className="w-4 h-4" />,
  },
  {
    id: 3,
    actor: "Binbish",
    action: "Uploaded media",
    target: "customer-portal.png",
    time: "1 day ago",
    icon: <Upload className="w-4 h-4" />,
  },
  {
    id: 4,
    actor: "System",
    action: "SEO scan completed",
    target: "Sitewide",
    time: "2 days ago",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    id: 5,
    actor: "Admin",
    action: "Removed media",
    target: "old-banner.jpg",
    time: "3 days ago",
    icon: <Trash2 className="w-4 h-4 text-red-500" />,
  },
];

const ActivityItem = ({ item }) => (
  <div className="flex items-start gap-3 py-3 border-b last:border-b-0">
    <div className="w-10 h-10 rounded-full bg-white/80 grid place-items-center text-purple-600 shadow-xs">
      {item.icon}
    </div>
    <div className="flex-1">
      <div className="text-sm">
        <span className="font-medium text-gray-800">{item.actor}</span>{" "}
        <span className="text-gray-600"> {item.action} </span>
        <span className="text-gray-700 font-semibold"> {item.target}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">{item.time}</div>
    </div>
    <div>
      <Button className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1">
        View
      </Button>
    </div>
  </div>
);

export default function AssyadCMSModern() {
  const [tab, setTab] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPosts = useMemo(() => {
    return demoPosts.filter((p) => {
      const matchQ = p.title.toLowerCase().includes(query.toLowerCase());
      const matchS = statusFilter === "All" ? true : p.status === statusFilter;
      return matchQ && matchS;
    });
  }, [query, statusFilter]);

  const uptime = 99.9; // CMS health target
  const seoScore = 92; // mock SEO score

  return (
    <div className={`min-h-screen ${colors.pageBg} text-gray-900`}>
      {/* Top Bar */}
      <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-2xl ${colors.gradientMain} text-white font-bold grid place-items-center`}
            >
              A
            </div>
            <div className="font-semibold text-gray-800">Assyad CMS</div>
          </div>
          <div className="hidden md:flex items-center gap-2 w-[520px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <Input placeholder="Search content, media, users…" className="pl-9" />
            </div>
            <Button className={`${colors.gradientMain} text-white`}>
              <Plus className="w-4 h-4" /> New
            </Button>
            <Button className="bg-white border border-gray-200">
              <Settings className="w-4 h-4" /> Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl  py-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 h-screen w-[600px] lg:col-span-2">
          <Card>
            <CardContent>
              <div className="grid gap-2">
                {tabDefs.map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`justify-start ${
                      tab === key
                        ? `${colors.gradientMain} text-white`
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                    {tab === key && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </Button>
                ))}
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Quick Filters
                </div>
                <div className="flex flex-wrap gap-2">
                  {["All", "Published", "Draft", "Scheduled"].map((s) => (
                    <Chip key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main */}
        <main className="col-span-12 lg:col-span-10">
          <AnimatePresence mode="wait">
            {/* DASHBOARD */}
            {tab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="grid gap-6"
              >
                {/* Animated Hero */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-100"
                >
                  {/* Motion layers */}
                  <div className="absolute inset-0">
                    <img
                      src="./public/download.jpeg"
                      alt="Hero"
                      className="w-full h-56 md:h-64 object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ duration: 1.2 }}
                    />
                    {/* subtle animated stripes */}
                    <motion.div
                      className="absolute -top-1/2 -right-1/4 w-[120%] h-[200%] rotate-12"
                      initial={{ x: 80 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)",
                        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                      }}
                    />
                  </div>

                  {/* Hero content */}
                  <div className="relative p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 text-white">
                      <div className="text-xs uppercase tracking-wider text-white/80">Corporate Dashboard</div>
                      <div className="mt-1 text-2xl md:text-3xl font-bold">Operations & Content Overview</div>
                      <div className="mt-1 text-white/80">Ports • Shipping • Free Zones • Logistics • Oman Post</div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          className="bg-white/95 text-[#0F2743] border border-white/30"
                          onClick={() => setTab("content")}
                        >
                          <FileText className="w-4 h-4" /> New Content
                        </Button>
                        <Button
                          className="bg-white/20 text-white border border-white/30"
                          onClick={() => setTab("media")}
                        >
                          <ImageIcon className="w-4 h-4" /> Media
                        </Button>
                      </div>
                    </div>

                    {/* KPI overlay cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Uptime", value: `${uptime}%` },
                        { label: "SEO Score", value: "92" },
                        { label: "This Week", value: "+18%" },
                        { label: "Approvals", value: "7 pending" },
                      ].map((k, i) => (
                        <motion.div
                          key={k.label}
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * i }}
                          className="rounded-xl bg-white/90 backdrop-blur border border-white/50 p-3"
                        >
                          <div className="text-[11px] text-gray-500">{k.label}</div>
                          <div className="text-lg font-semibold text-gray-900">{k.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {kpis.map((k, idx) => (
                    <Card key={k.label}>
                      <CardContent>
                        <div className="text-sm text-gray-500">{k.label}</div>
                        <div className={`text-3xl font-bold mt-2 ${colors.textGradient}`}>{k.value}</div>
                        <div className="text-xs text-emerald-600 mt-1">{k.delta}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Analytics Row */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                  {/* Traffic & Leads */}
                  <Card className="xl:col-span-2">
                    <CardHeader title="Traffic & Lead Generation" subtitle="Visits vs Leads (last 6 months)" />
                    <CardContent className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trafficData} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
                          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="visits" stroke="#0F2743" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="leads" stroke="#0F6E6E" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Distribution */}
                  <Card>
                    <CardHeader title="Content Mix" subtitle="By type" />
                    <CardContent className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={typeDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                            {typeDist.map((_, i) => (
                              <Cell key={i} fill={colors.chart[i % colors.chart.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Department Content + Health */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                  <Card className="xl:col-span-2">
                    <CardHeader title="Department Content" subtitle="Published vs Drafts" />
                    <CardContent className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deptContent}>
                          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                          <XAxis dataKey="dept" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="published" fill="#127A8B" radius={[6,6,0,0]} />
                          <Bar dataKey="drafts" fill="#D4AF37" radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Health Meters */}
                  <Card>
                    <CardHeader title="CMS Health" subtitle="Uptime & SEO Score" />
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center">
                          <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                              <Pie
                                data={[{ name: "uptime", value: uptime }, { name: "gap", value: 100 - uptime }]}
                                dataKey="value"
                                innerRadius={50}
                                outerRadius={70}
                                startAngle={90}
                                endAngle={-270}
                              >
                                <Cell fill="#22c55e" />
                                <Cell fill="#e5e7eb" />
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="text-sm text-gray-500">Uptime</div>
                          <div className="text-xl font-semibold">{uptime}%</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                              <Pie
                                data={[{ name: "seo", value: seoScore }, { name: "gap", value: 100 - seoScore }]}
                                dataKey="value"
                                innerRadius={50}
                                outerRadius={70}
                                startAngle={90}
                                endAngle={-270}
                              >
                                <Cell fill="#0F2743" />
                                <Cell fill="#e5e7eb" />
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="text-sm text-gray-500">SEO Score</div>
                          <div className="text-xl font-semibold">{seoScore}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Featured Stories */}
                <Card>
                  <CardHeader
                    title="Featured Stories"
                    subtitle="Latest highlights"
                    icon={FileText}
                    actions={<Button className="bg-white border border-gray-200 text-gray-700">View all</Button>}
                  />
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {demoPosts.map((p) => (
                        <div key={p.id} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition">
                          <img src={p.cover} alt={p.title} className="w-full h-40 object-cover" />
                          <div className="p-3">
                            <div className="text-sm text-gray-500 mb-1">{p.author} • {p.updated}</div>
                            <div className="font-semibold">{p.title}</div>
                            <div className="mt-2 flex gap-2 flex-wrap">
                              {p.tags.map((t) => (
                                <Badge key={t} color="bg-[#0F2743]/10 text-[#0F2743]">{t}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Log (NEW) */}
                <Card>
                  <CardHeader
                    title="Activity Log"
                    subtitle="Latest actions & audit trail"
                    icon={Activity}
                    actions={<Button className="bg-white border border-gray-200 text-gray-700">View full</Button>}
                  />
                  <CardContent>
                    <div className="max-h-64 overflow-y-auto">
                      {activityLog.map((a) => (
                        <ActivityItem key={a.id} item={a} />
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                      <div>Showing recent {activityLog.length} activities</div>
                      <div>
                        <Button className="bg-white border border-gray-200 text-gray-700 px-3 py-1">Export</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Global hubs preview */}
                <Card>
                  <CardHeader title="Global Operational Hubs" subtitle="Map preview placeholder" />
                  <CardContent>
                    <div className="relative overflow-hidden rounded-xl border border-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-56 object-cover"
                        alt="World map"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge color="bg-black/70 text-white">Ports</Badge>
                        <Badge color="bg-black/70 text-white">Free Zones</Badge>
                        <Badge color="bg-black/70 text-white">Logistics</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* CONTENT */}
            {tab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="grid gap-4"
              >
                <Card>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                      <div className="flex items-center gap-2 w-full md:w-1/2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles…" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button className="bg-white border border-gray-200"><Filter className="w-4 h-4" /> Filters</Button>
                        <Button className={`${colors.gradientMain} text-white`}><Plus className="w-4 h-4" /> New Article</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader title="Articles" subtitle={`${filteredPosts.length} result(s)`} icon={FileText} />
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-gray-500">
                            <th className="py-2">Title</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Author</th>
                            <th className="py-2">Updated</th>
                            <th className="py-2">Cover</th>
                            <th className="py-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPosts.map((p) => (
                            <tr key={p.id} className="border-t border-gray-100">
                              <td className="py-3 font-medium">{p.title}</td>
                              <td className="py-3"><Badge color="bg-gradient-to-r from-purple-500 to-cyan-500 text-white">{p.status}</Badge></td>
                              <td className="py-3">{p.author}</td>
                              <td className="py-3 text-gray-500">{p.updated}</td>
                              <td className="py-3"><img src={p.cover} alt="cover" className="w-16 h-10 object-cover rounded" /></td>
                              <td className="py-3 text-right">
                                <div className="inline-flex gap-2">
                                  <Button className="bg-white border border-gray-200 text-gray-700"><Eye className="w-4 h-4" /></Button>
                                  <Button className={`${colors.gradientMain} text-white`}><Pencil className="w-4 h-4" /></Button>
                                  <Button className="bg-white border border-gray-200 text-red-600"><Trash2 className="w-4 h-4" /></Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* EDITOR */}
            {tab === "editor" && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="grid gap-6"
              >
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <Card className="xl:col-span-2">
                    <CardHeader title="Article Editor" subtitle="Compose and manage content" icon={Pencil} />
                    <CardContent>
                      <div className="grid gap-4">
                        <div>
                          <label className="text-sm font-medium">Title</label>
                          <Input defaultValue="Logistics Innovation Summit Recap" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Body</label>
                          <Textarea defaultValue={`Asyad Group showcased advancements across ports, free zones, and integrated logistics...`} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Featured Image</label>
                          <div className="mt-2 p-3 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600">
                            Drag & drop or click to upload — JPG/PNG up to 5MB
                          </div>
                          <div className="mt-3">
                            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop" alt="preview" className="w-full h-40 object-cover rounded-xl" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button className={`${colors.gradientMain} text-white`}><Save className="w-4 h-4" /> Save Draft</Button>
                          <Button className="bg-white border border-gray-200"><Eye className="w-4 h-4" /> Preview</Button>
                          <Button className="bg-white border border-gray-200"><Upload className="w-4 h-4" /> Publish</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader title="Meta & Settings" subtitle="SEO, tags, scheduling" icon={Settings} />
                    <CardContent>
                      <div className="grid gap-4">
                        <div>
                          <label className="text-sm font-medium">Status</label>
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {['Draft','Published','Scheduled'].map(s => (
                              <Chip key={s} active={s==='Draft'}>{s}</Chip>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Tags</label>
                          <Input defaultValue="news, corporate, logistics" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Schedule</label>
                          <Input type="datetime-local" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* MEDIA LIBRARY */}
            {tab === "media" && (
              <motion.div
                key="media"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="grid gap-6"
              >
                <Card>
                  <CardHeader title="Media Library" subtitle="Upload and manage assets" icon={ImageIcon} />
                  <CardContent>
                    <div className="mb-4 flex justify-between items-center">
                      <Button className={`${colors.gradientMain} text-white`}><Upload className="w-4 h-4" /> Upload Files</Button>
                      <Button className="bg-white border border-gray-200 text-gray-700"><Filter className="w-4 h-4" /> Filters</Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden relative group cursor-pointer border border-gray-100 hover:shadow-md transition">
                          <img src={`https://source.unsplash.com/random/600x400?logistics,port&sig=${i}`} alt="media" className="w-full h-32 object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 text-white text-sm">
                            <Eye className="w-4 h-4" />
                            <Pencil className="w-4 h-4" />
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Floating quick create */}
      <button
        className={`fixed bottom-6 right-6 ${colors.gradientMain} text-white rounded-full w-14 h-14 shadow-lg grid place-items-center`}
        onClick={() => alert("Quick Create: News, Page, Gallery, Video")}
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 pb-10 text-xs text-gray-500">
        <div className="mt-8">© {new Date().getFullYear()} Assyad CMS — sample mock screens</div>
      </div>
    </div>
  );
}
