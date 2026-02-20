import { Code, Database, KeyRound, Sparkles } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-4xl font-bold">You&apos;re up and running!</h1>
        <p className="text-muted-foreground mt-2">
          Your vibe-stack app is ready. Start building something cool.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <QuickLink
          icon={<Code className="h-5 w-5" />}
          title="Add a page"
          description="Create a new file in src/app/ — it becomes a route automatically."
        />
        <QuickLink
          icon={<Database className="h-5 w-5" />}
          title="Connect a database"
          description="Set DATABASE_URL in .env.development.local and you're good to go."
        />
        <QuickLink
          icon={<KeyRound className="h-5 w-5" />}
          title="Add auth"
          description="Sign up at clerk.com, add your keys to .env, and auth just works."
        />
        <QuickLink
          icon={<Sparkles className="h-5 w-5" />}
          title="Add AI"
          description="Set OPENAI_API_KEY or ANTHROPIC_API_KEY and start generating."
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Check out the README for platform guides, decision trees, and more.
      </p>
    </div>
  );
}

function QuickLink({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center gap-2 font-medium">
        {icon}
        {title}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
