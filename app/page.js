export default function App() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className='text-8xl text-slate-900 font-[family-name:var(--font-geist-mono)]'><strong>Alzheimer&apos;s and Dyslexia</strong></h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 text-slate-900">Sample list 1</li>
          <li className="text-slate-900">Sample list 2</li>
        </ol>
        <div className="text-slate-900 flex gap-4 items-center flex-col sm:flex-row">
        section
        </div>
      </main>
    </div>
  );
}
