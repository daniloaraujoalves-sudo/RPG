// ============================================================
// DADOS
// ============================================================

const CLASSES = {
  warrior: {
    name: 'Guerreiro', icon: '🛡️', hp: 120, mp: 30, atk: 14, def: 8, spd: 5, mag: 1, luk: 3,
    skill: { name: 'Golpe Brutal', cost: 10, desc: 'Ataque poderoso causando 2x dano', fn: 'brutalStrike' },
    weapon: { id: 'sword_iron', name: 'Espada de Ferro', icon: '⚔️', type: 'weapon', atk: 5, desc: 'Uma espada confiável.', val: 20 },
    attacks: [
      { name: 'Espadada', dmgMult: 1.0, mpCost: 0, desc: 'Ataque padrão', icon: '⚔️' },
      { name: 'Golpe Devastador', dmgMult: 1.5, mpCost: 8, desc: 'Força bruta! +50% dano', icon: '💥' },
      { name: 'Escudo-Golpe', dmgMult: 0.8, mpCost: 0, def_bonus: 3, desc: 'Defesa +3 nesse turno', icon: '🛡️' },
      { name: 'Berserker', dmgMult: 2.0, mpCost: 0, self_dmg: 5, desc: '2x dano, recebe 5 de dano', icon: '🩸' },
    ],
    skills: [
      { name: 'Golpe Brutal', fn: 'brutalStrike', cost: 10, desc: 'Causa 2× ATK de dano' },
      { name: 'Grito de Guerra', fn: 'warCry', cost: 15, desc: 'Cura 20 HP e aumenta ATK' },
      { name: 'Escudo Divino', fn: 'divineShield', cost: 20, desc: 'Reduz próx. dano em 80%' },
    ]
  },
  mage: {
    name: 'Mago', icon: '🔮', hp: 70, mp: 80, atk: 6, def: 3, spd: 5, mag: 12, luk: 4,
    skill: { name: 'Bola de Fogo', cost: 15, desc: 'Queima todos os inimigos', fn: 'fireball' },
    weapon: { id: 'staff_oak', name: 'Cajado de Carvalho', icon: '🪄', type: 'weapon', atk: 2, mag: 8, desc: 'Amplia o poder arcano.', val: 25 },
    attacks: [
      { name: 'Raio Arcano', dmgMult: 1.0, mpCost: 0, desc: 'Descarga mágica básica', icon: '⚡' },
      { name: 'Míssil Mágico', dmgMult: 1.3, mpCost: 6, desc: '+30% dano, usa MAG', icon: '✨' },
      { name: 'Flecha de Gelo', dmgMult: 0.9, mpCost: 5, slow: true, desc: 'Reduz ATK inimigo', icon: '❄️' },
      { name: 'Relâmpago', dmgMult: 1.8, mpCost: 14, desc: '1.8× dano mágico puro', icon: '⚡' },
    ],
    skills: [
      { name: 'Bola de Fogo', fn: 'fireball', cost: 15, desc: 'Atinge TODOS os inimigos' },
      { name: 'Drenagem', fn: 'drain', cost: 12, desc: 'Rouba vida de 1 inimigo' },
      { name: 'Meteoro', fn: 'meteor', cost: 30, desc: '3× MAG em todos os inimigos' },
    ]
  },
  rogue: {
    name: 'Ladino', icon: '🗡️', hp: 85, mp: 45, atk: 12, def: 4, spd: 9, mag: 2, luk: 8,
    skill: { name: 'Ataque Furtivo', cost: 12, desc: 'Ignora defesa e causa dano crítico', fn: 'shadowStrike' },
    weapon: { id: 'dagger_swift', name: 'Adaga Veloz', icon: '🗡️', type: 'weapon', atk: 4, spd: 3, desc: 'Afiada como a morte.', val: 22 },
    attacks: [
      { name: 'Punhalada', dmgMult: 1.0, mpCost: 0, desc: 'Ataque rápido básico', icon: '🗡️' },
      { name: 'Golpe Duplo', dmgMult: 0.8, hits: 2, mpCost: 0, desc: '2 ataques de 80%', icon: '⚡' },
      { name: 'Veneno', dmgMult: 0.6, mpCost: 8, poison: true, desc: 'Envenena o alvo', icon: '🐍' },
      { name: 'Emboscada', dmgMult: 2.5, mpCost: 12, desc: '2.5× dano, ignora 50% DEF', icon: '👻' },
    ],
    skills: [
      { name: 'Ataque Furtivo', fn: 'shadowStrike', cost: 12, desc: 'Ignora DEF, dano crítico' },
      { name: 'Fumaça', fn: 'smokeScreen', cost: 10, desc: 'Evade próx. 2 ataques' },
      { name: 'Golpe Mortal', fn: 'deathBlow', cost: 25, desc: 'Chance de matar instante' },
    ]
  }
};

const MONSTERS = {
  rat:       { name: 'Rato Gigante',     icon: '🐀', hp: 15,  atk: 4,  def: 0,  xp: 5,   gold: 2,   drops: ['potion_minor'] },
  skeleton:  { name: 'Esqueleto',        icon: '💀', hp: 28,  atk: 8,  def: 2,  xp: 12,  gold: 5,   drops: ['potion_minor','bone_shard'] },
  goblin:    { name: 'Goblin',           icon: '👺', hp: 22,  atk: 7,  def: 1,  xp: 10,  gold: 8,   drops: ['gold_pouch','potion_minor'] },
  spider:    { name: 'Aranha Venenosa',  icon: '🕷️', hp: 18,  atk: 9,  def: 1,  xp: 9,   gold: 4,   drops: ['venom_fang'] },
  zombie:    { name: 'Zumbi',            icon: '🧟', hp: 40,  atk: 10, def: 3,  xp: 18,  gold: 6,   drops: ['potion_minor','rotten_flesh'] },
  golem:     { name: 'Golem de Pedra',   icon: '🗿', hp: 65,  atk: 14, def: 8,  xp: 30,  gold: 15,  drops: ['stone_core','potion_major'] },
  vampire:   { name: 'Vampiro',          icon: '🧛', hp: 55,  atk: 16, def: 5,  xp: 35,  gold: 20,  drops: ['blood_vial','potion_major'] },
  werewolf:  { name: 'Lobisomem',        icon: '🐺', hp: 60,  atk: 18, def: 4,  xp: 40,  gold: 18,  drops: ['wolf_pelt','potion_major'] },
  demon:     { name: 'Demônio',          icon: '😈', hp: 80,  atk: 20, def: 7,  xp: 50,  gold: 30,  drops: ['demon_heart','potion_major'] },
  lich:      { name: 'Lich',             icon: '👻', hp: 100, atk: 18, def: 10, xp: 60,  gold: 40,  drops: ['soul_gem','arcane_tome'] },
  banshee:   { name: 'Banshee',          icon: '💨', hp: 45,  atk: 22, def: 2,  xp: 45,  gold: 22,  drops: ['spirit_essence'] },
  troll:     { name: 'Troll',            icon: '👹', hp: 90,  atk: 16, def: 6,  xp: 55,  gold: 25,  drops: ['troll_blood','stone_core'] },
  dragon:    { name: 'Dragão das Sombras', icon: '🐉', hp: 200, atk: 28, def: 15, xp: 150, gold: 100, drops: ['dragon_scale','legendary_blade','potion_major'], isBoss: true },
};

const ITEMS = {
  // Consumíveis
  potion_minor:    { name: 'Poção Menor',      icon: '🧪', type: 'consumable', heal: 25,  desc: 'Restaura 25 HP.', val: 10, rarity: 'comum' },
  potion_major:    { name: 'Poção Maior',      icon: '⚗️', type: 'consumable', heal: 60,  desc: 'Restaura 60 HP.', val: 30, rarity: 'incomum' },
  elixir_life:     { name: 'Elixir da Vida',   icon: '💖', type: 'consumable', heal: 999, desc: 'Cura completamente!', val: 80, rarity: 'raro' },
  mana_crystal:    { name: 'Cristal de Mana',  icon: '💠', type: 'consumable', mp: 30,    desc: 'Restaura 30 MP.', val: 20, rarity: 'comum' },
  mana_elixir:     { name: 'Elixir de Mana',   icon: '🫧', type: 'consumable', mp: 999,   desc: 'Restaura toda a mana!', val: 60, rarity: 'raro' },

  // Misc (drops)
  gold_pouch:      { name: 'Bolsa de Ouro',    icon: '💰', type: 'gold', amount: [5,15],  desc: 'Contém ouro.', val: 0 },
  bone_shard:      { name: 'Fragmento Ósseo',  icon: '🦴', type: 'misc', desc: 'Um osso seco.', val: 2 },
  rotten_flesh:    { name: 'Carne Podre',      icon: '🥩', type: 'misc', desc: 'Não parece comestível.', val: 1 },
  venom_fang:      { name: 'Presa Venenosa',   icon: '🦷', type: 'misc', desc: 'Goteja veneno.', val: 8 },
  stone_core:      { name: 'Núcleo de Pedra',  icon: '🪨', type: 'misc', desc: 'Pedra mágica densa.', val: 12 },
  blood_vial:      { name: 'Vial de Sangue',   icon: '🩸', type: 'misc', desc: 'Sangue amaldiçoado.', val: 10 },
  demon_heart:     { name: 'Coração Demoníaco',icon: '❤️‍🔥', type: 'misc', desc: 'Ainda bate fracamente.', val: 25 },
  soul_gem:        { name: 'Gema da Alma',     icon: '🔮', type: 'misc', desc: 'Contém uma alma presa.', val: 40 },
  arcane_tome:     { name: 'Tomo Arcano',      icon: '📖', type: 'misc', desc: 'Repleto de segredos.', val: 35 },
  dragon_scale:    { name: 'Escama de Dragão', icon: '🐉', type: 'misc', desc: 'Rara e valiosa.', val: 60 },
  wolf_pelt:       { name: 'Pele de Lobo',     icon: '🐺', type: 'misc', desc: 'Pelagem densa.', val: 15 },
  troll_blood:     { name: 'Sangue de Troll',  icon: '💧', type: 'misc', desc: 'Regenera feridas.', val: 18 },
  spirit_essence:  { name: 'Essência Espiritual',icon:'✨',type: 'misc', desc: 'Emanação de outro plano.', val: 30 },

  // Armas
  sword_iron:      { name: 'Espada de Ferro',  icon: '⚔️', type: 'weapon', atk: 5,  desc: 'Uma espada confiável.', val: 20, rarity: 'comum' },
  sword_steel:     { name: 'Espada de Aço',    icon: '🗡️', type: 'weapon', atk: 10, desc: 'Forjada com aço puro.', val: 55, rarity: 'incomum' },
  axe_war:         { name: 'Machado de Guerra',icon: '🪓', type: 'weapon', atk: 13, desc: 'Brutal e pesado.', val: 70, rarity: 'incomum' },
  staff_oak:       { name: 'Cajado de Carvalho',icon:'🪄', type: 'weapon', atk: 2,  mag: 8,  desc: 'Amplia o poder arcano.', val: 25, rarity: 'comum' },
  staff_crystal:   { name: 'Cajado de Cristal',icon:'💎', type: 'weapon', atk: 4,  mag: 15, desc: 'Ressoa com magia pura.', val: 80, rarity: 'raro' },
  dagger_swift:    { name: 'Adaga Veloz',      icon: '🗡️', type: 'weapon', atk: 4,  spd: 3,  desc: 'Afiada como a morte.', val: 22, rarity: 'comum' },
  bow_elven:       { name: 'Arco Élfico',      icon: '🏹', type: 'weapon', atk: 8,  spd: 4,  desc: 'Preciso e elegante.', val: 65, rarity: 'raro' },
  legendary_blade: { name: 'Lâmina Lendária',  icon: '⚡', type: 'weapon', atk: 25, spd: 3,  mag: 5, desc: 'Uma arma mítica!', val: 200, rarity: 'lendario' },

  // Armaduras
  helmet_iron:     { name: 'Elmo de Ferro',    icon: '⛑️', type: 'armor', slot: 'head', def: 3,  desc: 'Protege a cabeça.', val: 18, rarity: 'comum' },
  helmet_steel:    { name: 'Elmo de Aço',      icon: '🪖', type: 'armor', slot: 'head', def: 6,  desc: 'Aço temperado.', val: 45, rarity: 'incomum' },
  armor_leather:   { name: 'Armadura de Couro',icon: '🥋', type: 'armor', slot: 'body', def: 2,  desc: 'Leve e resistente.', val: 15, rarity: 'comum' },
  armor_chain:     { name: 'Cota de Malha',    icon: '🛡️', type: 'armor', slot: 'body', def: 6,  desc: 'Elos de ferro entrelaçados.', val: 50, rarity: 'incomum' },
  armor_plate:     { name: 'Armadura de Placas',icon:'🦺', type: 'armor', slot: 'body', def: 12, desc: 'Proteção máxima.', val: 120, rarity: 'raro' },
  shield_wood:     { name: 'Escudo de Madeira',icon: '🛡️', type: 'armor', slot: 'hand', def: 4,  desc: 'Bloqueia golpes.', val: 14, rarity: 'comum' },
  shield_iron:     { name: 'Escudo de Ferro',  icon: '🔰', type: 'armor', slot: 'hand', def: 8,  desc: 'Robusto e confiável.', val: 45, rarity: 'incomum' },
  boots_swift:     { name: 'Botas Velozes',    icon: '👢', type: 'armor', slot: 'feet', spd: 4,  def: 1, desc: 'Aumenta velocidade.', val: 20, rarity: 'comum' },
  boots_shadow:    { name: 'Botas das Sombras',icon:'🥾', type: 'armor', slot: 'feet', spd: 7,  def: 2, desc: 'Passos silenciosos.', val: 55, rarity: 'raro' },

  // Acessórios
  ring_power:      { name: 'Anel do Poder',    icon: '💍', type: 'accessory', atk: 3, mag: 3,  desc: 'Emana energia.', val: 30, rarity: 'incomum' },
  ring_protection: { name: 'Anel da Proteção', icon: '💎', type: 'accessory', def: 4,          desc: 'Escudo mágico.', val: 35, rarity: 'incomum' },
  amulet_life:     { name: 'Amuleto da Vida',  icon: '📿', type: 'accessory', def: 2, hp_bonus: 30, desc: 'Concede vitalidade.', val: 50, rarity: 'raro' },
};

const ROOM_TYPES = [
  { type: 'monster',  weight: 35 },
  { type: 'treasure', weight: 18 },
  { type: 'empty',    weight: 15 },
  { type: 'trap',     weight: 10 },
  { type: 'shop',     weight: 12 },
  { type: 'shrine',   weight: 10 },
];

const FLOOR_MONSTERS = [
  ['rat','skeleton','goblin'],
  ['skeleton','goblin','spider'],
  ['zombie','spider','goblin','banshee'],
  ['zombie','golem','vampire','werewolf'],
  ['vampire','demon','lich','troll'],
];

const ROOM_DESCS = {
  entry:    ['O ponto de entrada. Pedras úmidas brilham fracamente.', 'O cheiro de mofo e decadência marca o começo de sua jornada.'],
  empty:    ['A sala está vazia. O silêncio pesa como chumbo.', 'Apenas escuridão e ecos distantes habitam este lugar.', 'Rastros de batalhas antigas marcam o chão de pedra.'],
  monster:  ['Uma presença maligna domina a câmara!', 'Olhos brilhantes emergem das sombras...', 'O cheiro de morte antecede o que você vê.'],
  treasure: ['Cofres e sacos espalham-se pelo chão. A ganância flutua no ar.', 'O glint de ouro e joias captura seu olhar.'],
  trap:     ['Há algo estranho no ar desta sala...', 'O chão parece diferente aqui. Cuidado.'],
  shop:     ['Um mercador misterioso acende uma tocha ao te ver chegar.', '"Boa sorte nas profundezas," diz o comerciante sorrindo.'],
  shrine:   ['Uma luz suave emana de um altar antigo no centro da sala.', 'Símbolos divinos adornam as paredes. Você sente paz.'],
  boss:     ['O calor aumenta. O ar vibra com poder sombrio.', 'O chão treme. Uma presença colossal aguarda no escuro.'],
  stairs:   ['Degraus descem ainda mais fundo. Um sopro gelado vem de baixo.'],
};

const ROOM_ICONS = {
  entry: '🚪', empty: '🏚️', monster: '⚔️', treasure: '💰',
  trap: '⚠️', shop: '🛒', shrine: '✨', boss: '👹', stairs: '⬇️'
};

// ============================================================
// ESTADO
// ============================================================

let G = {
  player: null,
  dungeon: null,
  currentRoom: null,
  inCombat: false,
  enemies: [],
  targetedEnemy: 0,
  floor: 1,
  turn: 0,
  shieldActive: false,
  evadeCount: 0,
};

// ============================================================
// UTILITÁRIOS
// ============================================================

function rng(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

function log(msg, type = 'event') {
  const el = document.createElement('div');
  el.className = `log-entry ${type}`;
  el.textContent = msg;
  const area = document.getElementById('log-area');
  area.appendChild(el);
  area.scrollTop = area.scrollHeight;
  if (area.children.length > 80) area.removeChild(area.firstChild);
}

function floatDmg(text, color = '#ff4040') {
  const el = document.createElement('div');
  el.className = 'dmg-float';
  el.textContent = text;
  el.style.color = color;
  el.style.left = rng(40, 60) + 'vw';
  el.style.top = rng(30, 60) + 'vh';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// ============================================================
// GERAÇÃO DE DUNGEON — MAIOR E MAIS DINÂMICA
// ============================================================

function generateDungeon(floor) {
  const SIZE = 6; // 6x6 = mais espaço
  const rooms = [];
  const grid = Array.from({length: SIZE}, () => Array(SIZE).fill(null));

  let cx = 0, cy = 0;
  const visited = new Set();
  const stack = [{x:cx, y:cy}];
  const id = (x,y) => y * SIZE + x;
  visited.add(id(cx,cy));

  // Labirinto com backtracking
  while (stack.length) {
    const cur = stack[stack.length-1];
    const nb = [];
    if (cur.x > 0 && !visited.has(id(cur.x-1, cur.y))) nb.push({x:cur.x-1, y:cur.y});
    if (cur.x < SIZE-1 && !visited.has(id(cur.x+1, cur.y))) nb.push({x:cur.x+1, y:cur.y});
    if (cur.y > 0 && !visited.has(id(cur.x, cur.y-1))) nb.push({x:cur.x, y:cur.y-1});
    if (cur.y < SIZE-1 && !visited.has(id(cur.x, cur.y+1))) nb.push({x:cur.x, y:cur.y+1});

    if (nb.length) {
      const next = pick(nb);
      visited.add(id(next.x, next.y));
      stack.push(next);
    } else {
      stack.pop();
    }
  }

  // Adicionar conexões extras para tornar o mapa menos linear
  const allPos = [...visited].map(i => ({ x: i % SIZE, y: Math.floor(i / SIZE) }));
  // Adicionar até 3 atalhos
  for (let attempt = 0; attempt < 10 && allPos.length > 3; attempt++) {
    const a = pick(allPos), b = pick(allPos);
    if (a !== b && Math.abs(a.x-b.x)+Math.abs(a.y-b.y) === 1) {
      visited.add(id(a.x,a.y));
      visited.add(id(b.x,b.y));
    }
  }

  let roomIdx = 0;
  const positions = [...visited].map(i => ({ x: i % SIZE, y: Math.floor(i / SIZE) }));

  positions.forEach((pos, i) => {
    let type;
    if (i === 0) type = 'entry';
    else if (i === positions.length - 1) type = 'boss';
    else if (i === Math.floor(positions.length * 0.65)) type = 'stairs';
    else {
      const roll = Math.random() * 100;
      let cum = 0;
      for (const rt of ROOM_TYPES) {
        cum += rt.weight;
        if (roll < cum) { type = rt.type; break; }
      }
      if (!type) type = 'monster';
    }

    const room = {
      id: roomIdx++, x: pos.x, y: pos.y, type,
      visited: false, cleared: false,
      enemies: [], loot: []
    };
    grid[pos.y][pos.x] = room;
    rooms.push(room);
  });

  // Conexões bidirecionais
  rooms.forEach(r => {
    r.connections = [];
    const dirs = [
      {dx:1,dy:0,label:'Leste',key:'E'},
      {dx:-1,dy:0,label:'Oeste',key:'W'},
      {dx:0,dy:1,label:'Sul',key:'S'},
      {dx:0,dy:-1,label:'Norte',key:'N'}
    ];
    dirs.forEach(d => {
      const nx = r.x + d.dx, ny = r.y + d.dy;
      if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE && grid[ny][nx]) {
        r.connections.push({ room: grid[ny][nx], label: d.label, key: d.key });
      }
    });
  });

  // Popular salas
  const mPool = FLOOR_MONSTERS[Math.min(floor - 1, FLOOR_MONSTERS.length - 1)];
  rooms.forEach(r => {
    if (r.type === 'monster') {
      const count = rng(1, 3);
      for (let i = 0; i < count; i++) {
        const mKey = pick(mPool);
        const mt = MONSTERS[mKey];
        r.enemies.push({ ...mt, key: mKey, id: Math.random(), curHp: mt.hp, maxHp: mt.hp, statusEffects: [] });
      }
    } else if (r.type === 'boss') {
      const hp = MONSTERS.dragon.hp + floor * 20;
      const m = { ...MONSTERS.dragon, key: 'dragon', id: Math.random(), curHp: hp, maxHp: hp, statusEffects: [] };
      r.enemies.push(m);
    } else if (r.type === 'treasure') {
      const count = rng(2, 4);
      for (let i = 0; i < count; i++) {
        const pool = Object.keys(ITEMS).filter(k => ITEMS[k].type !== 'gold' && ITEMS[k].type !== 'misc');
        r.loot.push(pick(pool));
      }
    } else if (r.type === 'shrine') {
      r.shrineUsed = false;
    }
  });

  return { rooms, grid, size: SIZE, entry: rooms[0] };
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

let selectedClass = 'warrior';

function selectClass(btn) {
  document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedClass = btn.dataset.class;
}

function startGame() {
  const name = document.getElementById('inp-name').value.trim() || 'Anônimo';
  const cls = CLASSES[selectedClass];

  G.player = {
    name,
    className: cls.name,
    classKey: selectedClass,
    icon: cls.icon,
    hp: cls.hp, maxHp: cls.hp,
    mp: cls.mp, maxMp: cls.mp,
    xp: 0, xpNext: 100,
    level: 1,
    atk: cls.atk, def: cls.def, spd: cls.spd, mag: cls.mag, luk: cls.luk,
    gold: 0,
    skill: cls.skill,
    skills: cls.skills,
    attacks: cls.attacks,
    equipment: { weapon: null, head: null, body: null, hand: null, feet: null, acc: null },
    bag: [],
    statusEffects: [],
  };

  // Equipar arma inicial
  G.player.equipment.weapon = { ...cls.weapon };
  G.player.atk += cls.weapon.atk || 0;
  if (cls.weapon.mag) G.player.mag += cls.weapon.mag;

  G.floor = 1;
  G.dungeon = generateDungeon(G.floor);
  G.currentRoom = G.dungeon.entry;
  G.currentRoom.visited = true;

  G.player.bag = ['potion_minor', 'potion_minor', 'potion_minor'];

  document.getElementById('screen-title').classList.remove('active');
  document.getElementById('screen-game').classList.add('active');

  updateUI();
  enterRoom(G.currentRoom);
  renderMinimap();
  log('Você desce os degraus gastos e entra na masmorra...', 'event');
  log('A escuridão envolve você.', 'event');

  // Teclado para setas
  document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
  if (G.inCombat) return;
  const map = { ArrowUp:'N', ArrowDown:'S', ArrowLeft:'W', ArrowRight:'E' };
  if (map[e.key]) {
    e.preventDefault();
    moveDir(map[e.key]);
  }
}

// ============================================================
// ENTRAR EM SALA
// ============================================================

function enterRoom(room) {
  G.currentRoom = room;
  room.visited = true;
  G.inCombat = false;
  G.enemies = room.enemies.filter(e => e.curHp > 0);
  G.shieldActive = false;
  G.evadeCount = 0;

  closeAllMenus();

  const icon = ROOM_ICONS[room.type] || '🚪';
  const descs = ROOM_DESCS[room.type] || ROOM_DESCS.empty;
  const desc = pick(descs);

  const titles = {
    entry: 'Câmara de Entrada', empty: 'Corredor Vazio', monster: 'Câmara dos Horrores',
    treasure: 'Sala do Tesouro', trap: 'Câmara Traiçoeira', shop: 'Beco do Mercador',
    shrine: 'Santuário Sagrado', boss: 'CÂMARA DO BOSS', stairs: 'Passagem Descendente'
  };

  document.getElementById('scene-icon').textContent = icon;
  document.getElementById('scene-title').textContent = titles[room.type] || 'Sala Desconhecida';
  document.getElementById('scene-badge').textContent = `Sala ${room.id + 1}`;

  const sceneDesc = document.getElementById('scene-desc');
  sceneDesc.textContent = desc;
  sceneDesc.classList.remove('room-enter');
  void sceneDesc.offsetWidth;
  sceneDesc.classList.add('room-enter');

  renderEnemies();
  renderLoot();
  updateDirectionPad();
  updateActions();
  renderMinimap();

  if (room.type === 'boss') {
    const b = G.enemies[0];
    if (b) {
      document.getElementById('boss-bar').style.display = 'block';
      document.getElementById('boss-name').textContent = `👹 ${b.name}`;
      updateBossBar();
    }
  } else {
    document.getElementById('boss-bar').style.display = 'none';
  }

  if (room.type === 'trap' && !room.cleared) {
    const dmg = rng(5, 20);
    setTimeout(() => {
      log(`💥 Uma armadilha dispara! Você leva ${dmg} de dano.`, 'danger');
      takeDamage(dmg, 'Armadilha');
      room.cleared = true;
    }, 600);
  } else if (room.type === 'shrine' && !room.shrineUsed) {
    log('✨ O altar irradia uma luz curativa...', 'success');
    setTimeout(() => {
      const heal = Math.floor(G.player.maxHp * 0.3);
      G.player.hp = Math.min(G.player.maxHp, G.player.hp + heal);
      G.player.mp = Math.min(G.player.maxMp, G.player.mp + 20);
      room.shrineUsed = true;
      log(`✨ Você recupera ${heal} HP e 20 MP!`, 'success');
      updateUI();
    }, 400);
  }

  if (G.enemies.length > 0) {
    G.inCombat = true;
    log(`⚔️ ${G.enemies.map(e => e.name).join(', ')} bloqueiam seu caminho!`, 'danger');
    G.targetedEnemy = 0;
    updateActions();
    updateDirectionPad();
  }
}

// ============================================================
// DIREÇÃO COM SETAS
// ============================================================

function updateDirectionPad() {
  const dirs = ['N','S','E','W'];
  dirs.forEach(d => {
    const btn = document.getElementById('dir-' + d);
    if (!btn) return;
    btn.disabled = true;
    btn.classList.remove('active-dir');
  });

  if (!G.inCombat && G.currentRoom) {
    G.currentRoom.connections.forEach(conn => {
      const btn = document.getElementById('dir-' + conn.key);
      if (btn) {
        btn.disabled = false;
        btn.title = conn.label + ' → ' + conn.room.type;
      }
    });
  }
}

function moveDir(dirKey) {
  if (G.inCombat) return;
  const conn = G.currentRoom.connections.find(c => c.key === dirKey);
  if (!conn) return;
  log(`Você avança para ${conn.label}...`, 'event');
  enterRoom(conn.room);
}

// ============================================================
// RENDERIZAÇÕES
// ============================================================

function renderEnemies() {
  const container = document.getElementById('enemies-display');
  container.innerHTML = '';
  G.enemies.filter(e => e.curHp > 0).forEach((enemy, i) => {
    const card = document.createElement('div');
    card.className = `enemy-card ${i === G.targetedEnemy ? 'targeted' : ''}`;
    const statuses = (enemy.statusEffects || []).map(s => s === 'slow' ? '❄️' : s === 'poison' ? '🟢' : '').join('');
    card.innerHTML = `
      <span class="enemy-icon">${enemy.icon}</span>
      <div class="enemy-name">${enemy.name} ${statuses}</div>
      <div style="font-size:12px;color:#888;margin-bottom:4px">${enemy.curHp}/${enemy.maxHp} HP</div>
      <div class="enemy-hp-bar"><div class="enemy-hp-fill" style="width:${(enemy.curHp/enemy.maxHp)*100}%"></div></div>
      ${(enemy.statusEffects||[]).includes('slow') ? '<div style="font-size:10px;color:#88ccff;margin-top:3px">❄️ Lento</div>' : ''}
      ${(enemy.statusEffects||[]).includes('poison') ? '<div style="font-size:10px;color:#88ff88;margin-top:3px">🐍 Envenenado</div>' : ''}
    `;
    card.onclick = () => { G.targetedEnemy = i; renderEnemies(); };
    container.appendChild(card);
  });
}

function renderLoot() {
  const container = document.getElementById('room-loot');
  container.innerHTML = '';
  if (G.currentRoom.loot && G.currentRoom.loot.length > 0) {
    G.currentRoom.loot.forEach((itemKey, i) => {
      const item = ITEMS[itemKey];
      if (!item) return;
      const el = document.createElement('div');
      el.className = 'loot-item';
      const rarityClass = item.rarity ? `rarity-${item.rarity}` : '';
      el.innerHTML = `<span>${item.icon}</span><span class="${rarityClass}">${item.name}</span>`;
      el.onclick = () => pickupItem(itemKey, i);
      el.onmouseenter = (e) => showTooltip(e, item);
      el.onmouseleave = hideTooltip;
      container.appendChild(el);
    });
  }
  if (G.currentRoom.type === 'shop' && !G.currentRoom.shopBought) {
    renderShop();
  }
}

function renderShop() {
  const container = document.getElementById('room-loot');
  if (!G.currentRoom.shopItems) {
    const pool = ['helmet_iron','helmet_steel','armor_leather','armor_chain','shield_wood','shield_iron',
                  'ring_power','ring_protection','boots_swift','boots_shadow','mana_crystal','potion_major',
                  'sword_steel','axe_war','staff_crystal','bow_elven'];
    const picks = [];
    const usedPool = [...pool];
    for (let i = 0; i < 3; i++) {
      const idx = Math.floor(Math.random() * usedPool.length);
      picks.push(usedPool.splice(idx, 1)[0]);
    }
    G.currentRoom.shopItems = picks;
  }
  G.currentRoom.shopItems.forEach(key => {
    const item = ITEMS[key];
    if (!item) return;
    const el = document.createElement('div');
    el.className = 'loot-item';
    el.style.borderColor = '#5a4400';
    const rarityClass = item.rarity ? `rarity-${item.rarity}` : '';
    el.innerHTML = `<span>${item.icon}</span><span class="${rarityClass}">${item.name}</span><span style="color:#aaa;font-size:12px"> 💰${item.val}</span>`;
    el.onclick = () => buyItem(key);
    el.onmouseenter = (e) => showTooltip(e, item);
    el.onmouseleave = hideTooltip;
    container.appendChild(el);
  });
}

function renderMinimap() {
  const mm = document.getElementById('minimap');
  const SIZE = G.dungeon.size;
  mm.style.gridTemplateColumns = `repeat(${SIZE}, 20px)`;
  mm.innerHTML = '';

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const cell = document.createElement('div');
      const room = G.dungeon.grid[y][x];

      if (!room) {
        cell.className = 'mm-cell wall';
      } else if (!room.visited) {
        cell.className = 'mm-cell fog';
      } else if (room === G.currentRoom) {
        cell.className = 'mm-cell current';
        cell.textContent = '●';
      } else {
        const t = room.type;
        if (t === 'boss')     { cell.className = 'mm-cell boss'; cell.textContent = '💀'; }
        else if (t === 'treasure') { cell.className = 'mm-cell treasure'; cell.textContent = '💰'; }
        else if (t === 'stairs')   { cell.className = 'mm-cell stairs'; cell.textContent = '⬇'; }
        else if (t === 'shop')     { cell.className = 'mm-cell shop'; cell.textContent = '🛒'; }
        else if (t === 'shrine')   { cell.className = 'mm-cell shrine'; cell.textContent = '✨'; }
        else if (t === 'trap')     { cell.className = 'mm-cell trap'; cell.textContent = '⚠'; }
        else { cell.className = `mm-cell visited ${room.cleared ? '' : (room.type === 'monster' ? 'monster' : '')}`; }
      }

      // Conectores visuais (leste/sul)
      if (room && room.visited) {
        const roomE = (x < SIZE-1) ? G.dungeon.grid[y][x+1] : null;
        const roomS = (y < SIZE-1) ? G.dungeon.grid[y+1][x] : null;

        if (roomE && room.connections && room.connections.find(c => c.key === 'E')) {
          const conn = document.createElement('div');
          conn.className = 'mm-connector-h' + (roomE.visited ? ' active' : '');
          cell.appendChild(conn);
        }
        if (roomS && room.connections && room.connections.find(c => c.key === 'S')) {
          const conn = document.createElement('div');
          conn.className = 'mm-connector-v' + (roomS.visited ? ' active' : '');
          cell.appendChild(conn);
        }
      }

      mm.appendChild(cell);
    }
  }
}

function renderInventory() {
  const eSlots = document.getElementById('equip-slots');
  eSlots.innerHTML = '';
  const slots = [
    { key: 'weapon', label: 'Arma' },
    { key: 'head',   label: 'Cabeça' },
    { key: 'body',   label: 'Corpo' },
    { key: 'hand',   label: 'Mão' },
    { key: 'feet',   label: 'Pés' },
    { key: 'acc',    label: 'Aces.' },
  ];
  slots.forEach(s => {
    const el = document.createElement('div');
    const item = G.player.equipment[s.key];
    if (item) {
      el.className = 'inv-slot filled equipped';
      el.innerHTML = `<span class="equipped-tag">✓</span><span class="item-icon">${item.icon}</span><span class="item-name">${item.name}</span>`;
      el.onmouseenter = (e) => showTooltip(e, item);
      el.onmouseleave = hideTooltip;
    } else {
      el.className = 'inv-slot';
      el.style.opacity = '0.3';
      el.innerHTML = `<span style="font-size:18px;opacity:0.4">—</span><span class="item-name" style="font-size:10px">${s.label}</span>`;
    }
    eSlots.appendChild(el);
  });

  const bSlots = document.getElementById('bag-slots');
  bSlots.innerHTML = '';
  const maxBag = 12;
  const bag = G.player.bag.slice();
  while (bag.length < maxBag) bag.push(null);
  bag.forEach((itemKey, i) => {
    const el = document.createElement('div');
    if (itemKey) {
      const item = ITEMS[itemKey];
      if (!item) { el.className = 'inv-slot'; el.style.opacity = '0.15'; bSlots.appendChild(el); return; }
      el.className = 'inv-slot filled';
      const rarityClass = item.rarity ? `rarity-${item.rarity}` : '';
      el.innerHTML = `<span class="item-icon">${item.icon}</span><span class="item-name ${rarityClass}">${item.name}</span>`;
      el.onclick = () => useItemFromBag(itemKey, i);
      el.onmouseenter = (e) => showTooltip(e, item);
      el.onmouseleave = hideTooltip;
    } else {
      el.className = 'inv-slot';
      el.style.opacity = '0.15';
    }
    bSlots.appendChild(el);
  });
}

function updateActions() {
  const hasCombat = G.inCombat && G.enemies.filter(e => e.curHp > 0).length > 0;
  document.getElementById('btn-attack').disabled = !hasCombat;
  document.getElementById('btn-skill').disabled = !hasCombat;

  // Botão de escada
  const hasStairs = G.currentRoom.type === 'stairs' && !G.inCombat;
  let stairsBtn = document.getElementById('btn-stairs');
  if (hasStairs && !stairsBtn) {
    stairsBtn = document.createElement('button');
    stairsBtn.id = 'btn-stairs';
    stairsBtn.className = 'btn btn-move';
    stairsBtn.textContent = '⬇️ Descer';
    stairsBtn.onclick = goDownstairs;
    document.getElementById('action-bar').insertBefore(stairsBtn, document.getElementById('btn-heal').nextSibling);
  } else if (!hasStairs && stairsBtn) {
    stairsBtn.remove();
  }

  updateDirectionPad();
}

function updateUI() {
  const p = G.player;
  document.getElementById('ui-pname').textContent = `${p.icon} ${p.name}`;
  document.getElementById('ui-pclass').textContent = `${p.className} — Nível ${p.level}`;
  document.getElementById('ui-hp').textContent = `${p.hp}/${p.maxHp}`;
  document.getElementById('ui-mp').textContent = `${p.mp}/${p.maxMp}`;
  document.getElementById('ui-xp').textContent = `${p.xp}/${p.xpNext}`;
  document.getElementById('ui-atk').textContent = p.atk;
  document.getElementById('ui-def').textContent = p.def;
  document.getElementById('ui-spd').textContent = p.spd;
  document.getElementById('ui-mag').textContent = p.mag;
  document.getElementById('ui-luk').textContent = p.luk;
  document.getElementById('ui-gold').textContent = p.gold;
  document.getElementById('ui-floor').textContent = `Andar ${G.floor}`;
  document.getElementById('ui-depth').textContent = `Profundidade: ${G.floor}`;

  document.getElementById('bar-hp').style.width = `${(p.hp/p.maxHp)*100}%`;
  document.getElementById('bar-mp').style.width = `${(p.mp/p.maxMp)*100}%`;
  document.getElementById('bar-xp').style.width = `${(p.xp/p.xpNext)*100}%`;

  renderInventory();
}

function updateBossBar() {
  const boss = G.enemies.find(e => e.isBoss);
  if (boss) {
    document.getElementById('boss-hp-fill').style.width = `${(boss.curHp/boss.maxHp)*100}%`;
  }
}

// ============================================================
// MENUS DE ATAQUE E HABILIDADE
// ============================================================

function closeAllMenus() {
  document.getElementById('attack-menu').classList.remove('open');
  document.getElementById('skill-menu').classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#group-attack') && !e.target.closest('#group-skill')) {
    closeAllMenus();
  }
});

function toggleAttackMenu() {
  if (!G.inCombat) return;
  const menu = document.getElementById('attack-menu');
  const isOpen = menu.classList.contains('open');
  closeAllMenus();
  if (!isOpen) {
    buildAttackMenu();
    menu.classList.add('open');
  }
}

function toggleSkillMenu() {
  if (!G.inCombat) return;
  const menu = document.getElementById('skill-menu');
  const isOpen = menu.classList.contains('open');
  closeAllMenus();
  if (!isOpen) {
    buildSkillMenu();
    menu.classList.add('open');
  }
}

function buildAttackMenu() {
  const menu = document.getElementById('attack-menu');
  menu.innerHTML = '';
  const attacks = G.player.attacks || [];
  attacks.forEach((atk, i) => {
    const opt = document.createElement('div');
    opt.className = 'attack-option';
    const dmgRange = estimateDmgRange(atk);
    const mpText = atk.mpCost > 0 ? `<span class="atk-mp">💧${atk.mpCost}</span>` : '';
    opt.innerHTML = `
      <span>${atk.icon} ${atk.name}</span>
      <span style="display:flex;align-items:center;gap:4px">
        <span class="atk-dmg">${dmgRange}</span>${mpText}
      </span>
    `;
    opt.title = atk.desc;
    const disabled = atk.mpCost > 0 && G.player.mp < atk.mpCost;
    if (disabled) opt.style.opacity = '0.4';
    else opt.onclick = () => { closeAllMenus(); playerAttackWith(i); };
    menu.appendChild(opt);
  });
}

function buildSkillMenu() {
  const menu = document.getElementById('skill-menu');
  menu.innerHTML = '';
  const skills = G.player.skills || [];
  skills.forEach((sk, i) => {
    const opt = document.createElement('div');
    opt.className = 'attack-option';
    opt.style.borderColor = '#1a3060';
    const canUse = G.player.mp >= sk.cost;
    opt.innerHTML = `
      <span>✨ ${sk.name}</span>
      <span style="display:flex;align-items:center;gap:4px">
        <span class="atk-dmg" style="color:#aaa;font-size:11px">${sk.desc}</span>
        <span class="atk-mp">💧${sk.cost}</span>
      </span>
    `;
    if (!canUse) opt.style.opacity = '0.4';
    else opt.onclick = () => { closeAllMenus(); playerSkillWith(i); };
    menu.appendChild(opt);
  });
}

function estimateDmgRange(atk) {
  const p = G.player;
  const baseLow = Math.max(1, p.atk - 2);
  const baseHigh = p.atk + 4;
  const low = Math.max(1, Math.floor(baseLow * atk.dmgMult));
  const high = Math.floor(baseHigh * atk.dmgMult);
  const hits = atk.hits || 1;
  if (hits > 1) return `${low*hits}~${high*hits} (×${hits})`;
  return `${low}~${high}`;
}

// ============================================================
// COMBATE
// ============================================================

function getTarget() {
  const alive = G.enemies.filter(e => e.curHp > 0);
  if (alive.length === 0) return null;
  G.targetedEnemy = Math.min(G.targetedEnemy, alive.length - 1);
  return alive[G.targetedEnemy];
}

function calcDamage(atk, def) {
  return Math.max(1, atk - def + rng(-2, 4));
}

function playerAttackWith(attackIdx) {
  const target = getTarget();
  if (!target) return;

  const atk = G.player.attacks[attackIdx];
  if (!atk) return;

  if (atk.mpCost > 0 && G.player.mp < atk.mpCost) {
    log('Mana insuficiente!', 'event');
    return;
  }
  G.player.mp = Math.max(0, G.player.mp - atk.mpCost);

  const hits = atk.hits || 1;
  let totalDmg = 0;

  for (let h = 0; h < hits; h++) {
    let baseDmg = calcDamage(G.player.atk, target.def);

    // Bônus especiais por ataque
    if (atk.dmgMult) baseDmg = Math.floor(baseDmg * atk.dmgMult);
    if (atk.name === 'Emboscada') baseDmg = Math.floor(G.player.atk * 2.5 + rng(5,15) - target.def * 0.5);

    const crit = Math.random() < (G.player.luk * 0.03 + 0.02);
    const finalDmg = crit ? Math.floor(baseDmg * 1.8) : baseDmg;

    target.curHp = Math.max(0, target.curHp - finalDmg);
    totalDmg += finalDmg;

    floatDmg(`-${finalDmg}${crit ? '💥' : ''}`, crit ? '#ffd700' : '#ff4040');
  }

  // Efeitos especiais
  if (atk.slow && target.statusEffects) {
    target.statusEffects.push('slow');
    log(`❄️ ${target.name} está lento!`, 'player');
  }
  if (atk.poison && target.statusEffects) {
    if (!target.statusEffects.includes('poison')) {
      target.statusEffects.push('poison');
      log(`🐍 ${target.name} foi envenenado!`, 'player');
    }
  }
  if (atk.def_bonus) {
    G.player.def += atk.def_bonus;
    setTimeout(() => { G.player.def -= atk.def_bonus; }, 3000);
    log(`🛡️ Sua defesa aumentou por um turno!`, 'success');
  }
  if (atk.self_dmg) {
    G.player.hp = Math.max(1, G.player.hp - atk.self_dmg);
    log(`🩸 Você recebe ${atk.self_dmg} de dano de recuo!`, 'enemy');
  }

  const hitLabel = hits > 1 ? ` (${hits} golpes, total: ${totalDmg})` : `${totalDmg}`;
  log(`${atk.icon} ${atk.name} em ${target.name}: ${hitLabel} de dano.`, 'player');

  renderEnemies();
  if (target.isBoss) updateBossBar();
  checkEnemyDeath(target);
  if (G.inCombat) enemyTurn();
  updateUI();
}

function playerSkillWith(skillIdx) {
  const p = G.player;
  const sk = p.skills[skillIdx];
  if (!sk) return;
  if (p.mp < sk.cost) { log('Mana insuficiente!', 'event'); return; }
  p.mp -= sk.cost;

  const target = getTarget();

  if (sk.fn === 'brutalStrike') {
    if (!target) return;
    const dmg = Math.max(1, Math.floor(p.atk * 2 - target.def + rng(0,6)));
    target.curHp = Math.max(0, target.curHp - dmg);
    floatDmg(`-${dmg} 💥`, '#ff8000');
    log(`💥 Golpe Brutal em ${target.name}: ${dmg} dano!`, 'player');
    checkEnemyDeath(target);
  } else if (sk.fn === 'warCry') {
    const heal = 20;
    p.hp = Math.min(p.maxHp, p.hp + heal);
    p.atk += 2;
    floatDmg(`+${heal} HP ⚔️+2`, '#ff8000');
    log(`📣 Grito de Guerra! +${heal} HP e +2 ATK!`, 'success');
  } else if (sk.fn === 'divineShield') {
    G.shieldActive = true;
    floatDmg('ESCUDO! 🛡️', '#ffff00');
    log('🛡️ Escudo Divino! Próximo dano reduzido em 80%!', 'success');
  } else if (sk.fn === 'fireball') {
    const aliveBefore = G.enemies.filter(e => e.curHp > 0);
    aliveBefore.forEach(e => {
      const dmg = Math.max(1, p.mag * 3 + rng(2, 8));
      e.curHp = Math.max(0, e.curHp - dmg);
    });
    floatDmg(`🔥 BOLA DE FOGO!`, '#ff6600');
    log(`🔥 Bola de Fogo atinge todos os inimigos!`, 'player');
    aliveBefore.forEach(e => checkEnemyDeath(e));
  } else if (sk.fn === 'drain') {
    if (!target) return;
    const dmg = Math.max(1, p.mag * 2 + rng(1,5));
    const heal = Math.floor(dmg * 0.6);
    target.curHp = Math.max(0, target.curHp - dmg);
    p.hp = Math.min(p.maxHp, p.hp + heal);
    floatDmg(`-${dmg} 🔮 +${heal}HP`, '#aa44ff');
    log(`🔮 Drenagem: ${dmg} dano, recuperou ${heal} HP!`, 'player');
    checkEnemyDeath(target);
  } else if (sk.fn === 'meteor') {
    G.enemies.filter(e => e.curHp > 0).forEach(e => {
      const dmg = Math.max(1, p.mag * 3 + rng(5,15));
      e.curHp = Math.max(0, e.curHp - dmg);
    });
    floatDmg(`☄️ METEORO!`, '#ff4400');
    log(`☄️ Meteoro despenca sobre todos os inimigos!`, 'player');
    G.enemies.forEach(e => checkEnemyDeath(e));
  } else if (sk.fn === 'shadowStrike') {
    if (!target) return;
    const dmg = Math.floor(p.atk * 2.2 + rng(3,10));
    target.curHp = Math.max(0, target.curHp - dmg);
    floatDmg(`-${dmg} 🗡️`, '#aa00ff');
    log(`🗡️ Ataque Furtivo em ${target.name}: ${dmg} dano!`, 'player');
    checkEnemyDeath(target);
  } else if (sk.fn === 'smokeScreen') {
    G.evadeCount = 2;
    floatDmg('💨 FUMAÇA!', '#aaaaaa');
    log('💨 Cortina de Fumaça! Você evitará os próximos 2 ataques.', 'success');
  } else if (sk.fn === 'deathBlow') {
    if (!target) return;
    const instakill = Math.random() < (p.luk * 0.05 + 0.1);
    if (instakill && !target.isBoss) {
      target.curHp = 0;
      floatDmg('☠️ MORTE!', '#ff0000');
      log(`☠️ Golpe Mortal! ${target.name} foi eliminado instantaneamente!`, 'success');
    } else {
      const dmg = Math.floor(p.atk * 1.8 + rng(5,15));
      target.curHp = Math.max(0, target.curHp - dmg);
      floatDmg(`-${dmg} 💀`, '#cc0000');
      log(`💀 Golpe Mortal (falhou) — ${dmg} dano em ${target.name}!`, 'player');
    }
    checkEnemyDeath(target);
  }

  renderEnemies();
  if (target && target.isBoss) updateBossBar();
  if (G.inCombat) enemyTurn();
  updateUI();
}

function checkEnemyDeath(enemy) {
  if (enemy.curHp <= 0) {
    log(`💀 ${enemy.name} foi derrotado!`, 'success');
    floatDmg('Morto!', '#00ff80');

    G.player.xp += enemy.xp;
    const gold = rng(Math.floor(enemy.gold * 0.5), enemy.gold);
    G.player.gold += gold;
    log(`+${enemy.xp} XP, +${gold} ouro.`, 'item');

    if (enemy.drops && Math.random() < 0.5) {
      const drop = pick(enemy.drops);
      if (ITEMS[drop]) {
        G.currentRoom.loot.push(drop);
        log(`💎 ${enemy.name} deixou: ${ITEMS[drop].name}`, 'item');
        renderLoot();
      }
    }

    checkLevelUp();
    updateUI();

    const aliveEnemies = G.enemies.filter(e => e.curHp > 0);
    if (aliveEnemies.length === 0) {
      G.inCombat = false;
      G.currentRoom.cleared = true;
      log('✅ Câmara limpa! Você pode avançar.', 'success');
      if (G.currentRoom.type === 'boss') {
        setTimeout(() => showVictory(), 500);
      }
      updateActions();
    }
  }
}

function enemyTurn() {
  const aliveEnemies = G.enemies.filter(e => e.curHp > 0);
  if (aliveEnemies.length === 0) return;

  setTimeout(() => {
    aliveEnemies.forEach(enemy => {
      if (G.player.hp <= 0) return;

      // Aplicar efeitos de veneno
      if ((enemy.statusEffects || []).includes('poison')) {
        const poisonDmg = rng(3, 8);
        enemy.curHp = Math.max(0, enemy.curHp - poisonDmg);
        log(`🐍 Veneno causa ${poisonDmg} em ${enemy.name}!`, 'success');
        if (enemy.curHp <= 0) { checkEnemyDeath(enemy); return; }
      }

      let atkStat = enemy.atk;
      if ((enemy.statusEffects || []).includes('slow')) atkStat = Math.floor(atkStat * 0.6);

      const baseDmg = calcDamage(atkStat, G.player.def);

      // Escudo divino
      if (G.shieldActive) {
        const shieldedDmg = Math.max(1, Math.floor(baseDmg * 0.2));
        G.shieldActive = false;
        takeDamage(shieldedDmg, enemy.name);
        log(`🛡️ Escudo absoveu a maior parte do dano!`, 'success');
        floatDmg(`-${shieldedDmg} 🛡️`, '#ffff00');
        return;
      }

      // Esquiva por fumaça
      if (G.evadeCount > 0) {
        G.evadeCount--;
        log(`💨 Fumaça! Você evita o ataque de ${enemy.name}!`, 'player');
        floatDmg('Esquivou!', '#aaaaaa');
        return;
      }

      const evade = Math.random() < (G.player.spd * 0.02);
      if (evade) {
        log(`💨 Você esquivou do ataque de ${enemy.name}!`, 'player');
        floatDmg('Esquivou!', '#00ccff');
      } else {
        takeDamage(baseDmg, enemy.name);
        floatDmg(`-${baseDmg}`, '#ff2020');
      }
    });
    renderEnemies();
  }, 300);
}

function takeDamage(amount, source) {
  G.player.hp = Math.max(0, G.player.hp - amount);
  log(`💔 ${source} causou ${amount} de dano!`, 'enemy');
  updateUI();
  if (G.player.hp <= 0) {
    setTimeout(() => showDeath(), 500);
  }
}

// ============================================================
// ITENS E INVENTÁRIO
// ============================================================

function pickupItem(key, index) {
  const item = ITEMS[key];
  if (!item) return;

  if (item.type === 'gold') {
    const amt = rng(...item.amount);
    G.player.gold += amt;
    log(`💰 Você pega ${amt} de ouro!`, 'item');
  } else if (item.type === 'consumable') {
    if (G.player.bag.length < 12) {
      G.player.bag.push(key);
      log(`🎒 ${item.name} adicionado à mochila.`, 'item');
    } else {
      log('Mochila cheia!', 'event');
      return;
    }
  } else if (item.type === 'weapon' || item.type === 'armor' || item.type === 'accessory') {
    equipItem(key);
  } else {
    if (G.player.bag.length < 12) {
      G.player.bag.push(key);
      log(`🎒 ${item.name} coletado.`, 'item');
    }
  }

  G.currentRoom.loot.splice(index, 1);
  updateUI();
  renderLoot();
}

function equipItem(key) {
  const item = ITEMS[key];
  const p = G.player;
  let slot;

  if (item.type === 'weapon') slot = 'weapon';
  else if (item.type === 'armor') slot = item.slot;
  else if (item.type === 'accessory') slot = 'acc';
  if (!slot) return;

  // Desequipar anterior (reverter bônus)
  if (p.equipment[slot]) {
    const old = p.equipment[slot];
    if (old.atk) p.atk -= old.atk;
    if (old.def) p.def -= old.def;
    if (old.spd) p.spd -= old.spd;
    if (old.mag) p.mag -= old.mag;
    if (old.hp_bonus) { p.maxHp -= old.hp_bonus; p.hp = Math.min(p.hp, p.maxHp); }
    // Adicionar de volta ao inventário
    const oldBagKey = old.id;
    if (p.bag.length < 12) p.bag.push(oldBagKey);
    log(`📤 Desequipado: ${old.name}`, 'item');
  }

  // Equipar novo
  p.equipment[slot] = { ...item, id: key };
  if (item.atk) p.atk += item.atk;
  if (item.def) p.def += item.def;
  if (item.spd) p.spd += item.spd;
  if (item.mag) p.mag += item.mag;
  if (item.hp_bonus) { p.maxHp += item.hp_bonus; p.hp = Math.min(p.hp + item.hp_bonus, p.maxHp); }
  log(`✅ Equipado: ${item.name}!`, 'success');
  updateUI();
}

function useItemFromBag(key, index) {
  const item = ITEMS[key];
  if (!item) return;

  if (item.type === 'consumable') {
    if (item.heal) {
      const healed = Math.min(item.heal, G.player.maxHp - G.player.hp);
      G.player.hp = Math.min(G.player.maxHp, G.player.hp + item.heal);
      log(`🧪 ${item.name}: +${healed} HP`, 'success');
      floatDmg(`+${healed} HP`, '#00ff80');
    }
    if (item.mp) {
      const restored = Math.min(item.mp, G.player.maxMp - G.player.mp);
      G.player.mp = Math.min(G.player.maxMp, G.player.mp + item.mp);
      log(`💧 ${item.name}: +${restored} MP`, 'success');
      floatDmg(`+${restored} MP`, '#4090ff');
    }
    G.player.bag.splice(index, 1);
  } else if (item.type === 'weapon' || item.type === 'armor' || item.type === 'accessory') {
    equipItem(key);
    G.player.bag.splice(index, 1);
  }

  updateUI();
}

function usePotion() {
  const idx2 = G.player.bag.indexOf('potion_major');
  const idx = G.player.bag.indexOf('potion_minor');
  const i = idx2 !== -1 ? idx2 : idx;
  if (i === -1) { log('Sem poções!', 'event'); return; }
  useItemFromBag(G.player.bag[i], i);
}

function buyItem(key) {
  const item = ITEMS[key];
  if (G.player.gold < item.val) { log(`💰 Ouro insuficiente! Precisa de ${item.val}.`, 'event'); return; }
  if (G.player.bag.length >= 12) { log('Mochila cheia!', 'event'); return; }
  G.player.gold -= item.val;
  G.player.bag.push(key);
  const idx = G.currentRoom.shopItems.indexOf(key);
  if (idx !== -1) G.currentRoom.shopItems.splice(idx, 1);
  log(`🛒 Comprou ${item.name} por ${item.val} ouro.`, 'item');
  updateUI();
  renderLoot();
}

// ============================================================
// PROGRESSÃO
// ============================================================

function checkLevelUp() {
  const p = G.player;
  while (p.xp >= p.xpNext) {
    p.xp -= p.xpNext;
    p.level++;
    p.xpNext = Math.floor(p.xpNext * 1.4);
    p.maxHp += 15;
    p.hp = p.maxHp;
    p.maxMp += 10;
    p.mp = p.maxMp;
    p.atk += 2;
    p.def += 1;
    p.mag += 1;
    p.spd += 1;

    document.getElementById('levelup-text').textContent =
      `Nível ${p.level}!\n+15 Vida Máx | +10 Mana Máx | +2 Ataque | +1 Defesa | +1 Magia | +1 Vel`;
    document.getElementById('modal-levelup').classList.add('active');
    log(`⬆️ LEVEL UP! Nível ${p.level}!`, 'success');
  }
}

function closeLevelUp() {
  document.getElementById('modal-levelup').classList.remove('active');
  updateUI();
}

function goDownstairs() {
  G.floor++;
  if (G.floor > 5) { showVictory(); return; }
  G.dungeon = generateDungeon(G.floor);
  G.currentRoom = G.dungeon.entry;
  G.currentRoom.visited = true;
  log(`⬇️ Você desce para o Andar ${G.floor}...`, 'event');
  log('A escuridão fica mais densa. Perigos piores aguardam.', 'event');
  updateUI();
  enterRoom(G.currentRoom);
}

function showDeath() {
  document.getElementById('death-text').textContent =
    `${G.player.name} caiu nas profundezas do Andar ${G.floor}.\nNível ${G.player.level} | ${G.player.gold} de ouro acumulados.\nO abismo engoliu mais uma alma.`;
  document.getElementById('modal-death').classList.add('active');
}

function showVictory() {
  document.getElementById('victory-text').textContent =
    `${G.player.name} conquistou as Masmorras do Abismo!\nNível ${G.player.level} | ${G.player.gold} de ouro | ${G.floor} andares conquistados.\nLendas serão contadas sobre sua bravura por gerações!`;
  document.getElementById('modal-victory').classList.add('active');
}

// ============================================================
// TOOLTIP
// ============================================================

function showTooltip(e, item) {
  const tt = document.getElementById('tooltip');
  let stats = '';
  if (item.atk) stats += `⚔️ +${item.atk} Atq `;
  if (item.def) stats += `🛡️ +${item.def} Def `;
  if (item.spd) stats += `🏃 +${item.spd} Vel `;
  if (item.mag) stats += `✨ +${item.mag} Mag `;
  if (item.heal) stats += `❤️ +${item.heal} Cura `;
  if (item.mp) stats += `💧 +${item.mp} Mana `;
  if (item.hp_bonus) stats += `💗 +${item.hp_bonus} MaxHP `;

  const rarityLabel = item.rarity ? `<div class="rarity-${item.rarity}" style="font-size:10px;margin-top:2px;font-style:italic">${item.rarity.toUpperCase()}</div>` : '';

  tt.innerHTML = `
    <div class="tooltip-name">${item.icon} ${item.name}</div>
    ${rarityLabel}
    <div class="tooltip-desc">${item.desc}</div>
    ${stats ? `<div class="tooltip-stat">${stats}</div>` : ''}
    ${item.val ? `<div style="color:#888;font-size:11px;margin-top:4px">Valor: ${item.val}💰</div>` : ''}
  `;
  tt.style.display = 'block';
  moveTip(e);
}

function moveTip(e) {
  const tt = document.getElementById('tooltip');
  tt.style.left = Math.min(e.clientX + 12, window.innerWidth - 220) + 'px';
  tt.style.top = Math.min(e.clientY + 12, window.innerHeight - 120) + 'px';
}

function hideTooltip() {
  document.getElementById('tooltip').style.display = 'none';
}

document.addEventListener('mousemove', e => {
  if (document.getElementById('tooltip').style.display === 'block') moveTip(e);
});

// ============================================================
// PARTÍCULAS
// ============================================================

function createSparks() {
  const container = document.getElementById('sparks');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    s.style.left = rng(0, 100) + '%';
    s.style.bottom = '0';
    s.style.animationDelay = rng(0, 8) + 's';
    s.style.animationDuration = rng(6, 14) + 's';
    container.appendChild(s);
  }
}

createSparks();
</script>
