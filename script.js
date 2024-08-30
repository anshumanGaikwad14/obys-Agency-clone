const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

function locomotiveScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locomotiveScrollTrigger();

function loaderAnimation() {
  var h5timer = document.querySelector("#line1-part1 h5");
  var grow = 0;

  var tl = gsap.timeline();

  tl.from("#line1-part1, .line h2", {
    opacity: 0,
    duration: 1,
    onStart: function () {
      setInterval(function () {
        if (grow < 100) {
          grow++;
          h5timer.innerHTML = grow;
        } else {
          grow = 100;
          h5timer.innerHTML = grow;
        }
      }, 30);
    },
  });

  tl.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });

  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    delay: -1,
    duration: 0.6,
  });

  tl.to(".loader", {
    opacity: 0,
    delay: 2.3,
    duration: 0.2,
  });

  tl.from("#page1", {
    delay: 0.2,
    y: 700,
    duration: 0.5,
    opacity: 0,
    ease: Power4,
  });

  tl.to(".loader", {
    display: "none",
  });

  tl.from("nav", {
    opacity: 0,
  });

  tl.from(".container-txt h1", {
    y: 100,
    opacity: 0,
    delay: -1,
    duration: 0.5,
    stagger: 0.2,
  });

  tl.from(".video-container", {
    y: 100,
    opacity: 0,
  });
}

loaderAnimation();

function mouseMovement() {
  // Move the cursor follower circle with mouse movement
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".crsr .circle", {
      left: dets.x,
      top: dets.y,
      delay: -0.1,
    });
  });

  // Select elements
  var player = document.querySelector(".video-container .video-player");
  var crsr = document.querySelector(".crsr .circle");
  var image = document.querySelector(".video-container img");
  var video = document.querySelector(".video-container video");
  var container = document.querySelector(".video-container");

  var flag = 0; // Video is initially paused
  var isClickInProgress = false; // To prevent multiple rapid clicks

  // Function to handle video playback
  function toggleVideo() {
    if (isClickInProgress) return; // Exit if another click is being processed

    isClickInProgress = true; // Set flag to indicate click is in progress

    if (flag === 0) {
      video.play();
      video.style.opacity = 1;
      image.style.display = "none";
      player.innerHTML = `<i class="ri-pause-fill"></i>`;
      gsap.to(".video-player", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      image.style.display = "block";
      player.innerHTML = `<i class="ri-play-fill"></i>`;
      gsap.to(".video-player", {
        scale: 1,
      });
      flag = 0;
    }

    // Reset the click-in-progress flag after the animation completes
    setTimeout(() => {
      isClickInProgress = false;
    }, 300); // Adjust the timeout duration as needed
  }

  // Add click event listener to the container
  container.addEventListener("click", toggleVideo);

  // Other event listeners for mouse movements and effects
  container.addEventListener("mouseenter", function () {
    container.addEventListener("mousemove", function (dets) {
      gsap.to(".video-player", {
        left: dets.x - 480,
        top: dets.y - 280,
      });
    });

    crsr.style.opacity = 0; // Hide custom cursor on container enter
  });

  container.addEventListener("mouseleave", function () {
    crsr.style.opacity = 1; // Show custom cursor on container leave
    gsap.to(".video-player", {
      top: "-5.5vw",
      left: "48vw",
      scale: 1,
    });
    image.style.display = "block";
    video.pause();
    player.innerHTML = `<i class="ri-play-fill"></i>`;
    flag = 0; // Reset flag when mouse leaves container
  });
}

mouseMovement();

function magneticEffect() {
  Shery.makeMagnet(".nav-right h5 , .nav-left #svg1" /* Element to target.*/, {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
}

magneticEffect();

function cursorScaleAnimation() {
  var crsr = document.querySelector(".crsr .circle");
  if (crsr) {
    var links = document.querySelectorAll(".nav-right h5, .nav-left #svg1");

    links.forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        crsr.style.width = "2vw";
        crsr.style.height = "2vw";
      });

      link.addEventListener("mouseleave", function () {
        crsr.style.width = "1vw";
        crsr.style.height = "1vw";
      });
    });
  }
}

cursorScaleAnimation();

document.addEventListener("mousemove", function (dets) {
  gsap.to("#flag", {
    x: dets.x,
    y: dets.y,
  });
});

var hero = document.querySelector("#hero3 #elem1");
var hero1 = document.querySelector("#hero3 #elem3");
hero.addEventListener("mouseenter", function () {
  gsap.to("#flag", {
    opacity: 1,
    delay: -0.1,
  });
});

hero.addEventListener("mouseleave", function () {
  gsap.to("#flag", {
    opacity: 0,
    delay: -0.1,
  });
});

hero1.addEventListener("mouseenter", function () {
  gsap.to("#flag", {
    opacity: 1,
    delay: -0.1,
  });
});

hero1.addEventListener("mouseleave", function () {
  gsap.to("#flag", {
    opacity: 0,
    delay: -0.1,
  });
});

var flag = 0;
var footHeading = document.querySelector(".footer-title h1");
footHeading.addEventListener("mouseenter", function () {
  gsap.to(".footer-title h1", {
    onStart: function anime() {
      $(".footer-title h1").textillate({ in: { effect: "fadeIn" } });
    },
  });
});
