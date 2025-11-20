import { useState, type ComponentType } from 'react';
import './App.css';
import ProtectedCampaignManager from './components/ProtectedCampaignManager';
import ProtectedEmailCampaign from './components/ProtectedEmailCampaign';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import UnifiedDataView from './components/UnifiedDataView';
import { LayoutDashboard, Mail, MessageCircle, BarChart3, Megaphone, BarChart4, Database } from 'lucide-react';
import type { EmailPrefillPayload } from './types/emailPrefill';

type Tab = 'campaigns' | 'emails' | 'analytics' | 'data';

const navItems: Array<{ icon: ComponentType<{ size?: number }>; label: string; tab?: Tab }> = [
  { icon: LayoutDashboard, label: 'Campaign Manager', tab: 'campaigns' },
  { icon: Mail, label: 'Email Campaigns', tab: 'emails' },
  { icon: BarChart3, label: 'Analytics', tab: 'analytics' },
  { icon: Database, label: 'All Data', tab: 'data' },
  { icon: MessageCircle, label: 'WhatsApp' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('campaigns');
  const [emailPrefill, setEmailPrefill] = useState<EmailPrefillPayload | null>(null);

  const handleOpenEmailCampaign = (payload: EmailPrefillPayload) => {
    setEmailPrefill(payload);
    setActiveTab('emails');
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-slate-900 text-white flex-col">
        <div className="px-6 py-8 border-b border-white/10">
          <h1 className="text-2xl font-bold">Email Dashboard</h1>
          <p className="text-sm text-slate-200 mt-1">Marketing Automation</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ icon: Icon, label, tab }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                tab && activeTab === tab
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
              type="button"
              onClick={() => tab && setActiveTab(tab)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-white/10 text-xs text-slate-200">
          © {new Date().getFullYear()} Email Dashboard v1.0.0
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">
                  Send template emails using SendGrid
                </p>
                <h2 className="text-3xl font-bold text-slate-900">Email Marketing</h2>
                <p className="text-slate-500 mt-2">
                  Manage Flashfire&apos;s internal campaigns and keep a private record of each send.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    activeTab === 'campaigns'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  type="button"
                >
                  <Megaphone size={18} />
                  Campaign Manager
                </button>
                <button
                  onClick={() => setActiveTab('emails')}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    activeTab === 'emails'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  type="button"
                >
                  <Mail size={18} />
                  Email Campaigns
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  type="button"
                >
                  <BarChart4 size={18} />
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('data')}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                    activeTab === 'data'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  type="button"
                >
                  <Database size={18} />
                  All Data
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto">
          {activeTab === 'campaigns' && <ProtectedCampaignManager />}
          {activeTab === 'emails' && (
            <ProtectedEmailCampaign
              prefill={emailPrefill}
              onPrefillConsumed={() => setEmailPrefill(null)}
            />
          )}
          {activeTab === 'analytics' && <AnalyticsDashboard onOpenEmailCampaign={handleOpenEmailCampaign} />}
          {activeTab === 'data' && <UnifiedDataView onOpenEmailCampaign={handleOpenEmailCampaign} />}
        </section>
      </main>
    </div>
  );
}

export default App;

