function memoise<Value>(fn: (...args: string[]) => Value): () => Value {
  let called = false
  let cache: Value

  return (...args): Value => {
    if (called) {
      return cache
    }

    called = true
    cache = fn(...args)

    return cache
  }
}

export default memoise
