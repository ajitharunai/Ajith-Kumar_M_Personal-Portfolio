const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        // Calculate the file URL
        const filePath = path.resolve(__dirname, '../../index.html').replace(/\\/g, '/');
        const fileUrl = 'file:///' + filePath;
        
        console.log("Navigating to: " + fileUrl);
        
        // 1. Desktop Screenshot (Hero)
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto(fileUrl, { waitUntil: 'networkidle0' });
        // Add a small delay to ensure rendering of animations/fonts
        await new Promise(r => setTimeout(r, 2000));
        console.log("Capturing Desktop Hero...");
        await page.screenshot({ path: path.join(__dirname, 'desktop_hero.png'), fullPage: false });
        
        // 2. Desktop Screenshot (Full)
        console.log("Capturing Desktop Full...");
        await page.screenshot({ path: path.join(__dirname, 'desktop_full.png'), fullPage: true });

        // 3. Mobile Screenshot (Hero)
        await page.setViewport({ width: 375, height: 812, isMobile: true });
        await page.goto(fileUrl, { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 2000));
        console.log("Capturing Mobile Hero...");
        await page.screenshot({ path: path.join(__dirname, 'mobile_hero.png'), fullPage: false });

        console.log("Screenshots captured successfully in d:\\Resume\\assets\\screenshots");
        await browser.close();
    } catch (e) {
        console.error("Error capturing screenshots: ", e);
    }
})();
