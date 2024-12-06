const createSnowflake = () => {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.innerHTML = '❄️';
    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
};

setInterval(createSnowflake, 50);

const menuHamburger = document.querySelector(".menu-burger")
        const navLinks = document.querySelector(".nav-liens")
 
        menuHamburger.addEventListener('click',()=>{ /* À chaque fois que l'on click et bien on ajoute la varibale mobile-menu au burger */
        navLinks.classList.toggle('mobile-menu')
        })