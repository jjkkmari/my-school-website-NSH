// ---------------------- NAVIGATION MENU -----------------------// 
function openNav() { 
    const menu = document.getElementById("menu"); 
    if (menu) menu.style.width = "100%";
} 

function closeNav() { 
    const menu = document.getElementById("menu"); 
    if (menu) menu.style.width = "0%";
}  

function toggleMenu() { 
    const menu = document.getElementById("overlay-menu"); 
    if (menu.style.width === "100%") { 
        menu.style.width = "0";
    } else { 
        menu.style.width = "100%";
    }
}

// LOADS AFTER DOM LOADS //
document.addEventListener('DOMContentLoaded', () => { 

// ------------------------ READ MORE -----------------------// 
    const detailed = document.getElementById("detailed"); 
    const expandBtn = document.getElementById("expandBtn");  
    
    //hide detailed text//
    if (detailed) detailed.style.display = "none";  

    if (expandBtn) { 
        expandBtn.addEventListener('click', () => { 
            if (detailed.style.display === "none" || detailed.style.display === "") { 
                detailed.style.display = "block"; 
                expandBtn.textContent = "SHOW LESS"; 
            } else { 
                // Hide detailed text// 
                detailed.style.display = "none"; 
                expandBtn.textContent = "READ MORE"; 
            }

        });
    }

// -------------------------CAROUSEL------------------------// 
    
const slides = document.querySelectorAll('.carousel-slide'); 
    const indicators = document.querySelectorAll('.carousel-indicators .indicator'); 
    const prevBtn = document.querySelector('.carousel-button.prev'); 
    const nextBtn = document.querySelector('.carousel-button.next'); 


    if (slides.length > 0) { 
        let currentIndex = 0; 


        function showSlide(index) { 
            slides.forEach((slide, i) => { 
                slide.style.display = i === index ? 'block' : 'none'; 
                if (indicators[i]) { 
                    indicators[i].classList.toggle('active', i === index); 

                }
            });
        }
    
    // Initial Display // 
    showSlide(currentIndex); 

    if (nextBtn) { 
        nextBtn.addEventListener('click', () => { 
            currentIndex = (currentIndex + 1) % slides.length; 
            showSlide(currentIndex);
        });
    }
    
    if (prevBtn) { 
        prevBtn.addEventListener('click', () => { 
            currentIndex = (currentIndex - 1 + slides.length) % slides.length; 
            showSlide(currentIndex);
    });
   } 
    setInterval(() => { 
        currentIndex = (currentIndex +1) % slides.length; 
        showSlide(currentIndex); 
    }, 5000);
   }
})

//----------------------------Benefits section ----------------------// 
document.addEventListener('DOMContentLoaded', () => { 
    const accordionTitles = document.querySelectorAll('.accordion-title'); 

    accordionTitles.forEach(title => { 
        title.addEventListener('click', () => { 
            const content =title.nextElementSibling; 
            const isOpen = content.style.display === 'block'; 

            //Close all contents // 
            document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none'); 


            // Toggle current content // 
            content.style.display = isOpen ? 'none' : 'block'; 
        });
    });
});

//--------------------------------CART-------------------------// 
let cart = JSON.parse(localStorage.getItem("cart")) || []; 
let total = parseFloat(localStorage.getItem("total")) || 0; 


function updateCartCount() { 
    const countEl = document.getElementById('cart-count'); 
    if (countEl) countEl.innerText = cart.length;
} 

function addToCart(name, price) { 
    cart.push({ name, price }); 
    total += price; 
    
    localStorage.setItem("cart", JSON.stringify(cart)); 
    localStorage.setItem("total", total); 
    
    updateCartCount();
    renderCart();
} 

function openCart() { 
    const panel = document.getElementById('cart-panel'); 
    if (panel) { 
        panel.style.display = panel.style.display === "block" ? "none" : "block";
        renderCart(); 
    }
}    

function renderCart() { 
    const list = document.getElementById("cart-items"); 
    const totalEl = document.getElementById("cart-total"); 


if (list && totalEl) { 
    list.innerHTML = ""; 
    cart.forEach((item, index) => { 
        const li = document.createElement('li'); 
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`; 

        const removeBtn = document.createElement('button'); 
        removeBtn.textContent = 'Remove';  
        removeBtn.onclick = () => removeCart(index); 


        li.appendChild(removeBtn); 
        list.appendChild(li);
    });
    totalEl.innerText = total.toFixed(2);
   }
}

// removing items from cart// 
function removeCart(index) { 
    total -= cart[index].price; 
    cart.splice(index, 1); 

    localStorage.setItem("cart", JSON.stringify(cart)); 
    localStorage.setItem("total", total.toFixed(2)); 

    updateCartCount(); 
    renderCart();
}



// -------------------CHECKOUT LIST--------------------------// 
function completePurchase() { 
    alert("Thank you for your purchase!"); 
    localStorage.removeItem("cart"); 
    localStorage.removeItem("total"); 
    window.location.href = "shop.html"; 
} 

function initCheckout() { 
    const list = document.getElementById("checkout-items"); 
    const totalEl = document.getElementById("checkout-total"); 
     
if (list) { 
    list.innerHTML = ''; 
    cart.forEach(item => { 
        const li = document.createElement('li'); 
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`; 
        list.appendChild(li);
    });

 } 
 


    if (list && totalEl) { 
        list.innerHTML = ""; 
        cart.forEach(item => { 
            const li = document.createElement("li"); 
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`; 
            list.appendChild(li);
        }); 

        totalEl.innerText = total.toFixed(2); 
    }
} 


// cart display // 
updateCartCount(); 
renderCart(); 
initCheckout();