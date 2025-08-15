# 📬 Gmail Auto-Purge Script

Automatically delete unstarred, unimportant emails from your Gmail inbox that are older than a specified number of days.

> 🛡️ Starred and important emails are **not** deleted.

---

## 🔧 Features

- ⏱️ Automatically runs **daily** via Google Apps Script trigger
- 🧹 Deletes emails from your **Inbox** that are:
  - **Unstarred**
  - **Not marked as important**
  - **Older than X days** (default: 7)
- 🔁 Handles more than 150 threads in batches
- ♻️ Cleans up old triggers to avoid duplication

---

## ⚙️ Setup Instructions

### 1. Open Google Apps Script

- Go to [https://script.google.com](https://script.google.com)
- Create a new project

### 2. Paste the Script

Copy and paste the contents of [`PurgeOldEmails.gs`](./PurgeOldEmails.gs) into the code editor.

### 3. Authorize the Script

- Click the **Run** button ▶️ for the `setPurgeTrigger` function
- Google will prompt you to **authorize** the script to access your Gmail and manage triggers

### 4. Done!

The script will now run **once every day**, purging old, unimportant emails automatically.

---

## 🚀 Available Functions

| Function               | Description |
|------------------------|-------------|
| `setPurgeTrigger()`    | Installs a **daily trigger** to auto-run the purge |
| `removeAllTriggers()`  | Removes **all** installed triggers (to uninstall) |
| `purge()`              | Runs the purge process **once**, manually |
| `purgeMore()`          | Internal function to continue purging in batches |
| `setPurgeMoreTrigger()`| Internal helper to trigger follow-up purges |
| `removePurgeMoreTriggers()` | Cleans up stale `purgeMore` triggers |

---

## 🧪 Testing Manually

To test the purge behavior without scheduling it:
1. Run the `purge()` function directly in the Apps Script editor.
2. Check your Gmail Trash to confirm which threads were moved.

> ⚠️ Gmail auto-deletes messages in Trash after 30 days. Nothing is permanently deleted immediately.

---

## 🛠️ Configuration

Edit these two variables to customize the behavior:

```javascript
var DELETE_AFTER_DAYS = 7; // Change to desired age in days
var PAGE_SIZE = 150;       // Max number of threads per batch
