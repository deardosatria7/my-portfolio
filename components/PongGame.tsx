"use client";
import { useEffect, useRef } from "react";

type Difficulty = "easy" | "medium" | "hard";

interface PongGameProps {
  difficulty?: Difficulty;
  // fine-grained overrides — take precedence over difficulty preset
  aiSpeed?: number;
  ballSpeed?: number;
  ballAcceleration?: number; // added to ball speed on each paddle hit
}

const PRESETS: Record<Difficulty, { aiSpeed: number; ballSpeed: number; ballAcceleration: number }> = {
  easy:   { aiSpeed: 1.2, ballSpeed: 2,   ballAcceleration: 0 },
  medium: { aiSpeed: 1.9, ballSpeed: 2.5, ballAcceleration: 0.15 },
  hard:   { aiSpeed: 2.8, ballSpeed: 3.2, ballAcceleration: 0.3 },
};

export default function PongGame({
  difficulty = "medium",
  aiSpeed,
  ballSpeed,
  ballAcceleration,
}: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const preset = PRESETS[difficulty];
  const cfg = {
    aiSpeed:          aiSpeed          ?? preset.aiSpeed,
    ballSpeed:        ballSpeed        ?? preset.ballSpeed,
    ballAcceleration: ballAcceleration ?? preset.ballAcceleration,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width  = canvas.width;
    const height = canvas.height;

    const paddleHeight = 40;
    const paddleWidth  = 8;
    const ballRadius   = 4;

    let playerY    = height / 2 - paddleHeight / 2;
    let enemyY     = height / 2 - paddleHeight / 2;
    let ballX      = width  / 2;
    let ballY      = height / 2;
    let ballSpeedX = cfg.ballSpeed;
    let ballSpeedY = cfg.ballSpeed;
    let playerScore = 0;
    let enemyScore  = 0;
    let rafId       = 0;

    const resetBall = (direction: number) => {
      ballX      = width  / 2;
      ballY      = height / 2;
      ballSpeedX = cfg.ballSpeed * direction;
      ballSpeedY = cfg.ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    };

    const update = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Wall bounce top/bottom
      if (ballY - ballRadius < 0 || ballY + ballRadius > height) {
        ballSpeedY = -ballSpeedY;
      }

      // Player paddle (left)
      if (
        ballX - ballRadius < paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
      ) {
        ballSpeedX = Math.abs(ballSpeedX) + cfg.ballAcceleration;
      }

      // Enemy paddle (right)
      if (
        ballX + ballRadius > width - paddleWidth &&
        ballY > enemyY &&
        ballY < enemyY + paddleHeight
      ) {
        ballSpeedX = -(Math.abs(ballSpeedX) + cfg.ballAcceleration);
      }

      // Score
      if (ballX - ballRadius < 0) {
        enemyScore++;
        resetBall(1);
      }
      if (ballX + ballRadius > width) {
        playerScore++;
        resetBall(-1);
      }

      // AI tracking with deadzone
      const enemyCenter = enemyY + paddleHeight / 2;
      if (enemyCenter < ballY - 8) enemyY += cfg.aiSpeed;
      else if (enemyCenter > ballY + 8) enemyY -= cfg.aiSpeed;
      enemyY = Math.max(0, Math.min(height - paddleHeight, enemyY));
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Center line
      ctx.strokeStyle = "#333";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Paddles
      ctx.fillStyle = "#ccc";
      ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
      ctx.fillRect(width - paddleWidth, enemyY, paddleWidth, paddleHeight);

      // Ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();

      // Score
      ctx.fillStyle = "#888";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${playerScore}`, width / 4, 20);
      ctx.fillText(`${enemyScore}`, (3 * width) / 4, 20);
    };

    const loop = () => {
      update();
      render();
      rafId = requestAnimationFrame(loop);
    };

    const movePlayer = (y: number) => {
      playerY = Math.max(0, Math.min(height - paddleHeight, y - paddleHeight / 2));
    };

    const onMouseMove = (e: MouseEvent) => {
      movePlayer(e.clientY - canvas.getBoundingClientRect().top);
    };
    const onTouchMove = (e: TouchEvent) => {
      movePlayer(e.touches[0].clientY - canvas.getBoundingClientRect().top);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, [cfg.aiSpeed, cfg.ballSpeed, cfg.ballAcceleration]);

  return (
    <div className="text-center">
      <p className="mb-2 text-sm text-neutral-400">
        🎮 Try beat me at Pong!
        <span className="ml-2 text-xs text-neutral-600 capitalize">[{difficulty}]</span>
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
