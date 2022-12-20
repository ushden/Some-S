const save = (key: string, value: any, expirationSec: number, raiseEvent = true) => {
  if (typeof (Storage) === "undefined") {
    return false;
  }

  const record = {value: value, isEternal: false, timestamp: 0};

  if (!expirationSec) {
    record.isEternal = true;
  } else {
    const expirationMS = expirationSec * 1000;
    record.timestamp = new Date().getTime() + expirationMS;
  }

  localStorage.setItem(key, JSON.stringify(record));
  if (typeof window !== 'undefined' && raiseEvent) {
    window.dispatchEvent(new Event('storage'));
  }
  return value;
};
const load = (key: string, deleteAfterLoad = false) => {
  if (typeof (Storage) === "undefined") {
    return false;
  }
  try {
    let record = JSON.parse(localStorage.getItem(key) || '');
    if (!record) {
      return false;
    }

    if (deleteAfterLoad) {
      localStorage.removeItem(key);
    }

    if (record.isEternal) {
      return record.value;
    }

    if (record.timestamp) {
      return (new Date().getTime() < record.timestamp && record.value);
    } else {
      return record;
    }
  } catch (e) {
    return false;
  }
};

export default {
  save: function (key: string, value: any, expirationSec: number) {
    return save(key, value, expirationSec);
  },
  saveSilently: function (key: string, value: any, expirationSec: number) {
    return save(key, value, expirationSec, false);
  },
  load: function (key: string) {
    return load(key);
  },
  loadWithTimestamp: function (key: string) {
    if (typeof (Storage) === "undefined") {
      return false;
    }
    try {
      let record = JSON.parse(localStorage.getItem(key) || '');
      if (!record) {
        return false;
      }

      if (record.timestamp && record.timestamp > Date.now()) {
        return record.value;
      } else {
        return record;
      }
    } catch (e) {
      return false;
    }
  },
  loadOnce: function (key: string) {
    return load(key, true);
  },
  remove: function (key: string, raiseEvent = true) {
    if (typeof (Storage) === "undefined") {
      return false;
    }
    localStorage.removeItem(key);

    if (typeof window !== 'undefined' && raiseEvent) {
      window.dispatchEvent(new Event('storage'));
    }
  },
  loadValueWithTTl: function (key: string) {
    if (typeof (Storage) === "undefined") {
      return false;
    }
    try {
      let record = JSON.parse(localStorage.getItem(key) || '');
      if (!record) {
        return false;
      }

      return record;
    } catch (e) {
      return false;
    }
  },
};
