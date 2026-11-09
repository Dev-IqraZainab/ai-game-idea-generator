/**
 * Offline game-idea generator.
 * Combines curated design building blocks so the app works with no API key.
 * Exposes a single global: GameIdeaGenerator.
 */
const GameIdeaGenerator = (() => {
  const titleParts = {
    prefix: ["Super", "Tiny", "Neon", "Lost", "Hyper", "Cosmic", "Pocket", "Mega", "Shadow", "Turbo"],
    suffix: ["Rush", "Quest", "Dash", "Legends", "Tycoon", "Drift", "Party", "Escape", "Saga", "Frenzy"],
  };

  const mechanics = {
    "Hyper-casual": ["one-tap timing jumps", "swipe to stack and balance", "hold to charge, release to launch", "drag to draw a path"],
    "Puzzle": ["merge three of a kind", "rotate tiles to connect paths", "sort objects by color", "slide blocks to free the hero"],
    "Endless runner": ["lane switching with power-up magnets", "wall-running and double jumps", "gravity flip on tap", "speed boosts from near misses"],
    "Idle / Tycoon": ["auto-producing workers you upgrade", "prestige resets for permanent bonuses", "offline earnings", "managers that automate stations"],
    "Platformer": ["wall-jumps and dashes", "time-rewind on death", "grappling hook swings", "shrink and grow to solve rooms"],
    "Roguelike": ["random rooms with relic builds", "permadeath with meta-upgrades", "deck-building attacks", "risk/reward cursed items"],
  };

  const twists = [
    "the level is slowly sinking, so keep moving",
    "every 30 seconds the controls flip",
    "your shadow copies your last 5 seconds of moves",
    "music beats control the obstacle timing",
    "day/night cycle changes enemy behaviour",
    "you can rewind once per level",
    "the world is built from player-made levels",
  ];

  const monetization = {
    "Mobile": ["rewarded ads for extra lives", "cosmetic skins shop", "battle pass with seasonal themes"],
    "Web (WebGL)": ["ads on portals like CrazyGames/Poki", "premium unlock of bonus levels"],
    "PC": ["premium price on Steam/itch.io", "cosmetic DLC packs"],
    "VR / Metaverse": ["sell land-themed cosmetics as NFTs", "paid private rooms/events"],
  };

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function generate({ theme, genre, platform }) {
    const t = (theme || "space").trim();
    const mech = mechanics[genre] || mechanics["Hyper-casual"];
    const firstWord = capitalize(t.split(/\s+/)[0]);

    return {
      title: `${pick(titleParts.prefix)} ${firstWord} ${pick(titleParts.suffix)}`,
      tagline: `A ${genre.toLowerCase()} game about ${t} for ${platform}.`,
      coreLoop: [
        `Core mechanic: ${pick(mech)}.`,
        `Twist: ${pick(twists)}.`,
        `Collect ${t}-themed items to unlock new characters and worlds.`,
      ],
      features: [
        `3 handcrafted ${t} worlds with rising difficulty`,
        "Daily challenge with a global leaderboard",
        "Juicy feedback: screen shake, particles, haptics",
      ],
      monetization: (monetization[platform] || monetization["Mobile"]).slice(0, 2),
      mvpScope: "1 world · 15 levels · 1 character · 2-week prototype in Unity",
      tags: [genre, platform, capitalize(t), "Prototype-ready"],
      source: "offline",
    };
  }

  return { generate };
})();
