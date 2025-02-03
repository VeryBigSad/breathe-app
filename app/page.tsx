import BreathingApp from '@/components/breathing-app';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800">
      <div className="w-full bg-gradient-to-b from-violet-500/10 to-transparent pt-12 pb-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
            Сенти ✨
          </h1>
          <p className="text-lg md:text-xl text-violet-700 dark:text-violet-300 font-medium">
            Личный Психолог
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 -mt-24">
        <BreathingApp />
      </div>
    </main>
  );
}