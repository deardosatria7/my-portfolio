export interface AchievementData {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export function unlockAchievement(
  id: string,
  icon: string,
  title: string,
  desc: string
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<AchievementData>("achievement", {
      detail: { id, icon, title, desc },
    })
  );
}
