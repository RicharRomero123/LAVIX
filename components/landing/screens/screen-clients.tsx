"use client";

export const ScreenClients = () => (
  <div className="w-full h-full bg-slate-50 flex flex-col font-sans select-none">
    <div className="bg-indigo-600 p-5 pt-8 shadow-lg relative z-10">
      <p className="text-white font-bold text-sm">Top Clientes</p>
    </div>
    <div className="flex-1 p-4 space-y-3 bg-slate-50 relative z-0">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-100 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">
            {String.fromCharCode(64 + i)}
          </div>
          <div className="flex-1">
            <div className="h-2 w-20 bg-slate-200 rounded mb-1" />
            <div className="h-1.5 w-12 bg-slate-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);