'use client';

import Image from "next/image";
import React from "react";

export default function WildBonkSite() {
  return (
    <div className="min-h-screen bg-orange-100 text-black font-sans">
      <header className="bg-orange-500 text-white p-6 shadow-xl text-center">
        <Image
          src="/images/wildbonk-logo.png"
          alt="Wild Bonk Logo"
          width={160} // 40 × 4 = 160px
          height={160}
          className="mx-auto rounded-full border-4 border-white mb-2"
        />

        <h1 className="text-4xl font-bold">🐾 Wild Bonk (WBONK)</h1>
        <p className="mt-2 text-lg">Unleash the Chaos. Meme Hard. Bonk Wilder.</p>
      </header>


      <main className="p-6 grid gap-6 max-w-5xl mx-auto">
        {/* WHAT IS WILD BONK */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-orange-500">What is Wild Bonk?</h2>
          <p>
            <strong>Wild Bonk (WBONK)</strong> is the feral cousin of BONK — more hype, more energy, and pure meme
            chaos.It&rsquo;s a token built for the bold, born from the meme revolution, and ready to take over the
            crypto jungle. Community-powered. No rules. Just vibes.
          </p>
        </div>

        {/* TOKENOMICS */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-orange-500">Tokenomics</h2>
          <ul className="list-disc list-inside">
            <li>🔥 Total Supply: 1,000,000,000 WBONK</li>
            <li>💥 No Presale – 100% Fair Launch</li>
            <li>🧠 Community-Driven Governance</li>
            <li>🎁 10% Airdrops & Giveaways</li>
          </ul>
        </div>

        {/* HOW TO BUY */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2 text-orange-500">How to Buy</h2>
          <ol className="list-decimal list-inside">
            <li>Connect your wallet (Phantom/Solana or MetaMask depending on chain).</li>
            <li>Go to Raydium / Uniswap / PancakeSwap (as applicable).</li>
            <li>Paste WBONK token address and swap your tokens.</li>
            <li>Bonk wild. Meme harder. Repeat.</li>
          </ol>
        </div>

        {/* JOIN COMMUNITY */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-orange-500">Join the Wild Pack</h2>
          <p className="mb-4">
            Follow us on Twitter, join the Telegram, and spread the wild meme energy. Together, we go wilder.
          </p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl transition"
            onClick={() => {
              const bark = new Audio('/sounds/dogbarking.mp3'); // Path to your sound file
              bark.play();
              window.open('https://t.me/wildbonk', '_blank'); // Replace with your real link
            }}
            title="Join our wild community!"
          >
            Join Community
          </button>

        </div>
      </main>

      <footer className="bg-orange-500 text-white text-center p-4 mt-6">
        <p>&copy; {new Date().getFullYear()} Wild Bonk | Unleash the Chaos. Meme Hard. Bonk Wilder.</p>

        {/* Copyable Token Address */}
        <div
          className="mt-2 flex items-center justify-center gap-2 text-sm text-white cursor-pointer hover:text-yellow-200 transition"
          onClick={() => {
            const bark = new Audio('/sounds/dogbarking.mp3'); // Path to your sound file
            bark.play();
            navigator.clipboard.writeText('COMING SOON');
          }}
          title="Click to copy token address"
        >
          <span>CA: COMING SOON</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8m-4-4h4m-6 4v-4m-2 0H4v6a2 2 0 002 2h6v-2H6v-6zM16 4h2a2 2 0 012 2v12a2 2 0 01-2 2h-2M8 4h8v4H8z" />
          </svg>
        </div>

        {/* Social Links */}
        <div className="mt-3 flex items-center justify-center gap-4">
          {/* X / Twitter */}
          <a
            href="https://x.com/wildbonk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-200 transition"
            title="Follow us on X"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.6 3H4.4A1.4 1.4 0 003 4.4v15.2A1.4 1.4 0 004.4 21h15.2a1.4 1.4 0 001.4-1.4V4.4A1.4 1.4 0 0019.6 3zM16.95 16h-1.33l-2.24-3.02L10.9 16H9.44l3.09-4.14L9.62 8h1.38l2.06 2.77L15.15 8h1.34l-3.02 4.04L16.95 16z" />
            </svg>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/wildbonk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-200 transition"
            title="Join us on Telegram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 0012 12 12 12 0 0012-12C24 5.373 18.627 0 12 0zm5.308 7.801l-1.659 7.82c-.126.563-.456.7-.923.435l-2.55-1.88-1.23 1.185c-.136.136-.25.25-.511.25l.184-2.607 4.756-4.295c.207-.184-.045-.287-.322-.104l-5.884 3.706-2.53-.79c-.549-.172-.561-.549.114-.812l9.898-3.818c.46-.172.86.104.714.794z" />
            </svg>
          </a>
        </div>
      </footer>


    </div>
  );
}
