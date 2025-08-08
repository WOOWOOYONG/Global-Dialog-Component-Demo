import { CommonEvent } from '@/enums/index'

import type { DialogConfig } from '@/types'

type Listener<T extends unknown[]> = (...args: T) => void

class EventEmitter<EventMap extends Record<string | number, unknown[]>> {
  private events: {
    [K in keyof EventMap]?: Array<Listener<EventMap[K]>>
  } = {}

  on<K extends keyof EventMap>(event: K, callback: Listener<EventMap[K]>) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event]?.push(callback)
  }

  emit<K extends keyof EventMap>(event: keyof EventMap, ...args: EventMap[K]) {
    this.events[event]?.forEach((listener) => listener(...args))
  }

  off(event: keyof EventMap) {
    delete this.events[event]
  }
}

export const eventEmitter = new EventEmitter<{
  [CommonEvent.OPEN_DIALOG]: [DialogConfig]
  [CommonEvent.CLOSE_DIALOG]: []
}>()
