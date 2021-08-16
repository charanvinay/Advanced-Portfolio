window.addEventListener("load", function () {
  document.querySelector(".preloader").classList.add("opacity-0");
  setTimeout(function () {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
});

// portfolio item filter

const filterContainer = document.querySelector(".portfolio-filter"),
  filterBtns = filterContainer.children,
  totalFilterBtn = filterBtns.length,
  portfolioItems = document.querySelectorAll(".portfolio-item"),
  totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");
    for (let k = 0; k < totalPortfolioItem; k++) {
      if (filterValue === portfolioItems[k].getAttribute("data-category")) {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      } else {
        portfolioItems[k].classList.remove("show");
        portfolioItems[k].classList.add("hide");
      }
      if (filterValue === "all") {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      }
    }
  });
}

// portfolio lightbox
const lightbox = document.querySelector(".lightbox"),
  lightboxImg = lightbox.querySelector(".lightbox-img"),
  lightboxText = lightbox.querySelector(".caption-text"),
  lightboxClose = lightbox.querySelector(".lightbox-close"),
  lightboxCounter = lightbox.querySelector(".caption-counter");

let itemIndex = 0;

for (let i = 0; i < totalPortfolioItem; i++) {
  portfolioItems[i].addEventListener("click", function () {
    itemIndex = i;
    changeItem();
    toggleLightbox();
  });
}

function nextItem() {
  if (itemIndex === totalPortfolioItem - 1) {
    itemIndex = 0;
  } else {
    itemIndex++;
  }
  changeItem();
}

const projects = [
  "https://github.com/charanvinay/Facebook_UI_Flutter",
  "https://github.com/charanvinay/Shoppiey",
  "https://github.com/charanvinay/Signin-Signup-Charan",
  "#",
  "https://github.com/charanvinay/ReduKT_site",
  "https://github.com/charanvinay/News-app-using-flutter",
  "https://github.com/charanvinay/Handybag",
  "https://github.com/charanvinay/Novels-app",
  "https://github.com/charanvinay/Inshorts-clone",
  "https://github.com/charanvinay/E-Commerce-app-UI-Flutter",
  "https://github.com/charanvinay/Netflix-UI-Using-Flutter",
  "https://github.com/charanvinay/Chat-app-UI-Flutter",
  "https://github.com/charanvinay/Signal-app-UI-Flutter",
  "https://github.com/charanvinay/Portfolio-UI-Using-Flutter",
  "https://github.com/charanvinay/Weatherapp-using-Openweather",
];
function goToProject() {
  window.location = projects[itemIndex];
}

function prevItem() {
  if (itemIndex === 0) {
    itemIndex = totalPortfolioItem - 1;
  } else {
    itemIndex--;
  }
  changeItem();
}

function toggleLightbox() {
  lightbox.classList.toggle("open");
}

function changeItem() {
  imgSrc = portfolioItems[itemIndex]
    .querySelector(".portfolio-img img")
    .getAttribute("src");
  lightboxImg.src = imgSrc;

  lightboxText.innerHTML =
    portfolioItems[itemIndex].querySelector("h4").innerHTML;

  lightboxCounter.innerHTML = itemIndex + 1 + " of " + totalPortfolioItem;
}

// close lightbox

lightbox.addEventListener("click", function (event) {
  if (event.target === lightboxClose || event.target === lightbox) {
    toggleLightbox();
  }
});

// aside navbar

const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    // remove back section class
    removeBackSectionClass();

    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        // add back section class
        addBackSectionClass(j);
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSelection(this);

    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function removeBackSectionClass() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}

function addBackSectionClass(num) {
  allSection[num].classList.add("back-section");
}

function showSelection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}

document.querySelector(".hire-me").addEventListener("click", function () {
  const sectionIndex = this.getAttribute("data-section-index");
  // console.log(sectionIndex);
  showSelection(this);
  updateNav(this);
  removeBackSectionClass();
  addBackSectionClass(sectionIndex);
});

// toggler
const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", asideSectionTogglerBtn);

function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}
