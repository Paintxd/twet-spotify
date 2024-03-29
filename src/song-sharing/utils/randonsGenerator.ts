export class RandomGenerator {
  static offsetRandom(playlistSize) {
    const offsetMax = Number(playlistSize) - 100;
    return Math.floor(Math.random() * Math.floor(offsetMax));
  }

  static positionShare(arrLength: number) {
    return Math.floor(Math.random() * Math.floor(arrLength));
  }
}
