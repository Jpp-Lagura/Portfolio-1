"use strict";

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

// Build the content from the portfolio data
function renderNav(items) {
    $("#nav").innerHTML = (items || [])
        .map(n => `<a href="#${esc(n.target)}">${esc(n.label)}</a>`)
        .join("");
}

function renderHero(h, email) {
    $("#hero").innerHTML = `
        <img id="photo" src="${esc(h.photo)}" alt="Portrait of ${esc(h.name)}" width="180" height="225">
        <div>
            <h1>${esc(h.name)}</h1>
            <p class="loc">${esc(h.location)}</p>
            <p class="role">${esc(h.title)}</p>
            <p class="muted">${esc(h.description)}</p>
            <div class="btns">
                ${h.resume ? `<a class="btn primary" href="${esc(h.resume)}" target="_blank" rel="noopener">View Resume</a>` : ""}
                <a class="btn" href="mailto:${esc(email)}">Send Email</a>
            </div>
        </div>`;

    // Just hide the photo if it cannot load
    $("#photo").addEventListener("error", e => {
        e.target.style.visibility = "hidden";
    }, { once: true });
}

function renderAbout(paragraphs) {
    $("#about-text").innerHTML = (paragraphs || []).map(p => `<p>${esc(p)}</p>`).join("");
}

function renderSkills(list) {
    $("#skills-list").innerHTML = (list || []).map(s => `
        <li>
            <svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 4 4L19 6" />
            </svg>
            <span>${esc(s)}</span>
        </li>
    `).join("");
}

function renderProjects(list) {
    $("#project-grid").innerHTML = (list || []).map(p => `
        <article class="item">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.description)}</p>
            <div class="badges">
                ${(p.tags || []).map(t => `<span class="badge">${esc(t)}</span>`).join("")}
            </div>
            <div class="item-actions">
                ${p.github ? `<a class="btn sm" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>` : ""}
                ${p.demo ? `<a class="btn sm" href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo</a>` : ""}
            </div>
        </article>`).join("");
}

function renderEducation(list) {
    $("#education-list").innerHTML = (list || []).map(e => `
        <article class="edu-item">
            ${e.label ? `<p class="lbl">${esc(e.label)}</p>` : ""}
            <h3>${esc(e.title)}</h3>
            ${(e.org || e.period) ? `<p class="meta">${[e.org, e.period].filter(Boolean).map(esc).join(" · ")}</p>` : ""}
            ${(e.points || []).length ? `<ul>${e.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
        </article>`).join("");
}

function renderContact(c) {
    const icons = {
        email: `<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8 8-6H4l8 6Zm-6.5-4.8v8.3h13v-8.3l-6.5 4.8-6.5-4.8Z"/></svg>`,
        github: `<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.46-1.15-1.12-1.46-1.12-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.84c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>`,
        linkedin: `<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.37 7.4A2.37 2.37 0 1 0 5.37 2.66a2.37 2.37 0 0 0 0 4.74ZM3.45 21.34h3.84V9.01H3.45v12.33Zm6.24 0h3.84v-6.11c0-1.62.31-3.19 2.32-3.19 1.98 0 2 1.85 2 3.29v6.01h3.84v-6.77c0-3.33-.72-5.89-4.61-5.89-1.87 0-3.12 1.03-3.63 2h-.05V9.01H9.69v12.33Z"/></svg>`,
        facebook: `<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5V6.84c0-.79.52-.98.89-.98h2.27V2.05L14.06 2C10.43 2 9.64 4.99 9.64 5.99V8.5H7.2v4.14h2.44V22h4.36v-9.36h2.93l.38-4.14H14Z"/></svg>`
    };

    $("#contact-body").innerHTML = `
        <p class="cta">${esc(c.cta)}</p>
        <div class="list">
            <a class="row" href="mailto:${esc(c.email)}">${icons.email}<span>${esc(c.email)}</span></a>
            ${(c.links || []).map(l => `
                <a class="row" href="${esc(l.url)}" target="_blank" rel="noopener">
                    ${icons[l.name.toLowerCase()] || ""}
                    <span>${esc(l.name)}</span>
                    <span class="go">↗</span>
                </a>`).join("")}
        </div>`;
}

function renderGallery(data) {
    const gallery = $("#gallery");
    const photos = data.gallery || [];

    if (!gallery) return;
    if (!photos.length) {
        gallery.innerHTML = `<p class="gallery-error">No gallery photos available.</p>`;
        return;
    }

    const figures = photos.map(photo => `
        <figure>
            <img src="${esc(photo.src)}" alt="${esc(photo.alt || "")}" loading="lazy">
        </figure>
    `).join("");

    gallery.innerHTML = `
        <div class="gallery-set">${figures}</div>
        <div class="gallery-set" aria-hidden="true">${figures}</div>
    `;
}

function renderFooter(name) {
    $("#foot").textContent = `© ${new Date().getFullYear()} ${name}. All rights reserved.`;
}

// Page interactions
function initTheme() {
    const root = document.documentElement;
    const btn = $("#theme");
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch {}

    const apply = t => {
        root.dataset.theme = t;
        btn.textContent = t === "dark" ? "☀" : "☾";
        btn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    };

    apply(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

    btn.addEventListener("click", () => {
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        apply(next);
        try { localStorage.setItem("theme", next); } catch {}
    });
}

function initMenu() {
    const btn = $("#menu");
    const nav = $("#nav");

    btn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", e => {
        if (e.target.closest("a")) {
            nav.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
        }
    });
}

function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        els.forEach(el => el.classList.add("in"));
        return;
    }
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            e.target.classList.toggle("in", e.isIntersecting);
        });
    }, { threshold: 0.08 });

    els.forEach(el => io.observe(el));
}

function initNavHighlight() {
    const links = [...document.querySelectorAll(".nav a")];
    const spy = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                links.forEach(a =>
                    a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`)
                );
            }
        });
    }, { rootMargin: "-40% 0px -55% 0px" });

    links.forEach(a => {
        const section = document.getElementById(a.getAttribute("href").slice(1));
        if (section) spy.observe(section);
    });
}

function initBackToTop() {
    const btn = $("#top-btn");
    addEventListener("scroll", () => btn.classList.toggle("show", scrollY > 500), { passive: true });
    btn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

// Start everything after the page loads
async function init() {
    initTheme();

    let d;
    try {
        const res = await fetch("data/portfolio.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        d = await res.json();
    } catch (err) {
        console.error(err);
        $("#main").innerHTML = `
            <div class="card error" role="alert">
                <h2>Couldn't load portfolio data</h2>
                <p class="muted">Make sure <code>data/portfolio.json</code> exists and that you're running a local server (e.g. VS Code Live Server) instead of opening index.html directly.</p>
            </div>`;
        return;
    }

    const safe = (name, fn) => {
        try { fn(); } catch (err) { console.error(`[${name}]`, err); }
    };

    safe("nav", () => renderNav(d.nav));
    safe("menu", initMenu);
    safe("hero", () => renderHero(d.hero, d.contact.email));
    safe("about", () => renderAbout(d.about));
    safe("skills", () => renderSkills(d.skills));
    safe("projects", () => renderProjects(d.projects));
    safe("education", () => renderEducation(d.education));
    safe("contact", () => renderContact(d.contact));
    safe("footer", () => renderFooter(d.hero.name));
    safe("gallery", () => renderGallery(d));


    initReveal();
    initNavHighlight();
    initBackToTop();
}

document.addEventListener("DOMContentLoaded", init);