(function () {
    "use strict";

    console.log("reading js");

    const startScreen = document.querySelector("#start-screen");
    const startBtn = document.querySelector("#start-btn");
    const restartBtn = document.querySelector("#restart-btn"); 
    const uiGuide = document.querySelector("#ui-guide");
    const track = document.querySelector("#background-track");
    const character = document.querySelector("#character");
    const heroImg = document.querySelector("#hero-img");
    const overlay = document.querySelector("#art-overlay");
    const closeBtn = document.querySelector("#close-btn");

    const displayImg = document.querySelector("#display-img");
    const artTitle = document.querySelector("#art-title");
    const artDesc = document.querySelector("#art-desc");

    const canvas1 = document.querySelector("#canvas1");
    const canvas2 = document.querySelector("#canvas2");
    const canvas3 = document.querySelector("#canvas3");

    const status1 = document.querySelector("#status1");
    const status2 = document.querySelector("#status2");
    const status3 = document.querySelector("#status3");

    // next UI
    const next1 = document.querySelector("#next1");
    const next2 = document.querySelector("#next2");

    let currentStation = 1;
    let animationInterval;
    let isDrawing = false;
    let gameActive = false;

    let stage1Cleared = false;
    let stage2Cleared = false;
    let stage3Cleared = false;

    // display discription
    const artData = {
        station1: {
            title: "Drawing 1 – Head",
            desc: "This was actually my first artwork from the life drawing class that I took when I studied abroad in Los Angeles. Being someone who has never had any proper education in the field of arts, I felt like I was out of my element, desperately trying to recreate the professor’s technique using my charcoal. Upon seeing my artwork, the professor not only complimented me but also provided some pointers on how I could make the drawing even better. It was at that very moment that everything changed for me.",
            img: "images/drawing1.jpg",
            finalCanvas: "images/art1.png"
        },
        station2: {
            title: "Drawing 2 – Hands",
            desc: "This illustration was done as part of an assignment for school in the living room of my 20-student shared residence; I used the hand of one of my roommates as my inspiration. As I worked on this for hours, almost everybody in the residence came over to check out my work and comment on how great I was doing. Seeing my artwork made them wonder about me—who am I? What makes me draw? It really warmed my heart that people would actually want to know who I was.",
            img: "images/drawing2.jpg",
            finalCanvas: "images/art2.png"
        },
        station3: {
            title: "Drawing 3 – Figure",
            desc: "This artwork was produced in a figure drawing session that taught about human anatomy and muscle structure. Gesture drawings were done with strict time limits starting from 10 seconds, 15 seconds, and 30 seconds up to 1 minute, 5 minutes, and 20 minutes. The aim was to enable us to learn how to accurately portray body structures and poses within a very short period of time. The most memorable moment during this session is when our teacher took a look at my work and immediately said, \"You really love drawing, don't you?\" He appeared to have seen all the hard work I put into learning how to draw through my lines.",
            img: "images/drawing3.jpg",
            finalCanvas: "images/art3.png"
        }
    };

    startBtn.addEventListener("click", function () {
        startScreen.classList.add("hidden");
        uiGuide.classList.remove("hidden");
        track.classList.remove("hidden");
        character.classList.remove("hidden");
        gameActive = true;
    });

    // key
    window.addEventListener("keydown", function (e) {
        if (!gameActive || isDrawing || !overlay.classList.contains("hidden") || currentStation === "free") return;

        if (e.key === "ArrowRight") {
            if (currentStation === 1 && stage1Cleared) {
                currentStation = 2;
                track.style.left = "-100%"; // go to 2nd
                next1.classList.add("hidden"); 
            } else if (currentStation === 2 && stage2Cleared) {
                currentStation = 3;
                track.style.left = "-200%"; // go to 3rd
                next2.classList.add("hidden"); 
            }
        } else if (e.key === "ArrowLeft") {
            if (currentStation === 2) {
                currentStation = 1;
                track.style.left = "0%"; // go back to 1st
                if (stage1Cleared) next1.classList.remove("hidden"); 
            } else if (currentStation === 3) {
                currentStation = 2;
                track.style.left = "-100%"; // go back to 2nd
                if (stage2Cleared) next2.classList.remove("hidden"); 
            }
        }
    });

    function startDrawingAnimation() {
        let toggle = true;
        animationInterval = setInterval(function () {
            if (toggle) {
                heroImg.src = "images/humandr1.png";
            } else {
                heroImg.src = "images/humandr2.png";
            }
            toggle = !toggle;
        }, 250);
    }

    function handleCanvasClick(stationKey) {
        if (isDrawing || currentStation === "free") return;
        isDrawing = true;

        // character right move
        character.style.left = "80%";

        startDrawingAnimation();

        // 2sec animation drawing
        setTimeout(function () {
            clearInterval(animationInterval);
            heroImg.src = "images/humanpic1.png";
            isDrawing = false;

            const data = artData[stationKey];
            artTitle.innerHTML = data.title;
            artDesc.innerHTML = data.desc;
            displayImg.src = data.img;

            overlay.classList.remove("hidden");
        }, 2000);
    }

    canvas1.addEventListener("click", function () {
        if (currentStation === 1) handleCanvasClick("station1");
    });

    canvas2.addEventListener("click", function () {
        if (currentStation === 2) handleCanvasClick("station2");
    });

    canvas3.addEventListener("click", function () {
        if (currentStation === 3) handleCanvasClick("station3");
    });

    closeBtn.addEventListener("click", function () {
        overlay.classList.add("hidden");
        
        // character back to center
        character.style.left = "50%";

        if (currentStation === 1) {
            canvas1.src = artData.station1.finalCanvas;
            status1.innerHTML = "COMPLETE"; 
            stage1Cleared = true;
            next1.classList.remove("hidden"); // next1
        } else if (currentStation === 2) {
            canvas2.src = artData.station2.finalCanvas;
            status2.innerHTML = "COMPLETE";
            stage2Cleared = true;
            next2.classList.remove("hidden"); //next2
        } else if (currentStation === 3) {
            canvas3.src = artData.station3.finalCanvas;
            status3.innerHTML = "COMPLETE";
            stage3Cleared = true;
            
            // exbition mode
            setTimeout(function() {
                uiGuide.classList.add("hidden");
                track.style.width = "100%";
                track.style.transition = "none";
                track.style.left = "0px";
                
                const stations = document.querySelectorAll(".station");
                stations.forEach(function(station) {
                    station.style.width = "33.333%";
                });
                
                character.classList.add("hidden");
                restartBtn.classList.remove("hidden"); // restart button
                currentStation = "free"; 
            }, 500);
        }
    });

    // exhibition mode - click on canvas to show description
    track.addEventListener("click", function(e) {
        if (currentStation === "free") {
            let data;
            if (e.target.id === "canvas1") data = artData.station1;
            if (e.target.id === "canvas2") data = artData.station2;
            if (e.target.id === "canvas3") data = artData.station3;

            if (data) {
                artTitle.innerHTML = data.title;
                artDesc.innerHTML = data.desc;
                displayImg.src = data.img;
                overlay.classList.remove("hidden");
            }
        }
    });

    // restart all
    restartBtn.addEventListener("click", function () {
        currentStation = 1;
        stage1Cleared = false;
        stage2Cleared = false;
        stage3Cleared = false;
        gameActive = false;

  
        canvas1.src = "images/canvaspic.png";
        canvas2.src = "images/canvaspich.png";
        canvas3.src = "images/canvaspich.png";

        // COMPLETE
        status1.innerHTML = "";
        status2.innerHTML = "";
        status3.innerHTML = "";

        
        track.style.transition = "left 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
        track.style.width = "300%";
        track.style.left = "0px";
        const stations = document.querySelectorAll(".station");
        stations.forEach(function(station) {
            station.style.width = "33.333%";
        });

        
        next1.classList.add("hidden");
        next2.classList.add("hidden");
        restartBtn.classList.add("hidden");

       
        startScreen.classList.remove("hidden");
        track.classList.add("hidden");
        character.classList.add("hidden");
    });
})();