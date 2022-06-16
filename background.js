/* global browser */

browser.browserAction.setBadgeBackgroundColor({color: 'red'});
browser.browserAction.setBadgeText({text: "X" });

let enabled=true;

async function handleCreated(info) {
    if(enabled){
        try {
            await browser.downloads.cancel(info.id);
        }catch(e) {
            console.error(e);
        }
    }else{
        // reset after
        enabled = !enabled; // disabled after use
        browser.browserAction.setBadgeText({text: (enabled?"X":"O") });
        browser.browserAction.setBadgeBackgroundColor({color: (enabled?'red':'green')});
    }
}

async function handleClick(/*tab*/) {
  enabled = !enabled;
  browser.browserAction.setBadgeText({text: (enabled?"X":"O") });
  browser.browserAction.setBadgeBackgroundColor({color: (enabled?'red':'green')});
}

browser.downloads.onCreated.addListener(handleCreated);
browser.browserAction.onClicked.addListener(handleClick);

