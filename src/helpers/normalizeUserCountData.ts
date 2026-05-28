export interface NormalizableUserCountData {
  count: string | number
  history: string[][] | null
}

function latestNonZeroHistoryCount(history: string[][]) {
  for (const [, count] of [...history].reverse()) {
    if (Number(count) > 0) {
      return count
    }
  }
}

export default function normalizeUserCountData<
  T extends NormalizableUserCountData
>(data: T) {
  if (!Array.isArray(data.history) || !data.history.length) {
    return
  }

  if (Number(data.count) > 0) {
    return data
  }

  const latestHistoryCount = latestNonZeroHistoryCount(data.history)
  if (latestHistoryCount) {
    return {
      ...data,
      count: latestHistoryCount,
    }
  }
}
