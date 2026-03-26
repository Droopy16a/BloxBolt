export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200/70 bg-white dark:border-white/10 dark:bg-[#050505]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                Blox<span className="text-violet-500">Bolt</span>
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-white/60 max-w-xs">
              Unified security automation for hybrid environments, designed for fast-moving teams.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/50 mb-6">
              Get Help
            </h3>
            <ul className="space-y-4 text-sm text-neutral-600 dark:text-white/60">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Buy Gift Cards</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Sell on BloxBolt</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Create a business account</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Promotions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-white/50 mb-6">
              Legal
            </h3>
            <ul className="space-y-4 text-sm text-neutral-600 dark:text-white/60">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Guidelines</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200/70 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 dark:text-white/50 gap-4">
          <p>&copy; {new Date().getFullYear()} BloxBolt.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Pricing</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
