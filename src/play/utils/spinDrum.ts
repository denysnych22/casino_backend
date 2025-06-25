const symbols = ['Cherry', 'Lemon', 'Orange', 'Watermelon'];

export default function spinDrum() {
  return [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];
}
