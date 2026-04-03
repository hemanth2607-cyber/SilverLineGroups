/**
 * SILVERLINE GROUPS - FINAL REPAIR SCRIPT
 * Fixes: 
 * 1. Comprehensive Button Detection (Metallic Hover)
 * 2. Click-to-Toggle Menu (Sticky Dropdowns)
 * 3. RAF Smooth Scroll (Liquid Chain)
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECTORS - We are grabbing everything that could be a button
    const allItems = document.querySelectorAll(".chain-item");
    const wand = document.getElementById('custom-wand');
    const menuItems = document.querySelectorAll(".menu-item");
    
    // This grabs every button, every link in your nav, and every 'metallic' class
    const buttons = document.querySelectorAll("button, .nav-links a, .menu-item, .button-container div");

    let currentScroll = window.pageYOffset;
    let smoothScroll = window.pageYOffset; 
    let lastScrollTop = window.pageYOffset;

    // ==========================================
    // 1. THE SMOOTH ENGINE (RAF)
    // ==========================================
    const updateChain = () => {
        smoothScroll += (currentScroll - smoothScroll) * 0.1;

        const spacing = 150;        
        const radius = 25;          
        const vLineHeight = 540;    
        const vOffset = 40;         
        const startY = -100;          
        const scrollSpeed = 0.8;    
        
        const curveTop = vLineHeight + vOffset - radius; 
        const curveEnd = curveTop + radius;              

        allItems.forEach((item, index) => {
            let progress = (index * spacing) + startY + (smoothScroll * scrollSpeed);
            let targetX = 0, targetY = 0;

            if (progress <= curveTop) {
                targetX = 0; targetY = progress;
            } 
            else if (progress > curveTop && progress <= curveEnd) {
                let angleProgress = (progress - curveTop) / radius; 
                let angle = angleProgress * (Math.PI / 2); 
                targetX = radius * (1 - Math.cos(angle));
                targetY = curveTop + (radius * Math.sin(angle));
            } 
            else {
                targetY = curveEnd; 
                targetX = radius + (progress - curveEnd); 
            }

            gsap.set(item, { y: targetY, x: targetX, force3D: true });

            const scrollDelta = currentScroll - lastScrollTop;
            const velocity = Math.max(Math.min(scrollDelta * 0.6, 15), -15); 

            if (Math.abs(scrollDelta) > 0.5) {
                gsap.to(item, {
                    rotation: velocity,
                    duration: 0.4,
                    overwrite: "auto",
                    onComplete: () => {
                        gsap.to(item, { rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
                    }
                });
            }
        });

        lastScrollTop = currentScroll;
        requestAnimationFrame(updateChain);
    };

    window.addEventListener("scroll", () => { currentScroll = window.pageYOffset; });
    requestAnimationFrame(updateChain);

    // ==========================================
    // 2. THE BUTTON REPAIR (Metallic & Smooth)
    // ==========================================
    buttons.forEach((btn) => {
        // Ensure buttons have a cursor so the user knows they are clickable
        btn.style.cursor = "pointer";

        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, { 
                scale: 1.08, 
                duration: 0.4,
                // This creates a metallic "shimmer" feel by brightening the element
                filter: "brightness(1.3) contrast(1.1)",
                boxShadow: "0px 10px 20px rgba(255,255,255,0.2)",
                ease: "back.out(2)"
            });
        });
        
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { 
                scale: 1, 
                duration: 0.4,
                filter: "brightness(1) contrast(1)",
                boxShadow: "0px 0px 0px rgba(255,255,255,0)",
                ease: "power2.inOut"
            });
        });

        btn.addEventListener("mousedown", () => {
            gsap.to(btn, { scale: 0.92, duration: 0.1 });
        });

        btn.addEventListener("mouseup", () => {
            gsap.to(btn, { scale: 1.08, duration: 0.1 });
        });
    });

    // ==========================================
    // 3. MENU TOGGLE (Sticky Dropdowns)
    // ==========================================
    menuItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            // This prevents the click from closing the menu immediately
            e.stopPropagation();
            
            // Close all other menus
            menuItems.forEach(other => {
                if (other !== item) other.classList.remove("active");
            });

            // Toggle this menu
            item.classList.toggle("active");
        });
    });

    // Close menus if clicking anywhere else on the page
    document.addEventListener("click", () => {
        menuItems.forEach(item => item.classList.remove("active"));
    });

    // ==========================================
    // 4. MAGIC WAND & STARDUST
    // ==========================================
    let lastMouseX = 0, lastMouseY = 0;
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX, y = e.clientY;
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        if (wand) wand.style.opacity = '1';

        const dist = Math.hypot(x - lastMouseX, y - lastMouseY);
        if (dist > 15) { 
            const p = document.createElement('div');
            p.className = 'cursor-particle';
            p.style.left = x + 'px', p.style.top = y + 'px';
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 300);
            lastMouseX = x; lastMouseY = y;
        }
    });
});

// --- WAND VISIBILITY CONTROL ---
const wand = document.getElementById("custom-wand");

document.addEventListener("mouseleave", () => {
    // Hide the wand when the mouse leaves the browser window
    gsap.to(wand, { opacity: 0, duration: 0.1 });
});

document.addEventListener("mouseenter", () => {
    // Show the wand as soon as it re-enters
    gsap.to(wand, { opacity: 1, duration: 0.1 });
});