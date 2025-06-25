import spinDrum from './spinDrum';

export default function spinCheat(credits: number, results: string[]) {
  if (credits >= 40 && credits <= 60 && Math.random() < 0.3) {
    return spinDrum();
  } else if (credits > 60 && Math.random() < 0.6) {
    return spinDrum();
  }
  return results;
}
