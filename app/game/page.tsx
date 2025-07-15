"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Coin = {
  x: number;
  y: number;
};

type Player = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function BonkGamePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const player = useRef<Player | null>(null);
  const coins = useRef<Coin[]>([]);
  const score = useRef<number>(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [displayHighScore, setDisplayHighScore] = useState(0);
  const gameOver = useRef<boolean>(false);
  const catchSoundRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedScore = localStorage.getItem("highScore");
    if (storedScore) {
      setDisplayHighScore(parseInt(storedScore, 10));
    }
  }, []);

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coinImage = new window.Image();
    const bucketImage = new window.Image();
    coinImage.src = "/images/wildbonk-coin.png";
    bucketImage.src = "/images/bucket.png";

    canvas.width = 600;
    canvas.height = 400;
    player.current = { x: 250, y: 340, width: 140, height: 70 };
    coins.current = [];
    score.current = 0;
    gameOver.current = false;
    setDisplayScore(0);

    const drawPlayer = () => {
      if (player.current) {
        ctx.drawImage(bucketImage, player.current.x, player.current.y, player.current.width, player.current.height);
      }
    };

    const drawCoins = () => {
      coins.current.forEach((coin) => {
        ctx.drawImage(coinImage, coin.x - 30, coin.y - 30, 60, 60);
      });
    };

    const updateCoins = () => {
      for (let i = coins.current.length - 1; i >= 0; i--) {
        coins.current[i].y += 4;
        if (coins.current[i].y > canvas.height) {
          coins.current.splice(i, 1);
        } else if (
          player.current &&
          coins.current[i].x > player.current.x &&
          coins.current[i].x < player.current.x + player.current.width &&
          coins.current[i].y > player.current.y
        ) {
          coins.current.splice(i, 1);
          score.current++;
          setDisplayScore(score.current);

          if (score.current > displayHighScore) {
            setDisplayHighScore(score.current);
            localStorage.setItem("highScore", score.current.toString());
          }

          if (catchSoundRef.current) {
            catchSoundRef.current.currentTime = 0;
            catchSoundRef.current.play();
          }
        }
      }
    };

    const drawScore = () => {
      ctx.fillStyle = "#1A1A1A";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score.current}`, 10, 30);
      ctx.fillText(`High Score: ${displayHighScore}`, 10, 60);
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.05) {
        coins.current.push({ x: Math.random() * 580 + 10, y: 0 });
      }
      updateCoins();
      drawCoins();
      drawPlayer();
      drawScore();
      if (!gameOver.current) requestAnimationFrame(loop);
    };

    document.onkeydown = (e) => {
      if (!player.current) return;
      if (e.key === "ArrowLeft" && player.current.x > 0) {
        player.current.x -= 20;
      } else if (e.key === "ArrowRight" && player.current.x < canvas.width - player.current.width) {
        player.current.x += 20;
      }
    };

    loop();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-300 to-yellow-200 text-[#1A1A1A] font-sans relative overflow-x-hidden">
      <audio ref={catchSoundRef} src="/sounds/click.wav" preload="auto" />

      <section id="game" className="bg-orange-50 py-24 px-6 text-center z-10 relative">
        <div className="flex justify-center mb-6">
          <Image src="/images/wildbonk-logo.png" alt="WildBonk Logo" width={180} height={180} className="rounded-full shadow-md" />
        </div>
        <h2 className="text-4xl font-bold mb-6 text-orange-700">🎮 Bonk Catch Game</h2>
        <p className="max-w-xl mx-auto text-gray-700 mb-4">
          Catch the WildBonk coins in the bucket! Use ← and → to move the bucket. Turn up the volume for the bonks!
        </p>
        <div className="flex justify-center">
          <canvas ref={canvasRef} className="border-4 border-orange-300 rounded shadow-xl bg-orange-100" />
        </div>
        <button
          onClick={startGame}
          className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-full text-lg shadow hover:scale-105 transition-transform"
        >
          Start Game
        </button>
        <p className="mt-4 text-gray-600 text-sm">Your score: {displayScore} | High score: {displayHighScore}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-gray-800 text-white px-5 py-2 rounded-full text-sm hover:bg-gray-700"
        >
          ← Back to Home
        </button>
      </section>

      <footer className="bg-gradient-to-tr from-orange-700 via-orange-600 to-orange-500 text-white px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-bold mb-3">Wild Bonk</h3>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#tokenomics">Tokenomics</Link></li>
              <li><Link href="/#game">Play</Link></li>
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
