const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace <title>
    content = content.replace(/<title>(.*?) \| Atelier<\/title>/g, '<title>$1 | Butique & more</title>');
    content = content.replace(/<title>Atelier \| (.*?)<\/title>/g, '<title>Butique & more | $1</title>');
    
    // Replace navbar logo
    content = content.replace(/<a href="index\.html" class="brand-logo">Atelier<\/a>/g, '<a href="index.html" class="brand-logo">Butique & more</a>');

    // Replace footer brand
    content = content.replace(/<div class="footer-brand">\s*<h2>Atelier<\/h2>/g, '<div class="footer-brand">\n                <h2>Butique & more</h2>');

    // Replace footer copyright
    content = content.replace(/&copy; 2026 Atelier Bespoke\. All Rights Reserved\./g, '&copy; 2026 Butique & more. All Rights Reserved.');

    // Replace email references just in case (bespoke@atelier.com -> contact@butiqueandmore.com or similar, but the user didn't specify an email. I'll leave the email as is or just change the domain)
    content = content.replace(/bespoke@atelier\.com/g, 'contact@butiqueandmore.com');

    // Replace instagram handle if it's AtelierBespoke
    content = content.replace(/@AtelierBespoke/g, '@ButiqueAndMore');

    // Any generic watermark text
    content = content.replace(/© Atelier Bespoke/g, '© Butique & more');

    fs.writeFileSync(filePath, content, 'utf8');
}

// Update CSS for watermark
const cssPath = path.join(dir, 'style.css');
if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    cssContent = cssContent.replace(/content: "© Atelier Bespoke";/g, 'content: "© Butique & more";');
    fs.writeFileSync(cssPath, cssContent, 'utf8');
}

console.log('Rename completed');
