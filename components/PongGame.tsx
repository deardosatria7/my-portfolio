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

    let playerScore = 0;
    let enemyScore = 0;

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

    const drawScore = () => {
      ctx.fillStyle = "#ccc";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${playerScore}`, width / 4, 20); // kiri
      ctx.fillText(`${enemyScore}`, (3 * width) / 4, 20); // kanan
    };

    const resetBall = (direction: number) => {
      ballX = width / 2;
      ballY = height / 2;
      ballSpeedX = 2 * direction; // arah bola tergantung siapa yang kebobolan
      ballSpeedY = 2 * (Math.random() > 0.5 ? 1 : -1);
    };

    const update = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce atas/bawah
      if (ballY - ballRadius < 0 || ballY + ballRadius > height) {
        ballSpeedY = -ballSpeedY;
      }

      // Bounce paddle kiri (player)
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

      // Reset bola + tambah skor
      if (ballX - ballRadius < 0) {
        enemyScore++;
        resetBall(1); // arah ke kanan
      }
      if (ballX + ballRadius > width) {
        playerScore++;
        resetBall(-1); // arah ke kiri
      }

      // AI musuh (lemah)
      const enemyCenter = enemyY + paddleHeight / 2;
      if (enemyCenter < ballY - 10) {
        enemyY += 1.6; // Lebih lambat
      } else if (enemyCenter > ballY + 10) {
        enemyY -= 1.6;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawCenterLine();
      drawRect(0, playerY, paddleWidth, paddleHeight, "#ccc");
      drawRect(width - paddleWidth, enemyY, paddleWidth, paddleHeight, "#ccc");
      drawBall(ballX, ballY, ballRadius, "#ccc");
      drawScore();
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
    <div className="mt-20 text-center">
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
