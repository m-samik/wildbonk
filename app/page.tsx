"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WildBonkLanding() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("walletAddress");
    if (stored) setWalletAddress(stored);

    const launchDate = new Date("2025-08-01T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setCountdown("Launched!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

const connectWallet = async () => {
  try {
    // Check for Solana (Phantom)
    if (typeof window !== "undefined" && window.solana && window.solana.isPhantom) {
      const res = await window.solana.connect();
      const addr = res.publicKey.toString();
      setWalletAddress(addr);
      localStorage.setItem("walletAddress", addr);
    }

    // Else check for MetaMask (Ethereum)
    else if (typeof window !== "undefined" && window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const addr = accounts[0];
      setWalletAddress(addr);
      localStorage.setItem("walletAddress", addr);
    }

    // None installed
    else {
      alert("No compatible wallet found. Please install Phantom or MetaMask.");
    }
  } catch (e: any) {
    console.error("Wallet connection failed:", e.message || e);
    alert("Failed to connect wallet. Check console for details.");
  }
};


  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-300 to-yellow-200 text-[#1A1A1A] font-sans relative overflow-x-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] bg-yellow-300 rounded-full blur-2xl"
      />

      {/* Floating Mascot Animation Top Left */}
      <motion.div animate={{ y: [0, -50, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-6 left-6 z-10">
        <Image src="/images/wildbonk-mascot.png" alt="Mascot" width={300} height={300} />
      </motion.div>

      {/* Floating Mascot Animation Bottom Right */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 3, repeat: Infinity }} className="fixed bottom-8 right-6 z-10">
        <Image src="/images/wildbonk-mascot.png" alt="Mascot" width={200} height={200} />
      </motion.div>

      <section className="text-center py-24 px-6 relative z-10">
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1 }}>
          <Image
            src="/images/wildbonk-logo.png"
            alt="Wild Bonk Logo"
            width={130}
            height={130}
            className="mx-auto mb-6 rounded-full border-4 border-white shadow-xl"
          />
        </motion.div>
        <motion.h1 className="text-7xl sm:text-8xl font-extrabold text-white drop-shadow-[0_5px_15px_rgba(255,165,0,0.9)] tracking-tight" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
          WILD BONK
        </motion.h1>
        <motion.p className="text-lg mt-4 text-white/80 max-w-xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          The wildest meme coin on Solana. No presale. No leash. Just vibes.
        </motion.p>
        <div className="mt-4 text-white font-semibold text-md">Launch in: {countdown}</div>
        <div className="mt-8 flex justify-center flex-wrap gap-4 z-10 relative">
          <Link href="#tokenomics">
            <motion.button whileHover={{ scale: 1.1 }} className="bg-orange-500 text-white px-6 py-3 rounded-full shadow">
              Tokenomics
            </motion.button>
          </Link>
          <Link href="#game">
            <motion.button whileHover={{ scale: 1.1 }} className="bg-orange-700 text-white px-6 py-3 rounded-full shadow">
              Play a Game
            </motion.button>
          </Link>
          <Link href="https://t.me/wildbonk" target="_blank">
            <motion.button whileHover={{ scale: 1.1 }} className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold shadow">
              Join Community
            </motion.button>
          </Link>
          <motion.button
            onClick={connectWallet}
            whileHover={{ scale: 1.1 }}
            className="bg-black text-white px-6 py-3 rounded-full shadow font-semibold"
          >
            {walletAddress ? `Connected: ${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
          </motion.button>
        </div>
       
      </section>

      <section id="tokenomics" className="bg-white py-24 px-6 text-center z-10 relative">
        <h2 className="text-5xl font-bold mb-12 text-orange-600">Tokenomics</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {["🚀 1B Supply", "🧑‍🤝‍🧑 100% Fair Launch", "🔥 Burn Mechanism", "💰 Liquidity Locked"].map((item, i) => {
            const [emoji, ...titleWords] = item.split(" ");
            return (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-orange-100 p-6 rounded-xl shadow-md hover:shadow-lg">
                <div className="text-4xl mb-4 animate-pulse">{emoji}</div>
                <h3 className="text-xl font-semibold text-orange-600">{titleWords.join(" ")}</h3>
                <p className="text-sm mt-2 text-gray-700">
                  {i === 0 && "Total fixed supply of 1,000,000,000 $WBONK tokens."}
                  {i === 1 && "No presale, no team tokens, just pure community."}
                  {i === 2 && "Tokens burned to reward holders and reduce supply."}
                  {i === 3 && "Liquidity locked forever, no rug pulls here."}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="game" className="bg-orange-50 py-24 px-6 text-center z-10 relative">
        <h2 className="text-4xl font-bold mb-6 text-orange-700">Mini Game (Coming Soon)</h2>
        <p className="max-w-xl mx-auto text-gray-700">We're building something fun and wild. A play-to-earn mini game that'll blow your mind. Stay tuned!</p>
      </section>

      <footer className="bg-gradient-to-tr from-orange-700 via-orange-600 to-orange-500 text-white px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-bold mb-3">Wild Bonk</h3>
            <ul className="space-y-2">
              <li><Link href="#">Home</Link></li>
              <li><Link href="#tokenomics">Tokenomics</Link></li>
              <li><Link href="#game">Play</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Community</h3>
            <ul className="space-y-2">
              <li><Link href="https://t.me/wildbonk" target="_blank">Telegram</Link></li>
              <li><Link href="https://x.com/wildbonk" target="_blank">X</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Info</h3>
            <ul className="space-y-2">
              <li>Docs</li>
              <li>Whitepaper</li>
              <li>CA: Coming Soon 📜</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-sm text-center">&copy; {new Date().getFullYear()} Wild Bonk. All rights reserved.</div>
      </footer>
    </main>
  );
}
