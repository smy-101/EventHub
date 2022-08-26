class EventHub {
  private cache: { [key: string]: Array<(data: unknown) => void> } = {}; //订阅者 {'xxx':[f1,f2,f3],'yyy':[f4,f5,f6]}
  on(eventName: string, fn: (data: unknown) => void) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }

  emit(eventName: string, data?: unknown) {
    if (this.cache[eventName] === undefined) return;
    this.cache[eventName].forEach((fn: Function) => fn(data));
  }

  off(eventName: string, fn: (data: unknown) => void) {
    let index = indexOf(this.cache[eventName], fn);
    if (index === undefined) return;
    this.cache[eventName].splice(index, 1);
  }
}

export { EventHub };

function indexOf(array: unknown[], item: unknown) {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}
