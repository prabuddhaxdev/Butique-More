const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const images = Array.from({length: 13}, (_, i) => `public/${i+1}.jpeg`);
let imageIndex = 0;

const getRandomImage = () => {
    const img = images[imageIndex];
    imageIndex = (imageIndex + 1) % images.length;
    return img;
};

const regexUnsplash = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?q=80&w=[0-9]+&auto=format&fit=crop/g;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace footer contact
    content = content.replace(
        /<div class="footer-contact">\s*<h4>Contact<\/h4>\s*<p>Email: bespoke@atelier\.com<\/p>\s*<p>WhatsApp: \+1 \(555\) 123-4567<\/p>\s*<p>Location: New York City \(By Appointment\)<\/p>\s*<\/div>/g,
        `<div class="footer-contact">
                <h4>Contact</h4>
                <p>Email: bespoke@atelier.com</p>
                <p>WhatsApp: +91 8820988244</p>
                <p>Location: Jangalpara, PO Magra, Hooghly, West Bengal 712148</p>
            </div>`
    );

    // Replace floating WhatsApp link
    content = content.replace(
        /<a href="https:\/\/wa\.me\/15551234567" target="_blank" class="whatsapp-float">/g,
        `<a href="https://wa.me/918820988244" target="_blank" class="whatsapp-float">`
    );

    // Replace images with local ones
    content = content.replace(regexUnsplash, () => getRandomImage());

    // Replace specific contact info in contact.html
    if (file === 'contact.html') {
        content = content.replace(
            /<p>\+1 \(555\) 123-4567<\/p>\s*<a href="https:\/\/wa\.me\/15551234567"/g,
            `<p>+91 8820988244</p>\n                <a href="https://wa.me/918820988244"`
        );
        content = content.replace(
            /<p>New York City, NY<br>\(By Appointment Only\)<\/p>/g,
            `<p>Jangalpara, PO Magra<br>Hooghly, West Bengal 712148</p>\n                <a href="https://www.google.com/maps/place/22%C2%B059'02.6%22N+88%C2%B021'55.5%22E/@22.9840603,88.3628492,17z/data=!3m1!4b1!4m4!3m3!8m2!3d22.9840603!4d88.3654241?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="link-btn mt-4">View Map <i class="fas fa-arrow-right"></i></a>`
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Update completed');
