enum Status {
  done = 'done',
  approve = 'approve',
  reject = 'reject',
  waiting = 'waiting'
}

enum StatusMapping {
  done = 'Виконано',
  approve = 'Запис підтверджений',
  reject = 'Відхилино',
  waiting = 'Очікує підтвердження',
}

export {
  Status,
  StatusMapping,
}