// TODO: This is a naive in-memory cache implementation
// Candidates can identify several improvements:
// 1. Use Redis or another distributed cache
// 2. Implement proper cache eviction
// 3. Add cache statistics
// 4. Implement cache warming
// 5. Add cache versioning

interface CacheEntry {
  value: string;
  expiresAt: number;
}

export class CacheService {
  private cache: Map<string, CacheEntry> = new Map();

  async get(key: string): Promise<string | null> {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }


}
