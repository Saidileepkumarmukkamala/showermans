
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'sonner';

// Check if Supabase credentials are missing
const missingSupabaseCredentials = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

const AppWithWarningBanner = () => (
  <>
    <App />
    <Toaster position="top-right" />
    {missingSupabaseCredentials && (
      <div className="fixed bottom-0 w-full bg-amber-500 text-white p-2 text-center z-50">
        <p>⚠️ Missing Supabase credentials. Authentication and database features won't work. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.</p>
      </div>
    )}
  </>
);

createRoot(document.getElementById("root")!).render(<AppWithWarningBanner />);
