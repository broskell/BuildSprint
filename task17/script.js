const popup = document.getElementById('cookie-popup');

popup.style.display = localStorage.getItem('cookieConsent') === 'true' ? 'none' : 'flex';

const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    popup.style.display = 'none';
}