export default function normalizeTags(tags: unknown): string[] {
    if (!tags) return [];

    if (Array.isArray(tags)) return tags;

    if (typeof tags === "string") {
        try {
            const parsed = JSON.parse(tags);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
        }
    }

    return [];
}