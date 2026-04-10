const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const body = document.body;

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    body.classList.toggle("menu-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const typingTitles = document.querySelectorAll(".typing-title");

const startTyping = (element) => {
  const fullText = element.dataset.text || element.textContent.trim();
  if (!fullText) {
    return;
  }

  element.textContent = "";
  let cursor = 0;
  const typeSpeed = 90;

  const tick = () => {
    cursor += 1;
    element.textContent = fullText.slice(0, cursor);
    if (cursor < fullText.length) {
      setTimeout(tick, typeSpeed);
    } else {
      element.classList.add("typing-complete");
    }
  };

  tick();
};

const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

typingTitles.forEach((element, index) => {
  if (isReducedMotion) {
    element.textContent = element.dataset.text || element.textContent.trim();
    element.classList.add("typing-complete");
    return;
  }

  const delay = index * 200 + 100;
  setTimeout(() => startTyping(element), delay);
});

const counters = document.querySelectorAll("[data-counter]");

const animateCounter = (counter) => {
  const target = Number(counter.dataset.counter);
  const suffix = target === 96 ? "%" : "+";
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 45));

  const tick = () => {
    current = Math.min(current + step, target);
    counter.textContent = `${current}${suffix}`;

    if (current < target) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const filterButtons = document.querySelectorAll(".filter-chip");
const cakeCards = document.querySelectorAll(".cake-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");

    cakeCards.forEach((card) => {
      const categories = card.dataset.category || "";
      const matches = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !matches);
    });
  });
});

const reviews = [
  {
    quote:
      "The cake looked even better than the reference photo and tasted incredible. Every guest wanted the baker's contact.",
    name: "Aarushi, Birthday Order",
    label: "Buttercream floral cake",
  },
  {
    quote:
      "We ordered for an engagement dinner and it genuinely felt luxury. The finish, the flavor, the service, everything was smooth.",
    name: "Rohan & Mehak, Engagement Order",
    label: "Tiered celebration cake",
  },
  {
    quote:
      "Usually beautiful cakes disappoint on taste, but this one did both perfectly. It became the centerpiece of the party.",
    name: "Nisha, Anniversary Order",
    label: "Chocolate luxe design",
  },
];

const quoteEl = document.getElementById("review-quote");
const nameEl = document.getElementById("review-name");
const labelEl = document.getElementById("review-label");
const reviewButtons = document.querySelectorAll(".review-nav");
let currentReview = 0;

const renderReview = (index) => {
  if (!quoteEl || !nameEl || !labelEl) {
    return;
  }

  const review = reviews[index];
  quoteEl.textContent = `"${review.quote}"`;
  nameEl.textContent = review.name;
  labelEl.textContent = review.label;
};

reviewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction;
    currentReview =
      direction === "next"
        ? (currentReview + 1) % reviews.length
        : (currentReview - 1 + reviews.length) % reviews.length;

    renderReview(currentReview);
  });
});

if (quoteEl && nameEl && labelEl) {
  setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    renderReview(currentReview);
  }, 5000);
}

const galleryAutoScroll = document.querySelector('[data-auto-scroll="gallery"]');
const galleryScrollButton = document.querySelector(".scroll-button");
const galleryTarget = document.getElementById("gallery");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const galleryColumnsRoot = document.getElementById("gallery-columns");
const galleryAudioToggle = document.getElementById("gallery-audio-toggle");
let galleryMusic = null;

if (galleryScrollButton && galleryTarget) {
  galleryScrollButton.addEventListener("click", () => {
    galleryTarget.scrollIntoView({ behavior: "smooth" });
  });
}

const aboutScrollButton = document.querySelectorAll(".scroll-button")[1];
const aboutTarget = document.getElementById("about-content");

if (aboutScrollButton && aboutTarget) {
  aboutScrollButton.addEventListener("click", () => {
    aboutTarget.scrollIntoView({ behavior: "smooth" });
  });
}

if (galleryColumnsRoot) {
  const imageSources = [
    "assets/IMG_0164.jpg",
    "assets/IMG_0244.jpg",
    "assets/IMG_9435.jpg",
    "assets/IMG_9505.jpg",
    "assets/IMG_9653.jpg",
    "assets/IMG_0146.jpg",
    "assets/IMG_9661.jpg",
    "assets/IMG_9915.jpg",
    "assets/IMG_9655.jpg",
    "assets/insta cake red yellow.jpg",
    "assets/insta cake set.jpg",
    "assets/insta cake sets.jpg",
    "assets/insta cake simple bubbles.jpg",
    "assets/insta cake simple.jpg",
    "assets/insta cake teddy.jpg",
    "assets/insta cake theme.jpg",
    "assets/insta cake tier black white.jpg",
    "assets/insta cake twenty five.jpg",
    "assets/insta cake white balls.jpg",
    "assets/insta cake white honda.jpg",
    "assets/insta cake white sets.jpg",
    "assets/insta cake white stripes.jpg",
    "assets/insta cake white.jpg",
    "assets/insta cake yellow balls.jpg",
    "assets/insta cake.jpg",
    "assets/insta cakelight.jpg",
    "assets/insta cakes set.jpg",
    "assets/insta cookie tin.jpg",
    "assets/insta cake arch.jpg",
    "assets/insta cake barbie.jpg",
    "assets/insta cake bento hug.jpg",
    "assets/insta cake bento muffin.jpg",
    "assets/insta cake bento set.jpg",
    "assets/insta cake bento sets.jpg",
    "assets/insta cake bento.jpg",
    "assets/insta cake black.jpg",
    "assets/insta cake blue white.jpg",
    "assets/insta cake boss baby.jpg",
    "assets/insta cake bottle.jpg",
    "assets/insta cake box.jpg",
    "assets/insta cake brown drip.jpg",
    "assets/insta cake brown gold.jpg",
    "assets/insta cake brownie.jpg",
    "assets/insta cake choco brownie.jpg",
    "assets/insta cake compact bento.jpg",
    "assets/insta cake creame.jpg",
    "assets/insta cake door.jpg",
    "assets/insta cake eyes.jpg",
    "assets/insta cake flamingo.jpg",
    "assets/insta cake flower white.jpg",
    "assets/insta cake gold leaf.jpg",
    "assets/insta cake gold.jpg",
    "assets/insta cake green muffin.jpg",
    "assets/insta cake half.jpg",
    "assets/insta cake light golden.jpg",
    "assets/insta cake light purple.jpg",
    "assets/insta cake light.jpg",
    "assets/insta cake lotus biscoff.jpg",
    "assets/insta cake moon sun.jpg",
    "assets/insta cake muffin.jpg",
    "assets/insta cake muffins.jpg",
    "assets/insta cake mult bento.jpg",
    "assets/insta cake multi color.jpg",
    "assets/insta cake multi muffin.jpg",
    "assets/insta cake multi.jpg",
    "assets/insta cake pink muffin.jpg",
    "assets/insta cake pink shades.jpg",
    "assets/insta cake plain black and white.jpg",
    "assets/insta cake props.jpg",
    "assets/insta cake raakhi wide.jpg",
    "assets/insta cake raakhi.jpg",
    "assets/insta cake red pink.jpg",
  ];

  const videoSources = [
    "assets/IMG_0499.MOV",
    "assets/IMG_0500.MOV",
    "assets/IMG_0501.MOV",
    "assets/IMG_0498.MOV",
    "assets/insta cake red white.mp4",
    "assets/insta cake reel cake.mp4",
    "assets/insta cake reel making.mp4",
    "assets/insta cake reel small.mp4",
    "assets/insta cake reel.mp4",
    "assets/insta cake eyes.mp4",
    "assets/insta cake green.mp4",
    "assets/insta reel cake red.mp4",
    "assets/insta reel cake round.mp4",
    "assets/insta reel cake simlpe white tier.mp4",
    "assets/insta reel cake white brown.mp4",
    "assets/insta reel cake white.mp4",
    "assets/insta reel cake.mp4",
    "assets/insta reel cake bento.mp4",
    "assets/insta reel cake black.mp4",
    "assets/insta reel cake brown.mp4",
    "assets/insta reel cake christmas.mp4",
    "assets/insta reel cake cookie tin.mp4",
    "assets/insta reel cake creamy.mp4",
    "assets/insta reel cake cupcakes.mp4",
    "assets/insta reel cake gulab jamun.mp4",
    "assets/insta reel cake layering.mp4",
    "assets/insta reel cake nice.mp4",
    "assets/insta reel cake old.mp4",
    "assets/insta reel cake pink bento.mp4",
    "assets/insta reel cake pink.mp4",
  ];

  const hashString = (value) =>
    value.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000003, 7);

  const orderedImages = [...imageSources].sort((a, b) => hashString(a) - hashString(b));
  const orderedVideos = [...videoSources].sort((a, b) => hashString(a) - hashString(b));
  const galleryMedia = [];
  const videoGap = 3;
  let imageIndex = 0;
  let videoIndex = 0;

  while (imageIndex < orderedImages.length || videoIndex < orderedVideos.length) {
    for (let count = 0; count < videoGap && imageIndex < orderedImages.length; count += 1) {
      galleryMedia.push({ type: "image", src: orderedImages[imageIndex] });
      imageIndex += 1;
    }

    if (videoIndex < orderedVideos.length) {
      galleryMedia.push({ type: "video", src: orderedVideos[videoIndex] });
      videoIndex += 1;
    }
  }

  const galleryCardClasses = [
    "gallery-card-portrait",
    "gallery-card-landscape",
    "gallery-card-square",
    "gallery-card-square",
    "gallery-card-portrait",
    "gallery-card-landscape",
  ];

  const columns = [
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
  ];

  columns.forEach((column) => {
    column.className = "gallery-column";
    column.setAttribute("data-gallery-column", "");
  });

  galleryMedia.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = `gallery-card ${galleryCardClasses[index % galleryCardClasses.length]}`;

    if (item.type === "video") {
      const video = document.createElement("video");
      video.className = "gallery-video";
      video.autoplay = true;
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("muted", "");
      video.setAttribute("aria-label", "Sugar Swirl gallery video");

      const source = document.createElement("source");
      source.src = item.src;
      source.type = "video/mp4";
      video.append(source);
      card.append(video);
    } else {
      const image = document.createElement("img");
      image.className = "gallery-image";
      image.src = item.src;
      image.alt = "Sugar Swirl gallery cake";
      image.loading = "lazy";
      card.append(image);
    }

    columns[index % columns.length].append(card);
  });

  galleryColumnsRoot.replaceChildren(...columns);

  galleryColumnsRoot.querySelectorAll("video").forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
    video.addEventListener("play", () => {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    });
  });
}

if (galleryAudioToggle) {
  galleryMusic = new Audio("assets/music.mp3");
  galleryMusic.loop = true;
  galleryMusic.volume = 0.1;
  galleryMusic.preload = "auto";

  const syncGalleryAudioButton = (isPlaying) => {
    galleryAudioToggle.classList.toggle("is-playing", isPlaying);
    galleryAudioToggle.setAttribute("aria-pressed", String(isPlaying));
    galleryAudioToggle.setAttribute(
      "aria-label",
      isPlaying ? "Mute gallery music" : "Unmute gallery music"
    );
    galleryAudioToggle.title = isPlaying ? "Mute gallery music" : "Unmute gallery music";
  };

  syncGalleryAudioButton(false);

  galleryAudioToggle.addEventListener("click", async () => {
    if (!galleryMusic) {
      return;
    }

    if (galleryMusic.paused) {
      try {
        await galleryMusic.play();
        syncGalleryAudioButton(true);
      } catch {
        syncGalleryAudioButton(false);
      }
    } else {
      galleryMusic.pause();
      syncGalleryAudioButton(false);
    }
  });
}

if (galleryAutoScroll && !prefersReducedMotion.matches) {
  const galleryColumns = Array.from(galleryAutoScroll.querySelectorAll("[data-gallery-column]"));
  const mobileGalleryQuery = window.matchMedia("(max-width: 720px)");
  let autoScrollFrame = null;
  let pauseUntil = 0;
  let lastFrameTime = 0;
  const pixelsPerSecond = 42;
  const columnState = [];

  const resetGalleryColumns = () => {
    if (autoScrollFrame) {
      window.cancelAnimationFrame(autoScrollFrame);
      autoScrollFrame = null;
    }

    lastFrameTime = 0;

    galleryColumns.forEach((column) => {
      if (column.dataset.originalMarkup) {
        column.innerHTML = column.dataset.originalMarkup;
      }

      column.style.transform = "";
      delete column.dataset.loopReady;
    });
  };

  const startGalleryAutoScroll = () => {
    if (mobileGalleryQuery.matches) {
      resetGalleryColumns();
      return;
    }

    galleryColumns.forEach((column, index) => {
      if (!column.dataset.originalMarkup) {
        column.dataset.originalMarkup = column.innerHTML;
      }

      if (column.dataset.loopReady) {
        column.innerHTML = column.dataset.originalMarkup;
      }

      if (!column.dataset.loopReady) {
        column.insertAdjacentHTML("beforeend", column.innerHTML);
        column.dataset.loopReady = "true";
      }

      const loopHeight = column.scrollHeight / 2;
      columnState[index] = {
        element: column,
        loopHeight,
        offset: 0,
        speed: pixelsPerSecond * (1 + index * 0.08),
      };
    });

    if (autoScrollFrame) {
      window.cancelAnimationFrame(autoScrollFrame);
    }

    const tickGalleryScroll = (timestamp) => {
      if (!lastFrameTime) {
        lastFrameTime = timestamp;
      }

      const delta = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      if (Date.now() >= pauseUntil) {
        columnState.forEach((state) => {
          if (!state || state.loopHeight <= 0) {
            return;
          }

          state.offset += (state.speed * delta) / 1000;

          if (state.offset >= state.loopHeight) {
            state.offset -= state.loopHeight;
          }

          state.element.style.transform = `translateY(-${state.offset}px)`;
        });
      }

      autoScrollFrame = window.requestAnimationFrame(tickGalleryScroll);
    };

    autoScrollFrame = window.requestAnimationFrame(tickGalleryScroll);
  };

  const pauseGalleryScroll = () => {
    pauseUntil = Date.now() + 1800;
  };

  window.addEventListener("load", startGalleryAutoScroll, { once: true });

  if (document.readyState === "complete") {
    startGalleryAutoScroll();
  }

  mobileGalleryQuery.addEventListener("change", startGalleryAutoScroll);

  galleryAutoScroll.addEventListener("mouseenter", pauseGalleryScroll);
  galleryAutoScroll.addEventListener("touchstart", pauseGalleryScroll, { passive: true });
  galleryAutoScroll.addEventListener("wheel", pauseGalleryScroll, { passive: true });

  window.addEventListener("beforeunload", () => {
    if (autoScrollFrame) {
      window.cancelAnimationFrame(autoScrollFrame);
    }
  });
}

const orderForm = document.getElementById("order-form");
const feedback = document.getElementById("form-feedback");
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
const defaultWhatsappNumber = "918790184565";

const buildWhatsappLink = (message, phone = defaultWhatsappNumber) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

whatsappLinks.forEach((link) => {
  if (link.href.includes(defaultWhatsappNumber)) {
    link.dataset.placeholderNumber = "true";
  }
});

if (orderForm && feedback) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const name = formData.get("name");
    const eventType = formData.get("eventType");
    const guestCount = formData.get("guestCount");
    const flavor = formData.get("flavor");
    const eventDate = formData.get("eventDate");
    const phone = formData.get("phone");
    const notes = formData.get("notes");
    const message =
      `Hi Sugar Swirl, I want to order a customized cake.%0A` +
      `Name: ${name}%0A` +
      `Phone: ${phone}%0A` +
      `Event Type: ${eventType}%0A` +
      `Guest Count: ${guestCount}%0A` +
      `Flavor: ${flavor}%0A` +
      `Event Date: ${eventDate}%0A` +
      `Notes: ${notes || "No extra notes yet."}`;
    const whatsappUrl = buildWhatsappLink(message.replace(/%0A/g, "\n"));

    feedback.textContent =
      `Inquiry ready for ${name}: ${eventType} cake for ${guestCount} guests, ${flavor} flavor, event date ${eventDate}. ` +
      "Use the WhatsApp button below after replacing the placeholder business number.";

    let existingButton = orderForm.querySelector(".generated-whatsapp");

    if (!existingButton) {
      existingButton = document.createElement("a");
      existingButton.className = "whatsapp-button full-width generated-whatsapp";
      existingButton.target = "_blank";
      existingButton.rel = "noreferrer";
      existingButton.textContent = "Send This Inquiry on WhatsApp";
      orderForm.append(existingButton);
    }

    existingButton.href = whatsappUrl;
  });
}

const customizer = document.getElementById("cake-customizer");

if (customizer) {
  const steps = Array.from(customizer.querySelectorAll(".builder-step"));
  const nextButton = document.getElementById("builder-next");
  const backButton = document.getElementById("builder-back");
  const progressFill = document.getElementById("customizer-progress-fill");
  const stepLabel = document.getElementById("customizer-step-label");
  const summaryEl = document.getElementById("builder-summary");
  const whatsappButton = document.getElementById("builder-whatsapp");
  const builderForm = document.getElementById("customizer-form");
  const scrollToBuilderButton = document.getElementById("scroll-to-builder");
  const eventDateInput = builderForm?.elements.eventDate;
  const builderControls = customizer.querySelector(".builder-controls");
  const weightCards = Array.from(customizer.querySelectorAll('.option-card[data-field="weight"]'));

  const getMinOccasionDate = () => {
    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);
    minDate.setDate(minDate.getDate() + 3);
    return minDate;
  };

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (value) => {
    if (!value || !value.includes("-")) {
      return value;
    }

    const [year, month, day] = value.split("-");
    return `${day}-${month}-${year}`;
  };

  const minOccasionDate = getMinOccasionDate();
  const minOccasionDateValue = formatDateForInput(minOccasionDate);

  if (eventDateInput) {
    eventDateInput.min = minOccasionDateValue;
  }

  const builderState = {
    customerName: "",
    customerPhone: "",
    occasion: "",
    eventDate: "",
    flavor: "",
    tier: "",
    weight: "",
    addOns: [],
    guestCount: "",
    referenceImage: "",
    customerNote: "",
  };

  const minWeightByTier = {
    "Single Tier": 0,
    "Two Tier": 1.5,
    "Three Tier": 5,
    "Four or More Tiers": 6,
  };

  let currentStep = 0;

  const getAddOnsSummary = () => {
    const addOnFields = [
      ["addonCookiesPack6", "Cookies - Pack of 6"],
      ["addonCookieTin", "Cookies - Cookie Tin"],
      ["addonBrowniePack6", "Brownies - Pack of 6"],
      ["addonBrowniePack8", "Brownies - Pack of 8"],
      ["addonAssortedBrownies6", "Assorted Brownies - Pack of 6"],
    ];

    return addOnFields
      .map(([fieldName, label]) => {
        const rawValue = builderForm.elements[fieldName]?.value || "0";
        const quantity = Math.max(0, Number.parseInt(rawValue, 10) || 0);
        return quantity > 0 ? `${label} x ${quantity}` : null;
      })
      .filter(Boolean);
  };

  const renderSummary = () => {
    if (!summaryEl || !whatsappButton) {
      return;
    }

    summaryEl.innerHTML = `
      <p><strong>Name:</strong> ${builderState.customerName || "-"}</p>
      <p><strong>Contact no.:</strong> ${builderState.customerPhone || "-"}</p>
      <p><strong>Occasion:</strong> ${builderState.occasion || "-"}</p>
      <p><strong>Occasion Date:</strong> ${formatDateForDisplay(builderState.eventDate) || "-"}</p>
      <p><strong>Flavour:</strong> ${builderState.flavor || "-"}</p>
      <p><strong>Tier:</strong> ${builderState.tier || "-"}</p>
      <p><strong>Weight:</strong> ${builderState.weight || "-"}</p>
      <p><strong>Add-ons:</strong> ${builderState.addOns.length ? builderState.addOns.join(", ") : "None"}</p>
      <p><strong>Guest Count:</strong> ${builderState.guestCount || "-"}</p>
      <p><strong>Reference Image:</strong> ${builderState.referenceImage || "-"}</p>
      <p><strong>Note:</strong> ${builderState.customerNote || "-"}</p>
    `;

    const message =
      `Hi Sugar Swirl, I want to customize a cake.%0A` +
      `Name: ${builderState.customerName}%0A` +
      `Contact no.: ${builderState.customerPhone}%0A` +
      `Occasion: ${builderState.occasion}%0A` +
      `Occasion Date: ${formatDateForDisplay(builderState.eventDate)}%0A` +
      `Flavour: ${builderState.flavor}%0A` +
      `Tier: ${builderState.tier}%0A` +
      `Weight: ${builderState.weight}%0A` +
      `Add-ons: ${builderState.addOns.length ? builderState.addOns.join(", ") : "None"}%0A` +
      `Guest Count: ${builderState.guestCount}%0A` +
      `Reference Image: ${builderState.referenceImage || "No"}%0A` +
      `Note: ${builderState.customerNote || "No extra note."}`;

    whatsappButton.href = buildWhatsappLink(message.replace(/%0A/g, "\n"));
  };

  const getRequiredMinWeight = () => minWeightByTier[builderState.tier] ?? 0;

  const isSelectedWeightAllowed = () => {
    if (!builderState.weight) {
      return false;
    }

    const matchingCard = weightCards.find((card) => card.dataset.value === builderState.weight);

    if (!matchingCard) {
      return false;
    }

    const numericWeight = Number(matchingCard.dataset.weightKg || "0");
    return numericWeight >= getRequiredMinWeight();
  };

  const updateWeightAvailability = () => {
    const requiredMinWeight = getRequiredMinWeight();

    weightCards.forEach((card) => {
      const numericWeight = Number(card.dataset.weightKg || "0");
      const isAllowed = numericWeight >= requiredMinWeight;

      card.classList.toggle("is-disabled", !isAllowed);
      card.setAttribute("aria-disabled", String(!isAllowed));
      card.tabIndex = isAllowed ? 0 : -1;
    });

    if (builderState.weight && !isSelectedWeightAllowed()) {
      builderState.weight = "";
      weightCards.forEach((card) => card.classList.remove("selected"));
    }
  };

  const isStepValid = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        builderState.customerName = builderForm.elements.customerName?.value.trim() || "";
        builderState.customerPhone = (builderForm.elements.customerPhone?.value || "").replace(
          /\D/g,
          ""
        );
        if (builderForm.elements.customerPhone) {
          builderForm.elements.customerPhone.value = builderState.customerPhone;
        }
        return Boolean(builderState.customerName && /^\d{10}$/.test(builderState.customerPhone));
      case 1:
        return Boolean(builderState.occasion);
      case 2:
        builderState.eventDate = builderForm.elements.eventDate?.value || "";
        if (!builderState.eventDate) {
          return false;
        }

        return builderState.eventDate >= minOccasionDateValue;
      case 3:
        return Boolean(builderState.flavor);
      case 4:
        return Boolean(builderState.tier);
      case 5:
        return isSelectedWeightAllowed();
      case 6:
        builderState.addOns = getAddOnsSummary();
        return true;
      case 7:
        builderState.guestCount = builderForm.elements.guestCount?.value || "";
        return true;
      case 8:
        return Boolean(builderState.referenceImage);
      default:
        builderState.customerNote = builderForm.elements.customerNote?.value.trim() || "";
        return true;
    }
  };

  const updateStep = () => {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    });

    if (progressFill) {
      progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    }

    if (stepLabel) {
      stepLabel.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    }

    if (backButton) {
      backButton.disabled = currentStep === 0;
    }

    if (builderControls) {
      builderControls.classList.toggle("is-summary", currentStep === steps.length - 1);
    }

    if (nextButton) {
      const isLastStep = currentStep === steps.length - 1;
      const isBeforeSummary = currentStep === steps.length - 2;
      nextButton.textContent = isBeforeSummary ? "Finish" : "Next";
      nextButton.disabled = isLastStep;
      nextButton.hidden = isLastStep;
    }

    if (currentStep === steps.length - 1) {
      renderSummary();
    }
  };

  customizer.querySelectorAll(".option-card").forEach((card) => {
    card.addEventListener("click", () => {
      const field = card.dataset.field;
      const value = card.dataset.value;
      const container = card.closest(".builder-step");

      if (!field || !value || !container) {
        return;
      }

      if (card.classList.contains("is-disabled")) {
        return;
      }

      builderState[field] = value;

      container.querySelectorAll(`.option-card[data-field="${field}"]`).forEach((item) => {
        item.classList.remove("selected");
      });

      card.classList.add("selected");

      if (field === "tier") {
        updateWeightAvailability();
      }
    });
  });

  const scrollCustomizerTop = () => {
    const header = document.querySelector(".site-header");
    const headerHeight = header?.offsetHeight || 0;
    const top = customizer.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
    window.scrollTo({ top, behavior: "smooth" });
  };

  nextButton?.addEventListener("click", () => {
    if (!isStepValid(currentStep)) {
      return;
    }

    if (currentStep < steps.length - 1) {
      currentStep += 1;
      updateStep();
      scrollCustomizerTop();
    }
  });

  backButton?.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep -= 1;
      updateStep();
      scrollCustomizerTop();
    }
  });

  scrollToBuilderButton?.addEventListener("click", () => {
    scrollCustomizerTop();
  });

  updateWeightAvailability();
  updateStep();
}
