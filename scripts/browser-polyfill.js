/**
 * Browser Polyfill for Cross-Browser Extension Compatibility
 * Provides unified APIs for Chrome and Firefox
 */

// Detect browser
const isFirefox = typeof browser !== 'undefined';
const isChrome = typeof chrome !== 'undefined' && !isFirefox;

// Unified browser API
window.browserAPI = {
  // Storage API
  storage: {
    local: {
      get: async (keys) => {
        if (isFirefox) {
          return await browser.storage.local.get(keys);
        } else {
          return new Promise((resolve) => {
            chrome.storage.local.get(keys, resolve);
          });
        }
      },
      set: async (items) => {
        if (isFirefox) {
          return await browser.storage.local.set(items);
        } else {
          return new Promise((resolve) => {
            chrome.storage.local.set(items, resolve);
          });
        }
      },
      remove: async (keys) => {
        if (isFirefox) {
          return await browser.storage.local.remove(keys);
        } else {
          return new Promise((resolve) => {
            chrome.storage.local.remove(keys, resolve);
          });
        }
      }
    },
    sync: {
      get: async (keys) => {
        if (isFirefox) {
          return await browser.storage.sync.get(keys);
        } else {
          return new Promise((resolve) => {
            chrome.storage.sync.get(keys, resolve);
          });
        }
      },
      set: async (items) => {
        if (isFirefox) {
          return await browser.storage.sync.set(items);
        } else {
          return new Promise((resolve) => {
            chrome.storage.sync.set(items, resolve);
          });
        }
      }
    }
  },

  // Tabs API
  tabs: {
    query: async (queryInfo) => {
      if (isFirefox) {
        return await browser.tabs.query(queryInfo);
      } else {
        return new Promise((resolve) => {
          chrome.tabs.query(queryInfo, resolve);
        });
      }
    },
    sendMessage: async (tabId, message) => {
      if (isFirefox) {
        return await browser.tabs.sendMessage(tabId, message);
      } else {
        return new Promise((resolve, reject) => {
          chrome.tabs.sendMessage(tabId, message, (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          });
        });
      }
    },
    create: async (createProperties) => {
      if (isFirefox) {
        return await browser.tabs.create(createProperties);
      } else {
        return new Promise((resolve) => {
          chrome.tabs.create(createProperties, resolve);
        });
      }
    }
  },

  // Runtime API
  runtime: {
    sendMessage: async (message) => {
      if (isFirefox) {
        return await browser.runtime.sendMessage(message);
      } else {
        return new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(message, (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          });
        });
      }
    },
    onMessage: {
      addListener: (callback) => {
        if (isFirefox) {
          browser.runtime.onMessage.addListener(callback);
        } else {
          chrome.runtime.onMessage.addListener(callback);
        }
      },
      removeListener: (callback) => {
        if (isFirefox) {
          browser.runtime.onMessage.removeListener(callback);
        } else {
          chrome.runtime.onMessage.removeListener(callback);
        }
      }
    },
    getURL: (path) => {
      if (isFirefox) {
        return browser.runtime.getURL(path);
      } else {
        return chrome.runtime.getURL(path);
      }
    }
  },

  // Context Menus API
  contextMenus: {
    create: async (createProperties) => {
      if (isFirefox) {
        return await browser.contextMenus.create(createProperties);
      } else {
        return new Promise((resolve) => {
          chrome.contextMenus.create(createProperties, resolve);
        });
      }
    },
    remove: async (menuId) => {
      if (isFirefox) {
        return await browser.contextMenus.remove(menuId);
      } else {
        return new Promise((resolve) => {
          chrome.contextMenus.remove(menuId, resolve);
        });
      }
    },
    removeAll: async () => {
      if (isFirefox) {
        return await browser.contextMenus.removeAll();
      } else {
        return new Promise((resolve) => {
          chrome.contextMenus.removeAll(resolve);
        });
      }
    },
    onClicked: {
      addListener: (callback) => {
        if (isFirefox) {
          browser.contextMenus.onClicked.addListener(callback);
        } else {
          chrome.contextMenus.onClicked.addListener(callback);
        }
      }
    }
  },

  // Notifications API
  notifications: {
    create: async (notificationId, options) => {
      if (isFirefox) {
        return await browser.notifications.create(notificationId, options);
      } else {
        return new Promise((resolve) => {
          chrome.notifications.create(notificationId, options, resolve);
        });
      }
    },
    clear: async (notificationId) => {
      if (isFirefox) {
        return await browser.notifications.clear(notificationId);
      } else {
        return new Promise((resolve) => {
          chrome.notifications.clear(notificationId, resolve);
        });
      }
    }
  },

  // Alarms API
  alarms: {
    create: async (name, alarmInfo) => {
      if (isFirefox) {
        return await browser.alarms.create(name, alarmInfo);
      } else {
        return new Promise((resolve) => {
          chrome.alarms.create(name, alarmInfo, resolve);
        });
      }
    },
    clear: async (name) => {
      if (isFirefox) {
        return await browser.alarms.clear(name);
      } else {
        return new Promise((resolve) => {
          chrome.alarms.clear(name, resolve);
        });
      }
    },
    clearAll: async () => {
      if (isFirefox) {
        return await browser.alarms.clearAll();
      } else {
        return new Promise((resolve) => {
          chrome.alarms.clearAll(resolve);
        });
      }
    },
    get: async (name) => {
      if (isFirefox) {
        return await browser.alarms.get(name);
      } else {
        return new Promise((resolve) => {
          chrome.alarms.get(name, resolve);
        });
      }
    },
    getAll: async () => {
      if (isFirefox) {
        return await browser.alarms.getAll();
      } else {
        return new Promise((resolve) => {
          chrome.alarms.getAll(resolve);
        });
      }
    },
    onAlarm: {
      addListener: (callback) => {
        if (isFirefox) {
          browser.alarms.onAlarm.addListener(callback);
        } else {
          chrome.alarms.onAlarm.addListener(callback);
        }
      }
    }
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.browserAPI;
} 