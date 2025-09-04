"use client";
import { useEffect, useRef } from "react";

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const paddleHeight = 40;
    const paddleWidth = 8;
    let playerY = height / 2 - paddleHeight / 2;
    let enemyY = height / 2 - paddleHeight / 2;

    let ballX = width / 2;
    let ballY = height / 2;
    const ballRadius = 4;
    let ballSpeedX = 2;
    let ballSpeedY = 2;

    const drawRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      color: string
    ) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    };

    const drawBall = (x: number, y: number, r: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCenterLine = () => {
      ctx.strokeStyle = "#444";
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const resetBall = () => {
      ballX = width / 2;
      ballY = height / 2;
      ballSpeedX = -ballSpeedX;
      ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1);
    };

    const update = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce atas/bawah
      if (ballY - ballRadius < 0 || ballY + ballRadius > height) {
        ballSpeedY = -ballSpeedY;
      }

      // Bounce paddle kiri (kamu)
      if (
        ballX - ballRadius < paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
      ) {
        ballSpeedX = -ballSpeedX;
      }

      // Bounce paddle kanan (musuh)
      if (
        ballX + ballRadius > width - paddleWidth &&
        ballY > enemyY &&
        ballY < enemyY + paddleHeight
      ) {
        ballSpeedX = -ballSpeedX;
      }

      // Reset bola jika keluar
      if (ballX + ballRadius > width || ballX - ballRadius < 0) {
        resetBall();
      }

      // AI musuh (lemah)
      const enemyCenter = enemyY + paddleHeight / 2;
      if (enemyCenter < ballY - 10) {
        enemyY += 2; // Lebih lambat
      } else if (enemyCenter > ballY + 10) {
        enemyY -= 2;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawCenterLine();
      drawRect(0, playerY, paddleWidth, paddleHeight, "#ccc");
      drawRect(width - paddleWidth, enemyY, paddleWidth, paddleHeight, "#ccc");
      drawBall(ballX, ballY, ballRadius, "#ccc");
    };

    const gameLoop = () => {
      update();
      render();
      requestAnimationFrame(gameLoop);
    };

    // Mouse & Touch support
    const movePlayer = (y: number) => {
      playerY = y - paddleHeight / 2;
      if (playerY < 0) playerY = 0;
      if (playerY + paddleHeight > height) playerY = height - paddleHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      movePlayer(e.clientY - rect.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touchY = e.touches[0].clientY - rect.top;
      movePlayer(touchY);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);

    gameLoop();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="mt-36 text-center">
      <p className="mb-2 text-sm text-neutral-400">
        🎮 Bonus: Try beat me at Pong!
      </p>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="border border-neutral-700 rounded bg-black mx-auto touch-none"
      />
    </div>
  );
}
