/*
|--------------------------------------------------------------------------
| PurgeOldEmails - All-in-one version (No Delays)
|--------------------------------------------------------------------------
| Deletes emails older than DELETE_AFTER_DAYS from Inbox,
| except starred or important ones, in one run.
| Runs daily if trigger is set.
|--------------------------------------------------------------------------
*/

// Purge messages automatically after how many days?
var DELETE_AFTER_DAYS = 90;

// Maximum number of message threads to process per batch.
var PAGE_SIZE = 150;

/**
 * Create a trigger that executes purge() every day.
 * Run this function once to install the script.
 */
function setPurgeTrigger() {
  ScriptApp
    .newTrigger('purge')
    .timeBased()
    .everyDays(1)
    .create();
}

/**
 * Deletes all matching emails from Inbox in one run
 */
function purge() {
  var search = 'in:inbox -in:starred -in:important older_than:' + DELETE_AFTER_DAYS + 'd';
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - DELETE_AFTER_DAYS);

  var start = 0;
  var totalDeleted = 0;
  var startTime = new Date().getTime();

  while (true) {
    var threads = GmailApp.search(search, start, PAGE_SIZE);
    if (threads.length === 0) break;

    console.log('Processing ' + threads.length + ' threads...');

    for (var i = 0; i < threads.length; i++) {
      var thread = threads[i];
      if (thread.getLastMessageDate() < cutoff) {
        thread.moveToTrash();
        totalDeleted++;
      }
    }

    if (threads.length < PAGE_SIZE) break; // No more threads left
    start += PAGE_SIZE;

    // Stop early if close to Google’s 6-min execution limit
    if ((new Date().getTime() - startTime) > (5 * 60 * 1000)) {
      console.log('Stopping early to avoid timeout. Deleted so far: ' + totalDeleted);
      return;
    }
  }

  console.log('Deleted ' + totalDeleted + ' threads.');
}

/**
 * Remove all triggers (if you ever need to uninstall).
 */
function removeAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}
